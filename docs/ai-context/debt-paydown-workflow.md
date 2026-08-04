# debt-paydown-workflow.md — シリーズ負債払い運用

最終更新: 2026-08-04 18:26（評価フェーズ: 後付け series・B/21 直置き・`20` 新規禁止）  
用途: 公開後に溜まる「後払い負債」と、後付け series 化の払い方。①（公開）・⑥（日次/週次）が参照。  
置き場の正本: [`content-folders.md`](content-folders.md)

関連: [`chat-operations.md`](chat-operations.md)、[`lib/series/series.ts`](../../lib/series/series.ts)、[`docs/plan/phase-now.md`](../plan/phase-now.md)、Vault 評価フェーズ移行ノート

---

## 背景とトレードオフ

評価フェーズでは **公開ノルマ（下限・上限）を設けない**。薄味の枠埋め公開はしない（例外ゲート: 評価フェーズ移行ノート §5.2）。

**現行の公開モデル（後付け series）**

- 勝ちが見えるまで Hub／`series.ts` は作らない。新規は **既存 B** または **新 `21-…`** に直置きし、同ジャンルは相互リンク
- 既存 series への追記は A 直置き ＋ **同一①で Hub 反映**（「フォルダだけ先」禁止）
- `20-investigate-something` は量産負債の在庫。**新規投入禁止**。週次で昇格・統合を払う

公開するたびに起きうる負債:

- 既存 series の Hub／`series.ts` 漏れ（①で潰し切れなかったとき）
- レガシー `20` の滞留・A/B 未昇格
- 逆方向内部リンクの未整備
- 意図重複による統合・301・SubHub未整備
- B／`21-` クラスタの series 化タイミング（データ待ち。負債というより判断待ち）

本ドキュメントは負債を **軽負債（毎公開）** と **重負債（水曜・原則2単位）** に分け、溜まり続けない運用を定義する。

**評価フェーズ（現行・`phase-now.md`）**: 公開ノルマは無い。水曜2単位と赤域時の整理①追加枠で負債を払う。単位内容に **統合・301・SubHub** を含めてよい。薄味公開で枠を埋めない。

```mermaid
flowchart LR
  publish[①公開_軽負債]
  daily[⑥日次_キュー更新]
  weekly[⑥水曜_重負債原則2単位]
  publish --> daily --> weekly
```

---

## 負債の種類

| 種類 | タイミング | 担当 | 内容 |
|------|-----------|------|------|
| **軽負債** | 毎公開（①） | Cursor ① | 既存 series なら `series.ts`＋Hub 本文スポーク。非 series なら相互リンク。Vault `promotion_status` |
| **重負債** | 水曜・原則2単位（⑥→①） | ⑥で選定、①で実装 | Hub stale 保険、`20`→A/B 昇格、series 化 PR、逆リンク、統合・301 |
| **日次追跡** | 毎日（⑥） | Cursor ⑥ | 分類・debt カウンタ・Hub stale 判定（Vault のみ） |

**変更しない**: `slug` / 公開 URL、`imageBasePath`（昇格時も当面維持可）。  
**変えたこと**: 新規の `contentId` 入口は `20` ではない（正本: [`content-folders.md`](content-folders.md)）。

---

## ① 公開時チェックリスト（軽負債・必須）

公開 PR の完了条件に含める。所要目安 5〜10 分。

| # | 作業 | 条件 |
|---|------|------|
| 1 | **置き場を確定** | [`content-folders.md`](content-folders.md): 既存 A / 既存 B / 新 `21-…`。**`20` へ置かない** |
| 2 | **`series.ts` に spoke 追加** | **既存 series への追記時のみ**。未確定（B／`21-`）はスキップ |
| 3 | **Hub 本文にスポークリンク** | 既存 series 追記時は **同一 PR 必須**（spoke→Hub リンク1本＋Hub 側一覧）。Hub 自身の公開時は不要 |
| 4 | **同ジャンル相互リンク** | B／`21-`（および同日複数本）。既存ルール（公開順クロスリンク含む） |
| 5 | **Vault 候補マスターに記録** | `content_folder` + `promotion_status`（A 追記完了寄りなら `hub_updated`、B／`21-` なら `standalone`。レガシーのみ `published_in_20`） |
| 6 | **公開日を実装日で統一** | 実装開始時に `Get-Date -Format "yyyy-MM-dd"`。frontmatter `date` と `publishedAt` 一致。inbox の `publishDate` は参照しない |

