---
name: generate-blog-image
description: >-
  Prepares and generates ToolArc blog images (eyecatch, OG, concept diagram,
  section image) in the white/soft-blue house style, including destination,
  alt text, and caption.md metadata. Use only when the user explicitly asks to
  create or generate an image for a ToolArc article. Do not use for screenshots
  or data-heavy charts. Prefer reusing existing assets in the same imageBasePath
  before generating. Decision/comparison diagrams require panels, outcome cues,
  reference images, and label post-edit before publish.
---

# generate-blog-image

Skill = 画像の作り方。トーン・配置・alt の制約は `.cursor/rules/blog-image-tone.mdc` が強制する。

品質学習（2026-07-21）: 「安全な抽象・文字なし・青一色」をそのまま完成品にすると、既存の説明図解（例: `pattern-comparison-both.png`）に負ける。**生成は素材**。流用判定・参照・後編集・結果の視覚化までが品質工程。正本メモ: Vault `01_Daily/2607/260721/画像準備一覧.md` の品質分析節。

## 起動条件（画像生成ツールのゲート対策）

画像生成ツールは「ユーザー自身が画像生成を明示依頼した」ときだけ実行する。この Skill を実行しても、それだけでは明示依頼にならない。**Skill はゲートを開けられない**ので、生成ツールを呼ぶ前に次を満たす。

1. **ユーザー自身の直近発話に、画像を作る/生成する意図の自由記述がある**こと（例:「この記事の画像を生成して」）。選択式（AskQuestion）の承認だけで代替しない。
2. 呼び出し直前に、対象 slug と種別を1文で確認する（「〜の eyecatch を生成します」／「〜の diagram-decision を生成します」）。
3. 明示依頼が無い／曖昧なら、生成せずユーザーに依頼文を求める。

> 仮説（未確定・要検証）: 2026-07-18 実地では選択式承認後も2回拒否された。原因は特定できていない（正本ノート §7.4.10）。上記1が十分条件かは未確認のため、**拒否されたら下記フォールバックへ即移行**する。

## 入力

開始前に次を確定する。不明なものだけ確認する。

- 記事 slug（Series ページなら series slug）
- 記事の要点（1文）— **判断条件・結果（できる／できない）を含める**
- 種別: `eyecatch` / `og` / `diagram-mood` / `diagram-decision` / `section`
  - 旧称 `diagram` は廃止。比較・分岐・チェックリスト用途は **`diagram-decision`**。気分・ブランド用の抽象は **`diagram-mood`**
- `posts.ts` の `imageBasePath`（Series は関連 Hub の path または専用 path）

## 種別の判断

- 実画面の手順・UI → **生成しない**。スクリーンショット撮影＋注釈を案内する
- 数値・比較データ表 → **生成しない**。表、Canvas、またはコード描画を使う
- アイキャッチ、OG、抽象挿絵 → `eyecatch` / `og` / `diagram-mood`
- **比較・分岐・ケース分け・チェックの入口** → まず流用ゲート。新規なら `diagram-decision`
- 概念が精密すぎる／誤情報リスクが高い → Excalidraw / Figma / Mermaid または既存資産。生成で無理に作らない

## 生成前ゲート（必須・流用優先）

`GenerateImage` を呼ぶ**前**に必ず行う。省略禁止。

1. `public` + `imageBasePath` のファイル一覧を読む
2. 同フォルダの `caption.md` を読み、同テーマ・同用途の推奨画像がないか確認する
3. シリーズ Hub／スポークで既に使っている比較図・概念図がないか確認する
4. **流用できそうなら生成しない**。候補ファイル名・用途・alt 案を提示して人間確認を待つ
5. 流用不可が確定してから、下記の生成手順へ進む

正サンプル例（移行クラスタ）: `pattern-comparison-both.png` / `pattern1-*.png` / `pattern2-*.png`

## 生成手順

1. 主題を1文に圧縮する（**ケース差と結果**を含める）
2. 種別ごとの構図を決める（下記「構図ルール」）
3. **参照画像を用意する**（必須）:
   - 同 `imageBasePath` または同シリーズの高評価画像を **1〜2枚**、`GenerateImage` の `reference_image_paths` に渡す
   - 無い場合のみ、近いクラスタの正サンプルや Vault 画像参考ストック（配色・余白の参考）を使う
   - 外部ストックは構図の丸コピーに使わない
4. トーン（詳細は `blog-image-tone.mdc`）:
   - 白背景、本線ソフトブルー `#60a5fa`、フラット、角丸、余白多め、非写実、初心者向け
   - **生成画像へ日本語文字を焼き込まない**（後編集スロットは構図で確保）
   - `diagram-decision` は結果ボックスに限り緑／赤〜オレンジ系の意味色を使ってよい（最大3色系統）
5. 比率:
   - `og` / `eyecatch`: 16:9（OGは1200×630を優先）
   - `diagram-*` / `section`: 4:3を基本
