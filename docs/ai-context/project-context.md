# project-context.md — ToolArc プロジェクト文脈

最終更新: 2026-07-08 18:42  
サイト: https://toolarc.jp

---

## プロジェクト概要

**ToolArc** は、AI ワークフロー・開発ツール・学習リソースに特化した**日本語の初心者向けブログ＆ツールサイト**。

- 目的: Cursor / Claude / ChatGPT などを使い始めた人が、**再現可能な手順**で学べること
- トーン: 読みやすさ最優先。白背景・ソフトブルーアクセント。ダーク SaaS 風は採用しない
- 執筆方針: **実測・実運用ログ**を重視。理論より「何をしたらどうなったか」

---

## 現行フェーズ（2026-07 時点）

正本: [`docs/plan/phase-now.md`](../plan/phase-now.md)

| 項目 | 値 |
|------|-----|
| カレンダー | **Phase1**（勝ちカテゴリ／導線検証・〜9月末レビュー） |
| 運用 | **Phase2-0 先行**（ASPクリック信号）。卒業後にカレンダー Phase2 |
| 2-0卒業 | ASP管理画面クリック **累計 ≥10**（主条件） |
| 量産 | **方針B**: 公開ペース維持、負債は水曜原則2単位＋赤域時の整理①追加 |
| 資産目安 | 記事150本超、索引〜139、アフィリエイト設置開始済み |

---

## North Star / 収益戦略

- **事業目標**: 3年以内に月収100万円到達
- **主戦略**: オーガニック流入最大化（SEO）
- **収益源**: アフィリエイト、広告、デジタル商品（note/教材/テンプレ）
- **記事の役割**: 検索流入 → 信頼構築（実測・再現性）→ 自然な収益導線
- **比較記事**: ChatGPT / Claude / Cursor は現金ASPが無い前提で **直収益にしない**。比較 → 周辺収益記事 → アフィの2段導線

運用ルールの詳細はルートの [`AGENTS.md`](../../AGENTS.md) を参照。フェーズ詳細は [`phase-now.md`](../plan/phase-now.md)。

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
ChatGPT: SEO・見出し・構成・収益導線（Output Contract）レビュー
    ↓
人間レビュー
    ↓
published.md（Obsidian 上の成果物名。実ファイル名は任意）
    ↓
Cursor: content/blog/[contentId]/ に Markdown、public/images/blog/ に画像
    ↓
lib/blog/posts.ts に slug 登録（Hub/シリーズなら lib/series/series.ts も・公開時に spoke 追加）
    ↓
GitHub PR → Vercel 公開（軽負債: Hubリンク / promotion_status）
    ↓
⑥ 水曜: シリーズ昇格・Hub改稿・逆リンク（重負債原則2単位 / debt-paydown-workflow.md・方針B）
```

- **Claude**: 長文初稿・構成展開の主担当
- **ChatGPT**: 構成相談・SEO・用語・レビュー
- **Cursor**: リポへの反映・実装
- daily notes をそのまま記事化しない（`source.md` で構造化してから）

### content/blog フォルダ運用（3層）

| 層 | 用途 | 代表 contentId |
|----|------|----------------|
| A シリーズ確定 | `series.ts` 登録済み | `01-site-launch`, `03-cursor-free`, `08-new-domain-seo` 等 |
| B トピック束 | 非シリーズ・フォルダ分け済み | `05-nextjs-image-cache`, `06-chatgpt-how-to`, `07-daily-note-obsidian` |
| C 量産インボックス | **新規1分Tipsの最初の置き場** | `20-investigate-something` |

詳細・昇格ルール・分類ラベル: [`content-folders.md`](content-folders.md)

- 新規公開時は `contentId: "20-investigate-something"`（従来どおり）
- 公開時は軽負債を払う（`series.ts` / Hubリンク / `promotion_status`）— [`debt-paydown-workflow.md`](debt-paydown-workflow.md)
- シリーズ昇格は水曜原則2単位（方針B）。MD 移動 + `posts.ts` の `contentId` のみ更新（**slug は変えない**）

---

## 運用方針

### 6+1スロット固定チャット（Cursor / Claude）

| # | 名前 | 主ツール |
|---|------|----------|
| ① | 記事公開 | Cursor |
| ② | SEO・GSC | Cursor |
| ③ | サイト基盤 | Cursor |
| ④ | 記事初稿 | Claude（Cursor は予備） |
| ⑤ | Tips・素材 | Claude（Cursor は予備） |
| ⑥ | KPI＋日次メンテ | Cursor（DailyNote パスは毎日差し替え） |

**ToolArc 外**

| # | 名前 | 主ツール | 備考 |
|---|------|----------|------|
| ⑦ | 個人R&D | Cursor | 心理・認知など個人の思考実験。`05_Personal-RD/` に区切りログのみ保存。**ToolArc とは無関係**（転用・記事化は想定しない） |

初回プロンプト・日次テンプレ・切り替え目安: [`chat-operations.md`](chat-operations.md)

- 記事は**品質と再現性**優先。週次の本数より、チェックリスト・実測の明確さ
- シリーズ記事は Hub + スポーク（`lib/series/series.ts` で定義）
  - 例: Cursor 無料版（`cursor-free`）、ChatGPT 移行（`chatgpt-account-migration`）、Claude + Obsidian、サイト公開
- 仕様（OpenAI / Cursor 等）は変わりやすい → **執筆時点の日付**と免責を入れる
- 画像付き記事は `captions.md` で意図を渡す（スクショだけでは感情・役割が伝わらない）

### 記事タイプと収益導線（目安）

| 記事タイプ          | 主な収益導線                   | 備考                                     |
| ------------------- | ------------------------------ | ---------------------------------------- |
| How-to              | デジタル商品 CTA               | 手順・チェックリストで無料価値を先に提供 |
| 比較・選定          | 周辺収益記事経由のアフィリエイト（2段） | 比較本文に直アフィを置かない。向く人/向かない人・注意点を併記 |
| チェックリスト      | デジタル商品 or アフィリエイト | テーマに合う方を1本に絞る                |
| Hub（シリーズ入口） | 内部リンク + 必要に応じて CTA  | スポーク記事への導線を優先               |

- **広告**: UX を損なわない前提。本文の情報密度・可読性を優先（詳細は `writing-rules.md`）
- 記事案・構成案では `AGENTS.md` の **Output Contract（8項目）** を必ず確認する

---

## 参照ドキュメント（リポ内）

- `AGENTS.md` — North Star・収益導線・Output Contract（ルート）
- `docs/ai-context/` — `context.md`、`writing-rules.md`、`chat-operations.md`、`content-folders.md`、`debt-paydown-workflow.md`、本ファイル
- `docs/project-overview.md` — 概要・読者・執筆スタイル
- `docs/design-system.md` — 色・レイアウト
- `docs/seo-goals.md` — 週次オペ／Outcome KPI（フェーズ連動）
- `docs/plan/phase-now.md` — 現行フェーズ・Phase2-x・方針B
- `docs/vercel-poe2-deployment.md` — PoE2 本番デプロイ
- `lib/blog/posts.ts` — 公開 URL の slug 一覧（新規記事はここに追加）
- `lib/series/series.ts` — Hub / スポークのシリーズ定義
- `content/blog/` — 既存記事のトーン・frontmatter の参考

新規記事提案時は、**`lib/blog/posts.ts` の slug** と重複しない角度を意識する。
