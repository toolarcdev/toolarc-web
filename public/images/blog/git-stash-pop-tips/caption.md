# git-stash-pop-tips 画像メモ

Last Updated: 2026-09-18 23:36

## og.png

- 用途: OG / SNS共有
- 生成: GenerateImage → bake-og-text（帯 y0=778・脚下端+4px）
- 文言: main「git stash popで元に戻せる理由と使い方」／sub「消えたのではなく、一時的に退避されているだけ」
- 参照: `cursor-windows-slow-check-tips/eyecatch.png`
- staging: `blog-image-staging/jobs/2026-07-22__git-stash-pop-tips/`
- 軽量化: sharp palette PNG q85。665KB → 148KB（1536-palette85）。目視OK

## mood-restore-flow.png

- 用途: 記事内概念図（焦り → stash退避 → pop復元）
- 挿入位置: 「突然ファイルが消えたように見えた瞬間」の後、「なぜ消えたように見えたのか——git stashの仕組み」の前
- 生成: GenerateImage → 下部余白クロップ（1536×735）
- 参照: 同上
- 軽量化: sharp palette PNG q85。552KB → 111KB（1536-palette85）。目視OK

## caption

```md
変更が消えたように見えてもstashに一時退避され、popで元に戻せる流れを図で示します。
```

## alt text

```md
焦って消えたように見えた変更がstashに退避され、popで復元されるまでの3ステップ図解
```
