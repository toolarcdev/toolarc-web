# content-folders.md — content/blog フォルダ運用

最終更新: 2026-08-04 19:13  
用途: `contentId`（`content/blog/[contentId]/`）の選び方・昇格ルール。記事公開（①）・日次／週次メンテ（⑥）で参照。  
記事の文体・CTA・SEO は扱わない（正本: [`writing-rules.md`](writing-rules.md)）。公開手順は Skill `publish-article` / `.cursor/rules/article-publish.mdc`。

関連: [`project-context.md`](project-context.md)、[`chat-operations.md`](chat-operations.md)、[`debt-paydown-workflow.md`](debt-paydown-workflow.md)、[`lib/series/series.ts`](../../lib/series/series.ts)

---

## 方針（評価フェーズ）

- **後付け series**: 勝ち記事・導線が見えるまで Hub／`series.ts` は作らない。それまでは **standalone（相互リンク）**
- **新規の既定置き場は `20` ではない**。`20-investigate-something` は量産負債の在庫（**新規投入禁止**）
- **置き場ルール**: 既存 B にジャンルが合う → その B。合わない → **`22-…` 以降の新 B フォルダ**を切る（`21-cursor-models` は使用済み）
- **既存 series（A）への追記**: A 層直置き ＋ **同一① PR で** `series.ts` と Hub 本文のスポーク反映（週次に先送りしない）
- **series 化**: データ／相互リンクの塊を見て週次 #5 で判定。実装は **Hub 新規＋移動＋スポーク一覧を同一①**（振り分けと Hub を同時に）

---

## 3層の contentId

| 層 | 意味 | contentId | series（`series.ts`） | 新規 MD の置き場 |
|----|------|-----------|------------------------|------------------|
| **A** | シリーズ確定 | `01-site-launch` | site-launch-series | **既存 series への追記時のみ**直置き（＋Hub 同時更新） |
| **A** | シリーズ確定 | `02-claude-obsidian-workflow` | claude-obsidian-workflow-series | 同上 |
| **A** | シリーズ確定 | `03-cursor-free` | cursor-free-series | 同上 |
| **A** | シリーズ確定 | `04-chatgpt_account_migration` | chatgpt-account-migration-series | 同上 |
| **A** | シリーズ確定 | `08-new-domain-seo` | new-domain-seo-series | 同上 |
| **A** | シリーズ確定 | `10-claude-developer` | claude-developer-series | 同上 |
| **A** | シリーズ確定 | `11-mcp` | mcp-series | 同上 |
| **B** | 非シリーズ・トピック束 | `05-nextjs-image-cache` | （site-launch スポーク等・例外あり） | ジャンル一致ならここへ直置き |
| **B** | 非シリーズ・トピック束 | `06-chatgpt-how-to` | なし | 同上 |
| **B** | 非シリーズ・トピック束 | `07-daily-note-obsidian` | claude-obsidian（DailyNote系） | 同上 |
| **B** | 非シリーズ・トピック束 | `09-ai-tools-comparison` | なし | 同上 |
| **B** | 非シリーズ・トピック束 | `21-cursor-models` | なし（後付け series 候補。`cursor-model-selection-guide` / `kimi-k3-cursor-guide` は cursor-free スポークにも載る） | Cursor のモデル選定・外部モデル連携。配置済: `001`〜`003`（selection / DeepSeek / Kimi） |
| **B** | 非シリーズ・トピック束（新規） | `22-{theme-slug}` 以降 | なし（series 化後に A へ） | 既存 B（`21` 含む）に合わないときの**新規既定** |
| **C** | 量産負債在庫 | `20-investigate-something` | なし | **新規禁止**（既存の昇格・整理のみ） |

1シリーズが複数 contentId を持ってもよい（例: claude-obsidian = `02` + `07`）。  
`21-` 以降は未使用の整数を採番する（次の新束は `22-…`）。1本だけの束でもよい（後から同フォルダへ追記）。

---

## 判断フロー（公開時の置き場）

```
新規公開（①）
  │
  ├─【A】既存 series（Hub / series.ts 確定）への Spoke 追記？
  │     → Yes: 対応する A 層フォルダへ直置き
  │            posts.ts の contentId = その A 層 ID
  │            同一 PR: series.ts spoke 追加 + Hub 本文にスポークリンク
  │
  ├─【B】既存 B 層フォルダのジャンルに合う？
  │     → Yes: その B へ直置き（例: 06-chatgpt-how-to/）
  │            posts.ts の contentId = その B
  │            Hub / series.ts は触らない
  │            軽負債: 同ジャンル既存への相互リンク
  │            promotion_status 目安: standalone
  │
  └─【B 新設】どちらにも合わない
        → content/blog/22-{theme-slug}/ を新設（次の空き番号。`21-cursor-models` は使用済み）
           posts.ts もその contentId
           軽負債: 関連既存があれば相互リンク（無ければスキップ可）
           promotion_status 目安: standalone
```

**やってはいけないこと**

- 新規を `20-investigate-something` に置く（量産インボックス運用は終了）
- series 未確定のまま Hub／`series.ts` だけ先に作る（勝ちが見えるまで不要）
- A 層に Spoke を置いて Hub 更新を週次に先送りする

**後工程（series 化・負債）**: 公開直後に「振り分け待ち」にしない。series 化は **⑥水曜 #5 の判定 → ①で Hub＋移動を同時実装**。詳細: [`debt-paydown-workflow.md`](debt-paydown-workflow.md)

