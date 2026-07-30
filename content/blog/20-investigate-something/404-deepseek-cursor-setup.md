---
title: "DeepSeek×Cursor連携ガイド｜V4をプロキシで使う設定"
description: "Cursor ProでDeepSeek V4を使おうとしてモデル名エラーに詰まった人向けに、APIキー取得からngrok・プロキシ経由のBase URL設定、よくあるエラーの切り分け、コストを抑えるモデルの選び方までを実測ベースでまとめました(2026年7月時点)。"
date: 2026-07-30
tags:
  - cursor
  - deepseek
  - deepseek-v4
  - ngrok
  - proxy
  - windows
  - api連携
site: toolarc.jp
target: "CursorでDeepSeek V4を使いたいWindows開発者、コストを抑えたい人"
last_update: 2026-07-30
---

# DeepSeek×Cursor連携ガイド｜V4をプロキシで使う設定

CursorにDeepSeekのAPIキーを入れたのに「Model name is not valid」と出る、あるいはV4だけ動かない。この2つで止まっている方は多いはずです。

原因はモデル名の誤字とは限りません。実は、DeepSeek V4は仕組み上の理由でCursorに直接つなぐと落ちやすく、間に一つ仕掛けが必要になります。この記事では、その仕掛けを含めた設定手順と、つまずきやすいポイントの切り分け方を整理します。

> **今日の結論**
> - V4（thinkingモデル）はCursor直結だと、思考過程のデータが欠落してエラーになりやすい。**プロキシ＋公開HTTPS（ngrok）**を挟む必要がある
> - Base URLは事前に決め打ちできない。プロキシを起動したときにngrokが発行するURLを、そのつどCursorへ反映する
> - 「Model name is not valid」の犯人はモデル名だけではない。**APIキーのトグルがOFF**のままでも同じ表示になる
> - コストを抑えたいなら、Cursor標準枠とV4＋プロキシ運用を使い分けるのが現実的
> - 残高不足の合図はHTTP 402。原因の切り分けさえできれば、対処は難しくない

---

## DeepSeek APIキーを取得する

まずはDeepSeek側の準備からです。

