# mcp-troubleshooting-connection-errors 画像メモ

Last Updated: 2026-09-22 18:59

## h2-1.png

- 用途: 本文挿絵（H2「つながらないときの確認順」）
- 挿入位置: 当該 H2 見出しの直前
- 種別: `diagram-infographic`（設定の読み込み → 起動／URL → 認証情報 → Clientの接続状態）
- 原図: `output/imagegen/mcp-troubleshooting-connection-errors/check-order-four-steps.png`（1280×720・276KB）
- 後編集: なし（日本語は作成時焼き込み済み）。bake-og-text なし
- 軽量化: skip（already <= 400KB）。276KBのまま。目視OK
- 人間ゲート: check-order-four-steps.png を採用（2026-09-22）
- `posts.ts`: ①で `imageBasePath: /images/blog/mcp-troubleshooting-connection-errors`。専用OG未作成のため本文図を流用

### caption

```md
つながらないときは、設定の読み込み、起動またはURL、認証情報、Clientの接続状態の順で疑う。途中で直れば、その先は見なくてよい。
```

### alt text

```md
設定の読み込み、起動またはURL、認証情報、Clientの接続状態の順で疑う4段階の概念図
```
