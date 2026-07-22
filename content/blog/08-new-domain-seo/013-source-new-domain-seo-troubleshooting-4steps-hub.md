# source.md — 第5シリーズ Hub 昇格

> **用途**: ④ 記事初稿（Claude）への設計メモ  
> **ファイル**: `013-source-new-domain-seo-troubleshooting-4steps-hub.md`  
> **対象記事**: `new-domain-seo-troubleshooting-4steps`（既存 slug・新規登録なし）  
> **作業種別**: 既存 Markdown の Hub 向け修正（新規執筆ではない）  
> **作成日**: 2026-06-05  
> **参照元 MD**: `001-tips-new-domain-seo-4steps.md`

---

## 1. 目的（この記事で何を伝えたいか）

- 新規ドメイン（toolarc.jp）で「記事を出しているのに検索に出てこない」と悩む読者に、**4段階フレーム（発見→クロール→インデックス→順位）** で現状を切り分ける入口を提供する
- 既に公開済みの SEO・GSC 関連 Tips（Spoke 11本）への**シリーズ導線**を一本化し、読者が「次に何を読むか」を迷わないようにする
- 筆者の **GSC 実測**（2026年5月下旬〜6月初旬）を例に、「焦らず段階を特定してから動く」判断基準を示す

---

## 2. 読者像（1行）

新規ドメインでブログを始めたばかりで、GSC の数字の意味がわからず、インデックスが増えないことに不安を感じている初心者ブロガー。

---

## 3. 検索意図

- **型**: How-to ＋ チェックリスト（Hub）
- **主な悩み**: 「記事を公開したのに検索に出てこない。GSC を見ても何が問題かわからない」
- **読者が求めるもの**: 段階ごとの切り分け手順、GSC での確認場所、次に読む記事の順番

---

## 4. 主キーワード・副キーワード

| 種別 | キーワード |
|------|-----------|
| 主 | 新規ドメイン SEO、Search Console インデックス |
| 副 | GSC インデックス数、検出済み未登録、サイトマップ、新規ドメイン 検索に出ない |

---

## 5. 記事の結論（3〜5点・Hub 冒頭の引用ブロック用）

- 新規ドメインの SEO は「発見→クロール→インデックス→順位評価」の **4段階** で進む
- 各段階で詰まる原因が異なるため、**どこで止まっているかを先に特定**すると対策がぶれにくい
- GSC の「インデックス登録済み」「検出済み・未登録」「404」「リダイレクト」は、段階切り分けの材料になる
- 順位評価は最後の壁。①〜③を通過するまでに **数週間かかることがある**（執筆時点の一般的な目安。公式保証ではない）
- この記事は **シリーズ入口（Hub）**。詳細手順は Spoke 記事へ誘導する

---

## 6. 実測ログ（④が本文に織り込む一次情報）

> 出典: toolarc.jp GSC サマリー・インデックスレポート（2026-06-04 時点の画面）。数値は変動する。

| 指標 | 実測値 | 解釈（推定） |
|------|--------|-------------|
| 公開記事数（posts.ts） | 54本 | sitemap 上は約65 URL |
| GSC 把握 URL 数 | 44（登録済み8＋未登録36） | sitemap 再読込・クロールが追いついていない可能性 |
| クリック数 | 2（5月下旬〜6月初旬） | 立ち上がり期。CTR 改善はデータ不足 |
| 検出済み・未登録 | 29件 | 新規ドメイン＋短期大量公開後のキュー待ちが主因の可能性 |
| 404 | 2件 | **記事ページではなく画像ディレクトリURL**（後述） |
| リダイレクト | 3件 | `http://` / 非www → `https://www.toolarc.jp/` の正常系 |
| クロール済み・未登録 | 2件 | URL 個別の検査が必要（本 source では断定しない） |

### 404 の切り分け（実測・対応済み）

| GSC の 404 URL | 種別 | 本番の正しいファイル URL | 状態 |
|----------------|------|-------------------------|------|
| `/images/blog/030-cursor-free` | ディレクトリのみ（拡張子なし） | `.../ss-01_plan-comparison.png` | 画像 200 確認済み |
| `/images/blog/obsidian-checkbox-shortcut-ctrl-l` | ディレクトリのみ | `.../og.svg` | 画像 200 確認済み |

