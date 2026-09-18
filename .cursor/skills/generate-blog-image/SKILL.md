---
name: generate-blog-image
description: >-
  Prepares and generates ToolArc blog images (eyecatch, OG, diagram-mood,
  diagram-infographic, section) with reuse gates, reference images, alt text,
  and caption.md. Use when the user explicitly asks to create or generate a
  ToolArc article image. Do not use for screenshots, data charts, or
  comparison/branch diagrams (use generate-decision-diagram). Prefer reusing
  assets in the same imageBasePath before generating.
---

# generate-blog-image

Skill = 画像の作り方（eyecatch / og / mood / `diagram-infographic` / section）。  
トーン・検証・参照: `.cursor/rules/blog-image-tone.mdc`  
振り分け: `docs/ai-context/image-intent-map.md` ／入口ハブ: `blog-image-router`  
比較・分岐（decision）: **`generate-decision-diagram`**（本 Skill では扱わない）  
注釈スクショ: `annotate-screenshot`  
`bake-og-text` は**呼ばない**（ユーザーが Skill 名を明示したレガシー工程。削除予定）

品質学習（2026-07-21）: 「安全な抽象・文字なし・青一色」を完成品にすると正サンプルに負ける。eyecatch／mood／decision は **生成は素材**（流用・参照・後編集・結果の視覚化までが品質工程）。`diagram-infographic` はラベルが情報そのものなので、日本語 QA を通れば生成時点で完成扱いでよい（後編集必須にしない）。

## 起動条件（画像生成ツールのゲート対策）

1. **ユーザー自身の直近発話に、画像を作る/生成する意図の自由記述がある**こと。選択式承認だけでは代替しない
2. 呼び出し直前に、対象 slug と種別を1文で確認する
3. 明示依頼が無い／曖昧なら、生成せず依頼文を求める
4. 拒否されたら下記 SVG フォールバックへ即移行
5. 比較・分岐図の依頼なら本 Skill を使わず `generate-decision-diagram` へ委譲する
6. 単系列ステップ・入れ子構造・型の説明図は `diagram-infographic`（decision に送らない）

## 入力

- 記事 slug（Series なら series slug）
- `posts.ts` の `imageBasePath`（Series は Hub path または専用 path）
- 種別: `eyecatch` / `og` / `diagram-mood` / `diagram-infographic` / `section`
- 記事の要点（1文）— 物語・ステップが分かれば含める
- `diagram-infographic` のとき: 焼く日本語（見出し・各ラベル・注記）を本文から抜いた一覧

## 種別の判断

- 実画面の手順・UI → **生成しない**（`annotate-screenshot`）
- 数値・比較データ表 → **生成しない**（表／Canvas／コード）
- ラベルで読む概念図（階層・段階・型） → `diagram-infographic`
- アイキャッチ、OG素材、抽象挿絵 → `eyecatch` / `og` / `diagram-mood` / `section`
- **比較・分岐・チェック入口** → `generate-decision-diagram`（流用ゲートはその Skill 内）
- 誤情報リスクが高い概念で、ラベル図にできないもの → Excalidraw / Figma / Mermaid または既存資産（階層・手順の骨格は infographic でよい）
- 迷ったら `blog-image-router`

## 生成前ゲート（必須・流用優先）

`GenerateImage` を呼ぶ**前**に必ず行う。省略禁止。

1. `public` + `imageBasePath` のファイル一覧を読む
2. 同フォルダの `caption.md` を読み、同テーマ・同用途の推奨がないか確認する
3. シリーズ Hub／スポークの既存図を確認する
4. **流用できそうなら生成しない**。候補を提示して人間確認を待つ
5. 流用不可が確定してから、コンテキスト収集 → 生成へ

## コンテキスト収集（必須）

流用不可のあと、プロンプトを書く**前**に行う。

1. 記事 Markdown（または要点ソース）を読み、次を書き出す:
   - **Subject**: 何の図か（対象・場面）
   - **Composition**: 配置（中央／ステップ並び／入れ子等）
   - **Outcome**: 読者が画像だけで分かってほしいこと（物語・ステップ）。無い場合は「主題が1秒で分かること」
   - **Labels**（`diagram-infographic` のみ）: 焼く日本語を全文（見出し・各箱・注記。省略しない）
2. これらをプロンプトの Subject / Composition / Outcome（と Labels）にそのまま使う（スタイル列挙だけで終わらせない）

## 生成手順

1. コンテキスト収集の項目を確定する
2. 種別ごとの構図を決める（下記）
3. **参照画像**（必須）: 同 path／同シリーズの高評価を1〜2枚 `reference_image_paths` へ。無ければ近い正サンプル。`diagram-infographic` は `docs/ai-context/image-sample-registry.md` の infographic 正サンプルを優先。**外部サイト完成図のレイアウト参照は禁止**（tone C7）
4. トーン: **現状の既定**は白＋`#60a5fa` フラット等（tone 参照）。人間が別トーンを明示したらそれに従う
5. 日本語:
   - `diagram-infographic`: **生成時に焼く**。Labels をプロンプトへ固定。崩れ・誤字は再生成（Photoshop 後編集は必須にしない）
   - `og`: 本文 infographic の流用、または生成時焼き込みで完結（`bake-og-text` へ送らない）
   - `eyecatch` / `diagram-mood` / `section`: **焼かない**（ラベルが情報なら `diagram-infographic`）
