# mcp-client-sdk-overview 画像メモ

Last Updated: 2026-09-22 00:34

## h2-1.png

- 用途: 本文挿絵（H2「Tool一覧と1呼び出しまで確認する」）
- 挿入位置: 当該 H2 見出し直前
- 種別: `diagram-infographic`（connectでつながる → listToolsで一覧 → callToolで1回呼ぶ）
- 原図: `output/imagegen/mcp-client-sdk-overview/client-connect-list-call.png`（v2。1280×720。生成時はJPEG実体）
- 後編集: なし（日本語は作成時焼き込み済み）。bake-og-text なし
- 軽量化: JPEG実体 240KB → palette85 218KB（1280-palette85）。目視OK
- 人間ゲート: v2を採用（2026-09-22）。③補足の括弧半角 `(スキーマ)` を許容
- `posts.ts`: 登録済み。`imageBasePath: /images/blog/mcp-client-sdk-overview`。`ogImage: h2-1.png`（本文図を流用。複製なし）
- 配置: `public/images/blog/mcp-client-sdk-overview/h2-1.png`。本文は `content/blog/11-mcp/020-mcp-client-sdk-overview.md` の当該 H2 直前に挿入済み。

### caption

```md
接続できたら、一覧取得と1回の呼び出しを分けて確認する。
```

### alt text

```md
MCP Client SDKで接続し、Tool一覧を取り、1回呼び出す3段階の概念図
```
