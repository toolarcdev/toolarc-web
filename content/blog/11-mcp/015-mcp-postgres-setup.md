---
title: "PostgreSQL MCPの設定｜接続文字列と読み取り確認"
description: "AIアプリからPostgreSQLをMCPで見たい人へ、維持されているPostgres MCPの接続文字列の置き方と読み取り確認までを整理します。開発用DBと最小権限、restrictedモードの読み方、登録・接続・スキーマ確認の分け方も分かります。更新が止まっている古いパッケージの手順は使いません。"
date: 2026-09-18
tags:
  - MCP
  - PostgreSQL
  - 接続文字列
  - セットアップ
  - mcp-series
site: toolarc.jp
target: "AIアプリから PostgreSQL を MCP で見たい人。接続文字列の置き方と追加後の確認順、本番を避ける読み取り確認で迷っている人。"
---

# PostgreSQL MCPの設定｜接続文字列と読み取り確認

AIアプリからPostgreSQLの中身をMCP経由で見せたいけれど、接続文字列をどこに書けばよいのか、追加したあとに何を確認すれば「動いている」と言えるのか、判断に迷うことがあります。本番のデータベースに直接繋いでよいのかも気になるところです。

この記事では、いま維持されているPostgreSQL向けのMCP Serverの選び方と、接続文字列を直書きせずに渡す方法、そして追加後に読み取り確認を1回行うところまでを順番に整理します。

MCPをはじめて1本繋ぐ手順や、使っているアプリでの設定ファイルの置き場所、JSONの書き方の直しはこの記事では扱いません。

> **今日の結論**
>
> - この記事で使うのは、いまも更新が続くPostgres MCP Pro（`crystaldba/postgres-mcp`）です。アーカイブ済みの`@modelcontextprotocol/server-postgres`は現行の手順として使いません。
> - 接続先は開発・検証用のデータベースに限ります。接続文字列は`DATABASE_URI`という環境変数で渡し、値そのものを記事やリポジトリ、チャットに書き込みません。
> - 追加するときは`--access-mode=restricted`を選びます。公式サンプルにあるunrestrictedは書き込みも可能にする指定で、restrictedであっても本番接続はおすすめしません。
> - 追加したあとは「登録されたか」「接続できたか」「`list_schemas`などの読み取りが1回通ったか」を分けて確認します。
> - JSONの構文、使っているアプリでの設定場所、MCPをはじめて1本繋ぐ手順、細かな権限設計はこの記事では扱いません。

## 維持されているServerを選び、接続先を開発用に限る

