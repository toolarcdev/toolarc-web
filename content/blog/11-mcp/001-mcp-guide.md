---
title: "Model Context Protocol（MCP）ガイド"
description: MCPを使い始めたい人向けに、使うAIアプリと接続先の決め方、Host・Client・Serverの違いを整理します。Cursor・Claude Desktop・Claude Codeの設定手順や初回の動作確認、接続できないときの調べ方を目的別に選べるよう、公開済みの記事をまとめました。
date: 2026-07-16
tags:
  - MCP
  - Model Context Protocol
  - Cursor
  - Claude
  - 開発
  - 初心者
site: toolarc.jp
target: "Cursor／Claudeでツール連携を触り始め、MCPの用語と読む順番を整理したい開発者"
last_update: 2026-11-13
---

# Model Context Protocol（MCP）ガイド

MCPは、AIアプリからファイルや外部サービスの機能を利用するための共通の仕組みです。まず「どのアプリから、何へ接続したいか」を決めると、必要な設定を絞れます。

> **今日の結論**
>
> - 設定する前に、使うアプリと接続先を1つずつ決めます。
> - AIアプリをHost、その内部でServerとの通信を担当する部分をClient、外部機能やデータを提供する接続先をServerと呼びます。
> - 導入が初めてなら準備と動作確認、アプリが決まっているなら対応する設定手順を選びます。
> - 接続設定の保存だけで完了とせず、利用する機能と与える権限を確認します。

## 目的に合う最初の手順を選ぶ

| いま知りたいこと | 確認する記事 |
|---|---|
| MCPが必要か、APIと何が違うか | [MCPとは何か](/blog/mcp-what-is-model-context-protocol) |
| 導入前に何を準備するか | [初回セットアップと動作確認](/blog/mcp-first-setup-guide) |
| Cursorから使いたい | [CursorのMCP設定](/blog/mcp-cursor-setup) |
| Claude Desktopから使いたい | [Claude DesktopのMCP設定](/blog/mcp-claude-desktop-setup) |
| Claude Codeから使いたい | [Claude CodeのMCP設定](/blog/mcp-claude-code-setup) |
| 接続したのに使えない | [接続エラーの切り分け](/blog/mcp-troubleshooting-connection-errors) |

## Host・Client・Serverの違い

| 用語 | 何を指すか |
|---|---|
| Host | MCPを利用するAIアプリ本体 |
| Client | Host内で、接続先のServerとの通信を担当する部分 |
| Server | AIアプリへツールやデータを提供する接続先 |

