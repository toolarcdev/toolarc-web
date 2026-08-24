# context.md — ToolArc AI 共通コンテキスト

最終更新: 2026-08-24 21:51  
用途: 新規チャットの冒頭で参照する**共通コンテキスト**（Cursor / Claude / ChatGPT）。ツール固有の手順・スロット境界の正本は [`chat-operations.md`](chat-operations.md)。

- 記事の詳細（文体・構成・CTA・SEO・Output Contract・禁止）: [`writing-rules.md`](writing-rules.md)
- サイト固有情報: [`project-context.md`](project-context.md)
- 入口・ハード制約・読み分け: [`AGENTS.md`](../../AGENTS.md)
- 現行フェーズ: [`docs/plan/phase-now.md`](../plan/phase-now.md)
- 固定チャット運用: [`chat-operations.md`](chat-operations.md)

**事業目標（最短）**: [toolarc.jp](https://www.toolarc.jp/) は3年以内に月収100万円。主戦略はオーガニック（SEO）。詳細は `phase-now.md`。

---

## あなたの役割（共通）

どのツールでも、次を共通の立ち位置とする。**いま動いているツール／スロットで担当が変わる**（下表・`chat-operations.md`）。

- ToolArc（toolarc.jp）の目標達成を手伝う（記事・SEO・収益導線・サイト実装・Vault運用・ルール／Skillsメンテを含む）
- 出力は**日本語・実務向け・再現可能**を最優先する
- 記事の判定基準は [`writing-rules.md`](writing-rules.md)。推測・未確認仕様の断定をしない
- スロット境界を壊さない（例: ④の文案チャットで `posts.ts` 登録まで踏み込まない、⑥で大規模コード変更を混ぜない）。迷ったら `chat-operations.md` を見る
- 「相談のみ」に自己限定しない。依頼とスロットが実装・レビュー・執筆・メンテなら、その範囲で実行する

---

## AI ツールの役割分担（このプロジェクトの前提）

主担当は目安。**Cursor は実装以外にも多岐**にわたる。④⑤は Claude 主・Cursor 予備。

| ツール | 主に担うこと | 備考 |
| ------ | ------------ | ---- |
| **ChatGPT** | 構成相談、SEO、収益導線・Output Contract の壁打ち／任意レビュー、用語解説、見出し案 | Produce寄り。リポ／Vault への本書きはしない想定 |
| **Claude** | 記事の構成・本文初稿、既存記事リライト案、Obsidian 素材からの整理、Tips／inbox 骨子（④⑤） | 長文 Produce の主。公開登録・build は①へ |
| **Cursor** | **①** 公開反映（MD配置・`posts.ts`・build・公開日）／**②** SEO・GSC／**③** サイト基盤の実装／**④⑤予備**（初稿・リライト・素材を Cursor で進めるとき）／**L1レビュー**（`l1-review-article`）／**⑥** KPI・日次・週次メンテ（Vault）／ルール・Skills・docs のメンテ／画像 Skills／Git 後段（commit・PR・マージ系 Skill） | リポと Vault の **Commit 主担当**。コード実装の主担当でもある |

依頼が「コードを書いて」「ファイルを直して」で、いまのチャットが Claude／ChatGPT のときは、Cursor 向け依頼に切り替えるか、実装は Cursor に任せる旨を明示する。**すでに Cursor 上なら、その依頼を実行する**（他ツールへ丸投げしない）。

日次メンテ（候補マスター・Dashboard・DailyNote）は **Cursor ⑥**。手順は `chat-operations.md` と Vault `maintenance_1min-Tips.md`。

---

## 添付ファイルの読み方

| ファイル             | 内容                                                                  |
| -------------------- | --------------------------------------------------------------------- |
| `AGENTS.md`          | 入口・Repo boundaries・Vault制約・依頼時の読み分け（詳細は再掲しない） |
| `writing-rules.md`   | **記事正本**（文体・構成・CTA・SEO・Output Contract・禁止・免責）     |
| `llm-forbidden-phrases.md` | LLM空句の語彙正本                                              |
| `project-context.md` | サイト概要・読者・技術スタック・リポ構成                              |
| `chat-operations.md` | **6スロット固定チャット**の役割・初回プロンプト・日次メンテ手順      |
| `docs/plan/phase-now.md` | **現行フェーズ**                                                  |
| `source.md`          | **記事1本ごと**の設計メモ（テーマ・読者・**ペルソナ2〜3**・問題・改善・伝えたいこと。Output Contract準拠）   |
| `captions.md`        | 画像の内容・感情・配置・役割（画像付き記事のみ）                      |

**優先順位**: `source.md` の「伝えたいこと」 > **該当ドメイン正本**（記事なら `writing-rules.md`）> `AGENTS.md`（入口・ハード制約）> `project-context.md` > 会話内の新しい指示

daily notes や Export ZIP は**そのまま記事化しない**。構造化されていないログは素材として扱い、`source.md` 形式への整理を先に提案する。

---

## 出力の基本方針

- 記事の文体・構成・収益導線・禁止・Output Contract はすべて [`writing-rules.md`](writing-rules.md) に従う（本ファイルで再掲しない）
- 長文を一度に出すより、**見出し案 → 確認 → 本文**の段階出力を歓迎する（ユーザーが指定した場合は従う）

---

## 記事以外の依頼

- **SEO / 収益導線 / 見出し・構成**: [`writing-rules.md`](writing-rules.md)
- **用語解説**: 1段落で済ませ、例を1つ添える
- **プロンプト改善**: 具体的な入力例（NG/OK）をセットで提示する
