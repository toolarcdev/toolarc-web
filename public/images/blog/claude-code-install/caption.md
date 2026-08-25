# claude-code-install 画像メモ

Last Updated: 2026-08-25 14:10

## h2-1.png / og.png

- 用途: 本文挿絵（H2-1「OS別インストール手順」冒頭）＋ **OG（同一画像を流用。bake-og-text なし）**
- 挿入位置: H2-1 直後（OS別手順の導入文の前）
- 種別: 抽象アイコン図解（macOS／Windows／Linux 横並び）。ターミナル実スクショではない
- 原図: `01_Daily/2608/260825/claude-code-install/ChatGPT Image 2026年8月25日 13_59_08.png`（約903KB）
- 後編集: なし（日本語は生成時焼き込み済み）。**OG 帯の焼き込みは実行していない**
- 軽量化: sharp palette PNG q85・長辺1600。903KB → 312KB（1600-palette85）。目視OK
- 配置: `h2-1.png` を `og.png` に同一バイトでコピー（ハッシュ一致）
- `posts.ts`: `imageBasePath: /images/blog/claude-code-install`／`ogImage: og.png`

### caption

```md
Claude CodeのインストールはOSごとに経路が分かれます。macOS・Windows・Linuxの入口を横並びに示した図です。
```

### alt text

```md
macOS・Windows・Linuxでインストール手順が分かれることを示す3アイコン図
```
