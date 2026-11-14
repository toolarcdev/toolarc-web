---
title: "DeepSeek×Cursor連携ガイド｜モデル名とプロキシ設定の確認点"
description: CursorにDeepSeekを設定してモデル名や接続エラーで止まった人へ、現行のAPIモデル名deepseek-flashと旧名の違い、Base URLの確認方法を整理。Windowsでのプロキシ・ngrok導入実測を残し、reasoning_contentエラーの条件や現在は未検証の接続範囲も説明します。
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
last_update: 2026-11-14
---

# DeepSeek×Cursor連携ガイド｜モデル名とプロキシ設定の確認点

CursorにDeepSeekのAPIキーを入れたのに「Model name is not valid」と出る。接続できても、次のやり取りでreasoning_contentのエラーになる。どこを直せばよいか迷ったら、モデル名とエラー内容を分けて確認してください。

現在のFlash向けAPI名は`deepseek-flash`です。一方、以下のプロキシ導入手順と画面は7月のWindows 11・Cursor Proで確認したものです。現行モデル名の確認結果と当時の接続実測を分け、今の環境で試すときの注意点を説明します。

> **今日の結論**
> - Flashの新規設定は`deepseek-flash`を使います。旧名`deepseek-v4-flash`もAPIでは受理されますが、当時と同じモデルが動くわけではありません
> - thinkingモードで`tools`を送る場合、後続のリクエストにも`reasoning_content`が必要です。これを欠く400エラーには履歴を補うプロキシが対策の候補になります
> - 7月の実測ではプロキシ＋ngrokを使いました。現在のCursorでの直結可否と新モデルの実応答は再検証していません
> - このプロキシ構成では、起動ログの`api_base_url`をCursorへ反映します。APIキーのトグルと残高も確認してください
> - Cursorの契約とDeepSeek APIの課金は分けて確認します。最新料金はDeepSeekの公式表を参照してください

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

## Cursor側の基本設定｜現行モデル名と7月の接続設定

次はCursor側です。設定画面は次の手順で開きます。

1. 設定を開く（`Ctrl + ,`）
2. 左メニューの**Models**を選ぶ
3. 次の3項目を設定する

DeepSeek APIの公式送信先は`https://api.deepseek.com`です。OpenAI互換APIの提供は、Cursorからの直結成功まで保証するものではありません。以下は、現在のAPI指定と7月に動作を確認したプロキシ構成の違いです。

| 項目 | DeepSeek公式APIの指定 | 7月に確認したプロキシ構成 |
| :--- | :--- | :--- |
| APIキー | DeepSeek側で発行したキー | 同じキーをCursorに設定し、トグルをON |
| Base URL | `https://api.deepseek.com`（`/v1`付きも利用可） | 起動ログの`api_base_url` |
| モデル名 | Flashは`deepseek-flash`、Proは`deepseek-v4-pro` | 当時は`deepseek-v4-flash`または`deepseek-v4-pro` |

新しくFlashを指定する場合は`deepseek-flash`を使ってください。ただし、この名前を現在のCursorと第三者プロキシで使った実応答は未検証です。後述の画像やログにある旧名は、当時の記録として残しています。

**Base URL**はAPIの送信先です。このプロキシを使う構成では、プロキシ起動後に表示されるURLをCursorの **Override OpenAI Base URL** に設定します。

注意したいのは**トグル**（設定のON/OFFを切り替えるスイッチ状のUI部品）です。キー欄に値が入っていても、トグルがOFFのままだと送信されません。「Secret saved」という表示が出ても、それだけでは有効になっていない場合があります。

![CursorのModels画面でOpenAI API KeyとOverride Base URLを設定しているところ](cursor-openai-key-override-baseurl.png)

![Cursorのadd custom model画面でdeepseek-v4-flashを追加しているところ](cursor-add-custom-model.png)

カスタムAPIの一時切り替えは、Windowsなら`Ctrl + Shift + 0`、macOSなら`Cmd + Shift + 0`。

### 現行名と旧名の違い

