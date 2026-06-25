---
title: "新規ドメインSEOの4段階【GSCで切り分ける手順】シリーズ入口"
description: "新規ドメインのSEOが進まない原因は4段階のどこかで詰まっているケースがほとんどです。Search Consoleで状態を確認しながら段階ごとに対策する手順を、実測ベースで解説します。本記事は新規ドメインSEO・GSCシリーズの入口（Hub）です。量産期の追補Tips（リダイレクト・canonical・週次確認など）も後半にまとめています。"
date: 2026-06-03
last_update: 2026-06-13
tags:
  - SEO
  - 新規ドメイン
  - Search Console
  - インデックス
  - クロール
  - AI SEO運用
  - 初心者
  - new-domain-seo-series
site: toolarc.jp
target: "新規ドメインでブログを始めたばかりで、GSCの数字の意味がわからずインデックスが増えないことに不安を感じている初心者ブロガー"
---

# 新規ドメインSEOの4段階【GSCで切り分ける手順】シリーズ入口

「記事を公開したのに検索に出てこない」

新規ドメインでブログを始めたばかりの時期に、多くの人がこの状況に悩みます。ただし「検索に出てこない」は1つの現象ではなく、複数の段階のどこかで止まっている状態です。

原因を正確に特定するには、Googleがサイトを認識するまでの**4つの段階**を知っておくことが近道です。

> **この記事の結論**
>
> - 新規ドメインのSEOは「発見→クロール→インデックス→順位評価」の **4段階** で進む
> - 各段階で詰まる原因が異なるため、**どこで止まっているかを先に特定**すると対策がぶれにくい
> - GSC の「インデックス登録済み」「検出済み・未登録」「404」「リダイレクト」は、段階切り分けの材料になる
> - 順位評価は最後の壁。①〜③を通過するまでに **数週間かかることがある**（執筆時点の一般的な目安。公式保証ではない）
> - この記事は **シリーズ入口（Hub）**。詳細手順は下記の Spoke 記事へ誘導する

---

## 4段階の全体像

Googleがページを検索結果に表示するまでには、次の4段階が順番に進みます。

| 段階 | 意味 | 詰まりやすい原因 |
|---|---|---|
| ① 発見 | GoogleがURLの存在を知る | sitemapが未送信、外部リンクがない |
| ② クロール | Googlebotがページを取得・読み込む | robots.txtでブロック、サーバーエラー |
| ③ インデックス | ページが検索DBに登録される | noindexタグ、canonicalの設定ミス |
| ④ 順位評価 | 検索クエリへの関連度・品質が評価される | コンテンツの薄さ、競合の強さ |

どの段階で止まっているかによって打ち手がまったく変わります。「なんとなく対策する」より、**段階を特定してから動く**ほうが無駄が少なくなります。

本記事は、新規ドメインSEO・GSCシリーズの **Hub（入口）** です。全体像を把握したあとは、後半の「このシリーズで読む順番」から詳細記事へ進んでください。記事量産フェーズに入ったあとは、「量産期に増えた運用Tips」の追補表も参照してください。

---

## ステップ1：Search Consoleで発見・クロール・インデックスの状態を確認する

