---
title: "MCPデバッグとログの見方｜InspectorとClientログ"
description: "MCPのデバッグでは、InspectorでServer単体を試し、stdioならstderrのログ、Client側のログと接続状態を順に見ます。Claude Desktopのログパスは公式の一例です。接続の切り分け順や製品画面の詳しい操作、権限の監査手順は扱いません。"
date: 2026-09-22
tags:
  - MCP
  - デバッグ
  - ログ
site: toolarc.jp
target: "MCP の不具合を調べるときに、Inspector・Server ログ・Client ログのどこから見るかを知りたい人。"
---

# MCPデバッグとログの見方｜InspectorとClientログ

MCPサーバーが動かない、Clientから反応がない。そこまでは分かっても、次にどこを見ればいいのか迷う場面は多いはずです。ログはどこに出ているのか、Inspectorは何のためのツールなのか、手元の画面と公式ドキュメントの説明がうまく繋がらないこともあります。

この記事では、Inspector・Serverのログ・Clientのログや接続表示を、どの順番で見ていくかという道具の使い方を整理します。stdio（標準入出力）とStreamable HTTPでログの置き方が変わる点や、Claude Desktopを例にしたログの探し方も扱います。

接続そのものが確立しない場合の切り分け手順は[接続エラーの切り分け](/blog/mcp-troubleshooting-connection-errors)で扱います。各製品の画面操作の細かい手順や、権限まわりの監査手順は、この記事では扱いません。接続をまだ一度も通していないときの手順は[初回セットアップ](/blog/mcp-first-setup-guide)、設定ファイルの書き方は[JSON設定](/blog/mcp-config-json-guide)で確認できます。

