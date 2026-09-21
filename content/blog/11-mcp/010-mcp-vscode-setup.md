---
title: "VS CodeのMCP設定｜mcp.jsonの置き場所と追加後の確認"
description: "VS CodeでMCPを追加する人向けに、拡張ギャラリーとmcp.jsonの二系統、ワークスペースとユーザー設定の置き場所、serversキーとmcpServersの違い、追加後の登録・呼び出し・権限確認までを一つの流れで丁寧に整理します。"
date: 2026-09-16
tags:
  - MCP
  - VS Code
  - GitHub Copilot
  - mcp.json
  - 設定
  - mcp-series
site: toolarc.jp
target: "VS Code（Copilot Agent）でMCPを追加したいが、置き場所と確認範囲で迷っている人。"
---

# VS CodeのMCP設定｜mcp.jsonの置き場所と追加後の確認

VS CodeでMCPサーバーを足したいとき、拡張機能のギャラリーから入れるのか、設定ファイルを手で書くのかで迷いやすいです。Cursorの`mcpServers`キーをそのまま貼っても動かない、というつまずきも起きがちです。

本記事では、VS Code側の追加経路、`.vscode/mcp.json`とユーザー設定の違い、追加後に確認すべき段階までを整理します。

> **今日の結論**
>
> - VS CodeのMCPは、GitHub CopilotのAgent連携を前提に組み込まれており、専用の「MCP拡張を別途入れる」というより、設定と確認の流れを押さえることが中心です。
> - 追加経路は、拡張ビューの`@mcp`ギャラリー、コマンドパレットの「MCP: Add Server」、`mcp.json`の直接編集の3つがあります。
> - ワークスペースは`.vscode/mcp.json`、横断は「MCP: Open User Configuration」です。キー名は`servers`で、Cursor等の`mcpServers`とは異なります。
> - 追加後は「一覧に出ているか」「信頼して起動できたか」「チャット（Agent）からツールを呼べるか」を分けて確認します。
> - Cursor／Claude向けの手順記事とはClientが違うため、設定ファイルをそのまま共有しない方が安全です。

本記事は、筆者が公式ドキュメントを確認した内容をもとに整理しています。掲載した画面名や操作の流れは実機未確認です。バージョン差で表示が違う場合は、公式ドキュメントの現行案内を優先してください。

## 追加の入口を3つに分けて選ぶ

VS CodeでMCPサーバーを足す主な入口は次の3つです。いずれも最終的には設定ファイルか、同等の登録情報に着地します。

