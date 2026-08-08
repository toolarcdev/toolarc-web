# project-context.md — ToolArc プロジェクト文脈

最終更新: 2026-08-04 18:26  
サイト: https://toolarc.jp（本番。ローカル開発は別）

---

## プロジェクト概要

**ToolArc**（ツールアーク）は、AI ワークフロー・開発ツール・学習リソースに特化した**日本語の初心者向けブログ＆ツールサイト**である。  
公開ドメインは [toolarc.jp](https://toolarc.jp/)。本文・UI・運用ドキュメントは日本語を正とする。

### 何をするサイトか

- **ブログ**: Cursor / Claude / ChatGPT / Obsidian / Next.js / GitHub / Vercel などを「使い始めた人が、自分の環境で再現できる」粒度で解説する
- **ツール**: ブログとは別に、ゲーム系ユーティリティ（現状の代表は PoE2 向け regex ツール `/tools/poe2-regex`）を提供する。ゲーム用 JSON の正本は非公開リポ（後述）
- **シリーズ構造**: Hub（入口）＋ Spoke を基本形にする。新規は既存 B または新 `23-…` に直置きし、勝ちが見えてから後付けで series／Hub 化する（`21-cursor-models` 使用中。`22-game-dev-js` は `12-game-dev-js` へ昇格済。`20` は量産負債のみ。正本: [`content-folders.md`](content-folders.md)）
- **記事の層**: 集客寄りの How-to／比較／チェックリストと、周辺・本命の収益記事（第2〜3層）が同居する。比較本文に現金ASPを直置きしない（2段導線）

### 誰の、どんな悩み向けか（要約）

主読者は「プログラミングや Web が専門ではないが、業務・個人開発で AI ツールを使い始めた日本語ユーザー」。  
エラーや設定画面の前で止まりやすい人に、**手順・判断基準・チェックリスト・実測の境界**を渡す。詳細は後節「読者像」。

### 目的・成功の定義（サイトとして）

- 読者が **今日の環境で同じ操作を再現できる**こと（抽象論や機能カタログで終わらない）
- 検索（オーガニック）から流入し、信頼（実測・再現性）を積んだうえで、自然な収益導線へつなぐこと
- 事業側の North Star は「3年以内に月収100万円」（複合収益）。サイト単体の日次ゴールはフェーズ依存（正本: [`phase-now.md`](../plan/phase-now.md)）

### トーン・デザイン

- **読みやすさ最優先**。白基調、ソフトブルーアクセント（`#60a5fa`）、余白多め
- **採用しない**: ダーク SaaS／サイバーパンク／Terminal・Midnight 系を既定にした紙面
- 詳細トークン: [`docs/design-system.md`](../design-system.md)

### 執筆・情報の出し方

- **実測・実運用ログを優先**。「何をしたらどうなったか」を理論より先に書く
- 料金・制限・仕様は**執筆時点**を明示し、未確認は断定しない
- 記事ドメインのルール正本は [`writing-rules.md`](writing-rules.md)（Output Contract・CTA・禁止を含む）
- daily notes / 会話ログの丸投げ記事化はしない（先に `source.md` 等へ構造化）

### いまの運営の姿（概要レベル）

- カレンダー **Phase1** ＋ **Phase2-0 先行**、運用モードは**評価フェーズ移行**（公開ノルマなし。統合／表示／CTR／分散と week-queue 消化が主）
- 制作は **6+1 スロット**（Cursor / Claude 中心。ChatGPT は任意レビュー・壁打ち）。手順の正本は [`chat-operations.md`](chat-operations.md)
- 公開パイプライン: Markdown（`content/blog`）→ `lib/blog/posts.ts` 登録 → PR → Vercel デプロイ

### この概要に書かないこと（他節・他ファイルへ）

| 内容 | 参照先 |
|------|--------|
| フェーズ数値・卒業条件・いまやる／やらない | [`phase-now.md`](../plan/phase-now.md)／後節「現行フェーズ」 |
| 収益源・2段導線の詳細 | 後節「North Star / 収益戦略」／`writing-rules`／`affiliate-registry` |
| 技術スタック・3リポ・PoE2 データ境界 | 後節「技術スタック」「リポジトリ構成」 |
| 記事フォルダ3層・昇格 | [`content-folders.md`](content-folders.md) |
| 記事制作〜公開の横断フロー | [`chat-operations.md`](chat-operations.md)「記事フロー（ツール横断）」 |
| ①公開手順 | Skill `publish-article` ／ `.cursor/rules/article-publish.mdc` |

---

## 現行フェーズ（要約・正本は phase-now）

正本: [`docs/plan/phase-now.md`](../plan/phase-now.md)（下記はエージェントが迷わないための要約。矛盾したら phase-now を優先）

| 項目 | 値 |
|------|-----|
| カレンダー | **Phase1**（勝ちカテゴリ／導線検証。v0.2目安 2026-07〜09） |
| 運用 | **Phase2-0 先行**（読者由来 ASPクリック信号）＋**評価フェーズ移行** |
| 2-0卒業 | 読者由来 ASPクリック累計 **≥10**（自己クリック禁止開始 2026-07-29） |
| 公開 | **ノルマなし**。新規は例外ゲート通過分。原則は統合・リライト・Hub/SubHub |
| 負債 | 水曜重負債 **原則2単位** |
| 日次 | active な **week-queue** の当日行を消化 |
| 記事資産（目安） | **200本超**・索引約243（Coverage更新後。増減しうる） |

---

## North Star / 収益戦略

- **事業目標**: 3年以内に月収100万円到達
- **主戦略**: オーガニック流入最大化（SEO）
- **収益源**: アフィリエイト、広告、デジタル商品（note/教材/テンプレ）
- **記事の役割**: 検索流入 → 信頼構築（実測・再現性）→ 自然な収益導線
- **比較記事**: ChatGPT / Claude / Cursor は現金ASPが無い前提で **直収益にしない**。比較 → 周辺収益記事 → アフィの2段導線

運用の入口は [`AGENTS.md`](../../AGENTS.md)。フェーズ詳細は [`phase-now.md`](../plan/phase-now.md)。記事ルールは [`writing-rules.md`](writing-rules.md)。

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

記事タイプ別の収益導線・CTA・Output Contract は [`writing-rules.md`](writing-rules.md) を正本とする（本ファイルでは再掲しない）。

---

## 参照ドキュメント（リポ内）

- `AGENTS.md` — 入口・ハード制約・読み分け
- `docs/ai-context/writing-rules.md` — **記事正本**（文体・CTA・Output Contract 等）
- `docs/ai-context/` — `context.md`、`chat-operations.md`、`content-folders.md`、`debt-paydown-workflow.md`、`affiliate-registry.md`、本ファイル
- `docs/project-overview.md` — 概要・読者・執筆スタイル
- `docs/design-system.md` — 色・レイアウト
- `docs/seo-goals.md` — 週次オペ／Outcome KPI（フェーズ連動）
- `docs/plan/phase-now.md` — 現行フェーズ・Phase2-x・方針B
- `docs/vercel-poe2-deployment.md` — PoE2 本番デプロイ
- `lib/blog/posts.ts` — 公開 URL の slug 一覧（新規記事はここに追加）
- `lib/series/series.ts` — Hub / スポークのシリーズ定義
- `lib/affiliate/policy.ts` — 直アフィ可否
- `content/blog/` — 既存記事のトーン・frontmatter の参考

新規記事提案時は、**`lib/blog/posts.ts` の slug** と重複しない角度を意識する。
