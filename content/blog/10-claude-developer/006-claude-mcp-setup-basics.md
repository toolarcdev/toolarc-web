---
title: "ClaudeのMCP設定入門｜DesktopとCodeで設定ファイルはどこに書くか"
description: "Claude DesktopとClaude CodeそれぞれでMCPサーバーを使い始めるための設定手順を解説します。どの設定ファイルをどこに書くかを執筆時点の公式ドキュメントで確認した手順で整理し、パスや再起動でつまずいたときの見直しポイントも表にまとめました。"
date: 2026-08-28
tags:
  - Claude
  - Claude Desktop
  - Claude Code
  - MCP
  - AIツール連携
  - 初心者
  - claude-developer-series
site: toolarc.jp
target: "Claude Desktop か Claude Code で MCP を使い始めたいが、どの設定ファイルをどこに書けばよいか分からない初心者〜中級の個人開発者"
---

# ClaudeのMCP設定入門｜DesktopとCodeで設定ファイルはどこに書くか

ClaudeでMCPを使ってみたい。そう思って調べ始めたものの、**Claude Desktop**と**Claude Code**のどちらを使っているかで手順が分かれていて、自分がどこを読めばいいのか迷った人は少なくないはずです。MCP（Model Context Protocol＝AIと外部ツールをつなぐ共通規格）の説明は規格そのものの話に寄りがちで、「**結局どの設定ファイルに何を書けばいいか**」だけを知りたいときには回り道になります。

この記事では、Claude DesktopとClaude Codeそれぞれの**設定手順**を、設定ファイルの場所から反映確認までひとつの流れで示します。MCPの通信方式や規格の深掘りは[MCPガイド](/blog/mcp-guide)に委ね、ここでは「**どの製品を使っていて、どこに書くか**」に絞ります。

Claude Codeのインストールがまだ済んでいない場合は、先に[Claude Codeのインストール](/blog/claude-code-install)を済ませてください。Cursorですでに MCP を設定した人は、**Claudeとは製品が違う**ため設定ファイルの場所も書き方も別物です。手順は[CursorのMCP設定入門](/blog/cursor-mcp-setup-basics)にまとめてあるので、本記事では扱いません。

> **今日の結論**
>
> - Claude の MCP 設定は「**Desktop か Code かを決める** → **設定ファイルに書く** → **再起動して確認する**」の3手順から始めます。まず自分がどちらの製品を使うかで手順が分かれます。
> - **Claude Desktop** は設定ファイルに MCP サーバーを記述する方式が中心です。**Claude Code** はコマンドで追加する経路が中心になります。
> - 設定値のうち **API キーやトークン類**は実値の扱いに注意が必要です。本記事の記入例はすべてプレースホルダで示しています。実値は公式の案内に沿って安全に設定してください。
> - 反映されないときは、**パス・書式・再起動**の3点から見直すと原因を絞りやすくなります。
> - MCP の仕組みや規格を理解したいときは [MCPガイド](/blog/mcp-guide) へ、Cursor 側の設定は [CursorのMCP設定入門](/blog/cursor-mcp-setup-basics) へ進んでください。本記事は **Claude 側の設定手順**に絞ります。

## まず Desktop か Code かを決める（設定場所が違う）

![Claude DesktopのGUIアプリとClaude CodeのCLIツールでMCP設定が分かれる分岐図。Desktopはclaude_desktop_config.json、Codeはclaude mcp addコマンド](/images/blog/claude-mcp-setup-basics/h2-1.png)

Claudeという名前は同じでも、**Claude Desktop**（チャット画面のGUIアプリ）と**Claude Code**（ターミナルで動くCLIツール）はMCPの**設定場所も書き方も別**です。まずはどちらを使っているかを確認してください。

普段Claudeとチャット形式でやり取りしていて、そこにMCPサーバーの機能を足したいなら **Claude Desktop 側**の設定になります。ターミナルから `claude` コマンドでコーディング作業を進めている場合は **Claude Code 側**です。両方使う場合は、それぞれで個別に設定が必要になります。片方に追加したMCPサーバーが、もう片方に**自動で反映されるわけではありません**。

