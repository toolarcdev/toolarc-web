# ブログ画像の軽量化（正本）

最終更新: 2026-08-07  
用途: `public/images/blog/<imageBasePath>/` に置く PNG のサイズ最適化。生成・注釈・OG焼き込みの**後工程**。  
関連: `generate-blog-image` 手順9 / `blog-image-router`（既存画像の軽量化） / `.cursor/rules/blog-image-tone.mdc`

## いつ使うか

- 生成・採用直後に `public/` へ置く前／直後
- 既存の巨大 PNG（目安 500KB超、特に 1MB超）を後から落とす依頼

## 目標

| 項目 | 目安 |
|------|------|
| ファイルサイズ | **各 200〜400KB 未満**（まず 400KB 上限） |
| 長辺 | 本文挿絵は **1200〜1600px**（表示はだいたい最大 720px） |
| 品質 | 日本語・細い線が読めること。過圧縮禁止 |

可読性が崩れるならサイズ目標より品質を優先する。

## 手順（毎回）

1. **原図を残す** — Vault 作業フォルダ／staging の原図は上書きしない。`public/` 内に `_source/` を作らない（リポ肥大化）
2. **スクリプト実行**（下記）
3. **目視** — Read で文字のにじみ・線の消失・バンディングを確認。NG なら quality を上げる／長辺を戻す
4. **`caption.md` 追記** — 手法1行＋前後サイズ（例: `sharp palette PNG q75。1413KB → 325KB`）
5. ファイル名を変えていなければ本文の `![]()` はそのまま

## スクリプト

```bash
node .cursor/skills/generate-blog-image/scripts/optimize-blog-png.cjs <png|dir> [--max-kb 400] [--max-width 1600] [--dry-run]
```

- 依存: リポの `node_modules/sharp`（追加インストール不要）
- 既定: 対象を**その場で上書き**（Vault 原図がある前提）
- `--dry-run`: 候補サイズだけ表示して書かない

例:

```bash
node .cursor/skills/generate-blog-image/scripts/optimize-blog-png.cjs public/images/blog/game-dev-beginner-first-steps
node .cursor/skills/generate-blog-image/scripts/optimize-blog-png.cjs public/images/blog/foo/bar.png --max-kb 400
```

## 候補の考え方（スクリプト内）

高品質寄りから試し、**最初に max-kb 以下になった候補を採用**:

1. 長辺維持〜1600・palette 高 quality
2. palette quality を段階的に下げる
3. 長辺 1400 / 1200 へ縮小＋palette

図解・日本語焼き込みは **palette PNG** を優先。写真寄りのスクショで palette が汚れる場合は、長辺縮小＋通常 PNG 圧縮を先に試し、目視で判断する。

## やらないこと

- 可読性を犠牲にした極端な JPEG 化（図解の既定手段にしない）
- WebP への安易な一括変換（本文パス・`posts.ts` 差し替えが増える。明示依頼時のみ）
- `public/.../_source/` への原寸コピー
- 目視なしのコミット

## Agent 完了報告に含めること

- 対象パスと前後 KB
- 採用した候補ラベル（スクリプト出力）
- 目視 OK / NG
- `caption.md` 更新の有無
