# mcp-playwright-setup 画像メモ

Last Updated: 2026-09-24 06:18

## h2-1.png

- 用途: 本文挿絵（H2「進める順番：対象確認→追加と起動→確認」）
- 挿入位置: 当該 H2 の表と説明段落のあと（JSON例の前）
- 種別: `diagram-infographic`（対象確認 → Clientに追加 → 起動確認）
- 原図: `01_Daily/2609/260924/mcp-playwright-setup/h2-1.png`（1672×941・約1294KB。人間作成）
- 後編集: なし（日本語は作成時焼き込み済み）。bake-og-text なし
- 軽量化: sharp palette PNG q85・長辺1600。1294KB → 305KB（1600-palette85・1600×900）。目視OK
- 人間ゲート: 人間作成の h2-1 を採用（2026-09-24）
- `posts.ts`: 未登録。①で `imageBasePath: /images/blog/mcp-playwright-setup`。専用OG未作成のため本文図を流用可

### caption

```md
公式で対象パッケージを確認し、Clientに追加し、意図した操作を1つ呼んで確認する。止まったら起動・接続・権限のどれに戻るかを分ける。
```

### alt text

```md
Playwright MCPをつなぐときの、対象確認、Client追加、起動確認と戻り先を示す図
```
