---
title: "Claude CodeのMCP設定｜claude mcp addとスコープの進め方"
description: "Claude CodeでMCPをつなぐ人向けに、claude mcp addでの追加、local／project／userのスコープ選び、追加後の一覧確認とセッション内でのツール利用までを整理します。使い分け記事・Desktop向け手順との分担と、止まったときの次の確認先も分かります。"
date: 2026-09-14
tags:
  - MCP
  - Claude Code
  - claude mcp add
  - スコープ
  - 動作確認
  - mcp-series
site: toolarc.jp
target: "Claude CodeでMCPを設定するにあたり、CLIでの追加、スコープの選び方、追加後の確認範囲、使い分け記事・Desktop向け手順との役割分担で迷っている人。"
---

# Claude CodeのMCP設定｜claude mcp addとスコープの進め方

Claude CodeでMCPサーバーをつなごうとして、`claude mcp add`のオプションやスコープの選び方で止まった経験はないでしょうか。使い分け記事でDesktopとCodeの分岐は分かっても、CLIでの追加コマンド、local／project／userのどれを選ぶか、追加したあと何を確認すればよいかは、また別の話です。

本記事では、Claude Code向けに`claude mcp add`での接続先別の書き分け、スコープごとの保存先、秘密値の扱い、追加後の一覧・セッション・承認の確認手順、止まったときの切り分け先までをまとめます。Desktop側の操作手順やJSON構文の細部、横断的な初回セットアップの流れは、それぞれ別記事で扱います。

> **今日の結論**
>
> - Claude Codeでの追加はCLI（`claude mcp add`系）が中心です。接続先がリモートかローカルかで書き分けます。
> - スコープ（local／project／user）で保存先と共有範囲が変わり、既定はlocalです。
> - 秘密値は直書きせず、`--env`や`--header`、環境変数参照で渡します。Desktop設定の取り込みは手動コマンドが入口です。
> - 追加後は「一覧に出た（認識）」「セッション内で使えた（呼び出し）」「承認範囲が適切（承認）」を分けて確認します。
> - 止まったら症状に応じて隣記事（JSON／トランスポート／横断初回／Desktop／使い分け）へ切り分けます。

## 接続先に合わせてclaude mcp addを書き分ける

![Claude CodeでMCPを追加し、スコープ選択・一覧確認・セッション確認まで進む4ステップの概念図](/images/blog/mcp-claude-code-setup/h2-1.png)