1. [DeepSeek Platform](https://platform.deepseek.com/)でアカウントを登録する（メールまたは電話番号）
2. 本人確認を完了する
3. ダッシュボードの**API Keys**から**Create API Key**を選ぶ
4. 表示された`sk-`から始まる文字列をその場で保存する

**APIキー**（サービスにプログラムから安全にアクセスするための認証用の文字列。人間で言うログインパスワードに近い役割を持つ）は、発行直後の画面でしか全文を確認できません。閉じてしまうと再表示できないため、その場でコピーして安全な場所に控えてください。

![DeepSeekのCreate API Key画面でnameを設定しているところ](deepseek-api-key-name.png)

![発行されたAPIキーを表示している画面](deepseek-api-key-created.png)

キーはチャットやGitに貼らないこと。もし誤って公開してしまったら、同じ画面から再発行できます。

![DeepSeekのAPI Key一覧画面](deepseek-api-key-list.png)

---

## Cursor側の基本設定｜直結型とV4＋プロキシ型の違い

次はCursor側です。設定画面は次の手順で開きます。

1. 設定を開く（`Ctrl + ,`）
2. 左メニューの**Models**を選ぶ
3. 次の3項目を設定する

DeepSeekの使い方には、モデル名によって2つのパターンがあります。旧モデルや`deepseek-v3.1`をそのまま使う「直結型」と、V4を使うために後述のプロキシを挟む「V4＋プロキシ型」です。

| 項目 | 直結型（旧・検証用） | V4＋プロキシ型（本命） |
| :--- | :--- | :--- |
| OpenAI API Key | DeepSeekの`sk-` | 同じ値（**トグルをON**にする） |
| Override OpenAI Base URL | `https://api.deepseek.com/v1` | プロキシ起動後にログの`api_base_url`を貼る |
| Add Custom Model | 利用モデル名 | `deepseek-v4-flash`または`deepseek-v4-pro` |

**Base URL（Override OpenAI Base URL）**（APIの送信先を指定する設定項目。既定ではOpenAI向けのURLが入っているが、ここを書き換えることで別サービス宛にリクエストを送れるようになる）は、V4＋プロキシ型の場合はまだ空、あるいは仮の値のままで構いません。実際の値は、この後のプロキシ起動後に決まります。

注意したいのは**トグル**（設定のON/OFFを切り替えるスイッチ状のUI部品）です。キー欄に値が入っていても、トグルがOFFのままだと送信されません。「Secret saved」という表示が出ても、それだけでは有効になっていない場合があります。

![CursorのModels画面でOpenAI API KeyとOverride Base URLを設定しているところ](cursor-openai-key-override-baseurl.png)

![Cursorのadd custom model画面でdeepseek-v4-flashを追加しているところ](cursor-add-custom-model.png)

カスタムAPIの一時切り替えは、Windowsなら`Ctrl + Shift + 0`、macOSなら`Cmd + Shift + 0`。

### モデル名の変遷

DeepSeek側のモデル名は何度か変わっているため、古い情報のまま設定すると通らないことがあります。

| モデル名 | 位置づけ |
| :--- | :--- |
| `deepseek-chat` / `deepseek-reasoner` | 旧名。廃止扱いで、Cursorでは通りにくくなっている |
| `deepseek-v3.1` | Cursor Pro側で使える従来枠。Chat寄りの位置づけ |
| `deepseek-v4-flash` | 高速タイプ。thinking系のため後述のプロキシが必要 |
| `deepseek-v4-pro` | 高推論タイプ。同じくプロキシが必要 |

---

## なぜV4だけ動かないのか｜プロキシが必要な理由

ここが、この記事でいちばん誤解されやすい部分です。

DeepSeek V4の**thinkingモデル**（回答を出す前に、内部で思考過程を組み立ててから答えるタイプのモデル）は、応答に**reasoning_content**（その思考過程のデータ本体）を含みます。次のやり取りでは、このデータの返却が前提。

Cursorはこの履歴をOpenAI互換の形で組み立てるため、reasoning_contentを落としてしまうことがあります。結果として、DeepSeek側が**HTTPステータスコード**（サーバとクライアントの通信結果を表す3桁の数字）**400**（reasoning_content必須というエラー）を返す、という流れです。原因はCursor側の不具合というより、両者のデータ形式の食い違いに近いと考えられます。

**プロキシ**（クライアントとサーバの間に立ち、やり取りを中継・加工する仕組み）の役目は、次の3つです。

- 上流の応答から`reasoning_content`をローカルに保持する
- Cursorから来た履歴に、不足分を再注入する
- 必要に応じてngrokで公開HTTPSを用意し、Cursorが`localhost`を拒否する制約を避ける

経路を図にすると、次のようになります。

![Cursorからngrok・プロキシを経由してDeepSeek APIへ至る経路図](Cursor-DeepSeekV4.png)

初回起動時には、`~/.deepseek-cursor-proxy/config.yaml`と`~/.deepseek-cursor-proxy/reasoning_content.sqlite3`という2つのファイルが自動で作られます。前者は設定、後者はreasoning_contentの保持用です。中身を直接編集する必要は、通常はありません。

---

## Windowsで導入する5ステップ｜ngrok→プロキシ起動→Base URL反映

ここからは実際の導入手順です。筆者が実装時に確認した範囲では、2026年7月27日時点でWindows 11・Cursor Pro・uv 0.11.15・ngrok 3.39.10の組み合わせで動作しました。バージョンが変わると挙動が変わる可能性はあります。

前提として、次のものを用意してください。

- Cursor 2.0以降（Pro）
- 残高のあるDeepSeek APIキー
- `uv`（Pythonの実行環境・パッケージ管理をまとめて行うツール）
- ngrokアカウント（無料でも可）とAuthtoken
- 管理者権限（後述のDefender除外が必要な場合のみ）

### Step1：ngrokのインストールと設定

**ngrok**（自分のPC内で動くプログラムを、インターネット上から一時的にアクセスできるURLとして公開する仕組み）をまず用意します。

```powershell
winget install ngrok.ngrok --accept-package-agreements --accept-source-agreements
```

インストール直後のターミナルはPATHが古いままのことがあります。ターミナルを開き直すか、次のコマンドで読み直してください。

```powershell
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
ngrok version
```

Authtokenをダッシュボードで確認し、登録します。チャットには貼らないでください。

```powershell
ngrok config add-authtoken <あなたのAuthtoken>
ngrok config check
```

ここで見落としやすいのがバージョンです。アカウント側が要求する最低版（例：3.20.0）未満だと、トンネル作成に失敗します。実測ではwingetが入れた3.3.1が拒否され、3.39.10で通りました。

```powershell
ngrok update
# または公式zipを %LOCALAPPDATA%\ngrok-bin に展開し、User PATHの先頭へ追加
ngrok version
```

macOSの場合は`brew install ngrok`でも構いません。ただし、この記事の手順本体はWindowsでの実測を前提にしています。

### Step2：プロキシのインストールと起動

PyPI経由の短いコマンドは、環境によってパッケージが見つからず失敗することがあります。

```powershell
# 失敗しやすい例
uv tool install deepseek-cursor-proxy
```

代わりに、GitHubから直接インストールする方法が安定。

```powershell
uv tool install "git+https://github.com/yxlao/deepseek-cursor-proxy.git"
```

実行ファイルはおおむね`%USERPROFILE%\.local\bin\deepseek-cursor-proxy.exe`に置かれます。認識されない場合は、PATHに追加するかターミナルを開き直してください。

```powershell
$env:Path = "$env:LOCALAPPDATA\ngrok-bin;" + $env:Path
$env:Path = "$env:USERPROFILE\.local\bin;" + $env:Path
deepseek-cursor-proxy
```

公式README寄りの方法を使いたい場合は、次の代替手順でも起動できます。

```powershell
git clone https://github.com/yxlao/deepseek-cursor-proxy.git
cd deepseek-cursor-proxy
uv run deepseek-cursor-proxy
```

### Step3：起動順とBase URLの取得・Cursorへの反映

ここが最初につまずきやすいポイントです。Cursorに入れるBase URLは、あらかじめ決めておく値ではありません。

`deepseek-cursor-proxy`を起動すると、既定ではngrokのトンネルも一緒に立ち上がり、そのときはじめて公開用のホスト名が決まります。プロキシはそのホストに`/v1`を付けたURLを`api_base_url`としてターミナルに表示します。Cursorの Override OpenAI Base URL には、この`api_base_url`をそのまま入力。

**dev domain**（ngrokがアカウントに割り当てる公開ホスト名。ダッシュボードのDomainsに表示される）という言葉も出てきますが、指しているものは同じホスト名です。呼び方が違うだけ、と考えると整理しやすくなります。

| 呼び方 | 指しているもの |
| :--- | :--- |
| ホスト／ホスト名 | URLのうち「どのサーバか」を表す部分 |
| dev domain | ngrokが割り当てる公開ホスト名そのもの（ホスト名と同じもの） |
| 公開URL | `https://`＋ホスト |
| `api_base_url` | 公開URL＋`/v1`。プロキシが表示する「Cursor向けの完成形」 |
| `local_base_url` | この PC内だけのプロキシ入口（Cursorには使わない） |

![ホスト・dev domain・api_base_url・local_base_urlの対応とCursorへの設定箇所](BaseURL-ngrokFree.app.png)

推奨の作業順は次の通りです。

1. ngrokのAuthtoken登録・バージョン確認まで済ませる
2. Cursor側はキーとモデル名だけ先に用意する。Base URLはまだ空でよい
3. `deepseek-cursor-proxy`を起動し、そのターミナルは閉じない
4. ログの`api_base_url`をコピーする
5. Cursorの Override OpenAI Base URL に貼り、トグルをONにして送信テストする

起動直後のターミナルには、次のような3行が表示されます。

```text
default_model: deepseek-v4-pro (thinking, max)
local_base_url: http://127.0.0.1:9000/v1
api_base_url: https://xxxx.ngrok-free.dev/v1
```

![プロキシ起動直後のターミナルでapi_base_urlが表示されている画面](apiBaseUrl.png)

Cursorに使うのは`api_base_url`だけです。`local_base_url`はこのPC内だけの入口のため、Cursorからは届きません。

| 項目 | Cursorに使うか |
| :--- | :--- |
| OpenAI API Key | DeepSeekの`sk-`（トグルON） |
| Override OpenAI Base URL | 起動ログの`api_base_url` |
| Model | `deepseek-v4-flash`または`deepseek-v4-pro` |

手動で`ngrok http 9000`を先に叩いてURLを取っておく必要はありません。既定のプロキシ起動が、ngrokの立ち上げまで含んでいます。

### Step4：Base URLの再設定が必要になるとき

`--ngrok-url`で同じホストを明示していない場合、起動のたびにターミナルの`api_base_url`が前回と食い違うことがあります。次のような操作のあとは、Cursorに残っている古いOverrideが無効になりやすい点に注意してください。

| きっかけ | 起きること | やること |
| :--- | :--- | :--- |
| プロキシのターミナルを閉じた／`Ctrl+C` | プロキシとngrokが止まる | 再起動し、新しい`api_base_url`を貼り直す |
| PC再起動・スリープ明けでプロセスが消えた | 同上 | 同上 |
| 別ポートで起動し直した | トンネルも作り直しになる | ログを見てBase URLを更新する |
| Cursorに古いURLのまま送信した | 接続失敗・タイムアウトになりやすい | Modelsの Override を最新の値に更新する |

日常運用としては、次の流れになります。

1. DeepSeek V4を使う日は、先にプロキシを起動する（ターミナルは閉じない）
2. ターミナルの`api_base_url`行と、CursorのOverrideの値が一字一句一致しているか確認する
3. 一致していなければ貼り直す
4. 使い終わったらターミナルを止めてよい

起動のたびにCursorを触りたくない場合は、次のBase URL固定を検討してください。

### Step5：Base URLを固定する（任意）

固定には2種類あります。無料でできることと、有料でないとできないことを分けて考える必要があります。

| やりたいこと | 無料プラン | 有料プラン |
| :--- | :--- | :--- |
| アカウントに割り当てられた1個のdev domainで毎回同じホストにする | 可能（名前は選べない） | 可能 |
| 好きな名前のngrokドメインを予約する | 不可 | Hobbyist以上で選択可 |
| 自分のドメインを使う | 不可 | より上位プランで可 |

参照（執筆時点）：[ngrok Free Plan Limits](https://ngrok.com/docs/pricing-limits/free-plan-limits)、[ngrok Pricing](https://ngrok.com/pricing)。プラン内容はダッシュボードで再確認してください。

無料プランでも、アカウント作成時に自動で割り当てられたdev domainが1つあります。これを毎回使う設定にすれば、無料のままホスト名を固定できます。

```powershell
deepseek-cursor-proxy --ngrok-url https://abcd-1234.ngrok-free.app
```

```yaml
# ~/.deepseek-cursor-proxy/config.yaml
ngrok: true
ngrok_url: https://abcd-1234.ngrok-free.app
```

起動直後のログで`api_base_url`がこのホストになっていることを確認し、Cursorの Override にも同じ値を一度入れておけば完了です。固定できるのはホスト名だけで、プロキシとngrokの起動自体は毎回必要になります。

好きな名前や自前ドメインが欲しい場合は、有料プランへの切り替えが前提。

---

## よくあるエラーと切り分け方

症状ごとに、原因と確認ポイントを整理します。

### 「Model name is not valid: 'deepseek-v4-flash'」

| よくある原因 | 確認方法 |
| :--- | :--- |
| APIキーのトグルがOFF | Modelsの画面でOpenAI API Keyが緑色のONになっているか |
| 旧モデル名のまま | `deepseek-chat`などを削除し、V4系の名前に変える |
| キーが未入力に戻っている | アップデート後にキーが消えていることがある |

キーが有効になっていないと、カスタムモデル名自体がサーバ側で弾かれ、モデル名のエラーと同じ文言が出ます。モデル名だけを疑うと遠回りになりやすい点です。

### ngrok：`ERR_NGROK_121`／version too old

プロキシ起動直後に`ERROR ngrok exited before creating a tunnel`と出る場合、エージェント側のバージョンがアカウントの最低要件を満たしていません。`ngrok update`か、公式最新バイナリへの差し替えで解消します。

### Windows Defenderがngrokを止める

`Trojan:Win32/Kepavll!rfn`のような検知例があり、公式の更新バイナリでも誤検知することがあります。Windowsセキュリティで許可・除外するか、公式zipを`%LOCALAPPDATA%\ngrok-bin`に置き直してください。除外の追加には管理者の承認が必要です。セキュリティ設定の変更は自己判断で行ってください。

### プロキシログの`upstream_status=402`／Insufficient Balance

次のようなログが出ることがあります。

```text
→ request model=deepseek-v4-flash effort=max messages=3
WARNING request failed upstream_status=402 stream=True
```

このログが出ている時点で、CursorからDeepSeekまでの通信自体は成功しています。モデル名もおおむね通っている状態です。**HTTP 402**（支払いに関するエラーを示すステータスコード。ここではDeepSeek側の残高不足を意味する）が原因のため、対処はシンプルです。

1. [DeepSeek Platform](https://platform.deepseek.com/)のBilling画面を開く
2. 少額をチャージする（$5〜$10程度が目安）
3. 反映後、Cursorで再送信する

![Provider ErrorのInsufficient Balance表示](cursor-provider-error-insufficient-balance.png)

料金は変動するため、次の数字はあくまで執筆時点の目安として見てください。**公開前に最新の料金を再確認する必要があります。**

| モデル | 入力（100万トークンあたりの目安） | 出力（100万トークンあたりの目安） |
| :--- | :--- | :--- |
| deepseek-v4-flash | 約$0.15 | 約$0.30 |
| deepseek-v4-pro | 約$0.87 | 約$2.18 |

### Provider Error（reasoning_content／HTTP 400）

プロキシを経由していない、あるいはプロキシが停止した状態でV4を叩いている可能性が高い状況です。Base URLがngrokの`/v1`になっているか、プロキシのプロセスが生きているかを確認してください。

### 接続できない／古いBase URLのまま

| 確認ポイント | 要点 |
| :--- | :--- |
| プロキシのターミナルは生きているか | 止まっていれば再起動し、新しい`api_base_url`を取る |
| Cursorの Override とログは一致しているか | 1文字でもホストが違うと届かない |
| 末尾は`/v1`になっているか | ホストだけ貼ってパスを忘れると失敗しやすい |
| 固定URL運用になっているか | `--ngrok-url`なしの無料トンネルは起動のたびに変わりうる |

「昨日動いたURL」を信じず、今日の起動ログを正として扱ってください。

---

## コストで選ぶ｜V4＋プロキシ運用とCursor標準枠の使い分け

最後に、コスト面の整理です。

| モデル | 利用条件 | メモ |
| :--- | :--- | :--- |
| deepseek-v4-flash／pro | 自己負担のAPIキー＋プロキシ | この記事の本命構成 |
| deepseek-v3.1などCursor標準枠 | Cursor Pro契約側 | 追加のAPI料金なしの整理。Chat寄りで、Agentには制約がありうる |

Cursor Proは「カスタムAPIを使える権利」に近く、DeepSeekの従量課金はそれとは別会計になります。**トークン**（AIが文章を処理する際の最小単位。API料金はこのトークン数に応じて課金される）の使用量が多いほど、V4＋プロキシ運用のコストは増えていきます。

選び方は、次の2つに集約されます。

1. **V4を使う**：チャージ・プロキシ・ngrokの手間を許容し、性能とコストのバランスを取りたいとき
2. **標準枠に戻す**：Override とカスタムキーを外し、Cursor標準モデルに戻す。追加課金を避けたいとき

Cursorの無料枠だけでどこまで進められるかは別のテーマになるため、この記事では扱いません。関連記事は準備中です。

---

## 公開前チェックリスト

- [ ] DeepSeek APIキーを保存した（チャットには出していない）
- [ ] ngrokのAuthtokenを登録済みで、`ngrok version`が要件以上になっている
- [ ] Windows Defenderなどでngrokの実行が止まっていない
- [ ] `uv tool install git+https://github.com/yxlao/deepseek-cursor-proxy.git`を実行済み
- [ ] 先に`deepseek-cursor-proxy`を起動し、ターミナルを開いたままにした
- [ ] 起動ログの`api_base_url`を控え、Cursorの Override に貼った（`local_base_url`ではない）
- [ ] 再起動後もターミナルの`api_base_url`とCursorのOverrideが一致している（または固定運用にしている）
- [ ] APIキーのトグルがONで、モデルが`deepseek-v4-flash`または`deepseek-v4-pro`になっている
- [ ] プロキシログにrequestが届いている
- [ ] 402が出た場合は、Platformでチャージしてから再確認した

---

## まとめ・次に読む

DeepSeek V4をCursorで使う際に押さえておきたいのは、次の3点です。

- V4はプロキシなしでは落ちやすい。原因はreasoning_contentの欠落
- Cursorに貼るBase URLは、プロキシ起動後の`api_base_url`
- 「Model name is not valid」はモデル名だけでなく、トグルOFFでも起きる

コストを抑えたい場合の使い分けは、上の「コストで選ぶ」章を参考にしてください。Cursorの無料枠に関する記事は、準備中です。モデル選び全般は[Cursorモデル選定ガイド](/blog/cursor-model-selection-guide)、無料枠の入口は[Cursor無料プランのレビュー](/blog/cursor-free)もあわせてどうぞ。

---

本記事の内容は執筆時点（2026-07-30）の情報に基づきます。モデル名・料金・Cursor のUI・ngrok の最低バージョン要件は変更される可能性があります。重要な判断は公式ドキュメントとダッシュボードで再確認してください。手順はWindows 11環境での実測（2026-07-27時点）を元にしています。また、本文中のプロキシ（`deepseek-cursor-proxy`）は第三者リポジトリに依存しています。