→ **og:image はファイル付き URL で正常**。GSC の 404 は過去クロールのディレクトリ URL 残骸と見てよい（インデックス依頼は記事 URL 側で実施）。

### リダイレクト 3件（正常系・対応不要）

- `https://toolarc.jp/`
- `http://toolarc.jp/`
- `http://www.toolarc.jp/`

正規 URL `https://www.toolarc.jp/` は canonical・インデックス登録済み。

---

## 7. シリーズ設計（① が `series.ts` に反映する内容）

| 項目 | 値 |
|------|-----|
| series slug | `new-domain-seo-series` |
| series title | 新規ドメインSEO・GSCシリーズ |
| hubSlug | `new-domain-seo-troubleshooting-4steps` |
| publishedAt | `2026-06-03`（Hub 既存公開日を維持） |
| category | `devops`（既存設定のまま） |

### spokeSlugOrder（Hub 自身は含めない）

```text
1. gsc-index-count-new-domain
2. gsc-detected-not-indexed
3. sitemap-index-checklist-tips
4. gsc-image-url-404-tips
5. gsc-image-404-vs-default-og-fallback
6. deploy-check-image-basepath-og-file
7. gsc-og-image-404-fixed-verify
8. new-domain-seo-timeline-tips
9. new-domain-seo-trouble-keyword-strategy-tips
10. 3layer-content-strategy-tips
11. hub-series-update-timing-tips
```

---

## 8. 構成案（H2 中心・最大5前後）

既存 `001-tips-new-domain-seo-4steps.md` をベースに **以下を維持・追記・修正** する。

| # | H2（案） | 内容 |
|---|----------|------|
| — | 導入 | 悩みへの共感。「検索に出ない」は1つの現象ではない |
| — | 今日の結論 | 上記 §5 の引用ブロック |
| 1 | 4段階の全体像 | 既存テーブル維持。Hub である旨を1文追加 |
| 2 | ステップ1：GSCで段階を確認する | 既存維持＋実測例を1〜2文。Spoke リンク追加 |
| 3 | ステップ2：段階ごとの対策 | 既存維持＋画像404 Spoke 4本をこのセクションへ |
| 4 | ステップ3：順位が出ないとき | 既存維持 |
| 5 | **このシリーズで読む順番**（新設） | 4段階 × Spoke 11本の一覧表＋`/blog/slug` リンク |
| — | まとめ | 既存維持。関連記事リストを整理 |
| — | 免責 | 既存維持（2026年6月時点・GSC UI 変更の可能性） |

**H2 は5前後を守る**: 「このシリーズで読む順番」を新設する場合、導入と結論は H2 にせず、本論 H2 は上記5つに収める。

---

## 9. ④ への必須修正指示

### 削除

- 末尾の `[AI SEO運用 Hub](/blog/ai-seo-hub)（準備中）` を **削除**（Hub が本記事自身になるため）

### 追加する内部リンク（未リンク Spoke）

| slug | 挿入先の目安 |
|------|-------------|
| `sitemap-index-checklist-tips` | ステップ1「発見」／sitemap 送信の箇所 |
| `gsc-image-url-404-tips` | ステップ2「クロール・インデックス」 |
| `gsc-image-404-vs-default-og-fallback` | 同上 |
| `deploy-check-image-basepath-og-file` | 同上（デプロイ前確認） |
| `gsc-og-image-404-fixed-verify` | 同上（修正後の GSC 確認） |
| `hub-series-update-timing-tips` | まとめ or 「このシリーズで読む順番」末尾（運用メモ） |

### 既存リンク（維持・整理）

- `/blog/gsc-index-count-new-domain`
- `/blog/gsc-detected-not-indexed`
- `/blog/new-domain-seo-timeline-tips`
- `/blog/3layer-content-strategy-tips`
- `/blog/new-domain-seo-trouble-keyword-strategy-tips`

### title / description（任意・微調整のみ）

- **title 案（変更する場合）**: `新規ドメインSEOの4段階【GSCで切り分ける手順】シリーズ入口`
- **description 案**: 既存 description に「シリーズ入口」「実測ベース」を1文足す程度。大幅変更は不要。
- 変更する場合も **slug は変えない**。

