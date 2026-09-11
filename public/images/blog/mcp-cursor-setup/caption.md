# mcp-cursor-setup 画像メモ

Last Updated: 2026-09-12 06:37

## h2-1.png

- 用途: 本文挿絵（H2「プロジェクト用とグローバルの置き場所・優先を決める」）＋ **OG（同一ファイルを `ogImage` 指定。複製なし。bake-og-text なし）**
- 挿入位置: 当該 H2 の表の直後（優先ルール説明の直前）
- 種別: 概念図（プロジェクト用／グローバルの2ファイル → 両方読み込み → 同名なら project 優先）
- 原図: `01_Daily/2609/260912/mcp-cursor-setup/h2-1.png`（約1133KB・1672×941）
- 後編集: なし（日本語は作成時焼き込み済み）。**OG 帯の焼き込みは実行していない**
- 軽量化: sharp palette PNG q85・長辺1600。1133KB → 357KB（1600-palette85）。目視OK
- 配置: `h2-1.png` のみ（`og.png` は置かない）
- `posts.ts`: `imageBasePath: /images/blog/mcp-cursor-setup`／`ogImage: h2-1.png`
- 注意: `h2-1.png` を差し替えると OG も同じファイルを参照する

### caption

```md
プロジェクト用とグローバルの mcp.json を両方読み込み、同名サーバーがある場合はプロジェクト側が優先される。
```

### alt text

```md
プロジェクト用とグローバルのmcp.json、両方読み込みと同名時のプロジェクト優先を示す概念図
```
