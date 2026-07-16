# content-folders.md — content/blog フォルダ運用

最終更新: 2026-07-16（A層: `10-claude-developer` / `11-mcp` 追記）  
用途: `contentId`（`content/blog/[contentId]/`）の選び方・昇格ルール。記事公開（①）・日次メンテ（⑥）で参照。

関連: [`project-context.md`](project-context.md)、[`chat-operations.md`](chat-operations.md)、[`lib/series/series.ts`](../../lib/series/series.ts)

---

## 3層の contentId

| 層 | 意味 | contentId | series（`series.ts`） | 新規 MD を置く？ |
|----|------|-----------|------------------------|------------------|
| **A** | シリーズ確定 | `01-site-launch` | site-launch-series | 移行のみ |
| **A** | シリーズ確定 | `02-claude-obsidian-workflow` | claude-obsidian-workflow-series | 移行のみ |
| **A** | シリーズ確定 | `03-cursor-free` | cursor-free-series | 移行のみ |
| **A** | シリーズ確定 | `04-chatgpt_account_migration` | chatgpt-account-migration-series | 移行のみ |
| **A** | シリーズ確定 | `08-new-domain-seo` | new-domain-seo-series | 移行のみ |
| **A** | シリーズ確定 | `10-claude-developer` | claude-developer-series | 移行のみ |
| **A** | シリーズ確定 | `11-mcp` | mcp-series | 移行のみ |
| **B** | 非シリーズ・トピック束 | `05-nextjs-image-cache` | （site-launch スポーク） | 同テーマのみ |
| **B** | 非シリーズ・トピック束 | `06-chatgpt-how-to` | なし | 同テーマのみ |
| **B** | 非シリーズ・トピック束 | `07-daily-note-obsidian` | claude-obsidian（DailyNote系） | DailyNote系のみ |
| **C** | 量産インボックス | `20-investigate-something` | なし | **新規1分Tipsは常にここ** |

1シリーズが複数 contentId を持ってもよい（例: claude-obsidian = `02` + `07`）。

---

## 判断フロー

```
新規1分Tips？
  → Yes: content/blog/20-investigate-something/ に配置
       posts.ts の contentId も "20-investigate-something"

既存記事を整理（シリーズ昇格）？
  → series.ts に載っている & フォルダ確定済み
       → 対応 A層フォルダへ MD 移動
       → posts.ts の contentId のみ更新（slug は変えない）

非シリーズだがトピックフォルダがある？
  → B層フォルダを維持（06 等に無理に統合しない）

単発のまま？
  → 20 に残す（inbox:keep / standalone）
```

---

## markdownFile 命名規則

`posts.ts` の `markdownFile` は `content/blog/[contentId]/` 内の実ファイル名と一致させる。

| 層 | プレフィックス | 例 |
|----|----------------|-----|
| **A/B**（`20` 以外） | `{3桁連番}-`（フォルダ内、Hub = `001-`） | `08-new-domain-seo` → `001-`〜`013-` |
| **C** 量産インボックス | グローバル `2xx-`（昇格前の仮番号） | `20-investigate-something` → `227-...` |

- 連番は **Hub → `series.ts` の `spokeSlugOrder`**（当該フォルダのファイルのみ）順を推奨（未登録原稿は末尾）
- 昇格時は **プレフィックスのみ** `2xx-` → A/B 層の空き番へリネーム（サフィックスは維持）
- `slug` / 公開 URL は `markdownFile` と独立（リネームしても URL は変わらない）

---

## 昇格時のルール

- **slug（公開 URL）は変更しない**
- **imageBasePath** は当面維持可（GSC 画像 URL 履歴を増やさない）
- 移動後は `npm run build` で全 slug の読み込みを確認
- Hub 差し替え（`hubSlug` 変更）はフォルダ移行と別 PR にする

---

## 分類ラベル（候補マスター・inbox Tips）

日次メンテで inbox 候補に `content_folder` を付与。定義は Vault `00-dashboard/content-folder-labels.md`。

| ラベル | 意味 |
|--------|------|
| `series:site-launch` | サイト公開シリーズへ昇格候補 |
| `series:claude-obsidian` | Claude+Obsidian シリーズ |
| `series:cursor-free` | Cursor無料版シリーズ |
| `series:chatgpt-migration` | ChatGPT移行シリーズ |
| `series:new-domain-seo` | 新規ドメインSEO・GSCシリーズ |
| `series:candidate:<theme-slug>` | **新シリーズ候補**（`series.ts` 未登録。週次 #5 で付与） |
| `topic:05-nextjs-image-cache` | Next.js 画像トピック束 |
| `topic:06-chatgpt-how-to` | ChatGPT How-to 束 |
| `topic:07-daily-note-obsidian` | DailyNote 束 |
| `inbox:keep` | 分類**未決定**（シリーズ/トピック/単発の判断前のみ） |
| `standalone` | 単発記事（シリーズ化予定なし） |

未定の新規候補は `inbox:keep`。公開済みは日次⑥で `series:*` / `topic:*` / `standalone` のいずれかに確定する。

**新シリーズ候補**は週次⑥ #5 で `series:candidate:<theme-slug>` を付与。Hub 確定後に正式 `series:*` + 新 `contentId` フォルダへ（月1本上限・詳細は [`debt-paydown-workflow.md`](debt-paydown-workflow.md)）。

### promotion_status（公開済みの負債段階）

Vault 候補マスター用。`content_folder` とは別軸。詳細: [`debt-paydown-workflow.md`](debt-paydown-workflow.md)

| 値 | 意味 |
|----|------|
| `published_in_20` | 公開済み・`20` 配置（デフォルト） |
| `hub_updated` | Hub にスポーク反映済み |
| `promoted` | A/B 層昇格済み |
| `standalone` | 単発確定・昇格対象外 |

---

## 新規記事の標準フロー（量産）

1. Claude ④: 本文 MD
2. Cursor ①: `content/blog/20-investigate-something/NNN-slug.md` + `posts.ts`（`contentId: "20-investigate-something"`）
3. **軽負債（①・毎公開）**: シリーズ確定なら `series.ts` 追記、スポーク→Hub リンク1本、`promotion_status: published_in_20`
4. ⑥ 日次: `content_folder` 確定、debt カウンタ・Hub stale 更新
5. ⑥ 水曜 #5: **シリーズ化スキャン**（`series:candidate` 付与・推奨ゲート）
6. ⑥ 水曜 #6: **重負債1単位**（Hub 更新 / 昇格 PR / 逆リンク）→ ①へ依頼
7. （月0〜1本）④→①: 新シリーズ Hub 初稿 + `series.ts` 登録（別 PR）

昇格 PR の手順は「昇格時のルール」節。ガードレール・閾値は [`debt-paydown-workflow.md`](debt-paydown-workflow.md)。
