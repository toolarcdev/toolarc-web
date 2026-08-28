# claude-mcp-setup-basics 画像メモ

Last Updated: 2026-08-28 17:41

## h2-1.png / og.png

- 用途: 本文挿絵（H2-1「まず Desktop か Code かを決める」冒頭）＋ **OG（同一画像を流用。bake-og-text なし）**
- 挿入位置: H2-1 見出し直後
- 種別: Desktop / Code 分岐図（GUIアプリとCLIで設定方法・設定ファイルの場所が違う旨）
- 原図: `01_Daily/2608/260828/claude-mcp-setup-basics/h2-1.png`（約1058KB・1672×941）
- 後編集: なし（日本語は作成時焼き込み済み）。**OG 帯の焼き込みは実行していない**
- 軽量化: sharp palette PNG q85・長辺1600。1058KB → 269KB（1600-palette85）。目視OK
- 配置: `h2-1.png` を `og.png` に同一バイトでコピー
- `posts.ts`: `imageBasePath: /images/blog/claude-mcp-setup-basics`／`ogImage: og.png`

### caption

```md
Claude Desktop（チャットアプリ）と Claude Code（ターミナルCLI）では、MCPサーバーの追加方法と設定ファイルの場所が異なります。使っている製品に応じて、左または右の手順に進んでください。
```

### alt text

```md
Claude DesktopのGUIアプリとClaude CodeのCLIツールでMCP設定が分かれる分岐図。Desktopはclaude_desktop_config.json、Codeはclaude mcp addコマンド
```
