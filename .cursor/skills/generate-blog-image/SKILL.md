---
name: generate-blog-image
description: >-
  Prepares and generates ToolArc blog images (eyecatch, OG, concept diagram,
  section image) in the white/soft-blue house style, including destination,
  alt text, and caption.md metadata. Use only when the user explicitly asks to
  create or generate an image for a ToolArc article. Do not use for screenshots
  or data-heavy charts.
---

# generate-blog-image

Skill = 画像の作り方。トーン・配置・alt の制約は `.cursor/rules/blog-image-tone.mdc` が強制する。

## 入力

開始前に次を確定する。不明なものだけ確認する。

- 記事 slug
- 記事の要点（1文）
- 種別: `eyecatch` / `og` / `diagram` / `section`
- `posts.ts` の `imageBasePath`

## 種別の判断

- 実画面の手順・UI → **生成しない**。スクリーンショット撮影＋注釈を案内する
- 数値・比較データ → **生成しない**。表、Canvas、またはコード描画を使う
- アイキャッチ、OG、抽象挿絵 → 生成向き
- 概念図 → 誤情報を含まない構成に限定。精密さが必要なら Excalidraw / Figma / Mermaid

## 生成手順

1. 主題を1文に圧縮する
2. 構図を決める（中央主題＋2〜3要素まで）
3. 次のトーンで生成する:
   - 白背景
   - ソフトブルー `#60a5fa`
   - フラット、ミニマル、角丸、余白多め、非写実
   - 初心者向け、クリーン
   - 文字なし（文字・矢印は後編集）
4. 比率:
   - `og` / `eyecatch`: 16:9（OGは1200×630を優先）
   - `diagram` / `section`: 4:3を基本
5. 人間ゲート: トーン、誤情報、不自然さ、ライセンス、機密を確認
6. 軽量化して `public/images/blog/<imageBasePath>/<name>.png|webp` へ配置
7. 内容を説明する alt 文を作る（キーワード詰め込み・誇大表現なし）
8. `caption.md` 追記ブロックを作る
9. 公開反映（Markdown / `posts.ts` / build）は `publish-article` へ引き継ぐ

## 生成プロンプト

```text
ToolArcブログ用の[種別]。
主題: [記事の要点1文]
構図: [主題と要素の配置]
スタイル: フラットでミニマル、白背景、ソフトブルー(#60a5fa)のアクセント、
角丸、余白広め、初心者にやさしい、非写実、クリーン。
文字は入れない。ダーク、サイバーパンク、photorealは禁止。
比率: [16:9 または 4:3]
```

## 出力

- 生成画像
- 配置先
- alt 文
- `caption.md` 追記ブロック
- `publish-article` への引き継ぎ（Markdown挿入／`ogImage`／build）

## 禁止

- ユーザーが画像生成を明示していない状態で生成する
- 実測スクリーンショットの代替を生成する
- ダーク／サイバーパンク／photoreal
- 日本語文字の焼き込み
- 誤ったUI・手順を実測として見せる
- 巨大・未圧縮バイナリ
