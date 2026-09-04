---
name: create-source-md
description: >-
  Creates ToolArc article source.md (design outline only) in the Obsidian Daily
  folder after a required 新規記事インプット file input-{slug}.md in the same day
  folder: personas, Output Contract, new-article exception gate, cannibal
  boundaries, evidence bar, Claude.ai constraints, and handoff notes for ④/①.
  Use when the user asks for source.md作成, 構成正本, 記事のsource, slot ⑤ source,
  新規記事インプット, input-{slug}, or 新規公開の例外ゲート用source. Not for writing
  article body drafts, posts.ts, publish, L1 review, or PR.
---

# create-source-md（source.md 構成正本）

Skill = 手順。記事の文体・SEO・Output Contract の**基準本文は再掲しない**（正本へ委譲）。

## 正本と同期

| 層 | パス | 役割 |
|----|------|------|
| 記事正本 | `docs/ai-context/writing-rules.md` | Output Contract 8項目・読者最優先・免責・Frontmatter |
| LLM空句 | `docs/ai-context/llm-forbidden-phrases.md` | Claude制約に要約埋め込みする語彙の正本 |
| 評価ゲート | Vault `toolarc.jp_評価フェーズ移行_現状と方針検討_2026-07-31` の「新規公開の例外ゲート」節・Hub/SubHub 節 | 新規例外ゲート4点・所属 Hub/SubHub |
| 配置フォルダ | `docs/ai-context/content-folders.md` | ①用 contentId 判断（source にメモ） |
| Vault 記法 | 個人 Skill `obsidian-markdown` | ウィキリンク・`Last Updated` |
| 後段 | `l1-review-article` → `publish-article` | ④／①。本 Skill では呼ばない |

## 推奨フロー（新規記事・ゲート通過分）

```text
新規記事インプット（必須6・人。任意でペルソナ／記事の仕事の案を書いてよい）
  → 本 Skill（上位モデル1回・Fable 等）で source.md（ペルソナ・記事の仕事を Agent が確定）
  → source 人間ゲート（削らない）
  → Claude.ai 本文（source のみ添付）
  → L1（l1-review-article）→ ① publish-article
```

- **やらない**: Auto 等で「source 用プロンプト」を別途生成してから本 Skill を走らせる二重 Produce
- **モデル**: source はやり直しコスト大 → 上位 tier（`model-selection-quality-first`）。L1・人間ゲートは cost 削減対象外
- フロー横断の説明: `docs/ai-context/chat-operations.md`「記事フロー」

## やること / やらないこと

**やる**: 当日フォルダの **`input-{slug}.md`（新規記事インプット）** を確認したうえで、同フォルダに `source-{slug}.md` を1本作成（構成・ゲート・契約のみ）。必須要素チェック。④と①への引き継ぎメモ  
**やらない**: 本文初稿・全文執筆、`posts.ts` / `series.ts`、公開・build・commit/PR、L1合否、GSC調査、収益9段の本書き（収益型は `revenue-article-template` を別途参照し、source には導線方針だけ書く）、source 用プロンプトの中間生成、インプット未ファイル化のまま source 作成

## 配置

```text
D:\ObsidianVault\Vault\01_Daily\{YYMM}\{YYMMDD}\input-{slug}.md   ← 新規記事インプット（必須・先）
D:\ObsidianVault\Vault\01_Daily\{YYMM}\{YYMMDD}\source-{slug}.md  ← source.md（本 Skill）
```

- `{YYMMDD}` は作業日（当日フォルダが無ければ `prepare-daily-workfolder` を案内して止める）
- インプットファイル名は `input-{slug}.md`、source は `source-{slug}.md`（括弧付きレガシー名は新規で使わない）
- **チャット貼付のみのインプットは不可**。必ず当日フォルダに `input-{slug}.md` を置いてから source を作る
- slug が依頼・week-queue・inbox・**`input-{slug}.md`** に明示されていれば**その値を正本**とし、別slugを提案・置換しない