**週次に回す（公開 PR ではやらない）**

- レガシー `20` の大量 A/B 移動・`001-` リネーム一括
- 既存 Hub の全面差し替え（`hubSlug` 変更）
- 既存記事への逆リンク一括（関連1本程度は①で可）
- 「まだ勝ちが見えない」クラスタの Hub 新設

---

## ⑥ 日次追加タスク

[`maintenance_1min-Tips.md`](D:\ObsidianVault\Vault\00-dashboard\maintenance_1min-Tips.md) の必須タスク D として実施。 **Vault のみ編集**（repo は触らない）。

| タスク | 内容 |
|--------|------|
| **分類ゲート** | 当日公開分の `content_folder` を `series:*` / `topic:*` / `standalone` のいずれかに。`inbox:keep` は「未判断」のみ |
| **debt カウンタ** | Dashboard のシリーズ負債カウンタを更新（定義は下記「debt カウンタ定義」節） |
| **Hub stale 判定** | シリーズごとに `series.ts` の spoke 数 − Hub 本文のスポークリンク数 ≥ 2 → `hub_stale: true`（①漏れの保険） |
| **黄/赤判定** | Hub 未更新・`20` 滞留・昇格待ちを閾値と照合し、Dashboard に段階を記録 |
| **week-queue 当日消化** | 当日 `day` の week-queue 行を消化。正本: maintenance_1min-Tips 必須タスク E／評価フェーズ移行ノート §5.4 |

### 日次で公開があったときの最小手順

1. `posts.ts` で当日 `publishedAt` の件数を確認。あわせて `contentId: "20-investigate-something"` 総数（レガシー滞留）を確認する（0本の日もあり）
2. 候補マスターの該当件だけ `status: published` / `published_date` / `公開` / `promotion_status` を補完する
3. `content_folder: series:*` かつまだ A 未移動のレガシーだけ、昇格アクション待ちへ加算する
4. Dashboard のシリーズ負債カウンタを更新する
5. Hub stale は日次では広範囲再判定しない。`series.ts` 追加や Hub 差分が明らかな場合だけ該当シリーズを補正する

---

## ⑥ 水曜 #5 — シリーズ化スキャン（後付け判定）

水曜週次の **#5** 内で実施。**検知と Hub 作成は分離**するが、Hub を作るときは移動と同時（下記「新シリーズ実装フロー」）。

### スキャン手順（10〜15分）

1. **対象列挙** — B 層（`05`〜`09`）・`21-` 以降・レガシー `20` の公開済み slug。候補マスターの `content_folder` / `audience_axis` / GSC メモと突合
2. **クラスタリング** — テーマ・相互リンクの塊ごとに束ねる（特に `standalone` / `topic:*`）
3. **推奨ゲート** — 4項目中 **3以上** で「新シリーズ推奨」（勝ち待ちを尊重し、無理に Hub を作らない）:
   - 同一テーマが **≥3本** 公開済み（B／`21-`／`20` の合算可）
   - **既存 `series.ts` の Hub でカバーできない**（統合可能なら新シリーズ禁止）
   - **`audience_axis: reader` が中心** かつデータ／導線上「勝ち筋」が見える（クリック・表示・相互導線のいずれか）
   - **Hub 記事が読者導線として意味がある**（How-to 連鎖・段階的切り分け）
4. **判定** — 各クラスタを `新Hub` / `既存series統合` / `保留（standalone継続）` に分類
5. **ラベル付与** — 新シリーズ候補に `content_folder: series:candidate:<theme-slug>` を付与（週次のみ）

### 出力（必須）

- DailyNote: `series候補: <theme-slug> N本 → 新Hub|既存統合|保留（理由1行）`
- Dashboard: 新シリーズ候補クラスタ・作成キューを更新

### ガードレール（新シリーズ作成）

