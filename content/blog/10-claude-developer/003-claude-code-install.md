---
title: "Claude Codeのインストール｜OS別手順・認証・初回起動まで"
description: "Claude CodeのインストールをmacOS・Windows・Linux別に整理し、認証設定から初回起動の確認、代表的なエラーの対処までを執筆時点の公式手順に沿って解説します。コマンドが見つからない・認証で止まるときの見直しポイントも表にまとめました。"
date: 2026-08-25
tags:
  - Claude
  - Claude Code
  - CLI
  - インストール
  - 初期設定
  - 初心者
  - AIコーディング
  - claude-developer-series
site: toolarc.jp
target: "Claude Code を自分の OS にインストールしたいが、手順の分岐・認証・初回のエラーで止まっている初心者〜中級の個人開発者"
last_update: 2026-08-25
---

# Claude Codeのインストール｜OS別手順・認証・初回起動まで

Claude Codeを入れようとして検索すると、Cursorの記事や古いコマンド、英語のDocsが入り混じった結果が並びます。どれが今の正解か分からないまま、コピーしたコマンドを打っても`claude`が動かない、という段階で手が止まった人は少なくないはずです。

本記事は、macOS・Windows・Linuxそれぞれのインストール手順から、認証、初回起動の確認、そして止まりやすい箇所の対処までを1本で通して扱います。番号どおりに進めれば、導入はひととおり終わります。

まだ「誰向けか」で迷っている場合は、先に[Claude Codeの始め方](/blog/claude-code-getting-started)で確認してください。

> **今日の結論**
> - インストールは「入れる→認証する→1回起動して確認する」の3段で完了する
> - インストール経路はOSで分岐する。コマンドは変わりやすいため、本記事は執筆時点（2026-08-25）の公式手順に沿って書く
> - 認証はアカウント連携で進める。APIキー・トークンの実値を手で書き写す運用はしない
> - 止まったらPATH・認証・権限の3系統で切り分ける
> - 「誰向けか」の判断は別記事、コマンド一覧は[基本コマンド一覧](/blog/claude-code-commands)に譲る。本記事は初回起動の確認までを扱う

## OS別インストール手順（macOS・Windows・Linux）

![macOS・Windows・Linuxでインストール手順が分かれることを示す3アイコン図](/images/blog/claude-code-install/h2-1.png)

執筆時点（2026-08-25）にAnthropic公式ドキュメントが案内している経路を、OSごとに1つずつ示します。経路が複数ある場合は、公式が推奨する方法を本文に置き、代替は1行だけ添えます。

### macOS

ネイティブインストーラを使う方法が公式の推奨です。ターミナルを開き、次のコマンドを実行します。

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

Homebrewを使っている場合は、`brew install --cask claude-code`でも導入できます。ただし、Homebrew経由のインストールはClaude Code自身の自動更新機能ではなくHomebrewの更新の仕組みに乗るため、放置すると古いバージョンのまま使い続けることになります。最新版に上げたいときは`brew upgrade claude-code`を自分で実行してください。

### Windows

PowerShellを開き、次のコマンドを実行します。管理者権限は不要です。

```powershell
irm https://claude.ai/install.ps1 | iex
```

CMDを使っている場合、`irm`は認識されません。CMD側では次のコマンドを使ってください。

```batch
curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd
```

WinGetが使える環境なら、`winget install Anthropic.ClaudeCode`も選べます。Git for Windowsの導入は任意です。入れておくとBashツールが使えるようになりますが、なくてもPowerShellツール経由で動作します。プロジェクトがWSL（Windows上でLinux環境を動かす仕組み）上にある場合は、WSL側のターミナルを開き、次のLinuxと同じコマンドを実行してください。PowerShellやCMDからではなく、WSLのターミナル内で実行する点に注意してください。

### Linux

macOSと同じネイティブインストーラのコマンドで導入できます。

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

Debian・Ubuntuではapt、Fedora・RHELではdnf、Alpineではapkの各パッケージマネージャからも導入できます。署名付きリポジトリを使う細かい手順は、公式ドキュメントの「Install with Linux package managers」の項を参照してください。

手順の詳細や更新は、公式のセットアップページ（https://code.claude.com/docs/en/setup）で確認できます。

インストール後は、どのOSでも次のコマンドでバージョンが表示されるか確認します。

```bash
claude --version
```

`2.1.211 (Claude Code)`のようにバージョン番号が表示されれば、その時点で導入は完了です。表示されない場合は、後述の「代表的なエラーと対処」を確認してください。

## 認証と初期設定（アカウント連携で進める）

インストール後、ターミナルで`claude`と入力すると、初回はブラウザが自動的に開き、ログイン画面が表示されます。

Claude Codeを使うには、Pro・Max・Team・Enterpriseのいずれかのアカウント、またはConsoleのAPIキーが必要です。2026-08-25時点では、無料のClaude.aiプランにはClaude Codeが含まれません。手順は次のとおりです。

1. `claude`を実行する
2. ブラウザが開いたら、対象のアカウントでログインする
3. ターミナルに「Login successful」と表示されたら、Enterキーで続行する

