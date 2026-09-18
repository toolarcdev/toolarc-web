---
name: blog-image-router
description: >-
  Routes ToolArc blog image work by intent and reuse gates, then delegates to
  annotate-screenshot, generate-decision-diagram, generate-blog-image, or blog
  PNG lightening (optimize.md). Call bake-og-text ONLY if the user explicitly
  names that skill. Use when the user asks how to handle article images, which
  image skill to use, image compression / 軽量化, or for image routing without
  generating yet. Use when the user says ジョブ化 or 画像準備 for a ToolArc article
  infographic image-job: write image-job-{slug}.md, do not call GenerateImage.
  Does not call GenerateImage itself. Do not use ジョブ化 for non-image tasks, LP,
  Hallmark, Codex imagegen, eyecatch/OG, or comparison diagrams.
---

# blog-image-router

ハブ Skill。**GenerateImage は呼ばない**。種別判定 → 流用ゲート → 専門 Skill へ委譲する。  
記事 `diagram-infographic` の **A（ジョブ化）** もここ。B（生成）は `generate-blog-image`。C（`public/` 採用）は Skill 化しない。

参照: `docs/ai-context/image-intent-map.md` / `.cursor/rules/blog-image-tone.mdc`

## 起動条件

- 「この記事の画像」「画像どうする」「どの Skill」「注釈か生成か」など、振り分け・方針の依頼
- 「画像を軽量化」「400KB未満」「巨大PNGを落として」など圧縮だけの依頼
- **ジョブ化** / **画像準備**: 記事挿絵（`diagram-infographic`）のジョブ票を書いて止まる。source.md は触らない

「生成して」は本 Skill の起動語にしない（B は `generate-blog-image`）。ハブに来た場合だけ下の「生成してが来たとき」に従う。

## 手順（毎回・振り分け）

1. slug / `imageBasePath` / 目的（本文挿絵・OG・Series 帯・軽量化など）を1文で確認する
2. Claude「画像提案」やジョブ票があれば、手段列に落とす（自動生成しない）
3. `public/images/blog/<imageBasePath>/` と `caption.md` を読む（**流用ゲート省略禁止**。軽量化のみのときはサイズ確認が主）
4. 流用できそうなら生成せず候補を提示し、人間確認を待つ（軽量化依頼ではスキップ可）
5. 下表で専門へ委譲する（委譲先の SKILL.md／正本を読んで続行）。**ジョブ化のときは委譲せず A で止まる**

## 振り分け表

| 条件 | 委譲先 | 備考 |
|------|--------|------|
| 実UI手順・設定画面・エラー画面 | `annotate-screenshot` | 撮影は人間。偽UI生成禁止 |
| 比較・分岐・チェック入口の図 | `generate-decision-diagram` | 流用優先。後編集必須。番号付きの単系列ステップはここへ送らない |
| ラベルで読む概念図（階層・段階・型） | `generate-blog-image`（`diagram-infographic`） | 生成時に日本語を焼いてよい。**ジョブ票が無いときは A で止める**（GenerateImage しない） |
| eyecatch / og / mood / section | `generate-blog-image` | 明示の生成依頼が必要。ジョブ票は不要。配置前に軽量化（下記）。OG は本 Skill で完結（本文図流用または生成時焼き込み） |
| 既存 PNG の軽量化・圧縮（生成なし） | `generate-blog-image/references/optimize.md` ＋ `scripts/optimize-blog-png.cjs` | 目標 200〜400KB。目視必須。独立 Skill ではない |
| ユーザーが `bake-og-text` または「帯焼きこみ」を**明示** | `bake-og-text` | **削除予定。** OG／日本語が要るだけでは送らない |
| 数値表・ランキング表 | （生成しない） | 本文表 / Canvas / コード |
| `posts.ts` / build / 公開日 | `publish-article` | 画像配線の最終登録 |
| LP / Hallmark / Codex `imagegen` | （本ハブを使わない） | 記事画像 A/B に入れない |

番号付きステップ ≠ decision。入れ子の構造図 ≠ スクショ。本文図の日本語ラベル ≠ OG帯。OG が要っても `bake-og-text` へ自動委譲しない。

