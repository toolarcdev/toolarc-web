---
title: "CursorとClaudeのMCP比較｜設定の違いと進め方の判断"
description: "CursorとClaude Desktop／Claude CodeでMCPをつなぐとき、設定は共有できるのか、どこが違い、どう進めばよいか迷う人向けです。追加の方法、置き場所、反映の仕方を比べます。設定は自動では共有されません。製品全体の優劣比較ではありません。"
date: 2026-09-20
tags:
  - MCP
  - Cursor
  - Claude
  - 比較
  - ツール連携
  - mcp-series
site: toolarc.jp
target: "CursorとClaude Desktop／Claude CodeでMCPをつなぐとき、設定は共有できるのか、どこが違い、どう進めばよいか迷っている開発者。どちらか一方だけ触った人や、Claude側のDesktop／Codeの分かれ方がまだ曖昧な人も対象。"
last_update: 2026-09-23
---

# CursorとClaudeのMCP比較｜設定の違いと進め方の判断

CursorとClaude Desktop、Claude Codeの両方でMCPをつなぎたいとき、最初につまずくのは「設定は使い回せるのか」という点です。片方で一度サーバーを追加した経験があっても、もう一方のアプリでは設定ファイルの場所も追加の手順も違い、同じJSONをそのまま貼り付ければ動くとは限りません。とくにClaude側はDesktopとCodeという二つの接続先に分かれているため、「Claudeに追加した」というだけでは、どちらのことか本人にも分かりにくくなります。

この記事では、CursorとClaude Desktop、Claude CodeでMCPサーバーを足すときの違いを、追加の方法、設定の置き場所、反映の仕方で比べます。設定は自動では共有されません。そのうえで、どのアプリが向きやすいかを整理します。各アプリの画面操作を最初から最後まで追うことや、製品としての優劣を判定することは、この記事では扱いません。

> **今日の結論**
> - MCPの約束ごと（Toolsなどを見つけて呼び出す仕組み）は共通ですが、つなぐ先のアプリ（Client）ごとに、追加の方法・置き場所・反映の仕方は違います。
> - Claude側はClaude DesktopとClaude Codeで分かれます。Cursorと並べて「Claude＝1つの設定場所」として扱うと、あとで混乱します。
> - 比較の軸は、どう追加するか（画面／設定ファイル／CLI）、どこに書くか（プロジェクトかグローバルか）、どう反映するかの3つです。
> - 設定は基本的に自動では共有されません。同じMCPサーバーを使い回す場合も、つなぐ先のアプリ向けに書き直す必要があります。
> - 向きやすい場面でアプリを決めます。足し方の細部は、決めたあとにそれぞれの設定手順へ進みます。どのアプリでも、権限や承認の見直しは残ります。

## まず整理：CursorとClaude（Desktop／Code）は別の接続先