ブラウザが自動で開かない場合は、ターミナルで`c`キーを押すとログインURLがクリップボードにコピーされます。それをブラウザに貼り付けてください。

WSL・SSH接続・コンテナ内で作業している場合、ブラウザでログインした後にターミナルへ戻れず、認証コードだけが画面に表示されることがあります。ブラウザからClaude Codeのローカルの待受先に接続が届かないことが原因です。表示されたコードをターミナルの「Paste code here if prompted」に貼り付ければ、認証は完了します。

環境変数`ANTHROPIC_API_KEY`を設定している場合は、ブラウザでのログインの代わりに、そのキーを承認するかどうかの確認だけが表示されます。環境変数名までは本記事でも触れますが、キーの実値は扱いません。取得・管理は公式ドキュメントの案内に沿って進めてください。

筆者が2026-08-25時点で公式ドキュメント（https://code.claude.com/docs/en/authentication）を確認した範囲では、認証まわりの画面名・フローは以上のとおりです。改名や仕様変更の可能性があるため、最新は公式で確認してください。

## インストール後の動作確認（初回起動まで）

認証が終わったら、実際に1回動かして確認します。

1. 作業したいプロジェクトのフォルダに移動する
2. `claude`と入力してセッションを開始する
3. 「このフォルダの中身を要約して」など、短い依頼を1つ送る
4. 応答が返ってくることを確認する
5. `/exit`または`Ctrl+C`でセッションを終了する

ここまで通れば、導入は完了したと判断できます。起動時のチェックとして、次の4点を確認しておくと安心です。

- `claude --version`でバージョンが表示される
- `claude`起動時にログイン済みの状態が確認できる
- 短い依頼に対して応答が返ってくる
- `/exit`などで問題なく終了できる

より詳しい診断がほしい場合は、`claude doctor`を実行してください。セッションは開始せず、インストール状態や設定ファイルの読み込み結果を、読み取り専用で表示してくれます。

## 代表的なエラーと対処（PATH・認証・権限で切り分け）

動かない場合は、まずどこで止まっているかを切り分けます。止まりやすい場所は、PATH・認証・権限の3系統。切り分けられれば、対処自体はそれほど難しくありません。

| 症状 | 原因系統 | 対処の方向 |
|---|---|---|
| `command not found: claude`／`'claude' is not recognized` | PATH | インストール先（macOS・Linuxは`~/.local/bin`、Windowsは`%USERPROFILE%\.local\bin`）がPATHに登録されていない。追加後、ターミナルを開き直す |
| ブラウザでログインしても認証が進まない | 認証 | WSL・SSH・コンテナではブラウザの戻り先が届かないことがある。表示されたコードを貼り付けるか、`c`でURLをコピーして手動で開く |
| `OAuth error: Invalid code` | 認証 | ログインコードの期限切れやコピーミスが原因。ブラウザが開いたらすぐログインし直す |
| インストール時に書き込み権限のエラーが出る | 権限 | `~/.local/bin`・`~/.claude`の書き込み権限を確認し、必要なら所有者を自分のユーザーに変更する |
| Windowsで「Claude Code on Windows requires either Git for Windows (for bash) or PowerShell」と出る | OS固有（Windows） | PowerShellがPATHに見当たらないか、Git for Windowsが未導入。どちらか一方を用意する |
| macOSでHomebrew導入後もバージョンが古いまま | OS固有（macOS） | Homebrew版は自動更新されない仕組みのため、`brew upgrade claude-code`で手動更新する |

シェルはPATHに登録されたフォルダの中しかコマンドを探せません。インストール先がPATHに含まれていないと、実行ファイル自体は存在していても「見つからない」というエラーになります。これがPATH系エラーの起きる仕組みです。

上記で解決しない場合は、`claude doctor`の出力を確認するか、公式ドキュメントの「Troubleshoot installation and login」（https://code.claude.com/docs/en/troubleshoot-install）で症状を検索する方法もあります。

## 次に読む（地図はHubへ・コマンド表は一覧記事へ）

本記事で扱わなかった範囲は、それぞれ別記事に譲ります。

- 「自分に合っているか」の判断や最初の1セッションは[Claude Codeの始め方](/blog/claude-code-getting-started)で扱っています
- コマンド一覧は[Claude Codeの基本コマンド一覧](/blog/claude-code-commands)にまとめています
- ターミナルの見た目はCursorのCLIと似ていますが、別製品です。Cursor側の導入は[Cursor CLIのインストールと基本操作](/blog/cursor-cli-install-basics)を参照してください
- Cursorから来た人向けに、無料枠の実測は[Cursor無料版の実測レビュー](/blog/cursor-free)にまとめています

シリーズ全体の地図は[Claude Codeガイド](/blog/claude-code-guide)にまとめています。次に何を読むか迷ったら、まずそちらを確認してください。

---

本記事の内容は執筆時点（2026-08-25）の情報に基づきます。Claude Codeのインストール手順・コマンド・料金・仕様は変更される可能性があります。重要な判断は公式ドキュメントで確認してください。
