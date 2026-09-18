# mcp-server-build-basics 画像メモ

Last Updated: 2026-09-19 05:26

## h2-1.png

- 用途: 本文挿絵（H2「起動・一覧・1呼び出しを分けて確認する」）
- 挿入位置: 当該 H2 見出し直前
- 種別: `diagram-infographic`（Toolを1つ登録 → stdioで待ち受ける → 1回呼び出す）
- 原図: `output/imagegen/mcp-server-build-basics/server-one-tool-then-call.png`（v1。1280×720。生成時はJPEG実体）
- 後編集: なし（日本語は作成時焼き込み済み）。bake-og-text なし
- 軽量化: PNG化 647KB → palette85 239KB。目視OK
- 人間ゲート: 指定画像を原図としてcaption作成（2026-09-19）
- `posts.ts`: 登録済み。`imageBasePath: /images/blog/mcp-server-build-basics`。`ogImage: h2-1.png`（本文図を流用。複製なし）
- 配置: `public/images/blog/mcp-server-build-basics/h2-1.png`。本文は当該 H2 直前に挿入済み。`posts.ts` は①

### caption

```md
Toolを1つ登録し、stdioで待ち受けてから、1回呼び出す。
```

### alt text

```md
Toolを1つ登録し、stdioで待ち受け、1回呼び出す3段階の概念図
```
