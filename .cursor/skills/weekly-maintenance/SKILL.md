---
name: weekly-maintenance
description: >-
  Runs ToolArc Wednesday weekly maintenance Commit (slot ⑥ / Skill B): intake
  guard, column-C handoff, dashboard / gsc-weekly-log / ctr-rewrite-queue
  transfer, week-queue creation (Wed only), debt 2 units. Triggers on short prompts: 週次メンテナンス続き,
  週次メンテ, weekly-maintenance, Skill B; optional work-folder path on the
  next line. On Wednesday, path may be omitted (resolves 01_Daily/YYMM/YYMMDD).
  Not for intake creation (Skill A), daily maintenance, Coverage/ASP scraping,
  or ⑤ batch.
---

# weekly-maintenance（⑥ Skill B）

## 起動（短プロンプト）

**本線** — パス付き（A と同じフォルダ）:

```text
週次メンテナンス続き
D:\ObsidianVault\Vault\01_Daily\2607\260722
```

**水曜ショートカット** — パス省略可:

```text
週次メンテナンス続き
```

別名: `週次メンテ` / `weekly-maintenance` / `Skill B`（同じパス規則）。  
`週次メンテナンス実行` は **Skill A** 用。B では使わない（誤起動防止）。

長文の [[weekly-maintenance-prompt]] 貼り付けは不要（フォールバック時のみ）。

## 作業フォルダの解決

Skill A と同じ規則:

1. `Get-Date`
2. メッセージのパスがあればそれを使用
3. パス無し＋**水曜** → `D:\ObsidianVault\Vault\01_Daily\{yyMM}\{yyMMdd}\`
4. パス無し＋水以外 → **HOLD**
5. 必須: 同フォルダの `weekly-intake-YYYY-MM-DD.md`（無ければ HOLD → A へ差し戻し）
6. DailyNote `YYYY-MM-DD.md` / `AI-log-*.md` はあれば使う（無くても可。必要なら最小作成は運用に従う）

## 正本

| 層 | パス |
|----|------|
| フォールバック | Vault `00-dashboard/weekly-maintenance-prompt.md` |
| 受領 | 作業フォルダの `weekly-intake-YYYY-MM-DD.md` |
| 前段 | `.cursor/skills/weekly-intake/`（Skill A） |
| 詳細 | Vault `maintenance_1min-Tips` 週次節のみ |
| フェーズ | `docs/plan/phase-now.md` / `docs/seo-goals.md` |
| 方針・week-queue 仕様 | Vault `06_toolarc-business/評価フェーズ移行検討/toolarc.jp_評価フェーズ移行_現状と方針検討_2026-07-31.md` §5.2・§5.4・§1.4 |

Vault 優先。矛盾したら本 Skill を追従更新。

**評価フェーズ（Skill B 固有）**: **week-queue は本 Skill（水曜⑥）でのみ新規作成・確定**。公開フォーカス3本選定・翌日3本同期（旧E）は**行わない**。公開ノルマなし。負債 **2単位**に **統合・301・SubHub** を含めてよい。Phase2-0 卒業＝**読者由来** ASP 累計 **≥10**（自己クリック禁止開始 **2026-07-29** 以降の増分。汚染期間は無効）。

**やらないこと**: intake 新規作成、Coverage/ASP 読取、⑤ batch 再実行、§1.5 通読、**Skill A と同チャットで week-queue を先に作ること（A は原料のみ）**。

## token節約

intake・DailyNote・編集対象（dashboard / gsc-weekly-log / ctr-rewrite-queue / revenue-signals）・柱Cで触る inbox/候補マスターのみ。

## 固定パス（Vault）

| 用途 | パス |
|------|------|
| Dashboard | `D:\ObsidianVault\Vault\00-dashboard\dashboard.md` |
| gsc-weekly-log | `D:\ObsidianVault\Vault\00-dashboard\gsc-weekly-log.md` |
| CTRキュー | `D:\ObsidianVault\Vault\00-dashboard\ctr-rewrite-queue.md` |
| 候補マスター | `D:\ObsidianVault\Vault\00-dashboard\toolarc_1min_tips_article_candidates.md` |
| Inbox | `D:\ObsidianVault\Vault\04-Tips\inbox`（必要分） |
| revenue-signals | `D:\ObsidianVault\Vault\00-dashboard\revenue-signals.md` |
| Active Board | `D:\ObsidianVault\Vault\00-dashboard\active-tasks.md`／`done-tasks-log.md`（週枠未同期の保険のみ） |
| matrix | `node D:\ObsidianVault\Vault\00-dashboard\_classify_audience_axis.mjs` |
| 分類 | `node D:\ObsidianVault\Vault\00-dashboard\_classify_title.mjs "…"` |

## 受領ガード

転記前: `②受領完了` / §1 / §2 / §4（§3 任意）。  
柱C前: `⑤柱C用シグナル渡し完了`（または不要）/ §5 / §5.1。  
分離可。欠損は HOLD（A 差し戻し。Collector 再取得しない）。

## 手順

`Get-Date` → フォルダ解決 → ガード → 変更計画 → **承認後**編集。

1. ガード。FAIL なら HOLD
2. 柱C: §5.1 → inbox/候補マスター + `_classify_title.mjs`
3. matrix 再生成
4. reader 健全性（最小限）
5. KPI 転記（DailyNote / dashboard / gsc-weekly-log / ctr-rewrite-queue+F / §4）
   - **ASP §4**: 読者由来累計を **N/10** で報告（禁止開始 **2026-07-29** 以降。汚染込み合計は卒業に使わない）。`revenue-signals` に方針どおり追記
   - **§2 → キュー**: intake §2 を [[ctr-rewrite-queue]] へ**人間ゲート転記**（自動上書き禁止。A-OPP CSV 由来でも同じ）。表示用＋ dashboard F も同様
   - **A-THEME**: intake にテーマROI／勝ち3があれば、判断1行・**週次キュー組み立て**の根拠に1行参照（完了報告に「A-THEME参照」と書く）。量産配分メモ（旧方針B）は書かない
   - **A-PQMAP**: §2 に `primary_query` がある候補は、深掘り時に `analysis/a-pqmap/` を見て **meta（一致）/ body・派生（不一致・副意図）** をメモ（キュー自動変更はしない）
6. **人気スロット更新**（記事末「よく読まれている記事」）:
   - 入力: intake **§1.6**（無ければ HOLD せず仮データのまま継続可。初回本番切替時は必須）
   - 編集: `c:\projects\toolarc-web\lib\blog\popular-articles.ts`
   - `POPULAR_ARTICLE_SLUGS` を約3件の `BlogSlug` に差し替え（表示回数優先・CTRも見る。ホーム／一覧／非記事は除外）
   - 本番データに切り替えたら `POPULAR_ARTICLES_IS_PROVISIONAL = false`
   - 接続型リンクは触らない。PR/commit はユーザー依頼時のみ（他のコード変更とまとめて可）
7. **week-queue 新規作成・確定**（§5.4.2〜5.4.8 — ⑥後半・旧「公開キュー3本／翌日フォーカス」は廃止）:
   - **入力**: Collector 週次／a-theme（migrationシェア）／[[ctr-rewrite-queue]]／[[active-tasks]]（当週 due・週枠親）／移行URL役割マップ・Hub-SubHub未完了／intake の例外新規**候補**（ゲート前）
   - **ファイル**: 作業フォルダ（水曜 `01_Daily/YYMM/YYMMDD/`）に `week-queue-YYYY-MM-DD.md`（日付＝**翌木曜**開始）。`status: active`。前週 active は `closed`
   - **行**: 推奨構成 `integrate` 2〜4 / `rewrite` 2〜4 / `hub` 0〜2 / `monetize|measure` 1〜2 / `debt` 2単位 / `new` 0〜n（**§5.2 通過のみ**）。合計目安 8〜14行。空日を公開埋めで埋めない
   - **繰越**: 前週 `planned`/`doing` を先頭へ
   - **active-tasks**: 取込行の `source` に `active-tasks:<ID>`。週枠表に当週 `[[week-queue-…]]` 1行（中身の重複記載は week-queue のみ）
   - **Dashboard**: 当週 week-queue 要約（旧公開フォーカス3本欄は使わない）
   - **確定チェック**: 全行 `done_def`／`new` は §5.2／柔軟1本空枠なし／週枠逆リンク
8. シリーズ化・inbox（週次範囲。**本数ノルマで埋めない**。柱C handoff は `new` 候補原料）
9. 負債原則 **2単位**（**統合・301・SubHub** 可）→ ①依頼。可能なら week-queue に `debt` 行としても載せる
9.5. **レーンB週枠・完了同期（保険）**: `active-tasks` 週枠のうち、手順が `closed`／引き継ぎ済みなのに Board に残っている行があれば運用設計 §6（削除＋`done-tasks-log`＋任意残切出し）。毎回の棚卸しはしない。正本: Vault `タスク管理_ActiveBoard/運用設計` §6.1（案D）
10. intake `⑥転記完了` 等を `[x]`
11. 完了報告。AI-log パスがある日だけ末尾転記

## 完了報告

- 作業フォルダ / ガード結果
- 柱C件数・GSC・**読者ASP N/10**（2026-07-29〜）・負債2単位・**week-queue パス／行数／new件数**
- CTRキュー転記: 件数 / A-OPP由来か / 人間ゲート確認
- A-THEME 配分参照: あり／なし
- 人気スロット: 更新した slug 3件 / 仮のまま据え置き / HOLD理由
- 変更ファイル一覧
- ①依頼文言