> **今日の結論**
> - まずInspectorでServer単体の動きを確認してから、Server側のログ（stdioならstderr）とClient側のログ・接続表示を順番に見ます。
> - stdioでは標準出力（stdout）にログを混ぜません。Streamable HTTPではstderrがそのままClientに届かないため、ログの集約やHTTP側のツールで様子を見ます。
> - Claude Desktopのログの置き場所は公式が示す一例です。他のClientは各製品の設定記事や公式ドキュメントで確認します。
> - 接続そのものが確立しない場合の切り分けは、この記事では扱いません。[公式のDebuggingガイド](https://modelcontextprotocol.io/docs/tools/debugging)にある、よくある問題（Common issues）を参照してください。認証情報はログに残しません。
> - ログをたどれば必ず原因が分かる、とは言い切れません。最終的な判断は公式ドキュメントと画面で確認してください。

![Inspector、Serverのログ、Clientのログの順に見て、各段で分かることと分からないことを分ける3段階の概念図](/images/blog/mcp-debugging-logs/h2-1.png)

## デバッグで使う道具の見取り図

MCPの公式ドキュメントは、デバッグの手がかりを3つの層に分けて説明しています。Inspector、Serverのログ、Client側のログや接続表示です。この記事は2026年9月22日時点で確認した公式ドキュメントの内容をもとに整理しています。この順番で見ていくと、どこまでは正常でどこから怪しいかを絞り込みやすくなります。

| 道具 | 分かること | 分からないこと |
|------|-----------|----------------|
| Inspector | Server単体の応答・ツール一覧 | Client固有の設定ミス |
| Serverのログ | サーバー内部の処理状況 | Client側の受信状況 |
| Clientのログ・接続表示 | 接続の成立・失敗、Client側のエラー | サーバー内部の詳細な処理 |

Inspectorは、ServerをClientに組み込む前に単体で動かして確認できるツールです。ツール一覧が正しく返ってくるか、呼び出しに応答するかをここでまず確かめます。

Serverのログは、サーバー内部の処理がどこまで進んでいるかを教えてくれます。stdioかStreamable HTTPかで出力先の扱いが変わるため、詳しくは次の見出しで扱います。

Clientのログや接続表示は、接続が成立しているか、Client側でエラーが出ていないかを教えてくれます。ここまで見ても接続そのものが確立しない場合の横断的な切り分け手順は、この記事では扱いません。[公式のDebuggingガイド](https://modelcontextprotocol.io/docs/tools/debugging)のよくある問題（Common issues）も合わせて確認してください。

## Serverログの置き方（stderrとstdout）

stdio接続では、標準エラー出力（stderr）に書いたログを、ホスト側のアプリケーションが自動的に拾います。ここに処理の状況を出しておくと、あとから追いやすくなります。

一方で、標準出力（stdout）にログを書くのは避けてください。stdioはこの標準出力そのものをプロトコルのやり取りに使っているため、ログが混ざると通信が壊れます。

Streamable HTTPを使うServerでは、stderrはそのままClientに届きません。自前のログ集約やOpenTelemetry、あるいはcurlやブラウザのDevToolsのNetworkパネルといったHTTP側のツールで、リクエストやセッションID、SSE（サーバー送信イベント）のストリームを確認します。

プロトコル越しにログ通知を送るnotifications/messageという仕組みもありますが、2026-07-28以降のプロトコルバージョンで非推奨の注記が付いています。廃止までの猶予期間中は動作するものの、これから新しく組む手順の主軸には据えない方が無難です。

認証情報やトークンをログにそのまま出すことは避けてください。マスクするか、出力対象から外しておきます。

## Inspectorで Server単体を試す

公式の[MCP Inspector](https://modelcontextprotocol.io/docs/tools/inspector)のドキュメントは、Inspectorをデバッグの最初の一手として案内しています。1つのパッケージにWeb・CLI・TUIの3つの使い方がまとまっている、というのが特徴です。同じ接続情報や設定ファイルを、どの形式でも使い回せます。

実行にはNode 22.19.0以降が必要です。インストールは不要で、`npx @modelcontextprotocol/inspector` を実行するとすぐに起動します。表示されるURLには一度きりのセッショントークンが含まれているため、そのままブラウザで開いてください。

サーバーを起動するコマンドの渡し方や、リモートServerを指定する`--server-url`などの細かいオプションは、Serverごとに必要な引数が異なります。まずはそのServer自身のREADMEと、公式の[Configuration and flags](https://modelcontextprotocol.io/docs/tools/inspector)を確認するのが確実です。

ClientにつなぐServerとして登録する前の、単体確認の場。ここで応答やツールの一覧を確かめておくと、あとでClient側の設定ミスなのかServer側の不具合なのかを切り分けやすくなります。

## Clientログと接続状態の見方（公式例）

Client側の開発者向け機能は製品ごとに異なりますが、公式ドキュメントはClaude Desktopを一例として挙げています。

Claude Desktopでは、チャット入力欄にある「ファイル・コネクタなどを追加」のアイコンから、接続済みのServerや使えるツールの一覧を確認できます。ログファイルはmacOSなら`~/Library/Logs/Claude`、Windowsなら`%APPDATA%\Claude\logs`に置かれます。これは公式ドキュメントが示す一例です。`tail -n 20 -F ~/Library/Logs/Claude/mcp*.log`のようにして追いかけると、直近のやり取りを見られます。

設定ファイルを書き換えたあとは、Clientの再起動が必要になることがあります。ウィンドウを閉じるだけでなく、アプリを完全に終了してから起動し直すと確実です。

Cursor、Claude Code、VS Codeなど、他のClientを使っている場合はログの置き場所や再起動の作法が異なります。それぞれの設定記事を確認してください。

- [Cursorでの設定](/blog/mcp-cursor-setup)
- [Claude Desktopでの設定](/blog/mcp-claude-desktop-setup)
- [Claude Codeでの設定](/blog/mcp-claude-code-setup)
- [VS Codeでの設定](/blog/mcp-vscode-setup)

## 開発サイクルと次に進む先

公式ドキュメントが示す流れは、Inspectorで試す、Clientに繋いで動きを見る、ログを追う、変更したらClientを再起動する、という反復です。この輪をひとまわりするごとに、怪しい箇所が少しずつ絞れていきます。

接続そのものが確立しない場合の横断的な切り分けが主な悩みなら、この記事では扱いません。[公式のDebuggingガイド](https://modelcontextprotocol.io/docs/tools/debugging)のよくある問題（Common issues）を確認してください。

ログに認証情報を残さない、という点をもう一歩進めたい場合や、ローカルとリモートのどちらでServerを運用するか迷っている場合は、それぞれ別の記事で扱っています。

- [MCPの権限まわり](/blog/mcp-security-permissions)
- [ローカルとリモートの使い分け](/blog/mcp-local-vs-remote)
- [Serverを自作するときの最小構成](/blog/mcp-server-build-basics)

## まとめ・次に読む

道具の順番はInspector、Serverのログ、Clientのログや接続表示です。stdioではstderrに出し、stdoutは避けます。Streamable HTTPではログの集約やHTTP側のツールに頼ります。Claude Desktopのログの置き場所は公式が示す一例で、他のClientはそれぞれの設定記事で確認してください。

MCP全体の記事一覧は、こちらのハブ記事にまとめています。

- [MCPの記事一覧](/blog/mcp-guide)

---

本記事の内容は執筆時点（2026-09-22）の情報に基づきます。公式ドキュメントを参照していますが、掲載した手順の実機での動作は検証していません。ログからの原因特定や設定の適否を保証するものではなく、Client・Server・OSによって画面表示やログの場所、キー名、対応状況は異なります。重要な判断は公式ドキュメントで確認してください。
