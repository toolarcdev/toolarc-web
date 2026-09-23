# mcp-github-actions-setup 画像メモ

Last Updated: 2026-09-23 21:03

## h2-1.png

- 用途: 本文挿絵（H2「進める順番：目的→Secrets→起動または接続→確認」）
- 挿入位置: 当該 H2 見出しの直前
- 種別: `diagram-infographic`（目的を決める → Secretsを渡す → 起動して確認する）
- 原図: `output/imagegen/mcp-github-actions-setup/actions-order-then-return-v3.png`（v3。1280×720・約266KB）
- 後編集: なし（日本語は作成時焼き込み済み）。bake-og-text なし
- 軽量化: skip（already <= 400KB）。266KBのまま。目視OK
- 人間ゲート: v3 を採用（2026-09-23）。v1／v2 は不採用のまま残置
- `posts.ts`: 未登録。①で `imageBasePath: /images/blog/mcp-github-actions-setup`。専用OG未作成のため本文図を流用可

### caption

```md
目的を一文まで絞り、Secretsは最小で渡し、ジョブの中で起動して確認する。止まったらSecrets・権限・接続のどれに戻るかを分ける。
```

### alt text

```md
GitHub ActionsのジョブからMCPを使うときの、目的、Secrets、起動確認と戻り先を示す図
```
