# mcp-debugging-logs 画像メモ

Last Updated: 2026-09-22 18:54

## h2-1.png

- 用途: 本文挿絵（H2「デバッグで使う道具の見取り図」）
- 挿入位置: 当該 H2 見出しの直前
- 種別: `diagram-infographic`（Inspector → Serverのログ → Clientのログ。各段で分かることと分からないこと）
- 原図: `output/imagegen/mcp-debugging-logs/debug-tools-three-layers-cand-1.png`（1280×720・247KB）
- 後編集: なし（日本語と英語は作成時焼き込み済み）。bake-og-text なし
- 軽量化: skip（already <= 400KB）。247KBのまま。目視OK
- 人間ゲート: cand-1 を採用（2026-09-22）。Server / Client は英語表記
- `posts.ts`: 未登録。①で `imageBasePath: /images/blog/mcp-debugging-logs`。専用OG未作成のため本文図を流用可

### caption

```md
まずInspectorでServer単体を見て、次にServerのログ、その次にClientのログを見る。各段で分かることと分からないことを分ける。
```

### alt text

```md
Inspector、Serverのログ、Clientのログの順に見て、各段で分かることと分からないことを分ける3段階の概念図
```
