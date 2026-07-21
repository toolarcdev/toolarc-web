---
name: weekly-maintenance
description: >-
  Runs ToolArc Wednesday weekly maintenance Commit (slot ⑥ / Skill B): intake
  guard, column-C handoff, dashboard / gsc-weekly-log / ctr-rewrite-queue
  transfer, debt 2 units. Triggers on short prompts: 週次メンテナンス続き,
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
| フェーズ | `docs/plan/phase-now.md` |

Vault 優先。矛盾したら本 Skill を追従更新。

**やらないこと**: intake 新規作成、Coverage/ASP 読取、⑤ batch 再実行、§1.5 通読。

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
6. **人気スロット更新**（記事末「よく読まれている記事」）:
   - 入力: intake **§1.6**（無ければ HOLD せず仮データのまま継続可。初回本番切替時は必須）
   - 編集: `c:\projects\toolarc-web\lib\blog\popular-articles.ts`
   - `POPULAR_ARTICLE_SLUGS` を約3件の `BlogSlug` に差し替え（表示回数優先・CTRも見る。ホーム／一覧／非記事は除外）
   - 本番データに切り替えたら `POPULAR_ARTICLES_IS_PROVISIONAL = false`
   - 接続型リンクは触らない。PR/commit はユーザー依頼時のみ（他のコード変更とまとめて可）
7. 公開キュー＋シリーズ化（週次範囲）
8. 負債原則 **2単位** → ①依頼
9. intake `⑥転記完了` 等を `[x]`
10. 完了報告。AI-log パスがある日だけ末尾転記

## 完了報告

- 作業フォルダ / ガード結果
- 柱C件数・GSC・ASP N/10・負債2単位
- 人気スロット: 更新した slug 3件 / 仮のまま据え置き / HOLD理由
- 変更ファイル一覧
- ①依頼文言
