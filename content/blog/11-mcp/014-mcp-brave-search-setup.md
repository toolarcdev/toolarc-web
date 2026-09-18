---
title: "Brave Search MCPの設定｜APIキーと検索確認"
description: "AIアプリからBrave Search MCPでWeb検索を足したい人へ、公式ServerのAPIキーの置き方と追加後の確認までを整理します。NPX／Dockerの起動形の読み方、キーの直書きを避ける方法、登録・認証・検索呼び出しの分け方も分かります。古いパッケージ名の手順は使いません。"
date: 2026-09-18
tags:
  - MCP
  - Brave Search
  - APIキー
  - Web検索
  - セットアップ
  - mcp-series
site: toolarc.jp
target: "AIアプリから Brave Search MCP で Web 検索を足したい人。キーの置き方と追加後の確認順、認証エラーの切り分けで迷っている人。"
---

# Brave Search MCPの設定｜APIキーと検索確認

Cursor や Claude などの AI アプリに Web 検索を足したいとき、まず迷うのが「Brave Search MCP の API キーをどこに置くか」と「追加したあと、どこまで確認すれば安心か」ではないでしょうか。公式の手順自体はシンプルですが、Desktop 版と VS Code 版で設定例のキー名が違ったり、古いパッケージ名を使った解説が残っていたりして、情報が混ざりがちです。

この記事では、Brave 公式の Search MCP Server を対象に、API キーの発行から環境変数での渡し方、NPX と Docker の起動形の読み方、追加後の確認手順までを整理します。初めて繋ぐ手順、設定の置き場所、JSON の直し方はこの記事では扱いません。

> **今日の結論**
>
> - Web 検索を足すなら、Brave 公式の Search MCP Server（パッケージ名 `@brave/brave-search-mcp-server`）を使います。古い別パッケージ名の手順は使いません。
> - API キーはダッシュボードで発行し、`BRAVE_API_KEY` または `BRAVE_API_KEY_FILE` で渡します。値を記事やリポジトリ、チャットに直書きしません。
> - 公式の NPX／Docker 例は、使っているアプリの設定キー（`mcpServers` と `servers`）に読み替えます。2.x 系の既定は stdio です。
> - 追加後は「登録されたか」「キーが通ったか」「`brave_web_search` を1回呼べたか」を分けて確認します。
> - プラン差や JSON の構文、他の Server の手順はこの記事では扱いません。

## 公式Serverを選び、APIキーを発行する