MCPは、AIアシスタントが外部のツールやデータソースを「見つけて呼び出す」ための共通の約束ごとです。MCP公式の[What is MCP?](https://modelcontextprotocol.io/docs/getting-started/intro)でも、対応するアプリがツールやデータソースに接続するための仕組みとして説明されています。この土台自体はCursorでもClaudeでも変わりません。変わるのは、その約束ごとをどのアプリが実装し、どこに設定を持たせているかという部分です。

Claude側はここが少しややこしく、デスクトップアプリの**Claude Desktop**と、ターミナルで動く**Claude Code**という、性格の違う二つの接続先に分かれています。Desktopは画面から操作するチャットアプリ、Codeはリポジトリの中で動くCLIツールという位置づけで、設定ファイルも仕組みも別です。以降は「Claude」とまとめず、DesktopとCodeのどちらを指すかを分けて説明します。

Cursorは、コーディング用のIDE（Agent機能を含む）にMCPを組み込んだ製品のひとつという位置づけです。エディタやモデルの機能比較はこの記事では扱いません。見るのは、MCPをどう足すかという軸だけです。

## 比較の軸：追加の方法・置き場所・反映

つなぐ先の3つのアプリを、**追加の方法・置き場所・反映**という3つの軸で並べると、次のようになります。数値や優劣を示す表ではなく、違いを整理するための表です。

| 軸 | Cursor | Claude Desktop | Claude Code |
|---|---|---|---|
| 追加の方法 | サイドバーのCustomize（MCPs）、または`mcp.json`を直接編集 | Extensions（ディレクトリからのインストール）、または設定ファイルを直接編集。リモートはConnectors画面からURLを登録 | `claude mcp add`コマンド、または`.mcp.json`を直接編集 |
| 置き場所 | プロジェクト用は`.cursor/mcp.json`、グローバル用は`~/.cursor/mcp.json` | `claude_desktop_config.json`（macOSは`~/Library/Application Support/Claude/`、Windowsは`%APPDATA%\Claude\`） | local・project・userの3スコープに分かれ、それぞれ保存先が違う |
| 反映 | Customize（MCPs）の一覧で接続を確認。反映にはアプリの再起動が必要になる場合がある | 完全終了してからの再起動が必要（ウィンドウを閉じるだけでは反映されない） | コマンド実行後すぐに使える。`/mcp`や`claude mcp list`で状態を確認する |

Cursorの置き場所は、プロジェクト直下とホームディレクトリの2段構え。[Cursor DocsのMCP](https://cursor.com/docs/mcp)でも、この2つの置き場が案内されています。Claude Codeはこれをさらに細かくし、自分専用のlocal、チームで共有するproject、全プロジェクトで使うuserという3段のスコープを持ちます（[Claude CodeのMCP案内](https://code.claude.com/docs/en/mcp)）。Claude Desktopは基本的に1つの設定ファイルにまとまっていますが、[Extensionsからの追加](https://support.claude.com/en/articles/10949351-getting-started-with-local-mcp-servers-on-claude-desktop)も用意されており、手でJSONを書かずに済む場面が増えています。

ローカルで動くサーバーとリモートのサーバーでは、追加の手順や反映のされ方にも差があります。この記事では「差がある」という点に留め、通信方式ごとの詳しい比較はしません。

![Cursor、Claude Desktop、Claude Codeの3つの接続先を並べ、設定が自動では共有されないことを示す概念図](/images/blog/cursor-mcp-vs-claude-mcp/h2-1.png)

## 向きやすい場面を分ける

- **Cursor**: IDEでの作業やAgentとのやり取りの流れの中で、そのままツールを足したいとき。コードを書きながらMCP経由で外部データを参照する使い方に向きます。
- **Claude Desktop**: チャット中心の使い方で、画面から手軽にサーバーを足したいとき。Extensionsのワンクリックインストールに対応したサーバーであれば、JSONを書かずに済みます。
- **Claude Code**: ターミナルやCLIでの作業が前提で、チームでの共有や、プロジェクトごとにスコープを明示して追加したいとき。

「常にこのアプリが正解」と決めつける必要はありません。CursorとClaudeを両方使っている人なら、併用もめずらしくないでしょう。ただし、次の節で見るとおり、設定は別々に用意する必要があります。

## 設定は自動では共有されない

CursorとClaude（Desktop／Code）の間で、MCPの設定が自動で共有されることは基本的にありません。同じサーバーを両方のアプリで使いたい場合も、キー名や追加コマンド、置き場所は、つなぐ先のアプリ向けに書き直す必要があります。

ここには一つ例外があります。[Claude CodeのMCP案内](https://code.claude.com/docs/en/mcp)で確認した範囲では、Claude Codeには`claude mcp add-from-claude-desktop`というコマンドが用意されており（対応はmacOSとWSL）、Claude Desktop側の設定を対話形式で選んでインポートできます。ただしこれは自動反映ではなく、こちらから明示的に実行する取り込み手順です。CursorとClaudeの間に同等の取り込みコマンドがあるかどうかは、本記事の執筆時点では確認していません。

どのアプリを選んでも、サーバーに渡す権限や承認の範囲は別途見直しが必要です。権限の見直し手順はこの記事では扱いません。必要になったときは[MCPの権限管理](/blog/mcp-security-permissions)を参照してください。

## 決めたあとに進む設定手順

向くアプリが決まったら、次は実際に足す手順です。

- Cursorで足す場合は[Cursor MCPの設定手順](/blog/mcp-cursor-setup)へ。まず場所だけ確認したいなら[Cursor MCP設定の基本](/blog/cursor-mcp-setup-basics)が近道です。
- Claude Desktopは[Claude Desktop MCPの設定手順](/blog/mcp-claude-desktop-setup)、Claude Codeは[Claude Code MCPの設定手順](/blog/mcp-claude-code-setup)にまとめています。DesktopとCodeの場所だけ先に確認したいときは[Claude MCP設定の基本](/blog/claude-mcp-setup-basics)へ。
- JSONの書き方で止まったら[MCP設定ファイルの書き方](/blog/mcp-config-json-guide)、横断的な初回確認は[MCP初回セットアップガイド](/blog/mcp-first-setup-guide)を参照してください。
- 通信方式（stdioとSSE／Streamable HTTPの違いなど）で迷ったら[MCPのstdioとSSE／Streamable HTTPの違い](/blog/mcp-stdio-vs-sse-transport)へ。
- そもそもMCPで良いのか、REST APIを直接呼ぶ方が合うのかで迷う場合は[MCPとREST APIの比較](/blog/mcp-vs-rest-api-comparison)を参照してください。

同じ Server を複数のアプリにまたがって足す順番と、止まったときの戻り先は、[同じMCPをCursorとClaudeで使う](/blog/mcp-cursor-claude-workflow)で扱っています。MCP全体の位置づけや、関連記事の一覧は[MCP入門ガイド](/blog/mcp-guide)から確認できます。

---

本記事の内容は執筆時点（2026-09-20）の情報に基づきます。Cursor・Claude Desktop・Claude Codeの公式ドキュメントを参照しており、掲載の比較は実機で接続を比べた結果ではありません。MCPの仕様、各アプリの設定手順・画面名・対応は変更される可能性があります。本記事は接続の成功、製品や性能の優劣、安全性を保証するものではありません。重要な判断は公式ドキュメントで確認してください。
