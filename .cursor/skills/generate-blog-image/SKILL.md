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

## 起動条件（画像生成ツールのゲート対策）

画像生成ツールは「ユーザー自身が画像生成を明示依頼した」ときだけ実行する。この Skill を実行しても、それだけでは明示依頼にならない。**Skill はゲートを開けられない**ので、生成ツールを呼ぶ前に次を満たす。

1. **ユーザー自身の直近発話に、画像を作る/生成する意図の自由記述がある**こと（例:「この記事の画像を生成して」）。選択式（AskQuestion）の承認だけで代替しない。
2. 呼び出し直前に、対象 slug と種別を1文で確認する（「〜のeyecatchを生成します」）。
3. 明示依頼が無い／曖昧なら、生成せずユーザーに依頼文を求める。

> 仮説（未確定・要検証）: 2026-07-18 実地では選択式承認後も2回拒否された。原因は特定できていない（正本ノート §7.4.10）。上記1が十分条件かは未確認のため、**拒否されたら下記フォールバックへ即移行**する。

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
5. **拒否時の代替（SVG→PNG・本手順）**: 生成ツールが `unintended` 等で拒否したら、公開を止めずに同構図を手作り SVG 化する（省略せず必ず踏む。メモ書きではなく生成手順の一部）
   - 白背景・`#60a5fa`・文字/ロゴ/実UIなし、比率どおりのサイズ（OGは 1200×630）
   - SVG 先頭に `<?xml version="1.0" encoding="UTF-8"?>` を付け、`title`/`desc` は英語（非ASCIIは文字化けの原因）
   - ヘッドレスブラウザで PNG 化（例: Edge `--headless --screenshot`）。SVG を元データとして同フォルダに残す
   - 抽象アイコン中心の図に限る。写実・複雑な絵は SVG 手作りに不向き → Canva/Designer 等の別手段を案内する
6. 人間ゲート: トーン、誤情報、不自然さ、ライセンス、機密を確認
7. 軽量化して `public/images/blog/<imageBasePath>/<name>.png|webp` へ配置
8. 内容を説明する alt 文を作る（キーワード詰め込み・誇大表現なし）
9. `caption.md` 追記ブロックを作る
10. 公開反映（Markdown / `posts.ts` / build）は `publish-article` へ引き継ぐ

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