[DeepSeekのモデル・料金表](https://api-docs.deepseek.com/quick_start/pricing/)では、次のように案内されています。

| APIに指定する名前 | 現在の扱い |
| :--- | :--- |
| `deepseek-flash` | Flashの推奨名。実体はDeepSeek-V4.1-Flash-1017 |
| `deepseek-v4-flash` / `deepseek-v4-flash-vision-exp` | 受理される旧名。旧モデル自体は退役し、上と同じ現行Flashで処理・課金 |
| `deepseek-v4-pro` | Proの指定名。実体はDeepSeek-V4-Pro-0813 |

`deepseek-chat`や`deepseek-reasoner`、`deepseek-v3.1`は、今回の現行設定例には使いません。古い名称を見かけても、それだけで現在の対応状況やCursor標準枠の提供を判断しないでください。

---

## reasoning_contentエラーが出る条件とプロキシの役割

thinkingモードは、回答を出す前に推論を行う動作です。DeepSeekの[thinkingモードの仕様](https://api-docs.deepseek.com/guides/thinking_mode/)では、`tools`を含むリクエストには過去ターンの`reasoning_content`も戻す必要があり、不足すると400エラーになります。`tools`を送らない会話では、このデータの返却は不要です。

したがって、すべての会話でプロキシが必須とは言えません。[第三者プロキシのREADME](https://github.com/yxlao/deepseek-cursor-proxy)はCursorがこの履歴を省く問題への対策を説明していますが、現在のCursorの全バージョンで同じ問題が起きるかは再現確認していません。

**プロキシ**（クライアントとサーバの間に立ち、やり取りを中継・加工する仕組み）の役目は、次の3つです。

- 上流の応答から`reasoning_content`をローカルに保持する
- Cursorから来た履歴に、不足分を再注入する
- この構成ではngrokで公開HTTPSを用意する。第三者READMEはCursorが非公開API URLを受け付けないと説明していますが、現在の実機での再確認はしていません

経路を図にすると、次のようになります。

![Cursorからngrok・プロキシを経由してDeepSeek APIへ至る経路図](Cursor-DeepSeekV4.png)

初回起動時には、`~/.deepseek-cursor-proxy/config.yaml`と`~/.deepseek-cursor-proxy/reasoning_content.sqlite3`という2つのファイルが自動で作られます。前者は設定、後者はreasoning_contentの保持用です。中身を直接編集する必要は、通常はありません。

---

## Windowsで導入する5ステップ｜ngrok→プロキシ起動→Base URL反映

以下は7月に動作を確認した構成の導入手順です。現在のCursor UI、Flashモデル、第三者パッケージを組み合わせた再接続テストは行っていません。筆者が実装時に確認した範囲では、2026年7月27日時点でWindows 11・Cursor Pro・uv 0.11.15・ngrok 3.39.10の組み合わせで動作しました。バージョンが変わると挙動が変わる可能性はあります。

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

7月の起動ログ例は次の3行です。既定モデルや表示形式はバージョンによって変わり得るため、実際のログを確認してください。

```text
default_model: deepseek-v4-pro (thinking, max)
local_base_url: http://127.0.0.1:9000/v1
api_base_url: https://xxxx.ngrok-free.dev/v1
```

![プロキシ起動直後のターミナルでapi_base_urlが表示されている画面](apiBaseUrl.png)

この公開HTTPS経由の構成では、Cursorに使うのは`api_base_url`です。`local_base_url`はPC内のプロキシ入口で、当時の実測ではCursorの送信先に使っていません。

| 項目 | Cursorに使うか |
| :--- | :--- |
| OpenAI API Key | DeepSeekの`sk-`（トグルON） |
| Override OpenAI Base URL | 起動ログの`api_base_url` |
| Model | 現行APIでは`deepseek-flash`または`deepseek-v4-pro`（現在のCursor経由の実応答は未検証） |

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
| 指定名と提供状況が合っていない | Flashは現行の`deepseek-flash`を確認。`deepseek-v4-flash`はAPIで受理される旧名のため、旧名だけを原因と断定しない |
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

7月の料金目安は現在の見積もりには使えません。Flashには入力キャッシュ、出力、時間帯による単価差があります。最新の単価と課金条件は[DeepSeek公式料金表](https://api-docs.deepseek.com/quick_start/pricing/)で確認してください。

### Provider Error（reasoning_content／HTTP 400）

まずエラー本文に`reasoning_content`の不足があるか確認します。thinkingモードで`tools`を送る際の履歴不足なら、プロキシによる補完が対策の候補です。この構成を使っている場合は、Base URLが起動ログの`api_base_url`と一致し、プロキシが動いているかを確認してください。400という番号だけで原因を決めないでください。

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
| DeepSeekのカスタムAPI | DeepSeek側のAPI契約・残高 | Cursor経由での対応状況も確認。7月はプロキシ経由で実測 |
| Cursor標準モデル | 現在のCursor契約・利用枠 | モデル一覧と利用枠を確認。旧`deepseek-v3.1`が現在も選べるとは限らない |

[CursorのAPIキー案内](https://cursor.com/help/models-and-usage/api-keys)では、個人プランの持込キーによるモデル料金はプロバイダーから請求されると説明されています。チーム向けの料金条件は別です。Cursor Proを単に「カスタムAPIを使える権利」と捉えず、Cursor側の契約内容とDeepSeek API料金をそれぞれ確認してください。

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
- [ ] APIキーのトグルがONで、APIモデル名を現行資料と照合した（Flashは`deepseek-flash`。現在のCursor経由の実応答は別途確認）
- [ ] プロキシログにrequestが届いている
- [ ] 402が出た場合は、Platformでチャージしてから再確認した

---

## まとめ・次に読む

DeepSeek V4をCursorで使う際に押さえておきたいのは、次の3点です。

- 現行FlashのAPI名は`deepseek-flash`。旧名で動いても当時と同じモデルとは限りません
- thinking＋toolsの履歴不足にはプロキシが対策の候補ですが、現在のCursorでの直結可否は未検証です
- Cursorに貼るBase URLは、プロキシ起動後の`api_base_url`
- 「Model name is not valid」はモデル名だけでなく、トグルOFFでも起きる

コストを抑えたい場合の使い分けは、上の「コストで選ぶ」章を参考にしてください。Cursorの無料枠に関する記事は、準備中です。モデル選び全般は[Cursorモデル選定ガイド](/blog/cursor-model-selection-guide)、標準モデルのKimi K3は[CursorでKimi K3を使う方法](/blog/kimi-k3-cursor-guide)、無料枠の入口は[Cursor無料プランのレビュー](/blog/cursor-free)もあわせてどうぞ。

---

モデル名とAPI仕様は2026-11-14に公式資料を照合しました。現在のCursorでの直結・プロキシ経由の実応答は再検証していません。モデル名・料金・Cursor のUI・ngrok の最低バージョン要件は変更される可能性があります。重要な判断は公式ドキュメントとダッシュボードで再確認してください。手順はWindows 11環境での実測（2026-07-27時点）を元にしています。また、本文中のプロキシ（`deepseek-cursor-proxy`）は第三者リポジトリに依存しています。