HostがServerごとにClientを作り、対応する接続を管理する構成は、[MCP公式の構成説明](https://modelcontextprotocol.io/docs/learn/architecture)で確認できます。使うアプリや接続先によって設定ファイル名・認証・接続方法が変わるため、具体的な入力値はそれぞれの手順で確認してください。

## 読む順番（ロードマップ）

目的別の関連記事を一覧にしています。必要な設定や作業に合う記事を選んでください。

| 順 | テーマ | 状態 |
| ---: | --- | :---: |
| #1 | [MCP（Model Context Protocol）とは｜APIやプラグインとの違いを一言で](/blog/mcp-what-is-model-context-protocol) | 公開 |
| #2 | [MCPの仕組み入門｜Host・Client・Serverの役割とメッセージの流れ](/blog/mcp-architecture-basics) | 公開 |
| #3 | [MCPの導入手順｜初回セットアップの準備から動作確認まで](/blog/mcp-first-setup-guide) | 公開 |
| #4 | [MCP設定ファイルの書き方｜mcp.jsonの構造とエラー修正](/blog/mcp-config-json-guide) | 公開 |
| #5 | [MCPのstdioとSSE｜トランスポートの違いと選び方](/blog/mcp-stdio-vs-sse-transport) | 公開 |
| #6 | [CursorのMCP設定｜mcp.jsonの置き場所と追加後の確認](/blog/mcp-cursor-setup) | 公開 |
| #7 | [Claude DesktopのMCP設定｜Extensionsと設定JSONの選び方](/blog/mcp-claude-desktop-setup) | 公開 |
| #8 | [Claude CodeのMCP設定｜claude mcp addとスコープの進め方](/blog/mcp-claude-code-setup) | 公開 |
| #9 | [VS CodeのMCP設定｜mcp.jsonの置き場所と追加後の確認](/blog/mcp-vscode-setup) | 公開 |
| #10 | [GitHub MCP Serverの設定｜公式接続の選び方と注意点](/blog/mcp-github-server-setup) | 公開 |
| #11 | [おすすめMCP Server一覧｜開発者が最初に試す選定枠](/blog/mcp-recommended-servers) | 公開 |
| #12 | [Filesystem MCPの使い方｜許可フォルダと読み取り確認](/blog/mcp-filesystem-setup) | 公開 |
| #13 | [Brave Search MCPの設定｜APIキーと検索確認](/blog/mcp-brave-search-setup) | 公開 |
| #14 | [PostgreSQL MCPの設定｜接続文字列と読み取り確認](/blog/mcp-postgres-setup) | 公開 |
| #15 | [MCP Serverの作り方入門｜最小のTool公開と確認](/blog/mcp-server-build-basics) | 公開 |
| #16 | [MCP Client SDK概要｜TypeScriptとPythonで始める](/blog/mcp-client-sdk-overview) | 公開 |
| #17 | [MCPの権限管理｜渡す範囲の最小化と追加後の見直し](/blog/mcp-security-permissions) | 公開 |
| #18 | [MCPのローカルとリモート運用｜どちらでつなぐかの判断](/blog/mcp-local-vs-remote) | 公開 |
| #19 | [MCP接続エラーの切り分け｜つながらないときの確認順](/blog/mcp-troubleshooting-connection-errors) | 公開 |
| #20 | [MCPデバッグとログの見方｜InspectorとClientログ](/blog/mcp-debugging-logs) | 公開 |
| #21 | [同じMCPをCursorとClaudeで使う｜つなぐ順番と戻し方](/blog/mcp-cursor-claude-workflow) | 公開 |
| #22 | [GitHub ActionsからMCPを使う｜進め方とSecrets](/blog/mcp-github-actions-setup) | 公開 |
| #23 | [Slack MCPをつなぐ｜App・スコープ・確認](/blog/mcp-slack-setup) | 公開 |
| #24 | [Playwright MCPをつなぐ｜追加・起動・確認](/blog/mcp-playwright-setup) | 公開 |
| #25 | [自作MCP Serverのデプロイ概要｜デプロイ先と確認](/blog/mcp-server-deploy-basics) | 公開 |
| #26 | [MCP公式動向・仕様更新の追い方｜確認先と順番](/blog/mcp-official-updates-follow) | 公開 |
| #27 | [MCPとREST API連携の違い｜どちらでつなぐかの判断](/blog/mcp-vs-rest-api-comparison) | 公開 |
| #28 | [CursorとClaudeのMCP比較｜設定の違いと進め方の判断](/blog/cursor-mcp-vs-claude-mcp) | 公開 |
| #29 | [主要MCP Server比較｜Filesystem／GitHub／Searchの選び方](/blog/mcp-major-servers-comparison) | 公開 |
| #30 | [MCP発見ツール比較｜公式レジストリとSmithery等の探し方](/blog/mcp-discovery-tools-comparison) | 公開 |

推奨の読み方は **#1 → #2 → #3 → #4 → #5 → #6 → #7 → #8** を土台に、必要なら **#9（VS Code）／#10（GitHub Server）／#11（選定一覧）／#12（Filesystem）／#13（Brave Search）／#14（PostgreSQL）／#15（自作Server）／#16（Client SDK）／#17（権限）／#18（ローカルとリモート運用）／#19（接続エラー）／#20（デバッグとログ）／#21（同じMCPを複数アプリでつなぐ順番）／#22（Actionsジョブの進め方とSecrets）／#23（Slack MCPのAppとスコープ）／#24（Playwright MCPの追加と起動確認）／#25（自作Serverのデプロイ先と確認）／#26（公式動向と仕様更新の追い方）／#27（REST連携の判断）／#28（CursorとClaudeの設定の違い）／#29（Filesystem／GitHub／Searchの用途の切り分け）／#30（公式レジストリと発見ツールの探し方）** へ分岐する想定です。#1〜#2で言葉を揃え、#3〜#4で共通の導入感を掴み、#5で接続方式を見分け、Client別（#6〜#9）と具体Server（#10・#12・#13・#14）・選定（#11）・自作（#15）・自前Client（#16）・権限の渡し方（#17）・手元起動とURLの運用（#18）・つながらないときの確認順（#19）・ログの見方（#20）・同じ Server を複数アプリでつなぐ順番（#21）・Actionsのジョブから使う順番（#22）・Slack公式MCPのつなぎ方（#23）・Playwright公式MCPのつなぎ方（#24）・自作Serverの公開URLの用意（#25）・公式の確認先と見る順番（#26）・REST直呼びとの判断（#27）・CursorとClaude Desktop／Codeの設定の違い（#28）・Filesystem／GitHub／Searchの用途の切り分け（#29）・公式レジストリと発見ツールの探し方（#30）へ進む、という段階に分けます。

## 関連する開発ガイドと権限の注意

隣の入口は次のとおりです。

| 役割 | リンク |
| --- | --- |
| Cursor開発の入口 | [Cursor無料版レビュー／開発シリーズHub](/blog/cursor-free) |
| Claude開発の入口 | [Claude Code ガイド（開発者向け入口）](/blog/claude-code-guide) |
| AIツールの比較 | [ChatGPT・Claude・Cursorの違いと使い分け](/blog/ai-tools-comparison) |

### 接続先へ渡す権限とトークンを確認する

MCPは便利な一方で、Serverに渡す権限やトークンの範囲が広いほど、意図しない操作や情報露出のリスクも増えやすい、と考えるのが安全です。

- 必要最小限の権限から試す
- 個人・機密トークンを、用途の分からないServerへ渡さない
- 設定をコピーする前に、出典と公式手順を確認する
- 不審なServerや、説明の薄い接続先は採用を急がない

渡す範囲の決め方と、追加後に登録・範囲・常時許可を分けて見直す順は、[MCPの権限管理](/blog/mcp-security-permissions)で扱っています。

接続先に与える権限やトークンは、各アプリ・Serverの公式ドキュメントと利用規約で確認してください。

## まとめ

まず使うアプリと接続先を決め、その組合せに対応する手順を確認します。設定後はツールの認識と実際の呼び出しを分けて確かめ、必要な権限だけを与えてください。

次の一歩:

- Cursorから触る感覚を先に掴みたい → [Cursorシリーズ入口](/blog/cursor-free)
- Claude開発側の入口が必要 → [Claude Code ガイド](/blog/claude-code-guide)
- 横断比較だけ先に見たい → [AIツール比較Hub](/blog/ai-tools-comparison)

一覧には公開済みの手順を載せています。使うアプリと作業内容に合うものから選んでください。


文章の整理と記録の運用を見直したい場合は、[ClaudeとObsidianの作業フロー](/blog/claude-obsidian-workflow)も参照できます。

---

MCPの基本構成と記事の案内を2026-11-13に確認して更新しました。MCPおよび各Client・Serverの仕様、画面、設定ファイル名、接続方式、料金は変更される可能性があります。接続やトークンの取り扱いは公式ドキュメントと利用規約で確認してください。接続先の安全性や実際の動作は、利用する環境で確認してください。
