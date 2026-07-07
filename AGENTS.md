# ToolArc AGENTS Rules

@docs/ai-context/writing-rules.md
@docs/ai-context/project-context.md
@docs/ai-context/context.md
@docs/ai-context/chat-operations.md
@docs/ai-context/debt-paydown-workflow.md

このファイルは `toolarc.jp` の記事制作と改善における共通運用ルールです。  
目標は「3年以内に月収100万円」を最短で達成すること。SEOを主軸に、収益導線を壊さず伸ばす出力を最優先にします。

## North Star / KPI

- 事業目標: 3年以内に月収100万円到達
- 主戦略: オーガニック流入最大化（SEO）
- 収益源: アフィリエイト、広告、デジタル商品（note/教材/テンプレ）
- 出力評価の優先順:
  1. 検索意図に一致している
  2. 初心者が再現できる
  3. 収益導線が自然に設計されている
  4. ToolArcの文体・トーンに一致している

## Task Priority

依頼を受けたときは、次の順で意思決定すること。

1. 読者の悩みを1文で定義する
2. 検索意図（How-to/比較/チェックリスト）を明確化する
3. 問題→原因→対策の順で構成を作る
4. 収益導線（アフィリエイト/広告/デジタル商品）を過不足なく配置する
5. `writing-rules.md` の文体・Markdown・SEO要件に合わせる

## Content Production Rules

- 基本文体は「です・ます調」、一人称は「筆者」
- 本文は「実測・実運用」の一次情報を優先し、推測は明示する
- 記事構成は以下を原則とする:
  - 導入（悩みへの共感）
  - 今日の結論（3〜5点）
  - 本論（問題→原因→対策）
  - チェックリストまたは比較表
  - まとめ・次に読む
  - 仕様変更に関する免責
- H2は最大5前後を目安にし、長文化する場合はシリーズ分割を優先する
- daily notes や会話ログはそのまま公開せず、必ず構造化してから記事化する

## Monetization Rules

### Affiliate

- 比較記事では「誰に向くか/向かないか」を必ず併記する
- 訴求は機能羅列ではなく、読者の課題解決に紐づける
- 断定表現（絶対/必ず）は禁止し、条件や前提を明記する
- アフィリエイトリンク前後に、判断材料（注意点、代替案、費用感）を置く

### Ads

- 広告収益を優先して情報密度や可読性を下げない
- UXを崩す提案（過剰な挿入・本文分断）は避ける
- まずは記事品質と滞在価値を担保し、広告は補助収益として扱う

### Digital Products

- 記事内で先に無料価値（手順、チェックリスト、判断基準）を提供する
- 記事末に、読者像を明確にしたCTAを配置する
- 商品誘導は本文テーマと一致する場合のみ行い、無関係な誘導はしない

## SEO Execution Rules

- 検索意図を「初心者が今困っていること」に合わせる
- タイトルは主要キーワード + 読者メリットを1文で示す
- descriptionは「誰向け/何が分かる/差別化（実測）」を含める
- Hub記事はシリーズ入口として、スポーク記事への内部リンクを必ず入れる
- 内部リンクは `/blog/slug` 形式で、未公開は「準備中」と明記する

## Evidence & Compliance

- 料金、制限、仕様は執筆時点を明記する
- OpenAI/Anthropic/Cursor等の未確認仕様を事実として断定しない
- 公式保証がない内容を「公式」と表現しない
- 法令・規約・景表法に抵触しうる誇大表現を避ける
- 重要判断は公式ドキュメント確認を促す

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

## Markdown フェンス（Obsidian / Vault 貼り付け用）

Vault / Obsidian へ貼る Markdown で、次のいずれかに当てはまるときは **外側4・内側3** のバッククォートを使う。

- 1出力に `` ``` `` フェンスが2つ以上ある
- フェンス内に `` ``` `` を例示する

**ルール**

- **外側**（出力全体の最初の開きと最後の閉じ）: `` ```` `` + 言語（`text` / `md` 推奨）
- **内側**（中の各ブロック）: 通常の `` ``` `` + 言語

**適用しない**

- `content/blog` の公開記事 MD（並列の `` ``` `` で問題なし）
- コードブロックが1つだけの出力
- TypeScript / Next.js などリポの実装コード

詳細: `/blog/obsidian-nested-codeblock-backticks`

## Obsidian ウィキリンク（Vault 更新時）

DailyNote / AI-log / Dashboard など **Vault 内ノート**へリンクを書くときは、Obsidian のウィキリンク形式を使う。Windows パスや `` `ファイル.md` # 見出し `` の平文は使わない。

**基本形**

```text
[[ファイル名#見出し]]
[[ファイル名#見出し|表示名]]          ← エイリアス（短い表示用）
[[01_Daily/2607/260707/ファイル名]]   ← Vault ルートからの相対パス（拡張子なし）
```

**禁止（NG 例）**

```text
`AI-log-2026-07-07.md` # 見出し
D:\ObsidianVault\Vault\...\ファイル.md
[見出し](ファイル.md#見出し)          ← Vault 内は Markdown リンクより [[ ]] を優先
```

**見出しアンカーのルール**

- 見出しに `#`・`:`・バッククォートがあるときは **アンカーを推測しない**
- 正本は対象ファイルで **右クリック →「見出しへのリンクをコピー」** した文字列（`#` 以降をそのまま使う）
- 同一ノート内の `[[#見出し]]` は、記号のない単純見出しだけに使う
- 表セル内でエイリアスに `|` を含むときは `\|` でエスケープ

**toolarc.jp 公開記事**へのリンクは従来どおり `/blog/slug`（ウィキリンクにしない）。

実例・トラブルシュート: Vault `01_Daily/2607/260706/AI-log-2026-07-06.md` の `# Week3実行手順：タイトルの重複改善` 以降

## Output Contract (Required)

記事案・構成案・本文案を出すときは、以下を必ず含める。

1. 想定読者（1行）
2. 検索意図（How-to / 比較 / チェックリスト）
3. 主キーワードと副キーワード
4. 記事の結論（3〜5点）
5. 構成案（H2中心、最大5前後）
6. 収益導線案
   - アフィリエイト導線
   - 広告配慮方針
   - デジタル商品CTA案
7. 内部リンク候補（既存・未公開の区別つき）
8. 免責文（執筆時点/仕様変更可能性）

## Prohibited Outputs

- 根拠のない「絶対」「必ず成功」「公式保証」
- 未確認情報の断定
- クリックベイトや過度な煽り
- daily notes / 会話ログの丸投げ記事化
- ToolArc方針に反するダークSaaS/サイバーパンク調のUI提案

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->
