# mcp-what-is-model-context-protocol 画像メモ

Last Updated: 2026-09-04 19:23

## h2-1.png / og.png

- 用途: 本文挿絵（H2-1「MCPは『AIと外部ツールをつなぐ共通の取り決め』」直後）＋ **OG（同一画像を流用。bake-og-text なし）**
- 挿入位置: H2-1 見出し直後
- 種別: 概念図（AIアプリ＝Client ⇄ MCP＝共通の取り決め ⇄ 外部ツール・データ＝Server）
- 原図: `01_Daily/2609/260904/mcp-what-is-model-context-protocol/h2-1.png`（約1086KB・1672×941）
- 後編集: なし（日本語は作成時焼き込み済み）。**OG 帯の焼き込みは実行していない**
- 軽量化: sharp palette PNG q85・長辺1600。1086KB → 368KB（1600-palette85）。目視OK
- 配置: `h2-1.png` を `og.png` に同一バイトでコピー
- `posts.ts`: `imageBasePath: /images/blog/mcp-what-is-model-context-protocol`／`ogImage: og.png`
- 注記: 図は概念の入口。Host 層の詳細は本記事では扱わない（名前の指摘＋委譲）

### caption

```md
AIアプリ（Client）と外部ツール・データ（Server）を、MCPという共通の取り決めが橋渡しする概念図。
```

### alt text

```md
AIアプリ（Client）とファイル・ブラウザ・外部サービスなどの外部ツール・データ（Server）を、MCPという共通の取り決めがつなぐ概念図。対応アプリなら同じ接続先をくり返し使える旨を示す
```
