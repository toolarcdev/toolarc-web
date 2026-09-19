# mcp-security-permissions 画像メモ

Last Updated: 2026-09-20 03:22

## h2-1.png

- 用途: 本文挿絵（今日の結論の直後）
- 挿入位置: 今日の結論ブロックの直後、H2「つなぐ前に配布元・できること・渡す範囲を確認する」の前
- 種別: `diagram-infographic`（つなぐ前に確認 → 読み取りから試す → 追加後に分けて見直す）
- 原図: `output/imagegen/mcp-security-permissions/permissions-check-then-review.png`（v5。1280×720。生成時はJPEG実体）
- 後編集: なし（日本語は作成時焼き込み済み）。bake-og-text なし
- 軽量化: skip（already <= 400KB）。289KBのまま。目視OK
- 人間ゲート: 注記1「接続文字列表」（本文は「接続文字列」）を許容して採用（2026-09-20）
- `posts.ts`: `imageBasePath: /images/blog/mcp-security-permissions`。`ogImage: h2-1.png`（本文図を流用。複製なし）

### caption

```md
つなぐ前に確認し、読み取りから試し、追加後は登録・範囲・常時許可を分けて見直す。
```

### alt text

```md
つなぐ前に確認し、読み取りから試し、追加後に登録・範囲・常時許可を分けて見直す3段階の概念図
```
