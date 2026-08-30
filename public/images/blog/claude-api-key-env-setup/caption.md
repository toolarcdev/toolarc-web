# claude-api-key-env-setup 画像メモ

Last Updated: 2026-08-30 14:38

## h2-1.png / og.png

- 用途: 本文挿絵（H2-1「APIキーの発行手順」冒頭）＋ **OG（同一画像を流用。bake-og-text なし）**
- 挿入位置: H2-1 見出し直後
- 種別: Claude Console で API キーを発行する 3 ステップ図解（Settings→API keys / Create key / 発行直後コピー）
- 原図: `01_Daily/2608/260830/claude-api-key-env-setup/h2-1.png`（約1175KB・1672×941）
- 後編集: なし（日本語は作成時焼き込み済み）。**OG 帯の焼き込みは実行していない**
- 軽量化: sharp palette PNG q85・長辺1600。1175KB → 389KB（1600-palette85）。目視OK
- 配置: `h2-1.png` を `og.png` に同一バイトでコピー
- `posts.ts`: `imageBasePath: /images/blog/claude-api-key-env-setup`／`ogImage: og.png`

### caption

```md
Claude Console（platform.claude.com）で API キーを発行する流れを 3 ステップで示した図解。Settings→API keys の画面、Create key での設定、発行直後にコピーする画面までを確認できます。
```

### alt text

```md
Claude ConsoleでAPIキーを発行する3ステップ図。Settings→API keysを開き、Create keyで名前と有効期限を設定し、表示されたsk-ant-で始まるキーをコピーして安全な場所に保存する
```
