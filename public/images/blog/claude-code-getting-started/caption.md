# claude-code-getting-started 画像メモ

Last Updated: 2026-08-24 22:32

## eyecatch.png / og.png

- 用途: アイキャッチ ＋ OG（同一画像を流用。bake-og-text なし）
- 配置: `public/images/blog/claude-code-getting-started/eyecatch.png` / `og.png`
- 種別: ユーザー用意の完成稿（ターミナル起動イメージ＋始め方の要点）
- 原図: `01_Daily/2608/260824/ChatGPT Image 2026年8月24日 22_13_19.png`（1536×1024）
- 後編集: なし（日本語帯の焼き込みなし）
- 軽量化: sharp palette PNG q85。1435KB → 340KB（1536-palette85）
- `posts.ts`: `ogImage: "og.png"`
- alt: ターミナルで Claude Code を起動する流れと、向く人の見分け・最初の一歩の要点を示すアイキャッチ
- 備考: 推奨16:9（1200×630）より縦長（1536×1024）。同サイズ採用の先例あり（`kimi-k3-cursor-guide`）。画像内の旧サブタイトル文言は未差し替え（タイトル改訂 2026-08-24）