| 入口 | 向いている場面 | 公式の入口 |
| --- | --- | --- |
| 拡張ビューで`@mcp`検索 | ギャラリー掲載サーバーを手早く入れる | [Add and manage MCP servers](https://code.visualstudio.com/docs/agent-customization/mcp-servers) |
| コマンドパレット「MCP: Add Server」 | 対話式でWorkspace／Globalを選んで追加する | 同上 |
| `mcp.json`を直接編集 | チーム共有や差分レビューをしたい | [MCP configuration reference](https://code.visualstudio.com/docs/agents/reference/mcp-configuration) |

ギャラリーから入れる場合、ユーザープロファイルへ入れるか、ワークスペースへ入れるかを選べます。ワークスペース側を選ぶと、プロジェクトの`.vscode/mcp.json`が更新される想定です。画面のラベルはバージョンで変わることがあるため、見当たらないときはコマンドパレットの「MCP:」系コマンドを先に探すと早いです。

Cursor側の設定だけを知りたい場合は、[CursorのMCP設定](/blog/mcp-cursor-setup)へ進んでください。本記事はVS Code側に限定します。

## ワークスペースとユーザー設定の置き場所を決める

手で書く場合の置き場所は、大きく2つです。

| 置き場所 | パス／開き方 | 向いている用途 |
| --- | --- | --- |
| ワークスペース | プロジェクトの`.vscode/mcp.json` | リポジトリで共有したいサーバー |
| ユーザー | 「MCP: Open User Configuration」で開くプロファイル側 | 全ワークスペースで使う常用サーバー |

VS Codeの設定例では、トップレベルに`servers`オブジェクトを置きます。ローカル起動は`command`と`args`、リモートは`type`と`url`（必要なら認証ヘッダー）という大枠です。次は構造確認用の最小例です。接続情報としては使えません。

```json
{
  "servers": {
    "local-example": {
      "command": "npx",
      "args": ["-y", "mcp-server"]
    },
    "remote-example": {
      "type": "http",
      "url": "https://example.invalid/mcp"
    }
  }
}
```

**いちばん多いつまずき**は、CursorやClaude Desktop向けの`mcpServers`キーをそのまま貼ることです。VS Code側は`servers`です。キー名が違うと一覧に出ない／起動しない、という症状になりやすいので、Clientごとに書き分ける前提で扱ってください。共通のJSON作法は[mcp.jsonの書き方ガイド](/blog/mcp-config-json-guide)も参照できますが、キー名の差は本記事の注意が優先です。

認証情報は直書きせず、公式が案内するinput変数や環境変数参照を使います。トークンをリポジトリにコミットしない、が最低ラインです。

## 追加後に認識・起動・呼び出しを分けて確認する

保存しただけでは「使える」とは限りません。確認は次の段階に分けると切り分けやすいです。

1. **登録の確認**: 「MCP: List Servers」などで対象が表示されるか見る。無い場合は保存先とキー名（`servers`）を疑う。
2. **信頼と起動**: 初回は信頼確認が出ることがあります。公式手順に沿い、起動や再読み込みを行う。
3. **呼び出しの確認**: Copilot ChatをAgentモード側にしたうえで、ツール一覧や実際の依頼で呼べるかを見る。[GitHub DocsのCopilot×MCP](https://docs.github.com/en/copilot/how-tos/provide-context/use-mcp-in-your-ide/extend-copilot-chat-with-mcp)もあわせて確認すると安全です。
4. **権限の見直し**: 不要に広い権限や、用途不明のServerを常時許可していないかを一度見直す。

「一覧にある」と「チャットから呼べる」は別問題です。途中で止まったら、登録→起動→呼び出しのどこかを切り分けてください。

## 止まったら隣記事と公式へ戻る

| 症状 | 次に確認すること |
| --- | --- |
| キー名や構文で止まる | 本記事の`servers`注意／[mcp.jsonの書き方](/blog/mcp-config-json-guide) |
| Cursorの設定を流用して動かない | [CursorのMCP設定](/blog/mcp-cursor-setup)と比較し、Client差分を確認 |
| 接続方式（stdio／HTTP）で迷う | [MCPのstdioとSSE](/blog/mcp-stdio-vs-sse-transport) |
| GitHub公式Serverを入れたい | [GitHub MCP Serverの設定](/blog/mcp-github-server-setup) |
| どのServerから試すか迷う | [おすすめMCP Server一覧](/blog/mcp-recommended-servers) |

シリーズ全体の入口は[MCPガイド](/blog/mcp-guide)から辿れます。

## よくある質問（FAQ）

**Q1. VS Codeに「MCP専用拡張」を別途入れる必要がありますか？**

公式案内では、MCPはVS Code側の機能として扱われ、ギャラリーの`@mcp`や設定ファイルから追加する流れが中心です。画面や前提はバージョンで変わるため、重要判断は公式ドキュメントを優先してください。

**Q2. Cursorのmcp.jsonをそのままコピーしてよいですか？**

おすすめしません。キー名（`mcpServers`と`servers`）やパス、承認の流れがClientごとに違います。流用するなら構造を見比べ、VS Code用に書き直してください。

**Q3. ワークスペースとユーザー、どちらに書くべきですか？**

チームで同じServerを共有したいならワークスペース、個人の常用だけならユーザー、が分かりやすいです。両方ある場合の優先は公式の現行説明を確認してください。

## まとめ

VS CodeのMCPは、「どこに書くか」「キー名は`servers`か」「登録と呼び出しを分けて確認したか」の三点で迷いが減ります。まずはギャラリーか「MCP: Add Server」で1本足し、一覧とチャット呼び出しまで通すのが近道です。

次の一歩:

- GitHub公式Serverを入れる → [GitHub MCP Serverの設定](/blog/mcp-github-server-setup)
- どのServerから試すか決める → [おすすめMCP Server一覧](/blog/mcp-recommended-servers)
- シリーズ入口に戻る → [MCPガイド](/blog/mcp-guide)

---

本記事の内容は執筆時点（2026-09-16）の情報に基づきます。公式ドキュメントを参照して整理していますが、掲載した手順の実機動作は確認していません。設定画面の名称やファイルパス、承認の挙動はバージョンによって変わる可能性があります。接続の成功や安全性を保証するものではなく、重要な判断は公式ドキュメントで確認してください。