### 文体・形式

- `writing-rules.md` 準拠（です・ます調。一人称は "筆者"）
- 内部リンクは `/blog/slug` 形式のみ
- 断定表現を避け、実測と推定を分ける
- 出力先ファイル名: `001-tips-new-domain-seo-4steps.md`（上書き用ドラフト）

---

## 10. 「このシリーズで読む順番」セクション（④が作成する表のたたき台）

| 読む順 | 段階 | 記事 | slug |
|--------|------|------|------|
| 1 | 全体把握 | GSCのインデックス数の見方 | `gsc-index-count-new-domain` |
| 2 | インデックス | 検出済み・未登録の初動対策 | `gsc-detected-not-indexed` |
| 3 | 発見 | sitemap・インデックス確認チェックリスト | `sitemap-index-checklist-tips` |
| 4 | 技術 | GSCの画像URL 404の見方 | `gsc-image-url-404-tips` |
| 5 | 技術 | 画像404と default-og fallback の切り分け | `gsc-image-404-vs-default-og-fallback` |
| 6 | 技術 | デプロイ前の imageBasePath 突合 | `deploy-check-image-basepath-og-file` |
| 7 | 技術 | OG画像修正後の GSC 確認 | `gsc-og-image-404-fixed-verify` |
| 8 | 評価・待ち | SEOタイムラインと期待値 | `new-domain-seo-timeline-tips` |
| 9 | 戦略 | 困りごと検索から入るキーワード戦略 | `new-domain-seo-trouble-keyword-strategy-tips` |
| 10 | 戦略 | 3層構造のコンテンツ設計 | `3layer-content-strategy-tips` |
| 11 | 運用 | Hub公開と Series 更新の順序 | `hub-series-update-timing-tips` |

※ 表内のリンクはすべて `/blog/[slug]` 形式で記事化する。

---

## 11. 収益導線案

| 種別 | 方針 |
|------|------|
| アフィリエイト | 本 Hub では主眼を置かない（GSC は無料ツール） |
| 広告 | 情報密度を下げない。本文分断しない |
| デジタル商品 CTA | 任意。末尾に「GSC 切り分けチェックリスト（note 等）」があればテーマ一致時のみ1行 |

**Hub の主導線は Spoke への内部リンク**を最優先する。

---

## 12. 内部リンク候補（Output Contract）

| slug | 状態 |
|------|------|
| Spoke 11本（§10 参照） | 既存・公開済み |
| `/series/new-domain-seo-series` | **① 公開後に有効**（④ではリンクしない。①完了後に Hub から言及してもよいが必須ではない） |
| `/blog/ai-seo-hub` | **削除**（未存在・準備中リンクを廃止） |

---

## 13. ④ への依頼文（コピペ用）

```text
添付 source.md をもとに、Hub 記事の修正ドラフトを作成してください。

【対象】001-tips-new-domain-seo-4steps.md の改稿（slug: new-domain-seo-troubleshooting-4steps）
【種別】既存記事の Hub 昇格（新規 slug なし）
【必須】§9 の削除・追加・新設セクションをすべて反映
【必須】§5 実測ログを1〜2文として自然に織り込む（断定しない）
【参照】writing-rules.md、AGENTS.md
【出力】frontmatter 付き Markdown 全文
```

---

## 14. 公開後フロー（④・①以外の参照用）

| 順 | スロット | 作業 |
|----|----------|------|
| 1 | ④ | 本 source に基づき MD 改稿 |
| 2 | 人間 | レビュー |
| 3 | ① | MD 反映 + `series.ts` 追加（**同一 PR**）+ build |
| 4 | ⑥ | DailyNote / Dashboard 記録 |
| 5 | ② | `/blog/new-domain-seo-troubleshooting-4steps` と `/series/new-domain-seo-series` のインデックス依頼 |

---

## 15. 免責（記事末に入れる旨）

- 本記事・数値は **2026年6月時点** の GSC 画面と toolarc.jp の実運用に基づく
- Google Search Console の UI・仕様・インデックス速度は変更される可能性がある
- インデックス件数の増加時期や検索表示を保証するものではない。重要な判断は [Google 公式ドキュメント](https://developers.google.com/search/docs) を確認すること