| ルール | 値 |
|--------|-----|
| 新シリーズ作成上限 | **月1本まで**（超過分はキュー） |
| 最小スポーク | Hub 新設時 **≥3本** 既公開、1年で **8本見込み** |
| 統合優先 | 既存 `series:*` に入るなら **新シリーズ禁止** |
| アクティブ上限 | **`series.ts` 登録が12本超** → 新シリーズ停止、統合/`standalone` 優先 |
| メタ記事 | ブログ運用系は **1クラスタに集約**（`series:candidate:blog-ops-meta` 等） |

### 新シリーズ実装フロー（#6 とは別トラックだが同一①で完結）

1. 週次 #5 で `series:candidate:<theme-slug>` 付与
2. 月次キャップ内なら **④** で Hub `source.md`
3. **①** で次を **同一 PR**:
   - 新 A の `contentId` フォルダ（採番は既存 A の空き／方針に従う）または既存 A への統合
   - Hub MD 配置 + `series.ts` 新規／spoke 一覧
   - 関連 Spoke を B／`21-`／`20` から移動 + `posts.ts` の contentId 更新
   - Hub 本文に全スポークリンク
4. 「Hub だけ先・Spoke は後」「フォルダだけ先・Hub は後」は禁止

④ 依頼テンプレ: [`chat-operations.md`](chat-operations.md)「④ 新シリーズ Hub 初稿」

---

## ⑥ 水曜「負債払い」（#6・原則2単位）

毎週水曜の週次メンテで **原則2単位** 実施。同一シリーズの同時大量昇格はしない。単位が足りない週は最低1単位、余力があれば3単位まで可（通常は2）。  
評価フェーズでは単位に **統合・301・SubHub** を含めてよい（week-queue `debt` / `integrate` / `hub` と連動）。

### 選定優先（P0 → P3）

| 優先 | 単位 | 内容 | 担当 |
|------|------|------|------|
| P0 | **Hub 更新 / SubHub** | `hub_stale: true` のシリーズで Hub に未掲載スポークを追記、または分岐地図・SubHub改稿 | ④文案 → ①反映 |
| P1 | **昇格 PR / series 化 / 統合・301** | レガシー `20`→A/B、または #5 通過クラスタの series 化同一 PR、または重複URLの統合・301 | ① |
| P2 | **逆リンク更新** | 今週公開/昇格スポークについて関連記事1〜2本にリンク追加 | ① |
| P3 | **単発整理** | `standalone` 確定の `promotion_status` を更新 | ⑥のみ |

### 選定ロジック（#5 結果と連携・2単位）

```
単位1:
  if hub_stale あり → P0 Hub更新
  else if レガシー20の既存series滞留 ≥ 3本 → P1 昇格PR（#5の「既存統合」推奨を優先）
  else if #5 で新Hub推奨 & 月次キャップ余裕 → P1 series化同一PR（または来週④準備を記録）
  else → P2 逆リンク or P3

単位2:
  if まだ hub_stale あり → 別シリーズの P0
  else if 昇格待ちが残る → 別シリーズの P1
  else → P2
```

### ① 依頼テンプレ（水曜⑥から）

```text
【負債払い（原則2単位・評価フェーズ）】
単位1: 種別 Hub更新|SubHub|昇格PR|series化|統合301|逆リンク / シリーズ / slug一覧
単位2: 種別 Hub更新|SubHub|昇格PR|series化|統合301|逆リンク / シリーズ / slug一覧
手順: docs/ai-context/debt-paydown-workflow.md / content-folders.md / docs/plan/phase-now.md
```

---

## 閾値トリガー（黄/赤信号）

| 条件 | 段階 | アクション |
|------|------|-----------|
| 同一シリーズが `20` に **5本** 滞留 | 赤 | 翌公開日までに昇格 PR（P1） |
| Hub 未更新シリーズ数 **≥1** | 黄 | 次回水曜 #6 の P0 候補に入れる |
| Hub 未更新シリーズ数 **≥2** | 赤 | 次の①依頼を Hub 更新（P0）に切替 |
| 昇格アクション待ち **≥5本** | 黄 | 次回水曜 #6 の P1 候補に入れる |
| 昇格アクション待ち **≥8本** | 赤 | 整理 PR（P1）を①へ依頼 |
| `20` 総数 **≥50本** | 黄 | 48時間以内に①を整理 PR（P0/P1／統合）へ1回差し替え |
| `20` 総数 **≥70本** | 赤 | 赤指標が2つ以上なら翌営業日に整理①を **追加1枠**（薄味の枠埋め公開はしない） |
| 週次の `20` 純減が止まっている週が続く | 黄 | #6 で P1 を優先（新規は B/21 のため純増はレガシー消化速度の指標） |
| 単発確定（series 化しない） | — | `standalone`。昇格キューに入れない |

