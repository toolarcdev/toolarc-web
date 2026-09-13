---
title: "Claude DesktopのMCP設定｜Extensionsと設定JSONの選び方"
description: "Claude DesktopでMCPを設定する人向けに、Extensionsと設定JSONの選び方、開き方と完全終了での反映、追加後の認識・呼び出し・承認の確認までを整理します。使い分け記事との関係と、JSONやトランスポートで止まったときの次の確認先も分かります。"
date: 2026-09-13
tags:
  - MCP
  - Claude Desktop
  - Desktop Extensions
  - 設定
  - 動作確認
  - mcp-series
site: toolarc.jp
target: "Claude DesktopでMCPを設定するにあたり、Extensionsと設定JSONの選び方、追加後の確認範囲、使い分け記事との関係で迷っている人。"
---

# Claude DesktopのMCP設定｜Extensionsと設定JSONの選び方

Claude DesktopでMCPサーバーをつなごうとすると、**Desktop Extensions** と設定ファイルの直接編集のどちらを使えばよいか迷う場面があります。設定を追加したあとも、一覧に出ているか、実際にツールを呼べるか、権限の範囲が広すぎないかをどこまで確認すればよいか判断しづらい人は少なくありません。

本記事では、Claude DesktopでのMCPサーバー追加を、追加方法の選択、設定の開き方と反映、ローカル起動設定の書き分け、追加後の確認という順に整理します。保存後にアプリを再起動する理由や、認識・呼び出し・承認を分けて確認する意味まで追えるようにします。

Claude DesktopとClaude Codeの分岐、設定ファイルの場所探しは[Claude DesktopとClaude Codeの使い分けを整理した記事](/blog/claude-mcp-setup-basics)に譲ります。記法やトランスポートの選び方も別記事で扱い、本記事はDesktop側の適用と確認に絞ります。

> **今日の結論**
>
> - Claude Desktopでは、公式が先に案内する **Desktop Extensions** と、設定ファイル（`claude_desktop_config.json`）の直接編集を用途で使い分けます。
> - 設定の開き方（ExtensionsタブまたはDeveloperタブ）と、変更の反映（アプリの完全終了と再起動）は別の作業として扱います。
> - ローカル起動は`command`・`args`・必要なら`env`を接続先の案内に合わせて書き、秘密値はプレースホルダにします。
> - 追加後は「一覧に出ているか」「ツールを呼べるか」「承認の範囲が意図どおりか」を分けて確認します。
> - 止まったら、ログの場所と、記法・接続方式・初回セットアップを扱う記事へ切り分けます。Claude Codeの手順は別記事です。

## Extensionsと設定JSONのどちらで足すかを決める

![Claude DesktopでExtensionsと設定JSONのどちらを選ぶかを示す概念図](/images/blog/mcp-claude-desktop-setup/h2-1.png)

