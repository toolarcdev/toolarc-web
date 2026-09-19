---
title: "MCP Serverの作り方入門｜最小のTool公開と確認"
description: "既存のMCP Serverは足せた人へ、公式に沿ってTypeScriptで最小の自作Serverを作り、Toolを1つ公開して呼び出すところまでを整理します。stdioでのログ注意、Inspectorでの確認、Clientへの登録方法も扱います。Python全文とHTTP本番は扱いません。"
date: 2026-09-19
last_update: 2026-09-20
tags:
  - MCP
  - MCP Server
  - 自作
  - TypeScript
  - セットアップ
  - mcp-series
site: toolarc.jp
target: "既存の MCP Server は足せて、次に TypeScript で最小の自作 Server を作り、Tool を1つ呼ぶところまで行きたい人。"
---

# MCP Serverの作り方入門｜最小のTool公開と確認

FilesystemやGitHubのような既存のMCP Serverは、もうClientに追加できた、という段階の方は多いはずです。次の一歩として、自分の用途に合わせたServerを一から書き、Toolを1つ公開してローカルから呼んでみたい人に向けて手順を整理します。

本記事では、公式ドキュメントに沿ってTypeScriptで最小のServerを組み立てます。Toolを1つ登録し、stdioで待ち受け、ログの出し方を誤ると接続が壊れる点に注意しながら、Inspectorやお使いのClientから実際に呼び出せるかを確認するところまでを扱います。

仕組みの説明、既存Serverを初めて繋ぐ手順、設定ファイルの場所、JSONの構文の直し方は、この記事では扱いません。

> **今日の結論**
>
> - 公式の「Build an MCP server」に沿うと、主な選択肢はTypeScriptです。パッケージは`@modelcontextprotocol/server`です。旧`@modelcontextprotocol/sdk`は使いません。最初に用意するのはToolを1つで十分です。
> - ローカルでの動かし方はstdioが基本です。ログを`console.log`（stdout）に出すと接続そのものが壊れるため、ログは`console.error`（stderr）に出します。
> - Toolを追加したら、「プロセスが起動するか」「Inspectorや Clientの一覧にTool名が出るか」「1回呼び出せるか」を分けて確認します。
> - Clientへの登録は、使っているアプリの設定キーに読み替えます。設定ファイルの場所はこの記事では扱いません。
> - Python全文、HTTP公開の本番運用、Resources／Promptsの網羅は、この記事では扱いません。

## 公式に沿い、TypeScriptで最小のToolを1つ公開する

