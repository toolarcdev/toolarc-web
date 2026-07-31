## SEO Goals

- Prioritize long-term organic search traffic
- Focus on beginner search intent
- Create practical tutorials
- Align weekly ops with current phase: [`docs/plan/phase-now.md`](plan/phase-now.md)

**Current phase (2026-07-31)**: Calendar **Phase1** + parallel **Phase2-0** (revenue signal). **Evaluation-phase ops**: no publish quota (no floor/cap); prioritize integrate / rewrite / Hub–SubHub; digest `week-queue`. Policy detail: Vault `評価フェーズ移行検討/toolarc.jp_評価フェーズ移行_現状と方針検討_2026-07-31.md` §5.1.

## Operational KPIs (weekly)

> 供給（inbox・品質ゲート）正本: `D:\ObsidianVault\Vault\00-dashboard\reader-theme-supply.md`  
> フェーズ正本: [`docs/plan/phase-now.md`](plan/phase-now.md)  
> 週次キュー仕様: 評価フェーズ移行ノート §5.4

| Metric | Target |
|--------|--------|
| Inbox additions (`reader`) | Quality over quota. Prefer integrate/rewrite candidates; thin “fill the slot” inbox is forbidden (§5.2 evidence bar) |
| Inbox additions (`operator`) | 5 or fewer per week |
| Published articles (`reader` / `operator`) | **No weekly floor or cap**. Record volume only. Publish only when `week-queue` has gated `new` / update rows |
| Week queue | Created Wed slot ⑥ / Skill B. Daily digests that day’s rows (integrate → hub → rewrite → monetize → new) |
| Reader runway (inbox reader A+B ÷ 2.5) | **Reference only** (not a primary success KPI). Prefer integrate/rewrite backlog health |
| Series debt `#6` (Wed) | **2 units** (P0 Hub / P1 promote / integrate·301·SubHub OK). See `debt-paydown-workflow.md` |
| `20` backlog / promote queue | Track yellow/red; on dual red, next business day may add one cleanup ① slot (do **not** fill with thin publishes) |

## Outcome KPIs (weekly)

> **正本（週次表示・CTR・100+・migration）**: Collector（`03-gsc-collector` weekly / a-theme / page-daily / query-daily）  
> Dashboard / GSC UI 手動7日は **突合用**（週次KPIの正にしない）  
> 履歴: `D:\ObsidianVault\Vault\00-dashboard\gsc-weekly-log.md`  
> 収益: `D:\ObsidianVault\Vault\00-dashboard\revenue-signals.md`  
> 数値表の詳細: 評価フェーズ移行ノート §5.1  
> 取得手順: `D:\ObsidianVault\Vault\00-dashboard\gsc-weekly-acquisition-checklist.md`

| Metric | Source | Anchor / Aug / Sep targets (2026) |
|--------|--------|-----------------------------------|
| Weekly impressions (7d) | Collector weekly | **2,450** (07-22..28) → ≥**2,800** (Aug) → ≥**3,500** (Sep) |
| Site CTR (7d) | Collector weekly | **3.14%** → ≥**3.4%** → ≥**3.7%** |
| migration share of impressions (7d) | Collector a-theme | **53.9%** → ≤**48%** → ≤**40%** |
| Pages with ≥100 impressions (28d) | Collector page-daily | **16** → ≥**20** → ≥**25** |
| Non-migration pages ≥100 imp (28d) | same | ~**8** → ≥**10** → ≥**14** |
| Queries with ≥100 impressions (28d) | Collector query-daily | **3** → ≥**5** → ≥**7** |
| Mid-term impressions (monthly) | Collector monthly | Plan anchor **≥150,000 by 2027-07** |
| Indexed page count | GSC「インデックス作成」 | 4 categories + 404 (ops health) |
| CTR fix URLs (declared) | GSC + PR | meta **2–3 URLs/week**; body/Hub/CTA **2–3 URLs/month**. Feed `week-queue` `rewrite`. Detail: Vault `ctr-rewrite-queue.md` |
| Reader ASP clicks (cumulative) | ASP admin | Phase2-0 exit = **reader-attributed ≥10** since self-click ban **2026-07-29**. Contaminated totals invalid |
| Approved revenue (monthly) | ASP admin | Phase2-1+ gate; ¥0 OK while in 2-0 |

手順（②オペレーション）: `D:\ObsidianVault\Vault\00-dashboard\gsc-weekly-acquisition-checklist.md`  
背景（公開記事）: https://www.toolarc.jp/blog/gsc-index-weekly-check-tips

## Discovery pillars

目的: 本数補充ではなく、**勝ちテーマの統合・意図補完**と根拠付きの不足テーマ補給。

1. **Series backlog** — `reader-theme-backlog.md`（integrate/rewrite/gated new; migration = maintain, not main battlefield）
2. **Log conversion** — DailyNote/AI-log → reader-facing titles when evidence bar passes（⑥）
3. **ChatGPT batch** — `reader-theme-batch-prompt.md`（weekly; prefer GSC / revenue themes; thin fill forbidden）
