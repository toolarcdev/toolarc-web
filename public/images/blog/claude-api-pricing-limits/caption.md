# claude-api-pricing-limits 画像メモ

Last Updated: 2026-09-03 16:52

## h2-1.png / og.png

- 用途: 本文挿絵（H2-1「Claude APIの料金は『モデル×入力・出力トークン』で決まる」直後）＋ **OG（同一画像を流用。bake-og-text なし）**
- 挿入位置: H2-1 見出し直後
- 種別: 単価表の読み方図解（モデル名／入力単価／出力単価の3列＋100万トークンあたりの単位）
- 原図: `01_Daily/2609/260903/claude-api-pricing-limits/h2-1.png`（約1116KB・1672×941）
- 後編集: なし（日本語は作成時焼き込み済み）。**OG 帯の焼き込みは実行していない**
- 軽量化: sharp palette PNG q85・長辺1600。1116KB → 326KB（1600-palette85）。目視OK
- 配置: `h2-1.png` を `og.png` に同一バイトでコピー
- `posts.ts`: `imageBasePath: /images/blog/claude-api-pricing-limits`／`ogImage: og.png`
- 注記: 表内のモデル名・単価は執筆時点の例示。改定され得るため本文は構造の読み方を正とする

### caption

```md
Claude APIの単価表は「モデル名」「入力単価」「出力単価」の3列と、100万トークンあたりの単位で読むことを示す図解。
```

### alt text

```md
Claude APIの単価表の読み方図解。モデル名・入力単価・出力単価の3列と、100万トークンあたりの価格単位、入力より出力が高い旨を示す
```