Claude CodeでMCPサーバーを扱う中心の手順は、ターミナルで実行する`claude mcp add`です。[Claude Code公式のMCP接続リファレンス](https://code.claude.com/docs/en/mcp)と[Connect to MCP servers（quickstart）](https://code.claude.com/docs/en/mcp-quickstart)に沿い、会話の外で登録しておく進め方に合わせ、接続先ごとにオプションを書き分けます。

リモートサーバーはHTTP接続が基本です。

```bash
claude mcp add --transport http <サーバー名> <URL>
```

SSEのみに対応したサーバーの場合は`--transport sse`を明示します。選び方の比較は[MCPのstdioとSSE、選び方の比較](/blog/mcp-stdio-vs-sse-transport)にまとめています。

ローカルで動くツールはstdio接続です。`--transport`は省略でき、サーバーを起動するコマンドは`--`のあとに置きます。

```bash
claude mcp add [オプション] <サーバー名> -- <起動コマンド> [引数...]
```

環境変数が必要なときは`--env KEY=value`を指定します。`--env`のすぐあとにサーバー名を書くと、名前が値の一部として読まれてしまうため、他のオプションを1つ挟むと安全です。

本記事では、Claude Code側のCLI追加・スコープ・確認手順に絞って扱います。Desktop／Codeの分岐や最初の置き場探しは[Claude DesktopとClaude Codeの使い分けを整理した記事](/blog/claude-mcp-setup-basics)で確認してください。Desktop chatアプリ側の操作は[Claude DesktopのMCP設定](/blog/mcp-claude-desktop-setup)にまとまっているので、Desktop利用者はそちらへ進んでください。

## local／project／userで保存先を決める

スコープは、サーバーの保存先と共有範囲を決める設定です。

| スコープ | 保存先 | 共有範囲 |
|---|---|---|
| local（既定） | `~/.claude.json`（プロジェクト単位） | 自分のみ・今のプロジェクトのみ |
| project | プロジェクト直下の`.mcp.json` | チーム全員（バージョン管理経由） |
| user | `~/.claude.json`（トップレベル） | 自分のみ・全プロジェクト |

Windows環境では`~/.claude.json`は`%USERPROFILE%\.claude.json`に相当します。

スコープは追加時に固定されます。変更したいときは、`claude mcp remove`で一度外してから、目的のスコープで付け直します。同じ名前のサーバーを複数のスコープに置くと、接続先が食い違ったまま両方に残ってしまう場合があるため、避けたほうが無難です。

project用の`.mcp.json`に触れる場合は「どこに何が載るか」までを押さえれば十分です。キーの型や構文の細部は[mcp.jsonの書き方ガイド](/blog/mcp-config-json-guide)で扱っています。

## 秘密値とDesktop設定の取り込み入口を分ける

APIキーやトークンはコマンドに直書きせず、`--env`や`--header`で渡すか、`.mcp.json`側で`${VAR}`や`${VAR:-既定値}`のような環境変数参照にします。このプレースホルダ展開は製品固有の仕組みであり、暗号化ではありません。

他のクライアント向けに書かれた`mcpServers`のJSONがすでにある場合は、`claude mcp add-json`に中身のオブジェクトを渡す入口があります。キーの型や構文の直しが必要なら[mcp.jsonの書き方ガイド](/blog/mcp-config-json-guide)へ進んでください。

Claude Desktopチャットアプリの設定を取り込みたいときは、`claude mcp add-from-claude-desktop`が公式の取り込みコマンドです。筆者が公式ドキュメントで確認した範囲では、対応環境はmacOSとWSLに限られ、Windowsネイティブでの動作は記載がありません。取り込みは一度きりの手動操作であり、Desktop側に追加したサーバーがCode側に自動で反映されるわけではありません。Desktop側の設定画面やExtensionsの操作手順そのものは[Claude DesktopのMCP設定](/blog/mcp-claude-desktop-setup)にまとめています。

## 追加後に一覧・セッション・承認を分けて確認する

追加したあとは、次の順で確認すると切り分けやすくなります。

1. `claude mcp add`実行時に表示される`Added ...`は、設定がファイルに書き込まれたことの確認です。接続そのものが成功した証拠ではありません。
2. 認識の確認として`claude mcp list`を実行し、対象のサーバーが`✔ Connected`（端末によっては`√ Connected`）になっているかを見ます。`! Needs authentication`や`✘ Failed to connect`、`⏸ Pending approval`と表示された場合は、その名前を次の切り分けの手がかりにします。
3. 詳細を見たいときは`claude mcp get <サーバー名>`で、スコープや接続状況を個別に確認できます。
4. セッション内での呼び出し確認として`claude`を起動し、`/mcp`で状態を見たうえで、そのサーバーが必要になる依頼をしてみます。承認ダイアログが出たら内容を確認して許可し、Claudeの出力にサーバー名の付いたツール呼び出しが現れているかを見ます。会話が「できました」と返しただけでは、実際にツールが呼ばれたかどうかの判定にはなりません。
5. 承認の範囲確認として、許可したディレクトリやAPIキー、常時許可の対象が意図どおりかを見ます。必要以上に広い許可を出したままにしないことをおすすめします。

一覧に出るかどうかが**認識**、実行結果とClaudeの出力を照合するのが**呼び出し確認**、権限が意図どおりかが**承認確認**です。この3つを分けて見ておくと、あとで止まったときの切り分けが早くなります。横断的な初回セットアップの読み取り課題は[MCPの初回セットアップ](/blog/mcp-first-setup-guide)で扱っています。

## 止まったら隣記事へ切り分ける

症状ごとに、次の確認先へ進んでください。原因を一つに決めつけず、近いものから順に見ていくのがおすすめです。

| 症状 | 次に確認するもの |
|---|---|
| 一覧に出ない | 追加したプロジェクトと今いるディレクトリが違う、またはスコープがlocalのまま別プロジェクトを開いている可能性。場所の探し方は[Claude DesktopとClaude Codeの使い分けを整理した記事](/blog/claude-mcp-setup-basics) |
| 構文やキーで止まる | [mcp.jsonの書き方ガイド](/blog/mcp-config-json-guide) |
| ローカルかURLか迷う | [MCPのstdioとSSE、選び方の比較](/blog/mcp-stdio-vs-sse-transport) |
| 初回の準備から呼び出しまでの型がほしい | [MCPの初回セットアップ](/blog/mcp-first-setup-guide) |
| DesktopのGUIやExtensionsの操作が必要 | [Claude DesktopのMCP設定](/blog/mcp-claude-desktop-setup) |
| Cursorを使っている | [CursorのMCP設定](/blog/mcp-cursor-setup)（本記事ではCursor側の手順は扱いません） |
| Claude Code自体が未導入 | [Claude Codeのインストール](/blog/claude-code-install)または[Claude Codeの始め方](/blog/claude-code-getting-started) |

関連する手順をまとめて探したいときは[MCP設定ガイド](/blog/mcp-guide)から他の記事もたどれます。Desktop／Codeの分岐や最初の置き場探しに戻りたいときは、[Claude DesktopとClaude Codeの使い分けを整理した記事](/blog/claude-mcp-setup-basics)を見てください。

---

本記事の内容は執筆時点（2026-09-14）の情報に基づきます。公式ドキュメントを参照しており、掲載した手順の実機動作は未検証です。CLIのサブコマンド名やフラグ、スコープの既定値、ステータス表記はバージョンによって変更される可能性があります。接続の成功や安全性を保証するものではありません。重要な判断は公式ドキュメントで確認してください。
