# mcp-config-json-guide 画像メモ

Last Updated: 2026-09-08 12:59

## h2-1.png

- 用途: 本文挿絵（H2「設定例の対象製品と3つの型を確認する」）
- 挿入位置: 当該 H2 見出し直後〜3つの型の表の前
- 種別: 概念図（`mcpServers` → サーバー名 → `type`/`command`/`args`/`env` の入れ子。文字列・配列・オブジェクトの対応）
- 原図: `01_Daily/2609/260908/mcp-config-json-guide/h2-1.png`（約1152KB・1672×941）
- 後編集: なし（日本語は作成時焼き込み済み）
- 軽量化: sharp palette PNG q85・長辺1600。1152KB → 243KB（1600-palette85）。目視OK
- `posts.ts`: `imageBasePath: /images/blog/mcp-config-json-guide`（①で登録）

### caption

```md
mcpServersの下にサーバー名、その中にtype・command・args・envが並ぶ。固定キーはそのまま、サーバー名と値を編集する。
```

### alt text

```md
Cursor向けmcp.jsonで、mcpServersオブジェクトの下にサーバー名とtype・command・args・envが階層になることを示す概念図
```

## og.png

- 用途: **OG 専用**（本文には挿入しない）
- 種別: 概念図（同テーマの横並び階層。`mcpServers` → サーバー名 → 4キーの枝分かれ）
- 原図: `01_Daily/2609/260908/mcp-config-json-guide/OG.png`（約1196KB・1672×941）
- 後編集: なし（日本語は作成時焼き込み済み）。bake-og-text なし
- 軽量化: sharp palette PNG q85・長辺1600。1196KB → 345KB（1600-palette85）。目視OK
- 配置: `og.png`（小文字）として `public/images/blog/mcp-config-json-guide/` に配置
- `posts.ts`: `ogImage: og.png`（①で登録）

### caption

```md
（OG）mcp.jsonの階層と文字列・配列・オブジェクトの3つの型を、横並びの構造例で示す。
```

### alt text

```md
mcp.jsonのmcpServersからサーバー名、type・command・args・envへ枝分かれする階層と3つの型を示す概念図
```