## 新規記事インプット（必須・欠けたら作成しない）

正本スキーマ: [references/article-input.md](references/article-input.md)

**ファイル**: `01_Daily/{YYMM}/{YYMMDD}/input-{slug}.md`（source と同フォルダ。必須）

開始前に当該ファイルが存在し、次の**必須6**が埋まっていること。ファイル無し・必須欠け → 質問して**止める**（推測で埋めない）。ユーザーが口頭／チャットで渡した場合は、先に `input-{slug}.md` を当日フォルダへ書いてから本 Skill の source 作成に進む。

| # | 必須項目 | 備考 |
|---|----------|------|
| 1 | slug | 固定・変更禁止 |
| 2 | 検索意図の型 | How-to / 比較 / チェックリスト / Hub |
| 3 | 所属 Hub／シリーズ（または SubHub） | 未定のまま作らない |
| 4 | 隣記事境界（1〜3本） | slug → 委譲／触らない |
| 5 | 根拠の種 | 公式URL／実測メモ／「実測なし・公式準拠」＋断定禁止 |
| 6 | 収益導線方針 | しない／末尾1本／直アフィ案件名 等。空にしない |

**新規記事インプットに含めない**

- **Q番号** — week-queue 運用の目印。記事品質と無関係。例外ゲート④・frontmatter `queue` は作成時にキューから突合して書く（インプット必須ではない）

**任意**（あると精度向上。欠けても source 作成は止めない）: 読者の生の一言／結論の核（最大3）／内部リンク候補／深さの上限・戦略上のやらないこと／**ペルソナ（案）**／**記事の仕事（案）**

インプット作成時、**任意でペルソナを設定してよい**。インプットのペルソナ・記事の仕事は**一つの案**であり確定ではない。**確定は source.md 側の Agent** が行う（案の丸写し必須ではない。2〜3に整える）。

### 人と Agent の分担

| 担当 | 内容 |
|------|------|
| **人（インプット）** | 必須6＋任意。任意でペルソナ・記事の仕事の**案**を書いてよい。根拠・境界・導線・戦略制約は推測禁止 |
| **Agent（本 Skill）** | ペルソナ2〜3・記事の仕事を**確定**（インプットに案があれば材料。無ければ立てる）。Output Contract、H2、ゲート文案、Claude制約埋め込み |
| **人（source ゲート）** | ペルソナ充足・CTA違和感・根拠が創作になっていないか・境界漏れ |

## 手順

開始時: `Get-Date -Format "yyyy-MM-dd HH:mm"` → frontmatter `Last Updated` / 作成日時に使う（手入力・`user_info` 禁止）

1. **`input-{slug}.md` を確認する**（無ければ作成を案内／チャット内容から書いて保存。必須6が欠ける → 質問して停止）
2. **運用突合（品質外）**: week-queue に当該 slug があれば Q・status を例外ゲート④／`queue` に反映。未掲載の新規なら掲載理由1行＋キュー追記が必要かをユーザーに確認
3. **正本を開く**（基準を本 Skill にコピーしない）
   - `writing-rules.md` の Output Contract・読者最優先・Frontmatter・仕様・免責。**読者最優先の「考え方」を読んでから**、記事の仕事／充足／公開面文案（description・導入・結論・H2）を書く。充足を進み先提示にしない（詳細は正本。本 Skill に再掲しない）
   - 必要時のみ例外ゲート節／隣接記事の既存本文（転記禁止の境界確認）
   - **`input-{slug}.md` を正として**境界・根拠・導線を展開（チャット記憶だけで上書きしない）。ペルソナ・記事の仕事の案は材料であり、インプットを確定として固定しない。インプットの末尾 Hub／読む順は運用方針であり、公開面の約束に写さない
