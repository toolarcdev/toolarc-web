---
name: generate-decision-diagram
description: >-
  Generates ToolArc comparison and branch diagrams (2-panel decision layouts
  with visible outcomes), including ASCII layout prompts, golden references,
  and required post-edit label slots. Use when the user explicitly asks to
  create a comparison, branch, or checklist-entry diagram. Prefer reuse first;
  do not use for mood-only illustrations or fake UI screenshots.
---

# generate-decision-diagram

比較・分岐・チェック入口向けの **diagram-decision** 専用。  
一般の eyecatch / mood は `generate-blog-image`。振り分けは `blog-image-router`。

参照: `docs/ai-context/image-intent-map.md` / `.cursor/rules/blog-image-tone.mdc`

## 起動条件（GenerateImage ゲート）

1. ユーザー自身の直近発話に、図を作る／生成する意図の自由記述がある
2. 対象 slug と「比較／分岐」であることを1文で確認する
3. 曖昧なら生成せず依頼文を求める

## 生成前ゲート

1. 同 `imageBasePath` / `caption.md` / シリーズ既存比較図を読む
2. **流用できそうなら生成しない**（候補提示→人間確認）
3. 流用不可のあと、本文からコンテキストを抜く:
   - **Subject**: A vs B（または分岐条件）
   - **Composition**: 左右2パネル＋結果ボックス
   - **Outcome**: 左の結果／右の結果（できる・できない等）

## 構図ルール（必須）

- 左右2パネル＋**各パネルの結果表現**
- デバイスは「何が起きるか」が分かる粒度
- 日本語ラベル用の**後編集スロット**（上部余白）
- パネル構成を「要素が少ない」理由で捨てない
- 結果色: 成功＝緑系、不可／警告＝赤〜オレンジ系を結果ボックスに限り可（tone）

## プロンプト（ASCII 必須）

```text
ToolArcブログ用の diagram-decision。
Subject: [ケースA vs ケースB]
Composition: 左右2パネル。ASCII:
  +-- A --------+  +-- B --------+
  | icons...    |  | icons...    |
  | [result box]|  | [result box]|
  +-------------+  +-------------+
Outcome: 左=[結果A]、右=[結果B] が色分け可能なボックスで分かる
各パネル上部に日本語ラベル後載せ余白。
スタイル: （既定）フラット、白+#60a5fa、高コントラスト。文字・ロゴ・実UI複製なし。
  人間指定の別トーンがあればそれに従う。
比率: 4:3
参照: 添付比較図の情報密度とパネル分割を踏襲
```

## 生成手順

1. 正サンプル 1〜2 を `reference_image_paths` へ（同シリーズ比較図優先。例: `pattern-comparison-both.png`）
2. GenerateImage（4:3）
3. tone の検証ループ（Read → NG なら再生成。**NG を参照に戻さない**）
4. **日本語ラベル後編集は必須**（後編集なしで公開しない）
5. 人間ゲート:
   - [ ] 結果が視覚化されている
   - [ ] 既存正サンプルより情報が減っていない
   - [ ] 偽UI・誤情報なし
   - [ ] トーン／明示トーンに沿う
6. 採用後に `public/images/blog/<imageBasePath>/` へ配置。WIP は staging 可
7. alt / `caption.md` → 必要なら MD 挿入。`posts.ts` は `publish-article` へ

## 出力

- 配置パス、参照パス、Subject/Composition/Outcome、後編集有無、publish 引き継ぎ

## 禁止

- 明示依頼なしの生成
- mood だけの抽象で decision を代替すること
- 後編集なし公開
- 実UIの偽スクショ生成
- NG 画像の再参照