6. **拒否時の代替（SVG→PNG・本手順）**: 生成ツールが `unintended` 等で拒否したら、公開を止めずに同構図を手作り SVG 化する（省略せず必ず踏む）
   - 白背景・`#60a5fa`・文字/ロゴ/実UIなし、比率どおり（OGは 1200×630）
   - SVG 先頭に `<?xml version="1.0" encoding="UTF-8"?>`。`title`/`desc` は英語
   - ヘッドレスブラウザで PNG 化。SVG を同フォルダに残す
   - 抽象アイコン中心に限る。複雑な説明図は Canva/Designer 等へ案内
7. **人間ゲート（拡張・必須）** — 1つでも NG なら配置・本文挿入しない:
   - [ ] トーン（白＋本線青、禁止トーンなし）
   - [ ] 誤情報・偽UI・機密なし
   - [ ] 同フォルダの既存図より**情報が減っていない**（減るなら流用へ戻る）
   - [ ] 画像だけでケース差が分かるか（文章依存になっていないか）
   - [ ] **結果（できる／できない）が視覚化**されているか（decision は必須）
   - [ ] ワイヤーフレーム級の線画のみ／粘土・強いニューモフィック／洗い落ち低コントラストになっていないか
   - [ ] 軽量化後も極端に貧相でないか（decision で十数KB級は要再考）
8. 軽量化して `public/images/blog/<imageBasePath>/` へ配置（過圧縮しない）
9. **後編集（decision / 比較説明図は必須）**:
   - 日本語ラベル・パネル見出し・矢印内文言は Canva / Designer / SVG オーバーレイ等で追加する
   - **後編集しないまま instructional 図を公開しない**（不合格）
   - mood / eyecatch で物語がアイコンだけで足りる場合のみ後編集省略可（人間ゲートで明示）
10. alt 文を作る（内容説明。キーワード詰め込み・誇大表現なし）
11. `caption.md` 追記（用途・参照元・後編集有無・流用可否）
12. 公開反映（Markdown / `posts.ts` / Series `heroImage` / build）は `publish-article` または当該ページ改修へ引き継ぐ

## 構図ルール

### diagram-mood / eyecatch / section

- 中央主題＋関連要素。物語やステップが読み取れること
- 要素を減らしすぎて「何の図か分からない」状態にしない
- 装飾は控えめ（コーナーのソフトな形など）。本線色を崩さない

### diagram-decision（比較・分岐・チェック）

- **2パネル（または明確な左右／上下分岐）＋各パネルの結果表現**を必須とする
- 左＝ケースA＋結果、右＝ケースB＋結果（例: 同期できる／移行不可）
- スマホ・クラウド等は「何が起きるか」が分かる粒度（真っ白な枠だけにしない）
- 生成時は文字なしだが、**ラベル用の余白（後編集スロット）**をパネル見出し位置に確保する
- 「要素は2〜3まで」を理由にパネル構成を捨てない（パネル内アイコンは整理してよい）

## 生成プロンプト

### 共通（mood / eyecatch / og / section）

```text
ToolArcブログ用の[種別]。
主題: [記事の要点1文・結果や物語を含む]
構図: [主題と要素の配置。後編集用の余白があれば明記]
スタイル: フラットでミニマル、白背景、ソフトブルー(#60a5fa)のアクセント、
角丸、余白広め、初心者にやさしい、非写実、クリーン。
文字は入れない。ダーク、サイバーパンク、photoreal、
claymorphism、強いneumorphism、低コントラストの洗い出しは禁止。
比率: [16:9 または 4:3]
参照: 添付の正サンプルの構図密度・線のはっきりさを踏襲する（丸コピーしない）
```

### diagram-decision 用

```text
ToolArcブログ用の diagram-decision（比較・分岐の説明図）。
主題: [ケースA vs ケースB と、それぞれの結果を1文で]
構図: 左右2パネル。左=[ケースA]と結果エリア、右=[ケースB]と結果エリア。
各パネルに分かりやすいアイコン（例: 同一アカウント同期 / 別アカウントで不可）。
結果エリアは色分け可能な形状（成功=緑系、不可=赤〜オレンジ系）を想定した余白付きボックス。
パネル上部に日本語ラベルを後載せできる余白を残す。
スタイル: フラット、白背景、本線ソフトブルー(#60a5fa)、角丸、余白広め、非写実、高コントラスト。
文字・ロゴ・実UIスクリーンの複製は入れない。
claymorphism、ワイヤーフレームだけの線画、洗い落ちた淡色のみは禁止。
比率: 4:3
参照: 添付の正サンプル（比較図）の情報密度とパネル分割を踏襲する
```

## 出力

- 生成画像（および後編集後の最終ファイル）
- 配置先
- 流用検討の結果（流用した／新規にした理由1行）
- 参照に使ったファイルパス
- alt 文
- `caption.md` 追記ブロック
- 後編集の有無と手段
- `publish-article` またはページ改修への引き継ぎ

## 禁止

- ユーザーが画像生成を明示していない状態で生成する
- **流用ゲートを飛ばして新規生成する**
- 実測スクリーンショットの代替を生成する
- ダーク／サイバーパンク／photoreal
- claymorphism／強い neumorphism／低コントラストの洗い出し／クリップアート級の線画のみで完成とする
- 日本語文字の焼き込み（生成段階）
- **decision 図を後編集なしで公開する**
- 誤ったUI・手順を実測として見せる
- 巨大・未圧縮バイナリ、または decision 図の過度な圧縮で情報を潰すこと
