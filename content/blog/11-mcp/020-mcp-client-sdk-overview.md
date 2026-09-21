---
title: "MCP Client SDK概要｜TypeScriptとPythonで始める"
description: "既存のMCP Serverをアプリから呼び出すClientを、公式SDKで作りたい人向けです。TypeScriptとPythonの概要、接続の流れ、一覧取得と1回の呼び出しまでを整理します。製品Clientの設定やServer自作の詳細手順は扱いません。"
date: 2026-09-22
tags:
  - MCP
  - MCP Client
  - SDK
  - TypeScript
  - Python
  - mcp-series
site: toolarc.jp
target: "既存の MCP Server を、Cursor 等の製品設定ではなく自前アプリから公式 Client SDK（TypeScript／Python）でつなぎ、Tool の一覧と1呼び出しまで行きたい開発者。"
---

# MCP Client SDK概要｜TypeScriptとPythonで始める

既存のMCP Serverはある。CursorやClaude Desktopに足すのではなく、自分のアプリからToolを一覧し、1回呼び出したい。そのとき検索結果には、Serverの自作手順、製品アプリの設定画面、公式のチャットボット例が同じキーワードで並びやすく、「何を最初に実装し、どこまで見れば動いたか」が切れにくいです。

本記事では、公式の[Build an MCP client](https://modelcontextprotocol.io/docs/develop/build-client)と[SDKs](https://modelcontextprotocol.io/docs/sdk)に沿い、**自前Client**（自分のアプリ側の接続プログラム）を公式SDKで書くときの手順を整理します。手順の骨格はTypeScript中心です。Pythonは対応関係の短表と公式節への案内までにとどめます。

製品アプリの設定場所の探し方や、Server側の`registerTool`の実装手順は扱いません。

> **今日の結論**
> - 自前Clientは公式SDKの`Client`と接続の運び方（transport）が中心です。手順の骨格はTypeScript（`@modelcontextprotocol/client`＋`StdioClientTransport`）です。
> - 最初に揃えるのは「Serverに接続できる」「Tool一覧が取れる」「1回呼べる」の3つです。LLMチャットボットの全文ループは必須にしません。
> - Cursor／Claudeなど既存アプリへの足し方は、製品ごとの設定記事側です。この記事の対象ではありません。
> - Pythonにも接続・一覧・1呼び出しに対応するAPIがあり、詳細手順は公式のBuild-clientのPython節へ送ります。
> - Server自作・運び方の比較・権限の監査は、この記事では扱いません。必要になったときは各手順の記事や公式ドキュメントを参照してください。

## 自前Clientと製品Clientの違い、公式SDKの選び方

**自前か製品か**を先に分けると、読むドキュメントがぶれません。

| 呼び方 | 何をするか | 触るもの |
|--------|------------|----------|
| 自前Client | 自分のアプリからMCP Serverへ接続する | 公式Client SDKの`Client`とtransport |
| 製品Client | Cursor／Claude Desktop／Claude Code／VS Codeなど既存アプリにServerを足す | 各アプリの設定画面や設定ファイル |

この記事が扱うのは上段だけです。製品アプリの設定キーや画面の操作は、[Cursor](/blog/mcp-cursor-setup)／[Claude Desktop](/blog/mcp-claude-desktop-setup)／[Claude Code](/blog/mcp-claude-code-setup)／[VS Code](/blog/mcp-vscode-setup)に任せます。

公式の[SDKs](https://modelcontextprotocol.io/docs/sdk)では、TypeScriptとPythonがいずれもTier 1として案内されています。本記事はこの2言語に限定します。C#やGoなど他言語の手順は扱いません。

Host／Client／Serverの役割そのものを一から説明する必要が出たら、[MCPの仕組み](/blog/mcp-architecture-basics)を参照してください。ここでは「自前ClientはServerに接続する側」という線引きだけで進めます。

## TypeScriptで接続する最小の流れ

公式のTypeScript節では、執筆時点で確認した内容ではNode.js 20以上とnpmを前提にしています。パッケージは`@modelcontextprotocol/client`です。インストール例は次のとおりです（チャットボット連携用のAnthropic SDKは、接続・一覧・1呼び出しの確認には不要です）

```bash
npm init -y
npm install @modelcontextprotocol/client
npm install -D @types/node typescript
```

`package.json`には`"type": "module"`を指定します。`tsconfig.json`の細部は公式Build-clientのTypeScript節に合わせてください。

接続の中心は次の2つです。

- **`Client`**: Serverと話し、Toolの一覧取得や呼び出しを行うオブジェクト
- **`StdioClientTransport`**: ローカルでServerプロセスを起動し、標準入出力でつなぐ接続の運び方

公式チュートリアルでは、Serverスクリプトのパスを引数に取り、拡張子が`.js`ならNode、`.py`ならPythonで起動する、という読み方になっています。自分のServerの起動コマンドが決まっているなら、`command`と`args`をその起動に合わせて渡します。

```ts
import { Client } from "@modelcontextprotocol/client";
import { StdioClientTransport } from "@modelcontextprotocol/client/stdio";

const transport = new StdioClientTransport({
  command: "node",
  args: ["/ABSOLUTE/PATH/TO/server.js"],
});

const client = new Client({ name: "sample-client", version: "1.0.0" });
await client.connect(transport);
```

パスやコマンドはプレースホルダです。手元のServerの起動方法に置き換えてください。認証情報が必要なServerでは、環境変数や設定ファイルに置き、コードへ直書きしないでください。

この骨格は「つながったか」を確認するための最小例です。HTTP／SSEでの本番接続や、チャット画面の実装は扱いません。運び方の比較が必要になったら[stdioとHTTP/SSEの違い](/blog/mcp-stdio-vs-sse-transport)へ進んでください。

![MCP Client SDKで接続し、Tool一覧を取り、1回呼び出す3段階の概念図](/images/blog/mcp-client-sdk-overview/h2-1.png)

## Tool一覧と1呼び出しまで確認する

接続できたあとは、一覧取得と1回の呼び出しを分けて確認します。公式のTypeScript例では、接続直後に`listTools()`で名前を取り、必要になったときに`callTool()`で呼びます。

```ts
const toolsResult = await client.listTools();
console.log(toolsResult.tools.map((tool) => tool.name));

const result = await client.callTool({
  name: "say-hello",
  arguments: { name: "world" },
});
console.log(result);

await client.close();
```

`say-hello`は例です。実際のTool名・引数の形は、一覧で得た定義とServer側の仕様に合わせてください。機密情報を含む入力は使わないでください。

確認の切り分けは次の3段です。

1. **つながったか**: `connect`が例外なく終わるか。終わらない場合は起動コマンド・パス・Server側の待ち受けを先に疑います。
2. **一覧が取れるか**: `listTools()`の結果に期待するTool名が出るか。出ない場合は、接続先のServerが想定と違う／Server側でToolが未登録、の線を見ます。
3. **1回呼べるか**: 引数の形が合っているか。名前は合っていても入力スキーマが違うと失敗します。

失敗したときに「全部壊れている」と一括りにせず、上のどこで止まったかを切り分けると戻りやすいです。権限やトークンの監査まで広げたくなったら[権限とセキュリティ](/blog/mcp-security-permissions)へ。Server側の公開手順そのものを直す必要があるなら[Serverの作り方入門](/blog/mcp-server-build-basics)へ進んでください。

公式Build-clientのチャットボット例は、一覧と呼び出しのあとにAnthropic Messagesで会話ループを回します。LLM連携は公式例として存在しますが、自前Clientの最初の確認（接続・一覧・1呼び出し）には含めません。

## Python側の対応関係

Pythonでも同じ確認（接続・一覧・1呼び出し）を公式が案内しています。パッケージはPyPIの`mcp`です。執筆時点で確認した公式例では、`Client`、`StdioServerParameters`、`stdio_client`、`list_tools`、`call_tool`が中心です。

| 役割 | TypeScript | Python（公式例の対応） |
|------|------------|------------------------|
| パッケージ | `@modelcontextprotocol/client` | `mcp` |
| Clientオブジェクト | `Client` | `Client` |
| stdioの設定 | `StdioClientTransport({ command, args })` | `StdioServerParameters(command=..., args=...)` |
| 接続の開き方 | `client.connect(transport)` | `async with Client(stdio_client(...)) as client:` |
| Tool一覧 | `listTools()` | `list_tools()` |
| Tool呼び出し | `callTool({ name, arguments })` | `call_tool(name, args)` |

環境構築に`uv`を使う手順や、Anthropic APIキーを`.env`へ置く手順は、公式Build-clientのPython節にあります。操作画面のツアーはここでは書きません。Pythonで全文を追いたい場合は、TypeScript側で接続→一覧→1呼び出しの意味が分かったあとに読むと迷いにくいです。

## 止まったときの確認先

症状に近いものから確認すると早く進みます。原因を1つに決めつけず、当てはまる項目を見てください。

| 症状 | 次に確認する記事 |
|------|------------------|
| Host・Client・Serverの役割が分からない | [MCPの仕組み](/blog/mcp-architecture-basics) |
| Server側のTool公開やstdioのログ注意を直したい | [Serverの作り方入門](/blog/mcp-server-build-basics) |
| 製品アプリへ既存Serverを足す場所が分からない | [Cursor](/blog/mcp-cursor-setup)／[Claude Desktop](/blog/mcp-claude-desktop-setup)／[Claude Code](/blog/mcp-claude-code-setup)／[VS Code](/blog/mcp-vscode-setup) |
| 設定JSONの引用符やキーで止まった | [MCPの設定JSONの書き方](/blog/mcp-config-json-guide) |
| 既存の完成Serverを初めて繋ぐ手順を知りたい | [既存Serverの初回接続](/blog/mcp-first-setup-guide) |
| stdioとHTTP／SSEのどちらを選ぶか迷う | [stdioとHTTP/SSEの違い](/blog/mcp-stdio-vs-sse-transport) |
| 権限やトークンの扱いを整理したい | [権限とセキュリティ](/blog/mcp-security-permissions) |
| 手元起動かURLかの運用で迷う | [ローカルとリモート運用](/blog/mcp-local-vs-remote) |
| Pythonや公式チャットボット例まで進めたい | 公式の[Build an MCP client](https://modelcontextprotocol.io/docs/develop/build-client) |

## まとめ

自前アプリから既存のMCP Serverを呼ぶとき、最初に揃えるのは公式Client SDKの`Client`とtransportです。TypeScriptなら`@modelcontextprotocol/client`と`StdioClientTransport`でつなぎ、**一覧**と**1呼び出し**まで取れれば、最初の確認としては十分です。

製品アプリへの設定、Serverの自作、運び方の比較、権限の設計まで手を広げたくなったら、[MCP Hub](/blog/mcp-guide)から関連する手順を探してみてください。

---

本記事の内容は執筆時点（2026-09-22）の情報に基づきます。公式ドキュメントを参照しており、掲載手順の実機での動作は未検証です。SDKのパッケージ名・API・起動コマンドは変更される可能性があります。ビルドの成功や本番利用の適否を保証するものではありません。重要な判断は公式ドキュメントで確認してください。