6. 比率: `og`/`eyecatch`＝16:9（OGは1200×630優先）。`diagram-infographic`＝16:9可（正サンプル約1672×941）。`diagram-mood`/`section`＝4:3基本
7. 生成後は tone の**検証ループ**（Read → NG なら再生成。NG 画像を参照に戻さない）。infographic は日本語の欠け・誤字・本文との矛盾も NG
8. **拒否時**: 同構図の SVG→PNG（白・`#60a5fa`）。infographic 以外は文字/ロゴ/実UIなし。複雑説明図で生成が使えないときは手作業ツールへ案内
9. **人間ゲート** — 1つでも NG なら配置しない:
   - [ ] トーン／明示トーンに沿う
   - [ ] 誤情報・偽UI・機密なし
   - [ ] 同フォルダ既存より**情報が減っていない**
   - [ ] 画像だけで意図（物語・主題）が分かるか
   - [ ] 線画のみ／粘土・強いニューモ／洗い落ちでないか
   - [ ] 過圧縮で貧相でないか
   - [ ] `diagram-infographic`: ラベルが読める／誤字なし／本文と矛盾しない
10. **軽量化して配置**（過圧縮しない）。手順・スクリプト正本: [`references/optimize.md`](references/optimize.md)。採用前 WIP は Vault `blog-image-staging`（または `output/imagegen/<slug>/`）
11. OG は本 Skill で完結する（本文 infographic の流用、または生成時焼き込み）。**`bake-og-text` へ委譲しない**。ユーザーが `bake-og-text`／「帯焼きこみ」を明示したときだけ、その Skill の起動条件に従う
12. alt 作成 → `caption.md` 追記（軽量化した場合は前後サイズも。infographic は「作成時焼き込み」）
13. **配線境界**:
    - **本 Skill の完了範囲**: 画像ファイル配置、`caption.md`、必要なら本文 Markdown の `![]()` 挿入、alt
    - **本 Skill でやらない**: `posts.ts` の登録、Series `heroImage`、`npm run build`、公開日確定 → **`publish-article` へ引き継ぎ文を残す**

## 構図ルール

### diagram-infographic

- 入れ子・段階・型など、ラベルが無いと何の図か分からない構図
- 要素を減らして「ムード絵」にしない
- 正サンプルの情報密度・線の明確さを踏襲（丸コピーしない）
- 実UI・成功ログ風は使わない

### diagram-mood / eyecatch / section / og

- 中央主題＋関連要素。物語やステップが読み取れること
- 要素を減らしすぎて「何の図か分からない」状態にしない
- 装飾は控えめ。既定本線色を崩さない（別トーン明示時を除く）

## 生成プロンプト

### eyecatch / diagram-mood / section

```text
ToolArcブログ用の[種別]。
Subject: [何が写るか・対象]
Composition: [配置。後編集余白があれば明記]
Outcome: [読者が画像だけで分かること／物語]
スタイル: （既定なら）フラット、白背景、ソフトブルー(#60a5fa)、角丸、余白広め、非写実、クリーン。
  人間指定の別トーンがあればそれに従う。
文字は入れない。claymorphism、強いneumorphism、低コントラストの洗い出しは禁止。
比率: [16:9 または 4:3]
参照: 添付正サンプルの構図密度・線の明確さを踏襲（丸コピーしない）
```

### diagram-infographic

```text
ToolArcブログ用の diagram-infographic。ラベルが情報そのものの概念図。
Subject: [何の階層／何段階か]
Composition: [入れ子 or 左から右の段階。箱の数と関係]
Outcome: [画像だけで分かること]
Labels（この文言を正確に焼く。省略・言い換え禁止）:
  見出し: [...]
  各要素: [...]
  注記: [...]
スタイル: （既定なら）フラット、白背景、ソフトブルー(#60a5fa)、角丸、余白広め、高コントラスト、非写実。
  人間指定の別トーンがあればそれに従う。
実UI・ロゴ・成功ログ風は禁止。claymorphism、強いneumorphism、洗い出しは禁止。
比率: 16:9
参照: 添付 infographic 正サンプルの情報密度・線の明確さ・日本語の置き方を踏襲（丸コピーしない）
```

## 出力

- 生成画像（および後編集後の最終ファイル）
- 配置先
- 流用検討の結果（1行）
- 参照に使ったパス
- コンテキスト収集の Subject / Composition / Outcome（各1行）。infographic は Labels も
- alt / `caption.md` 追記（焼き込み有無）
- publish-article への引き継ぎ有無（`bake-og-text` は明示時以外、引き継ぎに書かない）

## 禁止

- 明示依頼なしでの生成
- 流用ゲート省略
- 実測スクショの代替生成（→ annotate-screenshot）
- decision 図の本 Skill 内完結（→ generate-decision-diagram）
- 既定運用でのダーク／サイバーパンク／photoreal（明示トーンがある場合を除く）
- clay／強い neumorphism／洗い出し／線画のみで完成
- `eyecatch` / mood への装飾用日本語焼き込み（主題がラベル図なら `diagram-infographic`）
- 明示なしで `bake-og-text` へ委譲すること（削除予定。OG 完結は本 Skill）
- infographic の日本語を `bake-og-text` で後載せすること
- 誤ったUIを実測として見せる
- NG 画像を `reference_image_paths` に戻すこと
- 過圧縮で情報を潰すこと
- 本 Skill 内で `posts.ts` 登録まで勝手に完了扱いにすること
