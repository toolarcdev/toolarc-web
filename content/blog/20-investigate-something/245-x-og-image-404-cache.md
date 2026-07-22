---
title: "XでOG画像が出ないときは本番404とキャッシュを疑う"
description: "XのポストでOG画像が表示されない場合、本番URLの404エラーとXのキャッシュが主な原因です。ページソースで画像URLを確認し、デプロイ後にキャッシュを更新する手順を解説します。"
date: 2026-06-11
tags:
  - OG画像
  - Twitter Card
  - X
  - Next.js
  - SEO
  - og:image
  - 1分Tips
  - nextjs-image-cache
site: toolarc.jp
target: "Next.jsサイトでXシェア時にOG画像が出なくて困っている人"
---

# XでOG画像が出ないときは本番404とキャッシュを疑う

X（旧Twitter）にページURLをポストしたとき、画像が出ずにタイトルと説明だけの小さいカードになることがあります。原因は大きく2つ。**本番の画像URLが404になっている**か、**Xがキャッシュを持ったまま**かです。

> **今日の結論**
> - まず本番の `og:image` / `twitter:image` URL がブラウザで直接開けるか確認する
> - タイトル・説明だけの小さいカードは、画像取得失敗またはキャッシュが原因のことが多い
> - 修正デプロイ後は X Card Validator または再ポストでキャッシュ更新を試す（反映に時間がかかる場合あり）

## なぜ画像が出ないのか

X はポスト時にページの `<meta>` タグを取得し、`twitter:image`（または `og:image`）に書かれた URL から画像を取得します。この URL が **本番環境で 404 になっていると画像は表示されません**。また、一度取得に失敗した URL はキャッシュされるため、画像を修正してデプロイしても古い結果が残り続けることがあります。

## 手順：404とキャッシュを切り分ける

### 1. ページソースで画像URLを確認する

記事ページを開いて `Ctrl+U`（ページのソースを表示）し、`twitter:image` と `og:image` の URL を確認します。

```html
<meta name="twitter:image" content="https://toolarc.jp/images/blog/xxx.png" />
<meta property="og:image" content="https://toolarc.jp/images/blog/xxx.png" />
```

### 2. その URL をブラウザで直接開く

コピーした URL をアドレスバーに貼り付けて開きます。**画像が表示されれば OK**。404 が返るなら次のステップへ進みます。

### 3. 404なら実ファイルとposts.tsを揃えてデプロイする

`posts.ts` の `ogImage` に書かれたパスと `public/images/` 配下の実ファイル名が一致しているか確認します。ファイル名の大文字・小文字の違いや拡張子のずれが原因になることがあります。修正後は本番へデプロイして、再度 URL を直接開いて 200 になることを確認します。

### 4. デプロイ後にキャッシュを更新する

画像 URL が 200 になっても、X が古いキャッシュを持っていると表示が変わらない場合があります。以下のいずれかでキャッシュ更新を試します。

- **X Card Validator** で対象 URL を入力してプレビューを確認する
- 同じ URL を X で再ポスト（またはポストを削除して再投稿）する

反映まで数分〜数時間かかることがあります。

## まとめ

| 確認ポイント | 対処 |
|---|---|
| `twitter:image` / `og:image` URL が 404 | `posts.ts` と `public/images/` のファイル名を揃えてデプロイ |
| URL は 200 だが X に画像が出ない | X Card Validator で確認 / 再ポストでキャッシュ更新 |
| デプロイ直後は表示されない | 数分〜数時間待つ（X 側のキャッシュ更新に時間がかかる） |

本番の画像 URL を直接ブラウザで開く確認は、OG 画像トラブルの第一歩として習慣にしておくと切り分けがスムーズです。

## 関連記事

- [og:imageとJSON-LD imageをページソースで確認する方法](/blog/og-image-json-ld-pagesource-check)
- [デプロイ後にimageBasePathとog:image出力を確認するチェックリスト](/blog/deploy-check-image-basepath-og-file)
- [Next.jsで画像差し替えしても反映されない時の対処法](/blog/nextjs-image-replace-not-reflecting)
- [Next.jsのog:imageフォールバック挙動を確認する](/blog/nextjs-og-image-fallback-tips)
- [ChatGPTでOG画像を狙い通りに生成するプロンプト設計【1分Tips】](/blog/chatgpt-og-image-prompt-design)
- [ChatGPT スマートフォンでのアカウント移行Tips](/blog/chatgpt-smartphone-account-migration-tips)

---

> **免責**: 本記事は2026年6月時点の X（旧Twitter）および Next.js の動作をもとに執筆しています。X のカード仕様やキャッシュ挙動は予告なく変更される場合があります。最新情報は [X Developer Platform](https://developer.x.com/en/docs/twitter-for-websites/cards/overview/abouts-cards) をご確認ください。
