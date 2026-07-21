---
name: annotate-screenshot
description: >-
  Annotates real ToolArc blog screenshots with numbered callouts, arrows, and
  masks. Use when the user asks to annotate, number, arrow, or mask a real UI
  screenshot for How-to articles. Does not generate fake UI with GenerateImage.
---

# annotate-screenshot

実機スクショへの注釈専用。**GenerateImage で UI を描かない**。

参照: `docs/ai-context/image-intent-map.md` / `.cursor/rules/blog-image-tone.mdc`  
振り分け入口: `blog-image-router`

## 起動条件

- ユーザーが注釈・番号・矢印・マスクを明示依頼している
- 原図が実測スクショ（パス指定または同 `imageBasePath` の `ss-*.png` 等）

## 入力

- 原図パス（必須）
- slug / `imageBasePath`
- 注釈リスト: 番号・指す要素・短いラベル案（後編集用。生成文字に頼らない）
- マスク範囲（個人情報・不要 UI がある場合）

## 手順

1. 原図を Read で確認する（読めない／偽UI疑いなら停止）
2. 注釈手段を選ぶ（優先順）:
   - 既存ツール／エディタでの手動注釈を案内し、完成 PNG を受け取る
   - または簡易オーバーレイ（番号円＋矢印）を画像編集で追加。**実UIを再生成しない**
3. 出力ファイル名: 原図ベース＋用途（例: `ss-02-chatgpt-memory-annotated.png`）
4. **採用後のみ** `public/images/blog/<imageBasePath>/` へ配置。WIP は Vault `06_toolarc-business/blog-image-staging/jobs/...`
5. alt と `caption.md` を追記（撮影日・注釈内容・原図名）
6. 必要なら本文 Markdown に `![]()` を挿入
7. `posts.ts` / build が残るなら `publish-article` へ引き継ぎ文を残す

## 注釈の品質

- 番号は本文ステップと一致させる
- 矢印・円は本線 `#60a5fa` 付近で視認性優先（既定トーン）
- マスクは情報を消しすぎない（手順が追えなくなる塗りつぶし禁止）
- 1枚に注釈を詰め込みすぎない。必要なら分割

## 出力

- 注釈付き PNG の配置パス
- 原図パス
- alt / caption 追記内容
- publish への引き継ぎ有無

## 禁止

- `GenerateImage` で画面・ボタン・ダイアログを「それっぽく」描くこと
- 原図なしの注釈依頼を生成で埋めること
- 流用できる既存注釈スクショがあるのに新規を量産すること
