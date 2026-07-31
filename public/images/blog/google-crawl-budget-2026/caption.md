# google-crawl-budget-2026 画像メモ

Last Updated: 2026-07-31 18:26

## seroundtable-crawl-budget-update.png

- 用途: 本文挿絵（公式更新の報道元）
- 挿入位置: 「Google公式アップデートの要点（2026年7月）」の第1段落直後
- 種別: 第三者サイトのスクリーンショット（Search Engine Roundtable の記事見出し部分）
- 原図: `assets/2026-07/2026-07-31_17-31-08.png`
- 後編集: なし
- 出典: 本文中に出典行を併記（記事タイトル・2026年7月22日・Barry Schwartz 氏）
- **要判断**: 他社メディアの記事見出しの引用。転載範囲は見出し・日付・著者に限定しているが、利用条件は未確認。差し替え候補は Google Developers 公式ページ（更新日表示部分）のスクリーンショット

## crawl-capacity-demand.png

- 用途: 本文挿絵（Capacity × Demand の決定構造）
- 挿入位置: 「クロール量を決める2つの要素｜Capacity × Demand」の第1段落直後
- 種別: diagram（白背景／ブルー・グリーン・オレンジの3パネル）
- 原図: `01_Daily/2607/260731/h2-2.png`（1672×941）
- 後編集: なし（図内に日本語ラベルあり）
- 備考: 直後の比較表と内容が重なるため、表の直前ではなく節の冒頭に置いている

## site-scale-flowchart.png

- 用途: 本文挿絵（サイト規模別の対応分岐）
- 挿入位置: 「サイト規模別｜今すぐやるべきこと」の導入直後、`### 小〜中規模サイトの場合` の前
- 種別: diagram-decision（2分岐＋共通アクション。結果ボックスが見える構成）
- 原図: `01_Daily/2607/260731/h2-3.png`（1536×1024）
- 後編集: なし（図内に日本語ラベルあり）

## og.png

- 用途: OG
- 状態: **adopt 済**（2026-07-31 18:26）。staging `2026-07-31__google-crawl-budget-2026-og` の `__v7-ja.png` を配置（1200×630）
- 内容: `crawl-capacity-demand.png` の上下を crop して 1200×630 に配置し、帯を焼きこみ。main `Google公式 クロールバジェット更新`（63px・左）/ sub `2026年7月｜Capacity × Demand で決まる`（30px・右詰め）/ 字面の隙間 15px
- 焼きこみ: Python が使えないため `.NET`（System.Drawing）版スクリプトで実施。詳細と恒久対応の判断は staging の `job.md`
- 配線: `posts.ts` の `ogImage: "og.png"` は `publish-article`（①）側

## caption

```md
2026年7月のGoogle公式更新を、Capacity × Demand の決定構造図とサイト規模別のフローチャートで整理します。
```

## alt text

```md
Search Engine Roundtableの記事見出し「Google Updates Its Crawl Budget Doc: Every Site Starts On Conservative Crawl」と2026年7月22日の日付
クロール容量とクロール需要の掛け算でクロール量が決まる構造図。容量は応答速度・同時接続数・安定性・HTTPキャッシュ、需要はサイト規模・更新頻度・ページ品質・人気度・相対評価で決まる
サイト規模別の対応フローチャート。小〜中規模はサイトマップ・内部リンク・品質改善を優先し、大規模は重複統合・robots.txtブロック・404/410・HTTP 304を優先する分岐図
```
