# mcp-claude-code-setup 画像メモ

Last Updated: 2026-09-14 19:37

## h2-1.png

- 用途: 本文挿絵（H2「接続先に合わせてclaude mcp addを書き分ける」）＋ **OG（同一ファイルを `ogImage` 指定。複製なし。bake-og-text なし）**
- 挿入位置: 当該 H2 の導入直後（公式リンク段落の前）
- 種別: 概念図（CLI追加 → スコープ選択 → 一覧確認 → セッション確認の4ステップ）
- 原図: `01_Daily/2609/260914/source-mcp-claude-code-setup/h2-1.png`（約1086KB・1672×941）
- 後編集: なし（日本語は作成時焼き込み済み）。**OG 帯の焼き込みは実行していない**
- 軽量化: sharp palette PNG q85・長辺1600。1086KB → 276KB（1600-palette85）。目視OK
- 配置: `h2-1.png` のみ（`og.png` は置かない）
- `posts.ts`: `imageBasePath: /images/blog/mcp-claude-code-setup`／`ogImage: h2-1.png`
- 注意: `h2-1.png` を差し替えると OG も同じファイルを参照する

### caption

```md
Claude CodeのMCP確認フロー。CLIで追加し、スコープを選び、一覧でConnectedを確認したあと、セッション内でツール呼び出しと承認範囲を見る。
```

### alt text

```md
Claude CodeでMCPを追加し、スコープ選択・一覧確認・セッション確認まで進む4ステップの概念図
```
