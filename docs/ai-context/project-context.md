# project-context.md — ToolArc プロジェクト文脈

最終更新: 2026-05-26  
サイト: https://toolarc.jp

---

## プロジェクト概要

**ToolArc** は、AI ワークフロー・開発ツール・学習リソースに特化した**日本語の初心者向けブログ＆ツールサイト**。

- 目的: Cursor / Claude / ChatGPT などを使い始めた人が、**再現可能な手順**で学べること
- トーン: 読みやすさ最優先。白背景・ソフトブルーアクセント。ダーク SaaS 風は採用しない
- 執筆方針: **実測・実運用ログ**を重視。理論より「何をしたらどうなったか」

---

## 読者像（primary）

- プログラミング・Web 制作の**初心者**（日本語ユーザー）
- AI ツール（ChatGPT / Claude / Cursor）を**業務・個人開発で使い始めた人**
- Obsidian でメモ・Daily Note を取っている、またはこれから始める人
- 「エラーが出たときに自分で切り分けたい」が不安な層

記事では上級者向けの省略を避け、**手順・判断基準・チェックリスト**を厚めにする。

---

## コンテンツの柱

| 柱                     | 例                                                 |
| ---------------------- | -------------------------------------------------- |
| AI ワークフロー        | source.md、Obsidian、Claude 記事生成、ChatGPT 移行 |
| Cursor                 | 無料版の実測、token 消費、依頼の粒度               |
| インフラ               | GitHub、Vercel、ドメイン・DNS                      |
| ゲーム系ユーティリティ | PoE2 regex ツール（`/tools/poe2-regex`）           |

---

## 技術スタック（web）

| 層           | 技術                                                                  |
| ------------ | --------------------------------------------------------------------- |
| フロント     | Next.js、TypeScript、Tailwind CSS                                     |
| ホスティング | Vercel                                                                |
| リポジトリ   | GitHub（PR → マージでデプロイ）                                       |
| 記事         | `content/blog/` 配下の Markdown                                       |
| デザイン指針 | `docs/design-system.md`（白基調、#60a5fa アクセント、角丸・余白多め） |

**注意**: 利用中の Next.js は従来版と API が異なる場合がある。実装提案時は「既存コード・`node_modules/next/dist/docs/` に合わせる」とし、古い Next の慣習を押し付けない。

---

## リポジトリ構成（3 リポ）

| リポ           | 公開   | 役割                                              |
| -------------- | ------ | ------------------------------------------------- |
| `toolarc-web`  | 公開   | Next.js サイト、ブログ、PoE2 BFF（`/api/poe2/*`） |
| `toolarc-api`  | 非公開 | PoE2 モッド検索・regex 生成 API                   |
| `toolarc-data` | 非公開 | JSON・元 Markdown・生成手順                       |

### PoE2 データの置き場所

- **公開 repo（`toolarc-web`）にはゲーム用 JSON を含めない**（サイトは API 経由のみ）
- **ソース**: `toolarc-data` の `poe2/item_mod_priority5.json` など
- **本番 API が読むファイル**: `toolarc-api` の `data/poe2/`（非公開 repo で管理・デプロイ）
- 公開 repo のみ clone した環境では PoE2 ツールは「利用できません」と表示される（意図した挙動）
- ローカル開発: `toolarc-api` を起動し、web の `.env.local` に `POE2_API_URL` / `POE2_API_KEY` を設定（詳細は `README.md`）

---

## 記事制作ワークフロー（ToolArc 流）

```
Obsidian daily notes（作業ログ）
    ↓
source.md（記事ごとの設計メモ）
    ↓
captions.md（画像がある場合）
    ↓
Claude: 構成 → 本文初稿
    ↓
ChatGPT: SEO・見出し・構成レビュー
    ↓
人間レビュー
    ↓
published.md（Obsidian 上の成果物名。実ファイル名は任意）
    ↓
Cursor: content/blog/[contentId]/ に Markdown、public/images/blog/ に画像
    ↓
lib/blog/posts.ts に slug 登録（Hub/シリーズなら lib/series/series.ts も）
    ↓
GitHub PR → Vercel 公開
```

- **Claude**: 長文初稿・構成展開の主担当
- **ChatGPT**: 構成相談・SEO・用語・レビュー
- **Cursor**: リポへの反映・実装
- daily notes をそのまま記事化しない（`source.md` で構造化してから）

---

## 運用方針

- 記事は**品質と再現性**優先。週次の本数より、チェックリスト・実測の明確さ
- シリーズ記事は Hub + スポーク（`lib/series/series.ts` で定義）
  - 例: Cursor 無料版（`cursor-free`）、ChatGPT 移行（`chatgpt-account-migration`）、Claude + Obsidian、サイト公開
- 仕様（OpenAI / Cursor 等）は変わりやすい → **執筆時点の日付**と免責を入れる
- 画像付き記事は `captions.md` で意図を渡す（スクショだけでは感情・役割が伝わらない）

---

## 参照ドキュメント（リポ内）

- `docs/project-overview.md` — 概要・読者・執筆スタイル
- `docs/design-system.md` — 色・レイアウト
- `docs/seo-goals.md` — SEO の方向性
- `docs/vercel-poe2-deployment.md` — PoE2 本番デプロイ
- `lib/blog/posts.ts` — 公開 URL の slug 一覧（新規記事はここに追加）
- `lib/series/series.ts` — Hub / スポークのシリーズ定義
- `content/blog/` — 既存記事のトーン・frontmatter の参考

新規記事提案時は、**`lib/blog/posts.ts` の slug** と重複しない角度を意識する。
