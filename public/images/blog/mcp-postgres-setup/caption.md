# mcp-postgres-setup 画像メモ

Last Updated: 2026-09-18 22:47

## h2-1.png

- 用途: 本文挿絵（H2「接続文字列は環境変数で渡し、値を直書きしない」）
- 挿入位置: 当該 H2 見出し直後
- 種別: `diagram-infographic`（開発用DBに限る → URIをenvに置く → 読み取り確認）
- 原図: `output/imagegen/mcp-postgres-setup/postgres-dev-then-read.png`（v6。1280×720・258KB）
- 後編集: なし（日本語は作成時焼き込み済み）。bake-og-text なし
- 軽量化: skip（already <= 400KB）。258KBのまま。目視OK
- 人間ゲート: 指定画像を原図としてcaption作成（2026-09-18）。焼き込み残: サブ `接続文字はenv`（正: `接続文字列はenv`）／② `DATABASE URI`（正: `DATABASE_URI`）／③ `list_schmas`（正: `list_schemas`）
- `posts.ts`: 登録済み。`imageBasePath: /images/blog/mcp-postgres-setup`。`ogImage: h2-1.png`（本文図を流用。複製なし）
- 配置: `public/images/blog/mcp-postgres-setup/h2-1.png`。本文は当該 H2 直後に挿入済み。`posts.ts` は①

### caption

```md
開発用DBに限り、DATABASE_URIをenvに置いてから、読み取り確認を1回行う。
```

### alt text

```md
開発用DBに限り、接続文字列をenvに置き、読み取り確認を1回行う3段階の概念図
```
