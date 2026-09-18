# mcp-brave-search-setup 画像メモ

Last Updated: 2026-09-18 18:50

## h2-1.png

- 用途: 本文挿絵（H2「キーは環境変数かファイル参照で渡し、値を直書きしない」）
- 挿入位置: 当該 H2 見出し直後
- 種別: `diagram-infographic`（キーをenvに置く → 設定に追加する → Web検索1回）
- 原図: `output/imagegen/mcp-brave-search-setup/brave-env-then-search.png`（v2構図。③本文を `brave_web_search` に後編集。1280×720）
- 後編集: ③本文1行のみ（Noto Sans JP 600）。日本語は作成時焼き込み＋当該1行の修正。bake-og-text なし
- 軽量化: palette85。642KB → 241KB。目視OK
- 人間ゲート: ③本文を `brave_web_search` に修正したうえで採用（2026-09-18）
- `posts.ts`: 未登録。①で `imageBasePath: /images/blog/mcp-brave-search-setup`。専用OG未作成のため本文図を流用可

### caption

```md
キーは環境変数に置き、設定に追加してから Web 検索1回で確かめる。
```

### alt text

```md
APIキーをenvに置き、設定に追加してから、Web検索を1回呼んで確認する3段階の概念図
```