4. **テンプレに沿って書く** — 骨格は [references/template.md](references/template.md)。見出し順はテンプレ準拠。空欄禁止（未確定は `note`／要確認）。ペルソナ・記事の仕事は **source.md 側の Agent が確定**（インプットに案があれば材料。必須6・境界・導線と矛盾させない）
5. **必須要素チェック**（下表すべて ✅ になるまで完了にしない）
6. **完了報告**: ファイルパス（input＋source）／slug／例外ゲート4点の可否／④へ渡す1行／①へ渡す1行／**source 人間ゲート待ち**である旨

## 必須要素チェック

| # | 要素 | 合格条件 |
|---|------|----------|
| 0 | 新規記事インプット | 当日フォルダに `input-{slug}.md` があり必須6が埋まっている。チャットのみ・欠けたまま作成していない |
| 1 | 用途・スコープ禁止 | 冒頭で「構成のみ。本文初稿・posts.ts・公開・PR 禁止」と明示 |
| 2 | プロパティ | `slug` / `status` / `type` / `site` / `queue`（キュー突合値） / `Last Updated` / related（week-queue 等の `[[wikilink]]`） |
| 3 | タイトル＋description案 | 公開時 title 案。description は **120〜160文字必須**（両端含む。①で Unicode 再実測）。`――` 禁止・区切りは `｜` または `：` |
| 4 | 記事の仕事／やらないこと | **どのペルソナに対して、記事がどの役割か**を具体的に書く（入口／判断／手順等。曖昧な要約禁止）。＋本文に入れない箇条。インプットの隣記事境界・収益方針と矛盾しない |
| 5 | 悩み／問題／原因／対策／伝えたいこと | 5項目すべて埋める |
| 6 | ペルソナ 2〜3 | 各: **呼び名／知りたいメイン／着地の求め／この記事で充足する不足**。想定した全員のメインが構成・結論で賄えること。公開本文へ転載しない旨を書く。**source.md 側の Agent が確定**（インプットの案は材料。無くても立てる） |
| 7 | Output Contract 8項目 | writing-rules どおり。**想定読者1行＝ペルソナの要約**（別軸の読者像を立てない）。構成案は H2 最大5前後。収益導線はインプット方針と一致 |
| 8 | 構成骨格の詳細 | H2ごとに「書くこと／書かないこと」。抽象ラベル単独見出し禁止 |
| 9 | 例外ゲート① | 既存URLでは意図をカバーできない理由（統合・リライト・SubHub で不可） |
| 10 | 例外ゲート② 根拠バー | インプットの根拠の種を本文で辿れる形に展開。薄味枠埋め禁止 |
| 11 | 例外ゲート③ カニバル | 1段落＋**隣記事の役割境界・転記禁止表**（インプットの境界を正とする） |
| 12 | 例外ゲート④ キュー | week-queue の Q・target・status を明記（未掲載ならユーザー確認）。**Qは運用突合でありインプット必須ではない** |
| 13 | Hub／シリーズ所属 | contentFolder／series 候補を①メモに書く。インプットの所属と一致 |
| 14 | note／要確認 | 未確認の料金・コマンド名・制限・製品名変更を断定禁止。免責へ反映する指示 |
| 15 | Claude.ai 制約 | リポジトリ非参照前提で、文体要点・空句要約・句読点・内部リンク形式・初稿 Frontmatter 雛形を埋め込む |
| 16 | ④への依頼メモ | 構成どおり初稿／確認すべき公式Docs／分量目安／L1へ渡す旨 |
| 17 | ①への公開メモ | contentFolder／series／Hub追記／description実測／免責日付＝Get-Date。**本ファイルでは実施しない** |
| 18 | 公開面語彙メモ | template 節どおり。**アンカー語**と**言い換え候補**を記載。公開面文案は内部ラベルの丸写し禁止（固定語カウントは使わない） |

任意（さらに良い）: 各ペルソナ向けサブ情報 +α（合否外）

### 想定読者・`target`・ペルソナの関係

