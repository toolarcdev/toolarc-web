# mcp-claude-desktop-setup 画像メモ

Last Updated: 2026-09-13 18:17

## h2-1.png

- 用途: 本文挿絵（H2「Extensionsと設定JSONのどちらで足すかを決める」）＋ **OG（同一ファイルを `ogImage` 指定。複製なし。bake-og-text なし）**
- 挿入位置: 当該 H2 の導入直後（公式ヘルプ段落の前）
- 種別: 概念図（Desktop Extensions／設定JSONの二択 → まずExtensions → 必要なら設定JSON）
- 原図: `01_Daily/2609/260913/mcp-claude-desktop-setup/h2-1.png`（約1153KB・1672×941）
- 後編集: なし（日本語は作成時焼き込み済み）。**OG 帯の焼き込みは実行していない**
- 軽量化: sharp palette PNG q85・長辺1600。1153KB → 278KB（1600-palette85）。目視OK
- 配置: `h2-1.png` のみ（`og.png` は置かない）
- `posts.ts`: `imageBasePath: /images/blog/mcp-claude-desktop-setup`／`ogImage: h2-1.png`
- 注意: `h2-1.png` を差し替えると OG も同じファイルを参照する

### caption

```md
Desktop Extensionsと設定JSONのどちらで足すか。まずExtensionsを確認し、必要に応じて設定JSONへ進む。
```

### alt text

```md
Claude DesktopでExtensionsと設定JSONのどちらを選ぶかを示す概念図
```
