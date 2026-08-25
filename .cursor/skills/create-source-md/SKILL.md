---
name: create-source-md
description: >-
  Creates ToolArc article source.md (design outline only) in the Obsidian Daily
  folder: personas, Output Contract, new-article exception gate, cannibal
  boundaries, evidence bar, Claude.ai constraints, and handoff notes for ④/①.
  Use when the user asks for source.md作成, 構成正本, 記事のsource, slot ⑤ source,
  or 新規公開の例外ゲート用source. Not for writing article body drafts, posts.ts,
  publish, L1 review, or PR.
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

## やること / やらないこと

**やる**: Vault に `source-{slug}.md` を1本作成（構成・ゲート・契約のみ）。必須要素チェック。④と①への引き継ぎメモ  
**やらない**: 本文初稿・全文執筆、`posts.ts` / `series.ts`、公開・build・commit/PR、L1合否、GSC調査、収益9段の本書き（収益型は `revenue-article-template` を別途参照し、source には導線方針だけ書く）

## 配置

```text
D:\ObsidianVault\Vault\01_Daily\{YYMM}\{YYMMDD}\source-{slug}.md
```

- `{YYMMDD}` は作業日（当日フォルダが無ければ `prepare-daily-workfolder` を案内して止める）
- ファイル名は `source-{slug}.md`（括弧付きレガシー名は新規で使わない）
- slug が依頼・week-queue・inbox に明示されていれば**その値を正本**とし、別slugを提案・置換しない

## 手順

開始時: `Get-Date -Format "yyyy-MM-dd HH:mm"` → frontmatter `Last Updated` / 作成日時に使う（手入力・`user_info` 禁止）

1. **入力を固定する**（欠けたら質問して止める）
   - slug（固定）
   - 検索意図の型（How-to / 比較 / チェックリスト / Hub）
   - week-queue の Q番号（新規 `new` なら必須。未掲載なら掲載理由1行＋キュー追記が必要かをユーザーに確認）
   - 所属シリーズ／Hub（または SubHub）。**所属未定のまま作らない**（評価ノートの Hub/SubHub 方針）
2. **正本を開く**（基準を本 Skill にコピーしない）
   - `writing-rules.md` の Output Contract・読者最優先・Frontmatter・仕様・免責
   - 必要時のみ例外ゲート節／隣接記事の既存本文（転記禁止の境界確認）
3. **テンプレに沿って書く** — 骨格は [references/template.md](references/template.md)。見出し順はテンプレ準拠。空欄禁止（未確定は `note`／要確認）
4. **必須要素チェック**（下表すべて ✅ になるまで完了にしない）
5. **完了報告**: ファイルパス／slug／例外ゲート4点の可否／④へ渡す1行／①へ渡す1行

## 必須要素チェック

| # | 要素 | 合格条件 |
|---|------|----------|
| 1 | 用途・スコープ禁止 | 冒頭で「構成のみ。本文初稿・posts.ts・公開・PR 禁止」と明示 |
| 2 | プロパティ | `slug` / `status` / `type` / `site` / `queue` / `Last Updated` / related（week-queue 等の `[[wikilink]]`） |
| 3 | タイトル＋description案 | 公開時 title 案。description は **120〜160文字必須**（両端含む。①で Unicode 再実測）。`――` 禁止・区切りは `｜` または `：` |
| 4 | 記事の仕事／やらないこと | **どのペルソナに対して、記事がどの役割か**を具体的に書く（入口／判断／手順等。曖昧な要約禁止）。＋本文に入れない箇条 |
| 5 | 悩み／問題／原因／対策／伝えたいこと | 5項目すべて埋める |
| 6 | ペルソナ 2〜3 | 各: **呼び名／知りたいメイン／着地の求め／この記事で充足する不足**。想定した全員のメインが構成・結論で賄えること。公開本文へ転載しない旨を書く |
| 7 | Output Contract 8項目 | writing-rules どおり。**想定読者1行＝ペルソナの要約**（別軸の読者像を立てない）。構成案は H2 最大5前後 |
| 8 | 構成骨格の詳細 | H2ごとに「書くこと／書かないこと」。抽象ラベル単独見出し禁止 |
| 9 | 例外ゲート① | 既存URLでは意図をカバーできない理由（統合・リライト・SubHub で不可） |
| 10 | 例外ゲート② 根拠バー | 実測／一次ログ **または** 調査・公式Docs・二次分析・SERP/GSC を本文で辿れる形。薄味枠埋め禁止 |
| 11 | 例外ゲート③ カニバル | 1段落＋**隣記事の役割境界・転記禁止表** |
| 12 | 例外ゲート④ キュー | week-queue の Q・target・status を明記（未掲載ならユーザー確認） |
| 13 | Hub／シリーズ所属 | contentFolder／series 候補を①メモに書く。所属未定で止めない |
| 14 | note／要確認 | 未確認の料金・コマンド名・制限・製品名変更を断定禁止。免責へ反映する指示 |
| 15 | Claude.ai 制約 | リポジトリ非参照前提で、文体要点・空句要約・句読点・内部リンク形式・初稿 Frontmatter 雛形を埋め込む |
| 16 | ④への依頼メモ | 構成どおり初稿／確認すべき公式Docs／分量目安／L1へ渡す旨 |
| 17 | ①への公開メモ | contentFolder／series／Hub追記／description実測／免責日付＝Get-Date。**本ファイルでは実施しない** |

任意（さらに良い）: 各ペルソナ向けサブ情報 +α（合否外）

### 想定読者・`target`・ペルソナの関係

- **正本はペルソナ2〜3**（上表）。知りたいメインの充足判定もここ
- Output Contract の「想定読者（1行）」と初稿 Frontmatter の `target` は、**同じペルソナ群を1行に要約したもの**（別の読者軸を新設しない）
- 公開本文・初稿本文にペルソナ表は転載しない（writing-rules）。`target` 1行で足りる

## Claude.ai 制約（埋め込み方針）

web版 Claude.ai はリポジトリを読めない。**本 source だけ添付して初稿を書ける**粒度で要約を入れる。

- 詳細基準は `writing-rules.md` / `llm-forbidden-phrases.md` を読み、source には**運用に必要な要約のみ**（全文コピー禁止）
- 必須: 敬体ベース・です／ます3連続禁止・結論先延ばし禁止・`――`禁止・括弧入れ子禁止・内部リンク `/blog/slug`・未公開は「準備中」・直アフィ方針（収益なら `policy.ts` に従う旨1行）
- 初稿用 YAML Frontmatter 雛形（title / description **120〜160文字必須** / date プレースホルダ / tags / site / `target`＝ペルソナ要約1行）

## 収益記事のとき（追加）

- Output Contract の収益導線案を具体化する（直アフィ可否・CTA本数）
- 詳細9段は `revenue-article-template`。source に9段全文を書かない
- **1記事1チャット**（chat-operations ⑤）

## 完了定型

```text
source.md 作成完了（本文・公開はしない）。
- path: <Vault path>
- slug: <slug>
- 新規公開の例外ゲート: 1既存URL / 2根拠 / 3カニバル / 4キュー = 通過 or 要確認
- 次: Claude.ai に本ファイルのみ添付 → ④初稿 → l1-review-article → publish-article
```

## 参照

- 出力骨格: [references/template.md](references/template.md)
- 実例（Vault）: `01_Daily/…/source-*.md`（最近の完成形を1本だけ開いてトーン合わせ可。丸コピー禁止）
