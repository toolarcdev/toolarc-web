# mcp-vs-rest-api-comparison 画像メモ

Last Updated: 2026-09-20 17:27

## h2-1.png

- 用途: 本文挿絵（H2「向きやすい場面を分ける」の直前）
- 挿入位置: H2「比較の軸」の表と橋渡し文のあと、H2「向きやすい場面を分ける」の前
- 種別: `diagram-infographic`（REST直呼び／MCPでつなぐ／併用する、3つの型）
- 原図: `output/imagegen/mcp-vs-rest-api-comparison/rest-mcp-layer-choice.png`（v2。1280×720。生成時はJPEG実体）
- 後編集: なし（日本語は作成時焼き込み済み）。bake-og-text なし
- 軽量化: skip（already <= 400KB）。279KBのまま。目視OK
- 人間ゲート: v2を採用（2026-09-20）。v1の「厳密に比較」は不採用
- `posts.ts`: 未登録。①で `imageBasePath: /images/blog/mcp-vs-rest-api-comparison`。`ogImage: h2-1.png`（本文図を流用。複製なし）

### caption

```md
REST直呼び、MCPでつなぐ、併用は載せ方の選択。競合する規格ではなく層が違う。
```

### alt text

```md
REST直呼び、MCPでつなぐ、併用の3つの載せ方を並べ、層が違い置き換えではないことを示す概念図
```