Brave Search MCP は、Brave 公式リポジトリ [brave/brave-search-mcp-server](https://github.com/brave/brave-search-mcp-server) が正式な提供元です。npm 上のパッケージ名は [`@brave/brave-search-mcp-server`](https://www.npmjs.com/package/@brave/brave-search-mcp-server) です。公式リポジトリと npm ページを2026年9月に確認した内容では、この名前と一致していました。旧ブログ記事などで見かける別パッケージ名は、無検証のまま採用しないほうが安全です。

できることの中心は Web 検索です。ほかにローカル検索、画像・動画・ニュース検索、要約、場所検索などのツールも用意されていますが、この記事では名前の紹介にとどめます。初回に確認するのは Web 検索1つで十分です。

キーの発行手順はシンプルです。[Brave Search API](https://brave.com/search/api/) のページでプランの入口を確認し、[開発者用ダッシュボード](https://api-dashboard.search.brave.com/app/keys) でキーを作成します。画面の項目名は変わる可能性があるため、この記事では固定のスクリーンショットは載せません。プラン名は README 上で Search と Answers に大別されていますが、料金や QPS、無料枠の条件は変わりやすいので公式ページで確認してください。すべてのツールがすべてのプランで使えるわけではない点にも注意が必要です。

なお、GitHub の Issue や PR を操作したい場合は、この Brave Search MCP ではなく GitHub 公式 Server の話になります。詳しい手順は[GitHub公式Serverの設定記事](/blog/mcp-github-server-setup)にまとめているので、そちらを参照してください。手元のファイルを検索したいだけなら、対象は[Filesystem MCPの使い方](/blog/mcp-filesystem-setup)です。

## キーは環境変数かファイル参照で渡し、値を直書きしない

![APIキーをenvに置き、設定に追加してから、Web検索を1回呼んで確認する3段階の概念図](/images/blog/mcp-brave-search-setup/h2-1.png)

必須の環境変数は `BRAVE_API_KEY` です。ファイルからキーを読み込みたい場合は `BRAVE_API_KEY_FILE` を使う方法もあり、両方を設定した場合はファイル参照が優先されます。通常はどちらか一方を選べば十分です。

どちらの方法でも、キーの実際の値を JSON ファイルや Git リポジトリ、チャットのやり取りに直接貼り付けないことが大切です。公式の設定例に出てくる `YOUR_API_KEY_HERE` はあくまでプレースホルダーで、そのまま使う文字列ではありません。

VS Code の公式例では、`inputs` に password 型の項目を定義し、設定側では `${input:brave-api-key}` という形で参照します。Cursor などで見かける `${env:NAME}` 形式も、アプリ側がキーを参照する書き方の一種です。この参照は暗号化ではないので、キーが隠れるわけではありません。JSON の構文はこの記事では扱いません。直し方が必要なときは[MCP設定JSONの書き方](/blog/mcp-config-json-guide)を参照してください。

Docker で動かす場合は、公式例のとおり `-e BRAVE_API_KEY` でコンテナにキーを渡す形が基本です。Docker Compose の secrets 機能を使う入口もありますが、この記事では「そういう選択肢がある」というところまでにとどめます。

GitHub 公式 Server の記事でも触れていますが、秘密情報を直書きしないという型は共通です。ただし認証の中身（PAT か OAuth かなど）はサーバーごとに違うため、混同しないようにしてください。

## NPX／Dockerの起動形を自分のClient向けに読む

以下の設定例は、構造を説明するための素材です。実際に接続できることを検証したものではなく、キーの値もすべてプレースホルダーにしています。手元で使うときは、必ず自分の環境のキーに置き換えてください。

Brave Search MCP の 2.x 系の既定は stdio。HTTP で立ち上げたいときだけ `--transport http` を付けるか、`BRAVE_MCP_TRANSPORT=http` を指定します。stdio と HTTP の比較はこの記事では扱いません。比較が必要なときは[stdioとHTTPの違い](/blog/mcp-stdio-vs-sse-transport)を参照してください。

公式の設定例は、使っているアプリによってキー名が変わります。Claude Desktop や Cursor 系は `mcpServers`、VS Code 系は `servers` です。設定ファイルの置き場所や反映のさせ方は、[Cursor](/blog/mcp-cursor-setup)・[Claude Desktop](/blog/mcp-claude-desktop-setup)・[Claude Code](/blog/mcp-claude-code-setup)・[VS Code](/blog/mcp-vscode-setup) それぞれの設定記事を参照してください。

Claude Desktop の公式 NPX 例には `--transport http` が付いています。一方で VS Code の公式 NPX 例は `--transport stdio` です。この2つを見比べるときは、いま読んでいる公式ブロックの書き方をそのまま信用し、どちらか一方を全アプリ共通の既定と決めつけないようにしてください。

主に使うのは、NPX と stdio の組み合わせです。パッケージ名と `env.BRAVE_API_KEY` を指定します。

```json
{
  "mcpServers": {
    "brave-search": {
      "command": "npx",
      "args": ["-y", "@brave/brave-search-mcp-server"],
      "env": {
        "BRAVE_API_KEY": "YOUR_API_KEY_HERE"
      }
    }
  }
}
```

Claude Desktop の公式ブロックをそのまま読むときは、次のように `--transport http` が付いた形になっています。これは「既定が HTTP である」証明ではなく、その公式ブロックの読み方として押さえておいてください。

```json
{
  "mcpServers": {
    "brave-search": {
      "command": "npx",
      "args": ["-y", "@brave/brave-search-mcp-server", "--transport", "http"],
      "env": {
        "BRAVE_API_KEY": "YOUR_API_KEY_HERE"
      }
    }
  }
}
```

Docker で起動する場合は、イメージ名と `-e BRAVE_API_KEY` の指定を読み替える形になります。ビルド手順そのものはこの記事の範囲外です。

```json
{
  "mcpServers": {
    "brave-search": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "-e",
        "BRAVE_API_KEY",
        "docker.io/mcp/brave-search"
      ],
      "env": {
        "BRAVE_API_KEY": "YOUR_API_KEY_HERE"
      }
    }
  }
}
```

VS Code 向けは、キーの階層が `servers` になり、公式は `${input:brave-api-key}` を使う点だけここでは押さえておきます。設定例の全文は[VS CodeでのMCP設定](/blog/mcp-vscode-setup)と公式 README の VS Code 節を確認してください。

JSON の型やカンマ、引用符の直し方はこの記事では扱いません。直し方が必要なときは[MCP設定JSONの書き方](/blog/mcp-config-json-guide)を参照してください。Brave 固有の `command`・`args`・`env` の読み方までが対象です。HTTP を LAN 全体に公開する話（ホストを `0.0.0.0` にする、Origin を許可するなど）は、公式に注意書きがある領域なので、必要な人だけ公式ドキュメントを確認してください。本番公開の手順としては扱いません。

## 登録・認証・Web検索1回を分けて確認する

設定を追加したら、次の4つを分けて確認すると切り分けやすくなります。

1. **登録**: 使っているアプリの一覧に Brave Search が表示されるか。設定場所や再起動の手順はアプリごとの記事を参照してください。ここでは「出たか、出ていないか」だけを見ます。
2. **認証**: キーが不足していないか、無効になっていないか、ファイルパスを間違えていないかを疑います。ダッシュボードで発行したキーと、渡している変数名（`BRAVE_API_KEY`）が対応しているかを確認してください。
3. **呼び出し**: `brave_web_search` を使って、機密情報を含まない短いクエリを1回試します。チャットの返答が「検索しました」と言っているだけで判断せず、ツールが実際に呼ばれた記録と、その結果が返ってきているかを見てください。
4. **範囲の確認**: ローカル検索や要約などのツールは、存在はしますがプランや引数によって制限がある場合があります。README ではローカル検索が Pro プランでフル機能になる旨の記載もあるので、初回の成功条件には含めないほうが安全です。

一覧に出ていれば登録、キー起因のエラーが出なければ認証、Web 検索の実行記録と結果が確認できればひとまず今回の呼び出しは完了と判断できます。

## 止まったら隣の手順記事へ切り分ける

症状ごとに、次に見るべき場所を整理しました。原因を1つに決めつけず、順番に確認してください。

| 症状                                     | 次に確認するもの                                                                                                                                                             |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 設定の置き場所や画面操作が分からない     | [Cursor](/blog/mcp-cursor-setup)／[Claude Desktop](/blog/mcp-claude-desktop-setup)／[Claude Code](/blog/mcp-claude-code-setup)／[VS Code](/blog/mcp-vscode-setup) の設定記事 |
| 引用符やカンマ、キーの型でエラーが出る   | [設定ファイル（JSON）の書き方の記事](/blog/mcp-config-json-guide)                                                                                                            |
| はじめて MCP を1つ繋ぐ手順を知りたい     | [MCP初回セットアップの記事](/blog/mcp-first-setup-guide)                                                                                                                     |
| ローカル起動か URL 接続かで迷っている    | [stdioとHTTPの違いの記事](/blog/mcp-stdio-vs-sse-transport)（Brave の既定は stdio、HTTP は切り替えという位置づけです）                                                       |
| GitHub の Issue や PR を操作したい       | [GitHub公式Serverの設定記事](/blog/mcp-github-server-setup)                                                                                                                  |
| どの Server から試すか決めかねている     | [おすすめMCP Serverの記事](/blog/mcp-recommended-servers)                                                                                                                    |
| 料金やプラン、キー発行画面で止まっている | [Brave Search API](https://brave.com/search/api/) や[開発者用ダッシュボード](https://api-dashboard.search.brave.com/app/keys)                                                |

秘密情報を直書きしないという考え方は、GitHub 公式 Server とも共通しています。ほかの MCP Server の手順をまとめて探したいときは、[MCP関連記事の一覧](/blog/mcp-guide)を確認してください。

---

本記事の内容は執筆時点（2026-09-18）の情報に基づきます。公式ドキュメントを参照しており、掲載している手順の実機での動作は未検証です。パッケージ名・起動フラグ・ツール名・プラン条件・料金はバージョンや契約内容によって変更される可能性があります。接続の成功や検索品質、安全性を保証するものではありません。重要な判断は公式ドキュメントで確認してください。