- **正本は source.md のペルソナ2〜3**（上表。インプット案は材料）。知りたいメインの充足判定もここ
- Output Contract の「想定読者（1行）」と初稿 Frontmatter の `target` は、**同じペルソナ群を1行に要約したもの**（別の読者軸を新設しない）
- 公開本文・初稿本文にペルソナ表は転載しない（writing-rules）。`target` 1行で足りる

## 内部語と公開面文案（1-A）

source 全体では **入口／地図／本編／専念** 等を**役割ラベル（編集室内語）**として自由に使ってよい（カニバル・ゲート・ペルソナ整理用）。

**公開面にそのまま出す文案**（description 案・導入の「書くこと」・今日の結論案・Claude.ai 制約）では:

- 内部ラベルを**そのまま写さない**（意味は継承、語句は言い換える）
- **固定語の回数カウントや禁止リストで制御しない**（語彙の均質化は L1 任意観察・推敲で見る）
- template の **「公開面語彙メモ」** にアンカー語と言い換え候補を書き、④初稿・Claude.ai が参照する

## Claude.ai 制約（埋め込み方針）

web版 Claude.ai はリポジトリを読めない。**本 source だけ添付して初稿を書ける**粒度で要約を入れる。

- 詳細基準は `writing-rules.md` / `llm-forbidden-phrases.md` を読み、source には**運用に必要な要約のみ**（全文コピー禁止）
- 必須: 敬体ベース・段落末敬体・結論先延ばし禁止・`――`禁止・括弧入れ子禁止・内部リンク `/blog/slug`・未公開は「準備中」・直アフィ方針（収益なら `policy.ts` に従う旨1行）。です／ます3連続の切断は**必須にしない**（望ましい工夫／L1任意）
- **暦日**: 免責の `執筆時点（YYYY-MM-DD）` に1回あれば足りる。本文は「執筆時点」で範囲限定可。各H2への同一暦日の連打を source／Claude制約で要求しない（詳細は writing-rules「暦日の置き方」、template の Claude制約1行）
- **公開面語彙**: source の役割ラベル（入口・地図・専念 等）は内部整理用。公開本文（description・導入・今日の結論）に**同じラベルをそのまま繰り返さない**。意味は保ち、公開面語彙メモの言い換え候補で分散する（固定語の回数制限は設けない）
- **スキャン層（方向性のみ・合否外）**: 見出し・挿絵・太字で概要が辿れるよう初稿を書く。太字の置き方は `writing-rules.md`「スキャン層」。source の `スキャンラベル（任意）` は④向け内部メモ（必須要素チェック・L1合否には含めない）
- 初稿用 YAML Frontmatter 雛形（title / description **120〜160文字必須** / date プレースホルダ / tags / site / `target`＝ペルソナ要約1行）

## 収益記事のとき（追加）

- Output Contract の収益導線案を、**新規記事インプットの収益導線方針**に合わせて具体化する（直アフィ可否・CTA本数）
- 詳細9段は `revenue-article-template`。source に9段全文を書かない
- **1記事1チャット**（chat-operations ⑤）

## 完了定型

```text
source.md 作成完了（本文・公開はしない）。
- input: <Vault path to input-{slug}.md>
- path: <Vault path to source-{slug}.md>
- slug: <slug>
- 新規記事インプット: 必須6 充足（ファイル済）
- 新規公開の例外ゲート: 1既存URL / 2根拠 / 3カニバル / 4キュー = 通過 or 要確認
- 次: source 人間ゲート → Claude.ai に source のみ添付 → ④初稿 → l1-review-article → publish-article
```

## 参照

- 新規記事インプット: [references/article-input.md](references/article-input.md)
- 出力骨格: [references/template.md](references/template.md)
- 実例（Vault）: `01_Daily/…/source-*.md`（最近の完成形を1本だけ開いてトーン合わせ可。丸コピー禁止）
