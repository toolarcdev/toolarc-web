# claude-api-basics 画像メモ

Last Updated: 2026-08-29 14:09

## h2-1.png / og.png

- 用途: 本文挿絵（H2-1「Claude APIでできることと向く人」冒頭）＋ **OG（同一画像を流用。bake-og-text なし）**
- 挿入位置: H2-1 見出し直後
- 種別: チャット／Claude Code／Claude API の3経路比較図（使う場所・向いている場面の3カラム）
- 原図: `01_Daily/2608/260829/claude-api-basics/h2-1.png`（約1189KB・1672×941）
- 後編集: なし（日本語は作成時焼き込み済み）。**OG 帯の焼き込みは実行していない**
- 軽量化: sharp palette PNG q85・長辺1600。1189KB → 290KB（1600-palette85）。目視OK
- 配置: `h2-1.png` を `og.png` に同一バイトでコピー
- `posts.ts`: `imageBasePath: /images/blog/claude-api-basics`／`ogImage: og.png`

### caption

```md
チャット（ブラウザ）・Claude Code（ターミナル）・Claude API（自分のコード）の3経路を並べた比較図。使う場所と向いている場面の違いを確認できます。
```

### alt text

```md
チャット・Claude Code・Claude APIの3経路比較図。チャットはブラウザで単発の質問、Claude Codeはターミナルで対話しながらコーディング、Claude APIは自分のコードから自動化や自作ツールへの組み込み
```
