---
title: "og:imageとJSON-LD imageをページソースで確認する方法"
description: "GSCで画像404が出たとき、記事ページのog:imageやJSON-LDのimageが何を指しているかをブラウザで確認する手順を解説します。Ctrl+UとF12の2通りの方法を紹介します。"
date: 2026-06-10
tags:
  - GSC
  - og:image
  - JSON-LD
  - 画像404
  - ページソース
  - SEO
  - 1分Tips
site: toolarc.jp
target: "GSCの画像404を切り分けたい新規サイト運営者・Next.js利用者"
---

# og:imageとJSON-LD imageをページソースで確認する方法

GSCで `/images/blog/...` の404エラーが出たとき、「実際にどのURLが指定されているのか」をブラウザで直接確認するのが最短の切り分け方法です。

`og:image` や JSON-LD の `"image"` の値が意図したパスになっていなければ、画像ファイルの配置を直す前に設定側の問題を疑う必要があります。

> **今日の結論**
> - ページソース（`Ctrl+U`）から `og:image` を検索するのが手軽で確実
> - `F12` → Elements タブからも同様にメタタグを確認できる
> - 確認したURLを新しいタブで開いてHTTP 200かどうかを目視する
> - 404のままなら `imageBasePath` と `public/images/` の実ファイルを照合する

---

## 確認手順

### Ctrl+U でページソースを開く（推奨）

1. **本番の `/blog/<slug>` をブラウザで開く**
2. **`Ctrl + U`** でページソースを表示する（Macは `Command + U`）
3. **`Ctrl + F`** で `og:image` を検索し、`content="..."` のURLを確認する
4. **そのURLを新しいタブで開き、HTTP 200 で画像が表示されるか確認する**
5. 必要なら同じ手順で `"image"` を検索し、JSON-LDの値も確認する

### F12 → Elements から確認する（補足）

`Ctrl+U` が使えない環境（一部ブラウザ設定やCMS）では DevTools を使います。

1. **`F12`** で DevTools を開く
2. **Elements タブ** → `<head>` の中を展開する
3. `<meta property="og:image"` を探してURLを確認する

---

## 404が続く場合の照合先

確認したURLが404のままの場合、以下の2点を照合します。

| 確認先 | 内容 |
|--------|------|
| `posts.ts` の `imageBasePath` | 記事に設定している画像ベースパスが正しいか |
| `public/images/` の実ファイル | 該当パスにファイルが存在するか |

`imageBasePath` の命名規則や配置ルールは関連記事にまとめています。

---

## まとめ

`og:image` の確認は「ページソースを開いて検索する」だけで完了します。GSCのエラーと実際の配信URLが一致しているかを先に目視確認することで、ファイル配置の修正かコード設定の修正かを素早く切り分けられます。

[画像404のGSCエラーは記事URLでインデックスリクエストする](/blog/gsc-image-404-request-article-url)の手順3でも、この確認方法を使います。

---

## 関連記事

- [デプロイ後にimageBasePathとog:image出力を確認するチェックリスト](/blog/deploy-check-image-basepath-og-file)
- [Next.jsのog:imageフォールバック挙動を確認する](/blog/nextjs-og-image-fallback-tips)
- [画像404のGSCエラーは記事URLでインデックスリクエストする](/blog/gsc-image-404-request-article-url)
- [GSCで画像URLが404になる原因と対処法](/blog/gsc-image-url-404-tips)
- [XでOG画像が出ないときは本番404とキャッシュを疑う](/blog/x-og-image-404-cache)

---

> **免責**: 本記事は2026年6月5日の実務確認をもとに執筆しています。ブラウザのショートカットやDevToolsのUIはバージョンによって異なる場合があります。Next.jsの`imageBasePath`仕様も変更されることがあるため、重要な判断は[公式ドキュメント](https://nextjs.org/docs)でご確認ください。
