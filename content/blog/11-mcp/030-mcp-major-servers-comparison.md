---
title: "主要MCP Server比較｜Filesystem／GitHub／Searchの選び方"
description: "ローカルのファイル操作、GitHubのIssue／PR、Web検索のどれを足すか迷う人向けに、Filesystem／GitHub／Search（Brave）の用途の違いと選び方を整理します。個別の接続手順・おすすめ一覧の再掲・他社Searchの網羅比較は扱いません。"
date: 2026-09-25
tags:
  - MCP
  - Server
  - 比較
  - Filesystem
  - GitHub
  - Search
  - Brave
site: toolarc.jp
target: "ローカルのファイル操作、GitHubのIssue／PR、Web検索のうちどれを足すか迷っている人。3者の役割の違いがぼやけている人や、どれか1つを足したあと別の作業が増えた人も対象。"
---

# 主要MCP Server比較｜Filesystem／GitHub／Searchの選び方

MCP対応のClientにServerを足そうとして、ローカルのファイル操作、GitHubのIssueやPR、Web検索のどれを選べばよいか迷うことがあります。3つの名前を見聞きしたことはあっても、役割の違いがはっきりしないまま設定を進めてしまう人も少なくありません。

この記事で扱うのは、Filesystem／GitHub／Search（本記事ではBrave Search MCPを代表例とします）の用途の違いと選び方、そして途中で止まったときの戻り先です。

個別の接続手順の全文、おすすめServerの一覧の再掲、他社Search MCPとの網羅的な比較は、この記事では扱いません。それぞれ必要になったタイミングで、関連する記事や公式ドキュメントを確認する形になります。

> **今日の結論**
> - **Filesystem**は許可したローカルファイル、**GitHub**はリポジトリとIssue／PR、**Search**（Brave Search MCPを代表例とする）はWeb上の情報取得を担当します。まず決めるのは、いまやりたい作業がどれに近いかです。
> - 進め方は「作業を1つ決める → 担当するServerを見る → 手順記事や公式READMEで接続する → 止まったら権限・認証情報・設定のどこに戻るか確認する」の順です。
> - 候補を広く見たいときの選定一覧、接続画面の操作やキー発行の全文、権限の深い見直しは、この記事では扱いません。
> - 接続の成否や安全性は、公式ドキュメントと使うアプリの画面で確認してください。

## まず整理：Filesystem／GitHub／Searchは担当が違う

3つのServerは、それぞれ担当する領域がはっきり分かれています。

- **Filesystem**: 許可したローカルディレクトリの中で、ファイルの読み書きを担当します（[公式README](https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem)）。
- **GitHub**: リポジトリの操作、Issueの確認やPRの作成を担当します（[公式README](https://github.com/github/github-mcp-server)）。
- **Search**: Web上の情報取得を担当します。本記事ではBrave Search MCPを代表例として扱います（[公式README](https://github.com/brave/brave-search-mcp-server)）。

各公式READMEを2026年9月時点で確認した範囲では、3者の役割が重なる場面はほとんどありません。担当が分かれている分、迷ったときに見るべき場所も変わります。この記事では作業に対する担当の切り分けだけを扱います。選定一覧の再掲や接続手順の全文は扱いません。

## やりたい作業から選ぶ

役割が分かったところで、実際の作業に当てはめてみます。

| やりたい作業 | 担当するServer |
| --- | --- |
| ローカルの書類を読む・書く | Filesystem |
| IssueやPRを扱う | GitHub |
| 最新のWeb情報を取得する | Search（Brave Search MCPなど） |

作業ごとに担当が分かれているため、最初から全部を足す必要はありません。1つの作業に、まず1つのServer。その進め方で十分です。

Searchについては、本記事ではBrave Search MCPを代表例として扱っています。ほかのSearch系Serverが必要な場合は、公式ドキュメントや選定一覧の記事を確認してください。料金や速度の優劣は、この記事では扱いません。

## 進める順番：作業→担当→接続→戻り先

複数のServerを一度に検討すると、どこから手を付けるべきか分かりにくくなります。次の順番で進めると迷いにくくなります。

1. やりたい作業を1つ決めます。
2. その作業をFilesystem／GitHub／Searchのどれが担当するかを確認します。
3. 選んだServerの手順記事、または公式READMEを見ながら接続します。
4. 途中で止まった場合は、権限・認証情報・設定のどこに戻るかを次の見出しで確認します。

![やりたい作業からFilesystem・GitHub・Searchの担当を選び、接続へ進む流れ図](/images/blog/mcp-major-servers-comparison/h2-1.png)

MCPの初期設定や`mcp.json`の書き方に自信がない場合は、[MCPの初回接続ガイド](/blog/mcp-first-setup-guide)や[mcp.jsonの書き方](/blog/mcp-config-json-guide)を先に確認すると迷いにくくなります。使っているClientによって設定ファイルの書き方が変わるため、[Cursorでの設定手順](/blog/mcp-cursor-setup)、[Claude Desktopでの設定手順](/blog/mcp-claude-desktop-setup)、[Claude Codeでの設定手順](/blog/mcp-claude-code-setup)、[VS Codeでの設定手順](/blog/mcp-vscode-setup)も、使っているアプリに合わせて参考にしてください。

## 止まったときの戻り先

接続の途中で止まる理由は、いくつかのパターンに分かれます。

- 作業とServerの対応がそもそも違っていた場合は、この記事の分岐に戻って作業を見直します。
- 認証が通らない場合は、各Serverの手順記事で認証情報の扱いを確認します。
- 許可するディレクトリやAPIキーの設定が合わない場合は、使うアプリの設定画面を見直します。
- 権限の範囲そのものを見直したい場合は、[権限まわりの記事](/blog/mcp-security-permissions)を確認します。

ログや設定例に認証情報そのものを書き残さないよう注意してください。接続エラーの手順全文や、権限の監査チェックリストの完結は、この記事では扱いません。

## 決めたあとに進む選定一覧・手順・権限

作業とServerの対応が決まったら、次に進む先は目的によって変わります。

候補をもっと広く比較したい場合は、[Server選定一覧の記事](/blog/mcp-recommended-servers)で他のServerも含めて見比べられます。接続そのものを進めたい場合は、[GitHub MCP Serverの手順記事](/blog/mcp-github-server-setup)、[Filesystemの手順記事](/blog/mcp-filesystem-setup)、[Brave Search MCPの手順記事](/blog/mcp-brave-search-setup)をそれぞれ確認してください。権限の設計をもう一段深く見直したい場合は、前の見出しの権限記事が担当します。

MCPまわりを初めて触る場合は、[MCPガイド](/blog/mcp-guide)で用語や読む順を確認すると、この先の記事同士のつながりが見えやすくなります。仕様や公式案内の更新を追う順番が必要になったときは、[公式動向・仕様更新の追い方](/blog/mcp-official-updates-follow)を確認してください。この記事では「いまの作業にはどのServerを足すか」という分岐だけを扱います。3者の優劣は、この記事では扱いません。

---

本記事の内容は執筆時点（2026-09-25）の情報に基づきます。各Serverの公式READMEおよび関連する公開案内を参照しており、掲載の比較は実機で3者を並べて検証した結果ではありません。接続の成功、安全性、性能や料金の優劣、全Client同一手順を保証するものではありません。Serverや使うアプリの版によって手順は異なります。重要な判断は公式ドキュメントで確認してください。