公式の案内ページは[Build an MCP server](https://modelcontextprotocol.io/docs/develop/build-server)です。ただし最小の手を動かす順としては、[TS SDKのBuild your first server](https://ts.sdk.modelcontextprotocol.io/v2/get-started/first-server.md)のほうが近いです。本記事もこちらの手順に従います。

利用するパッケージは、2026年9月時点のnpmでは`@modelcontextprotocol/server`です。以前の記事などで見かける`@modelcontextprotocol/sdk`は、現行のパッケージ名として扱いません。プロジェクトの`package.json`には`"type": "module"`を指定します。SDK側はNode.js 20以降を前提にしています。筆者が確認した範囲では、Inspector側が求めるNode.jsのバージョンが、この数値と厳密に一致するとは限りません。ServerとInspectorの両方を使う場合は、それぞれ公式ドキュメントに書いてあるNode.jsのバージョンを確認してください。

最初に実装する対象はTools。Resourcesや Promptsは後から追加できる仕組みなので、この記事では扱いません。全体の役割分担は[MCPの仕組み](/blog/mcp-architecture-basics)に整理しています。

Toolを公開する中心の呼び出しが`registerTool`です。名前、説明、入力の形、実際の処理を行うハンドラーをまとめて渡します。入力の形はZodの`inputSchema`で定義し、公式SDKがリクエストの検証に使います。厳密なAPIリファレンスというより、入力の形を決める場所、という理解で十分です。

なお公式のチュートリアルでは、アメリカの気象警報を取得するToolが題材になっています。本記事では内容を簡略化したToolを1つだけ用意します。Pythonで書きたい場合は、同じBuild an MCP serverページにPython向けの節があります。

```bash
npm install @modelcontextprotocol/server zod
npm install -D typescript tsx @types/node
```

```ts
// src/index.ts
import { McpServer } from "@modelcontextprotocol/server";
import { serveStdio } from "@modelcontextprotocol/server/stdio";
import { z } from "zod";

function createServer() {
  const server = new McpServer({ name: "sample-server", version: "1.0.0" });

  server.registerTool(
    "say-hello",
    {
      description: "名前を受け取り、あいさつ文を返す最小のTool",
      inputSchema: z.object({
        name: z.string(),
      }),
    },
    async ({ name }) => {
      return {
        content: [{ type: "text", text: `こんにちは、${name}さん` }],
      };
    },
  );

  return server;
}

serveStdio(createServer);
console.error("sample-server is listening on stdio");
```

このTool 1つだけで、起動から呼び出しまでの確認は成立します。

## stdioで動かし、stdoutへログを出さない

ローカルで動かす代表的な方法はstdioです。ClientやInspectorがプロセスを起動し、標準入力と標準出力を使ってJSON-RPCのやり取りをします。運び方の比較はこの記事では扱いません。必要になったときは[stdioとHTTP/SSEの違い](/blog/mcp-stdio-vs-sse-transport)を確認してください。

ClientとServerのやり取り（JSON-RPC）は、標準出力（stdout）を使って行われます。ここに`console.log`や`print`相当の文字列を混ぜると、Client側はその行も通信のメッセージとして解釈しようとするため、接続が壊れます。ログを出したい場合は、標準エラー出力（stderr）に出す`console.error`を使います。

起動方法は、現行のSDKでは`serveStdio`に1本化されています。以前のバージョンで使われていた`new StdioServerTransport()`と`server.connect()`を組み合わせる書き方は、公式の移行ガイドでも旧方式として案内されています。本記事では`serveStdio`だけを使います。

単体でコマンドを実行した場合、画面に何も表示されないのが正常な状態です。ClientやInspectorが接続するまで、プロセスは標準入力を待ち続けます。同じServerをHTTPで公開する方法も用意されていますが、認証や本番運用の設計まで考える必要があるため、この記事では扱いません。

## InspectorまたはClientに登録する

まずは[Inspector](https://modelcontextprotocol.io/docs/tools/inspector)で確認するのが近道です。起動コマンドを渡してConnectすると、Toolsタブに登録したTool名が表示されます。画面の全タブは解説しません。

```bash
npx @modelcontextprotocol/inspector npx tsx src/index.ts
```

使っているClientにも同じServerを登録できます。その場合は、`command`と`args`を、そのアプリの設定キー（`mcpServers`や`servers`など）に読み替えます。設定ファイルの具体的な場所や反映のタイミングは、この記事では扱いません。使うアプリの記事（[Cursor](/blog/mcp-cursor-setup)、[Claude Desktop](/blog/mcp-claude-desktop-setup)、[Claude Code](/blog/mcp-claude-code-setup)、[VS Code](/blog/mcp-vscode-setup)）を確認してください。

```json
{
  "mcpServers": {
    "sample-server": {
      "command": "npx",
      "args": ["tsx", "src/index.ts"],
      "cwd": "/ABSOLUTE/PATH/TO/sample-server"
    }
  }
}
```

このJSONは設定の書き方の例です。このまま貼って接続できるわけではありません。パスの部分は、自分の環境の値に置き換えてください。`cwd`を書けるかどうかや絶対パスの指定方法は、使っているClientの現行仕様によって異なります。書けない場合は、`args`に絶対パスを含める書き方を使うClientもあります。JSONの引用符やカンマの位置で迷ったときは、[MCPの設定JSONの書き方](/blog/mcp-config-json-guide)を確認してください。

![Toolを1つ登録し、stdioで待ち受け、1回呼び出す3段階の概念図](/images/blog/mcp-server-build-basics/h2-1.png)

## 起動・一覧・1呼び出しを分けて確認する

登録したToolが動いているかどうかは、次の3段階に分けて確認すると迷いません。

1. **起動を確認する**: `npx tsx src/index.ts`を実行し、プロセスが落ちずに待ち受け状態になるかを見ます。単体実行では画面に何も表示されないのが正常です。
2. **一覧を確認する**: InspectorまたはClientのツール一覧に、登録したTool名（`say-hello`）が表示されるかを見ます。表示されない場合の切り分けは次の見出しにまとめます。
3. **1回の呼び出しを確認する**: 機密情報を含まない入力を1つ用意し、Toolを実際に1回呼び出します。呼び出しの記録と、返却された`content`の内容が確認できれば、その回は成功と判断できます。

待ち受けができている状態が起動、一覧に名前が出ている状態が登録、1回の実行記録と返却が確認できた状態が呼び出し完了です。2つ目のToolやResources、Prompts、HTTPでの公開は、ここでは扱いません。

## 止まったら隣の手順記事へ切り分ける

ここで止まったときは、症状に近いものから確認すると早く進みます。原因を1つに決めつけず、当てはまる項目を見てください。

| 症状                                                           | 次に確認する記事                                                                                                                                                  |
| -------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Host・Client・ServerやToolの役割がそもそも分からない           | [MCPの仕組み](/blog/mcp-architecture-basics)                                                                                                                      |
| 使っているアプリの設定ファイルの場所や反映のさせ方が分からない | [Cursor](/blog/mcp-cursor-setup)／[Claude Desktop](/blog/mcp-claude-desktop-setup)／[Claude Code](/blog/mcp-claude-code-setup)／[VS Code](/blog/mcp-vscode-setup) |
| JSONの引用符やカンマ、キーの型で止まった                       | [MCPの設定JSONの書き方](/blog/mcp-config-json-guide)                                                                                                              |
| 既存の完成済みServerを初めて繋ぐ手順を知りたい                 | [既存Serverの初回接続](/blog/mcp-first-setup-guide)                                                                                                               |
| ローカル起動（stdio）とURL公開（HTTP）のどちらを選ぶか迷う     | [stdioとHTTP/SSEの違い](/blog/mcp-stdio-vs-sse-transport)                                                                                                         |
| 自分では書かず、既存の完成Serverを使いたい                     | [おすすめのMCP Server](/blog/mcp-recommended-servers)／[PostgreSQL MCPの設定](/blog/mcp-postgres-setup) |
| Pythonで書きたい、公式の天気2ツール例まで進めたい              | 公式の[Build an MCP server](https://modelcontextprotocol.io/docs/develop/build-server)                                                                            |

Pythonで公式の天気2ツール例まで進めたい場合は、TypeScript側の最小手順を終えたあとに読むと迷いにくいです。

## まとめ

MCP Serverを自分で書くときは、まずToolを1つ登録し、stdioで待ち受けます。ログは標準出力に出さず、InspectorやClientから実際に呼び出せるかを確認します。この3段を通せれば、次のToolを増やす作業も同じ形で進められます。

2つ目以降のToolやResources、HTTPでの公開まで手を広げたくなったら、[MCPガイド](/blog/mcp-guide)から関連する手順を探してみてください。権限の渡し方と追加後の見直しは[MCPの権限管理](/blog/mcp-security-permissions)で扱っています。

---

本記事の内容は執筆時点（2026-09-19）の情報に基づきます。公式ドキュメントを参照して構成していますが、掲載している手順の実機での動作は未検証です。SDKのパッケージ名やAPI、起動コマンド、Inspectorの前提バージョンは変更される可能性があります。ビルドの成功や接続の安定、本番公開の適否を保証するものではありません。重要な判断は公式ドキュメントで確認してください。
