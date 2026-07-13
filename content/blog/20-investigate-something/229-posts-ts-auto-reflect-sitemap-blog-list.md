---
title: "posts.tsに1エントリ追加するだけでsitemapとブログ一覧に自動反映される"
description: "toolarc-webでは posts.ts に1エントリ追加するだけで /blog/{slug}・ブログ一覧・sitemap.xml に自動反映されます。最小公開パスの手順を実測ベースで解説します。"
date: 2026-06-07
tags:
  - Next.js
  - posts.ts
  - sitemap
  - ブログ運用
  - 1分Tips
site: toolarc.jp
target: "toolarc-web の記事公開フローを把握したい初心者・運用担当者"
---

# posts.tsに1エントリ追加するだけでsitemapとブログ一覧に自動反映される

> **今日の結論**
>
> - `lib/blog/posts.ts` に1エントリ追加するだけで `/blog/{slug}`・`/blog` 一覧・`/sitemap.xml` の3か所に自動反映される
> - `app/blog/[slug]/page.tsx`・`app/sitemap.ts`・`app/blog/page.tsx` を個別に編集する必要は通常ない
> - 最小公開パスは **Markdown + posts.ts の2ファイル**で完結する
> - Series UI に載せる場合のみ `lib/series/series.ts` の更新が追加で必要

---

## なぜ posts.ts 1ファイルで完結するのか

toolarc-web では、ブログ記事のルーティング・一覧生成・サイトマップ生成がすべて `lib/blog/posts.ts` の内容を参照する設計になっています。

つまり、記事を追加するたびに複数のファイルを探して編集する必要はありません。エントリを1行追加すれば、Next.js のビルド時に関連ページがまとめて生成されます。

---

## 最小公開パス（2ファイル）

記事を公開するために必要なファイルはこの2つだけです。

| 対象ファイル | 作業内容 |
|---|---|
| `content/blog/{contentId}/{markdownFile}` | 記事本文の Markdown を配置する |
| `lib/blog/posts.ts` | slug・contentId・markdownFile・publishedAt などを1エントリ追加する |

Series UI（シリーズナビゲーション）に載せたい場合は、追加で `lib/series/series.ts` の更新が必要です。ただしこれは任意であり、通常の1分Tips記事では不要です。

---

## 手順

1. `content/blog/{contentId}/{markdownFile}` に記事の Markdown ファイルを配置する
2. `lib/blog/posts.ts` に以下の情報を含むエントリを1件追加する
   - `slug`（公開 URL のパス）
   - `contentId`（新規1分Tipsは `"20-investigate-something"`）
   - `markdownFile`（配置したファイル名）
   - `publishedAt`（公開日）
3. `npm run build` を実行して成功を確認する
4. `/blog/{slug}` が HTTP 200 で返ること、`/sitemap.xml` に slug が含まれることを確認する

```bash
npm run build
```

ビルドが成功すれば、`/blog`（一覧）・`/blog/{slug}`（記事ページ）・`/sitemap.xml` の3か所への反映は自動です。

---

## 確認ポイント（ビルド後）

| 確認項目 | 手順 |
|---|---|
| 記事ページ | `/blog/{slug}` にアクセスして HTTP 200 を確認 |
| ブログ一覧 | `/blog` に新しい記事が表示されているか確認 |
| sitemap.xml | `/sitemap.xml` を開いて slug が含まれているか確認 |

OG画像の fallback 確認も忘れずに行うと安心です。

---

## まとめ

posts.ts への1エントリ追加で、記事ページ・一覧・サイトマップがまとめて自動生成されます。ルーティングや sitemap の設定ファイルを個別に触る必要がないため、記事公開の手順はシンプルに保てます。

Series UI が必要なときだけ `series.ts` を追加更新する、という切り分けを覚えておくと運用がスムーズです。

---

**関連記事**

- [公開後に既存記事へ相互リンクを逆更新する手順](/blog/cross-link-reverse-update-after-publish)
- [npm run build後にHTTP200・sitemap.xml・OG fallbackを確認する](/blog/npm-run-build-http200-sitemap-og-fallback-check)
- [series.tsにspokeを追加してシリーズページを更新する方法](/blog/series-ts-spoke-add-tips)

**関連記事（準備中）**

- Next.js運用 Hub（準備中）
- posts.ts 登録の最小チェックリスト（準備中）

---

*本記事の内容は 2026-06-07 執筆時点の toolarc-web の実装に基づきます。Next.js のバージョンアップや構成変更により、動作が変わる場合があります。重要な判断は公式ドキュメントおよびリポジトリの実コードでご確認ください。*