```
公開後（⑥）
  → 日次: 候補マスターで content_folder を series:* / topic:* / standalone 等へ（新規 B/21 は topic:* または standalone）
  → 水曜 #5: シリーズ化スキャン（B/21 とレガシー20。GSC・相互リンクの塊 → series:candidate）
  → 水曜 #6: 重負債（既存 Hub stale / 20→A|B 昇格 / 統合・301）→ 必要なら①
  → series 化①: Hub 新規 + series.ts + 関連 MD を新 A（または既存 A）へ移動 + Hub に全スポーク反映（同一 PR）
  → 単発のまま: B/21 に残し standalone（昇格キューに入れない）
```

---

## markdownFile 命名規則

`posts.ts` の `markdownFile` は `content/blog/[contentId]/` 内の実ファイル名と一致させる。

| 層 | プレフィックス | 例 |
|----|----------------|-----|
| **A/B**（`20` 以外。`21-` 含む） | `{3桁連番}-`（フォルダ内、Hub = `001-`） | `08-new-domain-seo` → `001-`〜 / `21-foo` → `001-`〜 |
| **C** 量産負債 | グローバル `2xx-` / `4xx-` 等（昇格前の仮番号） | `20-investigate-something` → `227-...` |

- A 層の連番は **Hub → `series.ts` の `spokeSlugOrder`**（当該フォルダのファイルのみ）順を推奨（未登録原稿は末尾）
- B／`21-` はフォルダ内公開順またはテーマ内の読む順で連番
- 昇格時（B/20 → A）は **プレフィックスのみ** リネーム（サフィックスは維持）
- `slug` / 公開 URL は `markdownFile` と独立（リネームしても URL は変わらない）

---

## 昇格・series 化時のルール

- **slug（公開 URL）は変更しない**
- **imageBasePath** は当面維持可（GSC 画像 URL 履歴を増やさない）
- 移動後は `npm run build` で全 slug の読み込みを確認
- **新シリーズ立ち上げ**（後付け）: Hub MD・`series.ts`・関連 Spoke の A 層移動・Hub スポーク一覧を **同一① PR** にする（「フォルダだけ先・Hub は後」禁止）
- Hub 差し替え（既存 Hub の全面差し替え・`hubSlug` 変更）は、スポーク追記と別 PR にしてよい（従来どおり）

---

## 分類ラベル（候補マスター・inbox Tips）

日次メンテで候補に `content_folder` を付与。定義は Vault `00-dashboard/content-folder-labels.md`。

| ラベル | 意味 |
|--------|------|
| `series:site-launch` | サイト公開シリーズへ昇格／所属 |
| `series:claude-obsidian` | Claude+Obsidian シリーズ |
| `series:cursor-free` | Cursor無料版シリーズ |
| `series:chatgpt-migration` | ChatGPT移行シリーズ |
| `series:new-domain-seo` | 新規ドメインSEO・GSCシリーズ |
| `series:candidate:<theme-slug>` | **新シリーズ候補**（`series.ts` 未登録。週次 #5 で付与） |
| `topic:05-nextjs-image-cache` | Next.js 画像トピック束 |
| `topic:06-chatgpt-how-to` | ChatGPT How-to 束 |
| `topic:07-daily-note-obsidian` | DailyNote 束 |
| `topic:09-ai-tools-comparison` | AI ツール比較束 |
| `topic:21-cursor-models` | Cursor モデル選定・外部モデル連携束 |
| `topic:22-<theme-slug>` | 新 B フォルダ束（`22-` 以降） |
| `inbox:keep` | 分類**未決定**（判断前のみ。公開済みの常用はしない） |
| `standalone` | 単発／まだ series 化しない（B/`21-` 等の既定） |

公開済み新規は日次⑥で `series:*`（既存 A 追記）／`topic:*`／`standalone` のいずれかに確定する。

**新シリーズ候補**は週次⑥ #5 で `series:candidate:<theme-slug>` を付与。Hub 確定時に正式 `series:*` + 新 A の `contentId` へ（月1本上限・詳細は [`debt-paydown-workflow.md`](debt-paydown-workflow.md)）。

### promotion_status（公開済みの負債段階）

Vault 候補マスター用。`content_folder` とは別軸。詳細: [`debt-paydown-workflow.md`](debt-paydown-workflow.md)

| 値 | 意味 |
|----|------|
| `published_in_20` | 公開済み・まだ `20` 配置（**レガシー負債のみ**） |
| `standalone` | B／`21-` 等に公開・series 化予定なし（または勝ち待ち）。昇格キュー外 |
| `hub_updated` | 既存 series で Hub にスポーク反映済み（A 追記の完了寄り） |
| `promoted` | A 層へ移動済み（`posts.ts` contentId 更新済み） |

---

## 新規記事の標準フロー

1. ④（主 Claude）: 本文 MD
2. ① Cursor: [`content-folders.md`](content-folders.md) の判断フローで contentId を決める  
   - 既存 A 追記 / 既存 B / 新 `21-…` のいずれか。**`20` は使わない**
3. **軽負債（①・毎公開）**  
   - 既存 series: `series.ts` + Spoke→Hub + **Hub 本文スポーク追記**  
   - B／`21-`: 同ジャンル相互リンク。`promotion_status: standalone`（⑥へメモ可）
4. ⑥ 日次: `content_folder` 確定、debt カウンタ・Hub stale（既存 series の漏れ監査）
5. ⑥ 水曜 #5: **シリーズ化スキャン**（B/21・レガシー20。候補付与）
6. ⑥ 水曜 #6: **重負債**（Hub stale 保険 / `20` 昇格 / 統合・301・原則2単位）→ ①へ依頼
7. series 化時 ④→①: Hub 初稿 + `series.ts` + 関連記事の A 移動を **同一トラックで完了**（別 PR に分けて Hub だけ先、は禁止）

昇格 PR の手順は「昇格・series 化時のルール」節。ガードレール・閾値は [`debt-paydown-workflow.md`](debt-paydown-workflow.md)。
