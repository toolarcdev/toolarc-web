# claude-code-git-workflow 画像メモ

Last Updated: 2026-08-27 12:15

## h2-1.png / og.png

- 用途: 本文挿絵（H2-1「対話でbranch作成からcommitまで進める」冒頭）＋ **OG（同一画像を流用。bake-og-text なし）**
- 挿入位置: H2-1 直後（Quickstart 根拠文の前）
- 種別: ターミナル対話の図解（日本語で branch 作成〜commit を依頼する様子。左に流れ4ステップ）
- 原図: `01_Daily/2608/260827/h2-1.png`（約1204KB・1672×941）
- 後編集: なし（日本語は作成時焼き込み済み）。**OG 帯の焼き込みは実行していない**
- 軽量化: sharp palette PNG q85・長辺1600。1204KB → 253KB（1600-palette85）。目視OK
- 配置: `h2-1.png` を `og.png` に同一バイトでコピー（ハッシュ一致）
- `posts.ts`: `imageBasePath: /images/blog/claude-code-git-workflow`／`ogImage: og.png`

### caption

```md
Claude Codeのターミナルで、日本語の依頼だけでbranch作成からcommitまで進める対話の例です。左に最小の流れ4ステップを併記しています。
```

### alt text

```md
Claude Codeに日本語でbranch作成とcommitを依頼しているターミナル対話と、左の4ステップ流れ図
```