**運用注釈（評価フェーズ）**

- 公開ノルマ（下限・上限）は無い
- `20` 総数はレガシー消化の指標。**新規を `20` に入れて枠を埋めない**
- 赤域の対処は「整理①の追加枠」と「水曜2単位（統合・301含む）」で払う
- 黄/赤は「正常/異常」ではなく **ベースライン超過の段階的通知**
- フェーズ文脈: [`docs/plan/phase-now.md`](../plan/phase-now.md)／評価フェーズ移行ノート

---

## debt カウンタ定義（Dashboard）

| 指標 | 集計方法 |
|------|----------|
| `20` 滞留本数 | `posts.ts` で `contentId: "20-investigate-something"` を grep |
| Hub 未更新 | `series.ts` spoke − Hub リンク ≥2 のシリーズ数 |
| **昇格アクション待ち** | 候補マスターで `content_folder: series:*` かつ `promotion_status` が `published_in_20` **または** `hub_updated`（レガシー／未移動） |
| **週次 `20` 純減** | 前週水曜の `20` 滞留 − 当週の値（消化速度）。⑥日次で Dashboard に記入 |

---

## promotion_status（Vault 候補マスター）

`content_folder`（配置先分類）と別軸。公開済み記事の負債段階を追跡する。

| 値 | 意味 |
|----|------|
| `published_in_20` | 公開済み・まだ `20` 配置（レガシー負債） |
| `standalone` | B／`21-` 公開・series 化しない／勝ち待ち。昇格キュー外 |
| `hub_updated` | 既存 series で Hub に当該スポークを反映済み |
| `promoted` | A 層へ移動済み（`posts.ts` contentId 更新済み） |

**状態遷移**

```
（レガシー）公開 in 20 → published_in_20 → hub_updated → promoted
（現行）公開 in B/21 → standalone（series化時）→ promoted（+ Hub 同時）
（現行）既存 A 追記 → hub_updated（同一①で完了）
```

Vault 定義の正本: `00-dashboard/content-folder-labels.md`

---

## 初期バックログ（昇格・Hub 優先順）

水曜1単位ずつ消化する目安（レガシー中心。完了したら #5 の後付け候補へ）。

| 週 | 単位 | 対象 |
|----|------|------|
| 1 | Hub 更新 | `cursor-free-series`（`20` 滞留スポークの Hub 反映） |
| 2 | 昇格 PR | `cursor-free-series` → `03-cursor-free` |
| 3 | Hub 更新 | `site-launch-series`（`blog-page-size-15-tips` 等） |
| 4 | 昇格 PR | `site-launch-series` 残り → `01-site-launch` |
| 5 | Hub 更新 | `claude-obsidian-workflow-series`（`obsidian-dashboard-focus-tips` 等） |
| 6以降 | #5 スキャン | `series:candidate` 付与。月1本以内なら ④→① で新 Hub（移動同時） |

`08-new-domain-seo` は昇格済み。Hub 差し替え（`013` 原稿）は [`content-folders.md`](content-folders.md) のとおり別 PR 可。

---

## スロット分担

| 作業 | スロット | タイミング |
|------|----------|-----------|
| 本文初稿 | ④ Claude | 公開前 |
| 軽負債・build・PR | ① Cursor | 公開時 |
| debt カウンタ・分類 | ⑥ Cursor | 毎日 |
| シリーズ化スキャン | ⑥ Cursor | 水曜 #5 |
| Hub 改稿文案 | ④ Claude | Hub stale / 新シリーズ候補時 |
| 重負債（昇格・series化・逆リンク） | ① Cursor | 水曜 #6・原則2単位 |
| 新シリーズ Hub＋移動 | ④→① | 月0〜1本（#5 推奨後・同一①） |
| GSC 影響確認 | ② Cursor | 昇格後（imageBasePath 不変なら軽く） |
