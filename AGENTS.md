# ToolArc AGENTS Rules

@docs/ai-context/writing-rules.md
@docs/ai-context/llm-forbidden-phrases.md
@docs/ai-context/project-context.md
@docs/ai-context/context.md
@docs/ai-context/chat-operations.md
@docs/ai-context/debt-paydown-workflow.md
@docs/ai-context/content-folders.md
@docs/ai-context/affiliate-registry.md
@docs/plan/phase-now.md
@docs/seo-goals.md

このファイルは AI が常時読む **入口** である。記事の詳細ルールは再掲せず、上の正本へ委譲する（重複禁止）。

| 領域 | 正本 | 備考 |
|------|------|------|
| 記事（文体・構成・CTA・SEO・Output Contract・禁止） | `writing-rules.md` | 記事ドメインの唯一の詳細正本 |
| LLM空句リスト | `llm-forbidden-phrases.md` | 語彙正本（方針は writing-rules） |
| 直アフィ可否（実装） | `lib/affiliate/policy.ts` | docs は説明のみ |
| 画像振り分け | `.cursor/skills/blog-image-router/SKILL.md` | マップ: `image-intent-map.md` |
| Obsidian／Vault 操作・編集 | 個人 Skill `obsidian-markdown` / `obsidian-cli` | ウィキリンク等の ToolArc制約の正本は `obsidian-markdown` |

**North Star（最短）**: 3年以内に月収100万円。主戦略はオーガニック（SEO）。収益導線を壊さず伸ばす。フェーズ詳細は `docs/plan/phase-now.md`。

## Repo boundaries（触るな）

- 公開repo（本リポ）へ PoE2 / ゲーム JSON をコピー・生成・commit しない。正本は `toolarc-data`、API 用コピーは `toolarc-api`

## 依頼時の読み分け

0. 現行フェーズを `docs/plan/phase-now.md` で確認する（評価フェーズ中の優先は week-queue・統合／リライト／Hub・導線計測・負債。新規は例外ゲート通過分のみ）
1. **記事**（構成・本文・CTA・SEO・禁止・Output Contract）→ `docs/ai-context/writing-rules.md`（空句 → `llm-forbidden-phrases.md`）
2. **収益記事の手順化** → Skill `revenue-article-template`（基準は writing-rules / `policy.ts`）
3. **公開（①）** → Skill `publish-article` ＋ `.cursor/rules/article-publish.mdc`
4. **L1（④）** → Skill `l1-review-article`
5. **画像** → Skill `blog-image-router`（入口）
6. **日次⑥／水曜週次** → `daily-maintenance-lite` / `weekly-intake` / `weekly-maintenance`
7. **Obsidian／Vault の操作・編集** → 個人 Skill `obsidian-markdown`（記法・ToolArc制約の正本）／`obsidian-cli`（CLI）。詳細は本ファイルに書かない
8. スロット境界・依頼文 → `docs/ai-context/chat-operations.md`

## Vault メタデータ（⑥・Agent 共通）

`Last Updated` / `最終更新` / `Last weekly ⑥` など**日付・時刻を含むメタデータ**を書く・更新するときは、次を厳守する。

1. **必ずシェルで取得**（手入力・`user_info` の日付・推測は禁止）:

```powershell
Get-Date -Format "yyyy-MM-dd HH:mm"
```

2. 取得値をそのまま使う（PC ローカル TZ = 日本運用時は JST 想定）
3. `Last Updated` 形式: `yyyy-MM-dd HH:mm`（例: `2026-06-09 23:10`）
4. `Last weekly ⑥` 形式: `yyyy-MM-dd` のみ（週次⑥完了日）
5. ファイルを編集したら、そのファイルの `Last Updated` を**同一セッション内で**更新する
6. 編集していないファイルの `Last Updated` は**変更しない**

手順正本: `D:\ObsidianVault\Vault\00-dashboard\maintenance_1min-Tips.md`「メタデータ日時」節

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->
