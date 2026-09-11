# mcp-stdio-vs-sse-transport 画像メモ

Last Updated: 2026-09-11 19:54

## h2-1.png

- 用途: 本文挿絵（H2「トランスポートは役割とは別の『どうつなぐか』」）＋ **OG（同一ファイルを `ogImage` 指定。複製なし。bake-og-text なし）**
- 挿入位置: 当該 H2 見出し直後
- 種別: 概念図（MCP Client から stdio＝ローカル起動＋`command`/`args` と HTTP側＝URL接続＋`url`／SSE・Streamable HTTP への分岐。「違うのはどうつなぐか」）
- 原図: `01_Daily/2609/260911/mcp-stdio-vs-sse-transport/h2-1.png`（約1135KB・1672×941）
- 後編集: なし（日本語は作成時焼き込み済み）。**OG 帯の焼き込みは実行していない**
- 軽量化: sharp palette PNG q85・長辺1600。1135KB → 255KB（1600-palette85）。目視OK
- 配置: `h2-1.png` のみ（`og.png` は置かない）
- `posts.ts`: `imageBasePath: /images/blog/mcp-stdio-vs-sse-transport`／`ogImage: h2-1.png`
- 注意: `h2-1.png` を差し替えると OG も同じファイルを参照する

### caption

```md
MCP Clientから、stdio（ローカルでプロセス起動・command／args）とHTTP側（URLへ接続・SSE／Streamable HTTP）に分岐する。違うのはどうつなぐか。
```

### alt text

```md
MCP Clientからstdio（同じPCでプロセス起動・command／args）とHTTP側（ネットワーク経由のURL接続・SSE／Streamable HTTP）へ分岐し、違うのはどうつなぐかを示す概念図
```
