# mcp-cursor-claude-workflow 画像メモ

Last Updated: 2026-09-23 20:18

## h2-1.png

- 用途: 本文挿絵（H2「つなぐ順番：1本目で確認してから、別アプリにも足す」）
- 挿入位置: 当該 H2 見出しの直前
- 種別: `diagram-infographic`（1本目で確認 → 書き直して足す → 止まったら戻る）
- 原図: `output/imagegen/mcp-cursor-claude-workflow/connect-order-then-return.png`（v1。1280×720・279KB）
- 後編集: なし（日本語は作成時焼き込み済み）。bake-og-text なし
- 軽量化: skip（already <= 400KB）。279KBのまま。目視OK
- 人間ゲート: v1 を採用（2026-09-23）
- `posts.ts`: 未登録。①で `imageBasePath: /images/blog/mcp-cursor-claude-workflow`。専用OG未作成のため本文図を流用可

### caption

```md
1本目のアプリで呼び出せるまで確認し、2本目以降は書き直してから足す。止まったら接続・設定・差分のどれに戻るかを分ける。
```

### alt text

```md
MCPを複数アプリでつなぐときの、確認から書き直し、戻り先までの順番を示す図
```