[Claudeの公式ヘルプ（Local MCP on Desktop）](https://support.claude.com/en/articles/10949351-getting-started-with-local-mcp-servers-on-claude-desktop)は、**Desktop Extensions** をまず案内しています。Claude Desktopの「Settings」を開き、「Extensions」タブから「Browse extensions」でディレクトリを表示し、使いたい拡張機能を選んで「Install」を押す流れです。依存関係の管理や設定ファイルの編集をせずに、必要なAPIキーなどをフォーム形式で入力するだけで済みます。

一方、設定ファイル（`claude_desktop_config.json`）の直接編集は、ディレクトリに無いサーバーをつなぎたいときや、起動オプションを細かく調整したいときの方法です。「常に非推奨」というわけではなく、用途に応じて選ぶ方法として扱ってください。

Desktop／Codeの分岐と場所探しは[Claude DesktopとClaude Codeの使い分けを整理した記事](/blog/claude-mcp-setup-basics)で確認してください。Claude Codeを使っている場合、本記事のDesktop手順は対象外です。

## 設定の開き方と完全終了での反映を分ける

設定の開き方は足し方によって異なります。**Extensionsから足す場合** では、Claude Desktopのメニューから「Settings...」を開き、「Extensions」タブで「Browse extensions」からインストールし、必要な設定項目を画面上で埋めます。

**設定ファイルを書く場合** では、同じSettingsウィンドウの「Developer」タブにある「Edit Config」を押すと`claude_desktop_config.json`が開きます。ファイルが無ければ新規に作成され、保存場所はmacOSが`~/Library/Application Support/Claude/claude_desktop_config.json`、Windowsが`%APPDATA%\Claude\claude_desktop_config.json`です。[MCP公式のローカル接続ガイド](https://modelcontextprotocol.io/docs/develop/connect-local-servers)でも、設定ファイルの編集と再起動の流れが案内されています。

どちらで変更しても、反映のさせ方は共通です。ウィンドウを閉じるだけでは新しい設定が読み込まれないため、Claude Desktopをいったん完全に終了してから起動し直します。MCPサーバー自体の起動が、アプリの再起動に合わせて行われる仕組みだからです。

メニュー名や項目の並びが本記事と違って見える場合、バージョン差が原因のことがあります。その際は公式ヘルプで現行の表記を確認してください。

## ローカル起動の設定を短く書き分ける

ローカルで動くMCPサーバーをJSON経由で足す場合、最低限書くのは`command`と`args`です。APIキーなど環境変数が必要なサーバーでは`env`も追加します。値は、つなぎたいサーバー側が案内する起動情報に合わせてください。

パスは絶対パスを使うのが安全です。相対パスだと、起動時のカレントディレクトリ次第で見つからないことがあります。Windowsのパス区切りをエスケープする書き方は[設定ファイルの記法ガイド](/blog/mcp-config-json-guide)にまとめています。

以下は構造を説明するための最小例です。実際に接続できることを確認したものではなく、パッケージ名やパスは説明用です。

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

秘密値はプレースホルダのまま置き、実際のトークンは書き込まないでください。Extensions側で入力した機密項目（sensitive設定）は、macOSのキーチェーンやWindowsの資格情報マネージャーなど、OSの安全な保存領域に暗号化して保存される案内になっています。設定ファイルでは同じ暗号化は働きません。

ローカルで動かすかリモートのURLでつなぐか自体で迷っている場合は、[ローカルとリモートの接続方式比較](/blog/mcp-stdio-vs-sse-transport)で扱っています。キーの型や追記方法など記法の詳細は[設定ファイルの記法ガイド](/blog/mcp-config-json-guide)に譲ります。

## 追加後に認識・呼び出し・承認を分けて確認する

設定を保存したら、次の順で確認します。

1. **反映**: 設定またはExtensionsの変更を保存し、必要に応じてアプリを完全に終了してから再起動します。
2. **認識**: チャット入力欄の左下にある「ファイル・コネクタなどを追加」のアイコンを開き、「Connectors」にカーソルを合わせて対象のサーバー名が一覧に出ているかを確認します。Developer側の接続状況やログからも同じことを確認できます。
3. **呼び出し**: チャットでそのサーバーのツールを使う依頼をします。承認のダイアログが出たら、ツール名と渡される引数を確認してから許可してください。会話の返答が「できました」と表示されるだけでは、実際にツールが呼ばれたかどうかの判定にはなりません。
4. **承認の範囲**: 許可した権限やアクセス可能なディレクトリ、APIキーの入力欄が意図どおりかを見ます。常時許可を広く与えすぎたり、想定より広いディレクトリを公開したりしないようにします。

一覧に出ている状態が認識、実行結果とログが一致している状態が呼び出しの確認、権限が意図どおりである状態が承認の確認です。分けて考えると、止まったときの切り分けがしやすくなります。準備から初回の呼び出しまでを横断で確認したい場合は、[MCP初回セットアップの手順](/blog/mcp-first-setup-guide)にまとめています。

## 止まったらログと隣記事へ切り分ける

うまくいかないときは、原因を一つに決めつけず、症状ごとに次の確認先へ進みます。

| 症状                                     | 次に確認するもの                                                                                                                                                                                                                                   |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 一覧やConnectorsに出てこない             | 保存後に完全終了と再起動をしたか、Extensionsの設定項目が埋まっているか、無効化されていないかを見直します。画面自体が見当たらない場合は[Claude DesktopとClaude Codeの使い分けを整理した記事](/blog/claude-mcp-setup-basics)で場所を確認してください |
| JSONの構文やキーで止まる                 | [設定ファイルの記法ガイド](/blog/mcp-config-json-guide)で型と書き方を確認します                                                                                                                                                                    |
| ローカルにするかURLにするか迷う          | [ローカルとリモートの接続方式比較](/blog/mcp-stdio-vs-sse-transport)で比較しています                                                                                                                                                               |
| 初回の準備から呼び出しまでの流れが欲しい | [MCP初回セットアップの手順](/blog/mcp-first-setup-guide)に横断のチェックリストがあります                                                                                                                                                           |
| Cursorを使っている                       | [Cursor側のMCP設定](/blog/mcp-cursor-setup)に手順があります。本記事はDesktop向けのため手順は書きません                                                                                                                                             |

ログを見る場合、macOSは`~/Library/Logs/Claude`、Windowsは`%APPDATA%\Claude\logs`に出力されます。`mcp.log`が全体の接続状況、`mcp-server-サーバー名.log`が個別サーバーの出力です。Developer設定の画面からも、同じ接続状況を確認できます。

Claude Codeでの接続が必要な場合は、手順を別記事にまとめる予定です。現時点は準備中のため、リンクは案内していません。

## まとめ

Claude DesktopでMCPを足すときは、まずExtensionsと設定ファイルのどちらを使うかを決め、開き方と反映を分けて扱うと迷いにくくなります。追加後は一覧に出ているか、呼び出せるか、権限が意図どおりかを順番に確認してください。

関連する手順は、[MCP設定ガイド](/blog/mcp-guide)からたどれます。

---

本記事の内容は執筆時点（2026-09-13）の情報に基づきます。公式ヘルプおよびMCP公式ドキュメントを2026-09-13時点で確認した範囲で構成しており、掲載した手順の実機動作そのものは検証していません。設定画面の名称やファイルパス、Extensionsの挙動はバージョンによって変わる可能性があります。接続の成功や安全性を保証するものではないため、重要な判断は公式ドキュメントで確認してください。
