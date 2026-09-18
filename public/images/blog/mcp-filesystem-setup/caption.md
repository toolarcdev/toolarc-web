# mcp-filesystem-setup 画像メモ

Last Updated: 2026-09-18 18:29

## h2-1.png

- 用途: 本文挿絵（H2「許可フォルダは狭く決め、ホーム全体は渡さない」）
- 挿入位置: 当該 H2 見出し直後
- 種別: `diagram-infographic`（狭い許可フォルダ → 読み取り確認 → 書き込みは後回し）
- 原図: `output/imagegen/mcp-filesystem-setup/filesystem-narrow-then-read.png`（v3。1280×720・約268KB）
- 後編集: なし（日本語は作成時焼き込み済み）。bake-og-text なし
- 軽量化: skip（already <= 400KB）。268KBのまま。目視OK
- 人間ゲート: ②補足「依頼しない」→「許可しない」を採用（2026-09-18）
- `posts.ts`: 未登録。①で `imageBasePath: /images/blog/mcp-filesystem-setup`。専用OG未作成のため本文図を流用可

### caption

```md
狭いテスト用フォルダを1つ渡し、許可と読み取りを確認してから、書き込みは後回しにする。
```

### alt text

```md
狭い許可フォルダを1つ渡し、読み取り確認まで進め、書き込みは後回しにすることを示す3段階の概念図
```