Anthropicの[公式ヘルプ](https://support.claude.com/en/articles/10949351-getting-started-with-local-mcp-servers-on-claude-desktop)と[Claude Code の MCP 手順](https://code.claude.com/docs/en/mcp-quickstart)でも、Desktop の `claude_desktop_config.json` 経由の設定と Code 経由の設定は、**別の仕組み**として説明されています。次の章から、それぞれの手順を分けて見ていきます。

## Claude Desktop の MCP 設定（設定ファイルの場所と書き方）

Claude DesktopでMCPサーバーを使うには、**`claude_desktop_config.json`** という設定ファイルにサーバー情報を書き込みます。ファイルの場所はOSによって異なり、執筆時点（2026-08-28）に確認した範囲では次のとおりです。

| OS      | 設定ファイルの場所                                                |
| ------- | ----------------------------------------------------------------- |
| macOS   | `~/Library/Application Support/Claude/claude_desktop_config.json` |
| Windows | `%APPDATA%\Claude\claude_desktop_config.json`                     |

Claude Desktopの対応OSは執筆時点ではmacOSとWindowsが中心です。ファイルを直接探す代わりに、アプリ内の「**設定**」から **Developer 系**の項目を開き、設定ファイルを編集するメニューを選ぶと、ファイルが存在しない場合は**自動で作成**されます。メニューの名称は執筆時点のバージョンのものです。UIの表記はアップデートで変わることがあるため、見当たらない場合はアプリ内の表記に沿って探してください。

最小の記入例は次のようになります。

```json
{
  "mcpServers": {
    "example-server": {
      "command": "npx",
      "args": ["-y", "@example/mcp-server"],
      "env": {
        "API_KEY": "<APIキー>"
      }
    }
  }
}
```

command と args にはサーバーを起動するコマンドを、env には必要な環境変数をプレースホルダで書きます。ここに実際のAPIキーやトークンをそのまま貼り付けるのは避けてください。値の安全な管理は公式の案内に従うのが確実です。

保存したら、次の手順で反映を確認します。

1. Claude Desktopをいったん完全に終了する
2. 再度起動する
3. チャット画面のツール一覧やサーバー一覧に、追加したサーバー名が表示されているか確認する

設定ファイルはアプリの起動時に読み込まれると案内されており、**開いたままでは変更が反映されません**。これが再起動を挟む理由です。

なお、Anthropicの[公式ヘルプ](https://support.claude.com/en/articles/10949351-getting-started-with-local-mcp-servers-on-claude-desktop)では、**Desktop Extensions**（`.mcpb` という拡張機能形式）による1クリックインストールも案内されています。執筆時点で確認した範囲では、公式ヘルプはこちらの方法を先に紹介しています。**JSONを直接編集する方法**は、拡張機能ディレクトリに無いサーバーを使うときや、細かい設定を自分で調整したいときに向いています。目的に応じて選んでください。

設定手順の詳細は、同じ公式ヘルプの [Getting Started with Local MCP Servers on Claude Desktop](https://support.claude.com/en/articles/10949351-getting-started-with-local-mcp-servers-on-claude-desktop) にまとまっています。

## Claude Code の MCP 設定（追加と確認の手順）

Claude Codeの場合、設定ファイルを直接開く場面は少なく、ターミナルから **`claude mcp add`** コマンドでサーバーを追加するのが基本の経路です。実行すると、該当の設定ファイルに**自動で書き込まれます**。

URLで提供されているサーバーを追加する例は次のとおりです。

```bash
claude mcp add --transport http example-server https://example.com/mcp
```

ローカルで動くサーバーを追加する場合は、起動コマンドをそのまま指定します。

```bash
claude mcp add example-server -- npx -y @example/mcp-server
```

`--transport http` を付けない場合は、ローカルプロセスとして起動する方式になります。認証が必要なサーバーではトークンの指定が必要になる場合がありますが、実値はコマンド履歴や設定ファイルに残るため、共有端末での扱いには注意してください。

追加したサーバーが接続できているかは、次のコマンドで確認します。

```bash
claude mcp list
```

一覧に接続済みを示す表示が出ていれば反映されています。設定の保存先は**スコープ**と呼ばれる単位で分かれており、何も指定せずに追加した場合は**自分と現在のプロジェクトだけ**に閉じたスコープになります。これが既定の挙動です。チームで共有したいときや、すべてのプロジェクトで使いたいときは、コマンドのオプションでスコープを切り替えられます。

Claude DesktopとClaude Codeは**設定ファイルが別**であるため、どちらか一方で追加したサーバーがもう一方に現れることはありません。両方で同じサーバーを使いたい場合は、**それぞれで追加**してください。

手順の全体は、[Anthropic公式ドキュメントの Connect to MCP servers](https://code.claude.com/docs/en/mcp-quickstart) にまとまっています。

## 反映されないときの見直し3点（パス・書式・再起動）

設定を保存しても反映されないときは、次の **3系統**（**パス・書式・再起動**）から見直すと原因を絞りやすくなります。

| 症状                                   | 考えられる原因                                     | 見直す方向                                                                                                                      |
| -------------------------------------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| サーバーが一覧やツール表示に出てこない | ファイルの場所を間違えている、相対パスを書いている | 設定ファイルの場所を開き直して確認する。パスは絶対パスで書く                                                                    |
| 保存しても何も変わらない               | JSONの書式エラー（カンマや括弧の閉じ忘れ）         | JSON全体が構文単位で解釈されるため、1か所のミスでファイル全体が読み込まれなくなります。オンラインの検証ツール等で構文を確認する |
| 設定は正しそうなのに反映されない       | 再起動漏れ（アプリを開いたまま保存した）           | いったん完全に終了してから開き直す                                                                                              |
| 接続エラーの表示が出る（Claude Code）  | 認証情報の不足やネットワークの問題                 | `claude mcp list` や `claude mcp get <name>` でエラー内容を確認し、公式のトラブルシューティングを参照する                       |

書式エラーが起きると、そのサーバーだけでなく設定ファイル全体が読み込まれなくなることがあります。JSONが構文単位でまとめて解釈される仕組みのため、1か所の閉じ忘れが全体に影響するのがこの現象の理由です。エラーメッセージの文言は環境やバージョンによって変わるため、表示された内容をそのまま検索するか、公式ドキュメントのトラブルシューティング項目と照らし合わせるのが近道です。

## 次に読む（仕組みは MCP の地図へ・Cursor 側・Hub）

MCPの仕組みやプロトコルそのものを詳しく知りたい場合は、[MCPガイド](/blog/mcp-guide)で規格側の解説を確認できます。

Cursor側でMCPを設定したい場合や、Claudeとの違いが気になる場合は、[CursorのMCP設定入門](/blog/cursor-mcp-setup-basics)へ進んでください。**製品が違う**ため、設定ファイルの場所も書き方も本記事とは別物です。

Claude Codeが初めての場合は、[Claude Codeの始め方](/blog/claude-code-getting-started)でインストールから最初の一歩までを確認できます。

Claude DesktopのMCP設定をより丁寧に扱う記事は準備中です。公開までは、本記事と[MCPガイド](/blog/mcp-guide)の内容を参考にしてください。

Claude開発者シリーズ全体の読む順は、Hub記事の[Claude Code ガイド](/blog/claude-code-guide)にまとめてあります。

---

本記事の内容は執筆時点（2026-08-28）の情報に基づきます。Claude Desktop／Claude Code の MCP 対応範囲・設定ファイルの場所・仕様は変更される可能性があります。サードパーティ製 MCP サーバーの安全性・動作は保証できません。重要な判断は公式ドキュメントで確認してください。