## A. ジョブ化（記事 infographic のみ）

対象: ラベルで読む本文挿絵（`diagram-infographic`）。eyecatch／OG／mood／section／比較図／注釈／Hallmark／Codex は対象外。

slug は開いている記事 MD で足りることが多い。必要なら `ジョブ化 mcp-postgres-setup`。

1. 記事 MD と当日 AI-log の「画像提案」を読む。**source.md は開かない・書かない**
2. 種別を1行で決める。番号付きの単系列ステップや入れ子は decision にしない。OG が要っても bake-og-text へ自動委譲しない
3. 流用ゲート: `public/images/blog/<slug>/` を見る。無ければ新規。同シリーズ完成図は**転用禁止・参照専用**
4. 本文から Subject / Composition / Outcome / Labels を抜く。Labels は省略・言い換えしない
5. 当日フォルダ（`01_Daily/YYMM/YYMMDD/`。日付は `Get-Date`）に `image-job-{slug}.md` を書く。型は 013 の `image-job-mcp-filesystem-setup`（ジョブ票・依頼文・GenerateImage の description 全文・合否欄）。`Last Updated` は `Get-Date -Format "yyyy-MM-dd HH:mm"`
6. AI-log の画像提案下に「ジョブ化」を短く追記。**source.md は更新しない**
7. **完了条件（2行で止める）**: ジョブ票できた。**生成していない**

同粒度のレバー（013 実測）:

- 焼く日本語を全文固定する
- 正サンプルを `reference_image_paths` に付ける（記事画像としては使わない）
- 3箱でも各箱本文＋補足＋下部注記2本
- 「3ステップの図を作って」だけでは情報が落ちる
- description に `heading:` / `sub:` を書かない（焼き込まれる）
- 番号はカードだけ（見出しに①を付けない）

### ジョブ票に必ず入れるもの

- slug / 種別 `diagram-infographic` / 挿入位置（H2）
- 流用候補（なし、または参照専用パス）
- WIP: `output/imagegen/<slug>/`（`public/` 直置きしない）
- 参照画像パス（正サンプル。NG は書かない）
- Agent への依頼文
- GenerateImage の `description` **全文**（Labels 省略禁止）
- 合否欄（空でよい）

## 「生成して」がハブに来たとき

本 Skill の起動語ではない。誤って来たら:

| 意図 | 動作 |
|------|------|
| 記事 infographic ＋ 当日フォルダに `image-job-{slug}.md` あり | 手段を1行で確定し、**すぐ** `generate-blog-image` へ委譲（「次に人間が言う文」で止めない） |
| 記事 infographic ＋ ジョブ票なし | A を実行して止まる。GenerateImage しない |
| eyecatch / og / mood / section | ジョブ票は求めず `generate-blog-image` へ委譲 |
| 比較・注釈 | 該当 Skill へ。A/B に入れない |
| LP / Hallmark / Codex | 本ハブを使わない |

## 出力（ハブ完了時）

振り分けのとき:

- 判定した手段と委譲先 Skill 名（1行）
- 流用候補の有無（パス or なし）
- 次に人間が言うべき依頼文の例（例: 「annotate-screenshot で ss-02 に番号を付けて」／「optimize-blog-png.cjs でこのフォルダを軽量化して」／記事 infographic なら「生成して」）

ジョブ化（A）のとき:

- ジョブ票パス
- 「ジョブ票できた。生成していない」
- 次は人間が「生成して」と言う（本 Skill では生成しない）

## 禁止

- 本 Skill 内で `GenerateImage` を呼ぶこと（Codex `image_gen` にも委譲しない）
- 流用ゲートを飛ばして専門へ丸投げすること
- WIP を `public/` に直接置くこと
  - 記事 infographic ジョブ: 採用前は `output/imagegen/<slug>/`
  - その他（注釈・eyecatch 等）: 採用前は Vault `blog-image-staging`
- ユーザーが Skill 名を言っていないのに `bake-og-text` へ委譲すること
- source.md を読む・書くこと（A の画像フロー）
- A の `description` に「生成」「図を作って」を足して B まで走らせること
- C（`public/`・caption・本文挿入）を短い起動語で始めること