PostgreSQL向けのMCP Serverは複数の実装が出回っていますが、この記事で使うのは[crystaldba/postgres-mcp](https://github.com/crystaldba/postgres-mcp)、通称Postgres MCP Proです。継続的にメンテナンスされています。

一方、以前よく案内されていた[servers-archivedのpostgres](https://github.com/modelcontextprotocol/servers-archived/tree/main/src/postgres)は、リポジトリの説明どおりすでにアーカイブ済みです。npmに残る[`@modelcontextprotocol/server-postgres`](https://www.npmjs.com/package/@modelcontextprotocol/server-postgres)パッケージも同じ実装で、確認した内容では更新が止まっています。古いブログ記事の手順をそのまま試すのは避けたほうが無難です。

接続先は開発・検証用のデータベースに限定します。本番のデータベースや個人情報を含むデータベースは、例としても使いません。ロールには読み取りに必要な権限だけを与える、という考え方が基本です。権限設定そのものの解説はこの記事では扱いません。必要なときは[PostgreSQLの権限概要](https://www.postgresql.org/docs/current/ddl-priv.html)を参照してください。

できることの中心はスキーマの一覧取得とSQL実行。ほかに診断系のツールも用意されていますが、ここでは名前を挙げるだけにとどめます。

GitHubのIssueやWeb検索、ローカルファイルを扱うMCP Serverと役割が混ざりやすいので注意してください。IssueやPRが目的なら[GitHub公式Serverの設定記事](/blog/mcp-github-server-setup)、Web検索なら[Brave Search MCPの設定](/blog/mcp-brave-search-setup)、手元のファイルなら[Filesystem MCPの使い方](/blog/mcp-filesystem-setup)を参照してください。権限の監査チェックリストはこの記事では扱いません。

## 接続文字列は環境変数で渡し、値を直書きしない

![開発用DBに限り、接続文字列をenvに置き、読み取り確認を1回行う3段階の概念図](/images/blog/mcp-postgres-setup/h2-1.png)

Postgres MCP Proが必須とするのは`DATABASE_URI`という環境変数です。URIの構文そのものはこの記事では扱いません。必要なときは[PostgreSQLの接続URIの公式ドキュメント](https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNSTRING-URIS)を参照してください。ホスト名やパスワードの意味を、この記事で一つずつ説明することはしません。

JSONの設定ファイルやチャットのやり取り、記事、リポジトリに実際の接続文字列を貼らないようにします。公式のサンプルには生の`postgresql://username:password@...`がそのまま書かれている箇所もありますが、この記事で示す例はすべてプレースホルダです。

VS Codeなどが用意する`${input:…}`や`${env:NAME}`といった記法は、あくまでアプリ側が値を参照する仕組みで、値を暗号化するものではありません。JSONの構文はこの記事では扱いません。直し方が必要なときは[MCP設定JSONの書き方](/blog/mcp-config-json-guide)を参照してください。

アーカイブ済みの`@modelcontextprotocol/server-postgres`には、接続文字列を`args`の末尾にそのまま渡す例があります。プロセス一覧などから見えやすい書き方なので、いま使う手順では環境変数を使う、とだけ触れておきます。アーカイブ側の設定例全文はここには載せません。

秘密の値を直書きしないという型は、[GitHub向けのMCP Server](/blog/mcp-github-server-setup)の記事とも共通しています。認証の中身自体はServerごとに違うので、そこは混ぜずに読んでください。

## Docker／uvxの起動形を自分のClient向けに読む

以下の設定例は構造を説明するためのものです。実際に接続できることを確認したものではなく、URIの部分もすべてプレースホルダです。

はじめて追加するときは`--access-mode=restricted`を選びます。公式サンプルに出てくるunrestrictedは書き込みも可能にする指定なので、そのままコピーしないようにしてください。

設定を書くキー名はアプリによって違います。Claude DesktopやCursor系は`mcpServers`、VS Code系は`servers`になります。設定ファイルの置き場所や反映のさせ方はこの記事では扱いません。[Cursor](/blog/mcp-cursor-setup)・[Claude Desktop](/blog/mcp-claude-desktop-setup)・[Claude Code](/blog/mcp-claude-code-setup)・[VS Code](/blog/mcp-vscode-setup)それぞれの設定記事を参照してください。

主な例はDockerとrestrictedの組み合わせです。

```json
{
  "mcpServers": {
    "postgres": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "-e",
        "DATABASE_URI",
        "crystaldba/postgres-mcp",
        "--access-mode=restricted"
      ],
      "env": {
        "DATABASE_URI": "postgresql://USER:PASSWORD@localhost:5432/DEV_DB"
      }
    }
  }
}
```

二つ目の経路としてuvxもあります。

```json
{
  "mcpServers": {
    "postgres": {
      "command": "uvx",
      "args": ["postgres-mcp", "--access-mode=restricted"],
      "env": {
        "DATABASE_URI": "postgresql://USER:PASSWORD@localhost:5432/DEV_DB"
      }
    }
  }
}
```

pipxやuv runといった別の起動形も公式には用意されていますが、ここでは「ほかにもある」というところまでにとどめ、4種類を並べて比較することはしません。ビルド手順の解説も本記事の範囲外です。

SSEなどの`--transport`指定もありますが、こちらも「ある」というところまでです。stdioとHTTPの比較はこの記事では扱いません。比較が必要なときは[stdioとSSEの違い](/blog/mcp-stdio-vs-sse-transport)を参照してください。

JSONの型やカンマ、引用符の直し方はこの記事では扱いません。直し方が必要なときは[MCP設定JSONの書き方](/blog/mcp-config-json-guide)を参照してください。Postgres固有の`command`・`args`・`env`の読み方までが対象です。VS Code向けはキー名が`servers`になる点だけここで触れておきます。設定例の全文は[VS CodeでのMCP設定](/blog/mcp-vscode-setup)と公式のREADMEを参照してください。

## 登録・接続・スキーマ確認1回を分けて確認する

追加したあとの確認は、次の3つに分けて見ていくと判断しやすくなります。

1. **登録**: 使っているアプリの側でPostgresが一覧に追加されたかどうかを見ます。表示される場所や、反映のために再起動が必要かどうかはアプリごとに違います。ここでは「出ているか、出ていないか」の判定だけにとどめます。
2. **接続**: URIが不足していないか、認証に失敗していないか、コンテナからホストが見えているかを疑います。エラーメッセージの具体例はこの記事では作りません。渡している変数名が`DATABASE_URI`になっているか、接続先が開発用のデータベースになっているかを確認します。
3. **呼び出し**: `list_schemas`を1回呼びます。会話の中で「調べました」という返答だけでは判定材料になりません。ツールが実際に呼ばれた記録と、その結果が返ってきているかを見てください。架空のスキーマ一覧をこの記事に書くことはしません。必要であれば、件数を絞ったり個人情報を含むテーブルを避けたりしたうえで、機密性のない`execute_sql`を1回試す程度にとどめます。`SELECT *`は勧めません。

`explain_query`や`analyze_*`、`get_top_queries`といった診断系のツールも用意されていますが、これらは「あります」というところまでにとどめ、初回の成功条件には含めません。詳しくは公式のREADMEを参照してください。

一覧に出ていれば登録、接続に起因するエラーが出ていなければ接続、スキーマ確認の呼び出し記録と結果があれば、この記事で扱う範囲の呼び出しは完了です。はじめて1本のServerを繋ぐところからの完了宣言はこの記事では扱いません。必要なときは[MCP初回セットアップの記事](/blog/mcp-first-setup-guide)を参照してください。restrictedであっても、これで本番に接続してよいという意味にはなりません。

## 止まったら隣の手順記事へ切り分ける

原因を一つに断定せず、症状に近い確認先から見ていくのがおすすめです。

| 症状                                           | 次に確認するもの                                                                                                                                                                            |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 設定を書く場所や再起動のタイミングが分からない | 使っているアプリの記事（[Cursor](/blog/mcp-cursor-setup)／[Claude Desktop](/blog/mcp-claude-desktop-setup)／[Claude Code](/blog/mcp-claude-code-setup)／[VS Code](/blog/mcp-vscode-setup)） |
| 引用符やカンマ、キーの型でJSONがエラーになる   | [JSON設定の記事](/blog/mcp-config-json-guide)                                                                                                                                               |
| はじめて1本のServerを繋ぐ流れ自体を知りたい  | [MCP初回セットアップの記事](/blog/mcp-first-setup-guide)                                                                                                                                       |
| ローカル起動かURL接続か分からない              | [stdioとSSEの記事](/blog/mcp-stdio-vs-sse-transport)（この記事はstdioを主な経路として想定しており、SSEは切り替え先として短く触れるにとどめます）                                            |
| GitHubのIssueやPRを扱いたい                    | [GitHub向けMCP Serverの記事](/blog/mcp-github-server-setup)                                                                                                                                 |
| ほかにどのServerから試すか迷っている           | [おすすめMCP Serverの記事](/blog/mcp-recommended-servers)                                                                                                                                   |
| 接続URIや権限の一般的な考え方を知りたい        | PostgreSQL公式ドキュメント                                                                                                                                                                  |

## まとめ：接続先の限定と直書き回避を先に固める

PostgreSQLをMCP経由で見せるときは、維持されているServerを選び、接続先を開発用に限り、接続文字列を直書きしないところまでが土台になります。追加後は登録・接続・スキーマ確認を分けて見れば、restrictedのままでも読み取り1回までは判断できます。

関連する手順は[MCP Serverの設定ガイド](/blog/mcp-guide)にまとめています。ほかのServerを追加したいときや、権限まわりをもう少し詰めたいときの入り口としてご覧ください。

---

本記事の内容は執筆時点（2026-09-18）の情報に基づきます。公式ドキュメントを参照して構成していますが、掲載した手順の実機での動作は未検証です。パッケージ名・起動フラグ・ツール名・アクセスモード・接続先の条件はバージョンによって変更される可能性があります。接続の成功、データの安全性、本番利用の適否を保証するものではありません。重要な判断は公式ドキュメントで確認してください。