まず [Google Search Console](https://search.google.com/search-console/) を開き、以下の順で状態を確認します。

1. **URL検査ツール**で対象ページのURLを入力する
2. 「URLはGoogleに登録されていません」と表示される → ①発見または③インデックスの段階で止まっている
3. 「インデックス登録済み」と表示される → ①〜③は通過済み。④順位評価の段階

インデックス状態の一覧を確認したい場合は、左メニューの**「ページ」**（旧カバレッジ）レポートを使います。[GSCのインデックス数の見方（新規ドメイン向け）](/blog/gsc-index-count-new-domain)とあわせて確認すると、サイト全体の登録状況を把握しやすくなります。「除外」に分類されているページは、理由（noindex・canonicalの重複など）を確認して対策します。「検出 - インデックス未登録」が目立つ場合は、[初動対策の切り分け手順](/blog/gsc-detected-not-indexed)も参照してください。URL検査で「スマートフォン用 Googlebot」と表示されて不安な場合は、[GSCでスマートフォン用Googlebotと表示されても登録エラーとは限らない](/blog/gsc-smartphone-googlebot-not-error)で表示の意味を切り分けられます。

sitemap の送信状況やインデックス未登録の切り分けは、[サイトマップでインデックス未登録の原因を切り分ける手順](/blog/sitemap-index-checklist-tips)のチェックリストも参考になります。

GSC のサイトマップ画面で認識されない、または検出ページ数が増えない場合は、[GSCでサイトマップが認識されないときはフルURLで再送信する](/blog/gsc-sitemap-full-url-resubmit)の手順で送信形式も確認してください。

筆者の toolarc.jp では、2026年5月下旬〜6月初旬時点の GSC 画面で把握 URL が44件（登録済み8件・未登録36件）、「検出済み・未登録」が29件、クリック数が2件でした。立ち上がり期のサイトでは、このようにインデックス待ちの数字が目立つことがあり、数値だけで異常と断定する必要はないと考えられます（数値は日々変動します）。

---

## ステップ2：詰まっている段階に応じて対策を選ぶ

**発見で止まっている場合**

- `sitemap.xml` を作成し、Search Consoleから送信する
- 他の公開済み記事から内部リンクを張る
- 外部サイトからのリンクがあると発見が早まる場合がある（執筆時点では一般的な認識）

**クロールで止まっている場合**

- `robots.txt` の設定を確認し、Googlebotをブロックしていないか確認する
- サーバーエラー（5xx）が出ていないか確認する

GSC に「ページにリダイレクトがあります」と表示される場合は、必ずしも異常ではありません。[GSCの「ページにリダイレクトがあります」はドメイン正規化なら放置でよい](/blog/gsc-redirect-domain-normalization)と、[GSCの「リダイレクトあり」はループとは限らない——見分け方と確認手順](/blog/gsc-redirect-loop-check-tips)をあわせて確認すると、正規化リダイレクトとループを切り分けやすくなります。

**インデックスで止まっている場合**

- `<meta name="robots" content="noindex">` が誤って設定されていないか確認する
- canonical タグが別のURLを指していないか確認する
- Next.js を使っている場合は、開発環境（`localhost`）の設定が本番に混入していないかを確認する

apex と www の統一や canonical の一致は、[新規ドメインでcanonicalとwww統一を確認する4ステップ](/blog/new-domain-canonical-www-check-tips)の手順で確認できます。canonical タグをどこに設定すればよいかから確認したい場合は、[canonicalタグの設定場所を初心者向けに解説](/blog/canonical-tag-setup-location)も先に読むと迷いにくくなります。

「検出済み・未登録」が続く量産期は、全 URL に均等に送るより [GSCのインデックス登録リクエスト、どのURLから優先すべきか【1分Tips】](/blog/gsc-index-request-priority-url)の優先順位で送る方が扱いやすい場合があります。

**GSC に画像 URL の 404 が出ている場合**

記事ページ自体は正常でも、GSC の「ページ」レポートに **画像ディレクトリ URL だけ 404** と表示されることがあります。筆者のサイトでも、拡張子のない `/images/blog/...` パスが 404 として残っていた一方、実際の OG 画像ファイル（`.png` など）は 200 で応答していました。

この種の 404 は、記事本文のインデックス問題とは切り分けて確認するのがよいです。次の Spoke 記事が手順の参考になります。

- [GSCで画像URLだけ404になる理由と対処法](/blog/gsc-image-url-404-tips)
- [GSCの画像404とdefault-og.png fallbackは別問題として切り分ける](/blog/gsc-image-404-vs-default-og-fallback)
- [デプロイ前にimageBasePathとOG画像ファイルを突合して404を防ぐ](/blog/deploy-check-image-basepath-og-file)
- [OG画像の404を修正したあとGSCで確認すべきこと](/blog/gsc-og-image-404-fixed-verify)

---

## ステップ3：順位が出ない場合は評価期間と割り切り、記事資産を積み続ける

①〜③を通過してインデックス登録済みになっても、すぐに順位が出るわけではありません。新規ドメインの場合、Googleがサイト全体の品質を評価するまでに数週間〜数か月かかることがあります（[新規ドメインSEOのタイムラインと現実的な期待値](/blog/new-domain-seo-timeline-tips)も参照。執筆時点では一般的な目安として語られることが多いですが、公式に保証されたものではありません）。評価待ちの期間は、GSC を毎日細かく見るより [GSCのインデックス確認は週1回のサマリーで十分——新規ドメイン量産期の運用判断](/blog/gsc-index-weekly-check-tips)の頻度で十分な場面もあります。

この期間にできる最善策は**記事資産を積み続けること**です。[3層構造の記事設計](/blog/3layer-content-strategy-tips)のように、関連テーマの1分Tipsを増やしてサイト全体の検索カバレッジを広げると、評価が安定してきたときに複数のページが同時に浮上しやすくなります。キーワード選定の考え方は、[新規ドメインは「困りごと検索」から入るSEO戦略](/blog/new-domain-seo-trouble-keyword-strategy-tips)もあわせて参照してください。ジャンル選定では、[新規ドメインで避けた方がいいYMYLジャンルとは【1分Tips】](/blog/new-domain-ymyl-avoid)の判断軸も参考になります。

---

## このシリーズで読む順番

4段階の切り分けを軸に、関連する Spoke 記事を次の順で読むと迷いにくくなります。

| 読む順 | 段階 | 記事 |
|--------|------|------|
| 1 | 全体把握 | [Google Search Consoleのインデックス数の見方【新規ドメイン向け】](/blog/gsc-index-count-new-domain) |
| 2 | インデックス | [「検出 - インデックス未登録」の意味と初動対策【GSC】](/blog/gsc-detected-not-indexed) |
| 3 | 発見 | [サイトマップでインデックス未登録の原因を切り分ける手順](/blog/sitemap-index-checklist-tips) |
| 4 | 技術 | [GSCで画像URLだけ404になる理由と対処法【記事ページは別問題】](/blog/gsc-image-url-404-tips) |
| 5 | 技術 | [GSCの画像404とdefault-og.png fallbackは別問題として切り分ける](/blog/gsc-image-404-vs-default-og-fallback) |
| 6 | 技術 | [デプロイ前にimageBasePathとOG画像ファイルを突合して404を防ぐ](/blog/deploy-check-image-basepath-og-file) |
| 7 | 技術 | [OG画像の404を修正したあとGSCで確認すべきこと](/blog/gsc-og-image-404-fixed-verify) |
| 8 | 評価・待ち | [新規ドメインのSEOタイムラインと現実的な期待値【運用Tips】](/blog/new-domain-seo-timeline-tips) |
| 9 | 戦略 | [新規ドメインは「困りごと検索」から入るSEO戦略](/blog/new-domain-seo-trouble-keyword-strategy-tips) |
| 10 | 戦略 | [1分Tips→比較→Hubの3層で記事資産を積む方法](/blog/3layer-content-strategy-tips) |
| 11 | 運用 | [Hub記事の公開前にSeries更新を待つべき理由【運用Tips】](/blog/hub-series-update-timing-tips) |

Hub 記事とシリーズ定義の公開順序については、[Hub記事の公開前にSeries更新を待つべき理由](/blog/hub-series-update-timing-tips)も参考にしてください。

---

## 量産期に増えた運用Tips

記事量産フェーズに入ると、リダイレクト報告・canonical 統一・インデックス登録リクエストの優先順位など、立ち上がり期とは別の運用論点が増えます。以下は2026年6月時点で追加した Spoke です（上記「このシリーズで読む順番」の表はそのまま有効）。

| 段階 | 記事 |
|------|------|
| クロール | [GSCの「ページにリダイレクトがあります」はドメイン正規化なら放置でよい](/blog/gsc-redirect-domain-normalization) |
| クロール | [GSCの「リダイレクトあり」はループとは限らない——見分け方と確認手順](/blog/gsc-redirect-loop-check-tips) |
| インデックス | [新規ドメインでcanonicalとwww統一を確認する4ステップ](/blog/new-domain-canonical-www-check-tips) |
| インデックス | [canonicalタグの設定場所を初心者向けに解説](/blog/canonical-tag-setup-location) |
| インデックス | [GSCのインデックス登録リクエスト、どのURLから優先すべきか【1分Tips】](/blog/gsc-index-request-priority-url) |
| インデックス | [GSCでスマートフォン用Googlebotと表示されても登録エラーとは限らない](/blog/gsc-smartphone-googlebot-not-error) |
| インデックス | [GSCのインデックス確認は週1回のサマリーで十分——新規ドメイン量産期の運用判断](/blog/gsc-index-weekly-check-tips) |
| 順位 | [新規ドメインで避けた方がいいYMYLジャンルとは【1分Tips】](/blog/new-domain-ymyl-avoid) |

---

## まとめ

新規ドメインのSEOで「なぜ検索に出ないのか」と悩んだときは、4段階のどこで止まっているかを確認するところから始めてください。

- **Search Consoleで段階を特定**してから対策を選ぶ
- ①〜③が通過できていれば、④は記事を積みながら待つ判断も合理的
- 詳細手順は「このシリーズで読む順番」の Spoke 記事へ進む
- 量産期の追補論点は「量産期に増えた運用Tips」の表も参照する

---

*本記事・数値は2026年6月時点の Google Search Console 画面と toolarc.jp の実運用に基づいています。Google Search ConsoleのUIや仕様・インデックス速度は変更される可能性があります。インデックス件数の増加時期や検索表示を保証するものではありません。重要な判断は[Google公式ドキュメント](https://developers.google.com/search/docs)をご確認ください。*
