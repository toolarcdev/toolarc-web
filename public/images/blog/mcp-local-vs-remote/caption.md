# mcp-local-vs-remote 画像メモ

Last Updated: 2026-09-22 00:34

## h2-1.png

- 用途: 本文挿絵（H2「向きやすい場面を分ける」）
- 挿入位置: 当該 H2 見出し直前
- 種別: `diagram-decision`（ローカル運用 vs リモート運用。見る項目の差分）
- 原図: `output/imagegen/mcp-local-vs-remote/local-vs-remote-ops.png`（v1。1152×864。生成時はJPEG実体）
- 後編集: 未実施（人間がWIPを採用。生成時に見出し・サブ・パネル名・結果が焼き込み済み。4項目・定義・注記は未載せ）。bake-og-text なし
- 軽量化: JPEG実体 192KB → palette85 150KB（1152-palette85）。目視OK
- 人間ゲート: v1を採用（2026-09-22）。v2は確認項目が本文不一致のため不採用
- `posts.ts`: 登録済み。`imageBasePath: /images/blog/mcp-local-vs-remote`。`ogImage: h2-1.png`（本文図を流用。複製なし）
- 配置: `public/images/blog/mcp-local-vs-remote/h2-1.png`。本文は `content/blog/11-mcp/021-mcp-local-vs-remote.md` の当該 H2 直前に挿入済み。

### caption

```md
ローカルは起動コマンドと許可範囲、リモートはURLと認証を見る。運び方の用語比較とは別の軸。
```

### alt text

```md
MCPのローカル運用とリモート運用で確認する項目の違いを左右に並べた比較図
```
