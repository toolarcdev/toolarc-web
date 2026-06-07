---
title: "npm run build後にHTTP200・sitemap.xml・OG fallbackを確認する"
description: "新記事公開後はビルド成功だけで終わりにせず、HTTP 200・sitemap.xml 含有・OG 画像 fallback の3点を必ず確認します。4本同日公開時の共通検証チェックとして再現しやすい手順を解説します。"
date: 2026-06-07
tags:
  - Next.js
  - npm run build
  - sitemap
  - OG画像
  - 記事公開
  - 1分Tips
  - devops
site: toolarc.jp
target: "toolarc-web で記事を公開するたびにビルド後の確認を確実に行いたい運用担当者"
---

# npm run build後にHTTP200・sitemap.xml・OG fallbackを確認する

> **今日の結論**
>
> - `npm run build` 成功だけでなく、**HTTP 200・sitemap.xml 含有・OG 画像 fallback** の3点を確認する
> - OG 画像は contentId フォルダに `og.png` がない場合、`default-og.png` にフォールバックする挙動がある（デプロイ環境で要確認）
> - 同日複数本公開時も、この手順を記事ごとに繰り返すと漏れを防ぎやすい
> - `/blog` 一覧への掲載確認も忘れずセットで行う

---

## なぜビルド成功だけでは不十分なのか

`npm run build` がエラーなく完了しても、記事ページが HTTP 200 で返っていなかったり、sitemap.xml に URL が含まれていなかったりするケースがあります。また OG 画像が意図しない fallback になっていても、ビルドログには何も出ません。

公開後の確認を手順化しておくことで、SNS シェア時の見た目の崩れや検索エンジンへのインデックス漏れを早期に発見できます。

---

## 手順

### 1. ビルドを実行してエラーがないことを確認する

```bash
npm run build
```

エラーや警告がある場合は、記事の Markdown・posts.ts のエントリを見直します。

### 2. 記事ページが HTTP 200 で返ることを確認する

ブラウザまたは curl で `/blog/{slug}` にアクセスし、ページが正常に表示されることを確認します。

```bash
curl -o /dev/null -s -w "%{http_code}" http://localhost:3000/blog/{slug}
# → 200 が返れば OK
```

### 3. sitemap.xml に新記事 URL が含まれることを確認する

`/sitemap.xml` をブラウザで開き、公開した slug が含まれているかを目視またはページ内検索（Ctrl+F）で確認します。

```text
http://localhost:3000/sitemap.xml
```

含まれていない場合は、posts.ts の `publishedAt` が正しく設定されているかを確認します。

### 4. ページソースで OG 画像 URL を確認する

ブラウザで記事ページを開き、ページソース（Ctrl+U）を表示します。`og:image` のメタタグを探し、画像 URL が意図したものかを確認します。

```html
<meta property="og:image" content="https://toolarc.jp/images/blog/..." />
```

contentId フォルダに `og.png` がない場合は `default-og.png` にフォールバックします。フォールバックが意図した挙動かどうかをこのタイミングで確認します（ローカルとデプロイ環境で挙動が異なる場合があるため、本番環境でも確認推奨）。

### 5. ブログ一覧に新記事が掲載されていることを確認する

`/blog` にアクセスし、新記事が一覧に表示されていることを確認します。表示順・タイトル・日付が正しいかも合わせて見ておくと安心です。

---

## チェックリスト

| 確認項目 | 完了 |
|---|---|
| `npm run build` がエラーなく完了した | ☐ |
| `/blog/{slug}` が HTTP 200 で返った | ☐ |
| `/sitemap.xml` に新記事 URL が含まれている | ☐ |
| `og:image` が意図した URL（または許容できる fallback）になっている | ☐ |
| `/blog` 一覧に新記事が表示されている | ☐ |

同日複数本公開する場合は、記事ごとにこのチェックリストを回します。

---

## まとめ

ビルド後の確認は5ステップで完結します。HTTP 200・sitemap.xml・OG fallback の3点が揃って、はじめて公開完了と判断できます。同日4本公開のような場合も、この手順を記事ごとに繰り返すことで確認漏れを防げます。

---

**関連記事**

- [posts.tsに1エントリ追加するだけでsitemapとブログ一覧に自動反映される](/blog/posts-ts-auto-reflect-sitemap-blog-list)
- [デプロイ前にimageBasePathとOG画像ファイルを突合して404を防ぐ](/blog/deploy-check-image-basepath-og-file)
- posts.ts 登録の最小チェックリスト（準備中）
- Next.js運用 Hub（準備中）

---

*本記事の内容は 2026-06-07 執筆時点の toolarc-web の実装に基づきます。OG fallback の挙動はデプロイ環境や Next.js のバージョンによって異なる場合があります。重要な確認は公式ドキュメントおよび本番環境でもあわせて実施してください。*
