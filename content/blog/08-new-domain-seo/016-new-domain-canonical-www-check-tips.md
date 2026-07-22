---
title: "新規ドメインでcanonicalとwww統一を確認する4ステップ"
description: "新規ドメイン設定時にapexとwwwのどちらを正規URLにするか決め、canonicalタグとリダイレクト先が一致しているか確認する手順を解説します。"
date: 2026-06-12
tags:
  - canonical
  - new-domain-seo
  - GSC
  - Next.js
  - Vercel
  - DNS
  - トラブルシューティング
  - 1分Tips
site: toolarc.jp
target: "新規ドメインを設定したばかりでcanonical・www統一が不安な初心者"
last_update:
---

# 新規ドメインでcanonicalとwww統一を確認する4ステップ

新規ドメインを取得してサイトを公開した直後、「apex（`example.com`）と www（`www.example.com`）のどちらでアクセスしても表示できる」という状態になっていることがあります。

一見問題なさそうですが、**Googleから見ると2つの別URLに同じコンテンツがある状態になり、どちらを正規ページとして評価すべきか判断できなくなる**ことがあります。これがいわゆる「正規化されていない」状態です。

> **今日の結論**
>
> - 新規ドメインでは apex（`example.com`）と www（`www.example.com`）のどちらを正とするかを先に決める
> - ページの `<link rel="canonical">` と実際のアクセスURL（リダイレクト後）が一致しているか確認する
> - GSC には正規URL側のプロパティで見る方が混乱が少ない（プロパティ設定は公式確認推奨）

---

## なぜ統一が必要なのか

apex と www を統一しないと、以下のような問題が起きることがあります。

| 問題                   | 内容                                                               |
| ---------------------- | ------------------------------------------------------------------ |
| **評価の分散**         | 被リンクが apex・www に分かれ、評価が集約されない                  |
| **canonical の不一致** | `<link rel="canonical">` が www 指定なのに apex でもアクセス可能   |
| **GSC の混乱**         | プロパティが apex / www で分かれ、どちらでデータを見るか迷いやすい |

どちらを正規にするかはSEO上の優劣はありませんが、**一度決めたら途中で変えないこと**が重要です。

---

## 確認手順（4ステップ）

### 1. apex と www の両方でアクセスし、最終URLを確認する

ブラウザのアドレスバーで `http://example.com`・`https://example.com`・`https://www.example.com` の3パターンを入力し、それぞれ**最終的にどのURLに落ち着くか**を確認します。

正しく統一できていれば、すべて同じ正規URL（例: `https://www.example.com/`）にリダイレクトされます。別々のURLが表示される場合は、リダイレクト設定が不完全です。

### 2. 代表記事のページソースで canonical を確認する

公開済みの記事ページで `Ctrl+U`（Mac は `Option+Command+U`）を押してページソースを開き、`<head>` 内の以下のタグを探します。

```html
<link rel="canonical" href="https://www.example.com/blog/article-slug" />
```

`href` の値が**手順1で確認した正規URL形式**と一致しているかを照合します。

そもそも canonical タグをどこに設定するか分からない場合は、先に [canonicalタグの設定場所を初心者向けに解説](/blog/canonical-tag-setup-location) を確認すると、CMS・フレームワーク別の見当をつけやすくなります。

### 3. canonical の href とリダイレクト後 URL の一致を照合する

確認するのは次の2点の一致です。

| 確認項目                                          | 一致しているか |
| ------------------------------------------------- | -------------- |
| canonical の `href` のドメイン部分（apex or www） | ✅ or ❌       |
| canonical の `href` のプロトコル（https）         | ✅ or ❌       |

不一致の例としては「canonical は `https://www.example.com/...` なのに、apex でアクセスしても www にリダイレクトされない」という状態が典型です。

### 4. 不一致があれば設定を見直す

不一致が確認できた場合、原因は主に2か所です。

- **Next.js の metadata 設定** — `metadataBase` や各ページの `alternates.canonical` が正規 URL を向いているか確認する
- **ホスティング（Vercel など）のドメイン設定** — apex と www のどちらがプライマリで、どちらがリダイレクト元になっているかを確認する

> **注意**: Next.js のメタデータ API・Vercel のドメイン設定の詳細は変更される可能性があります。実装時は各公式ドキュメントで最新の手順を確認してください（執筆時点: 2026-06-13）。

---

## GSC プロパティの選び方

GSC で確認する際は、**正規 URL として選んだ側のプロパティ**（apex か www か）で見るのが混乱が少ないです。apex と www でプロパティが分かれている場合、インデックス数やクエリデータがどちらに表示されるかが変わることがあります。

プロパティの統合・設定方法は [Google Search Console ヘルプ](https://support.google.com/webmasters/) を確認してください。

URL検査で「使用したクローラ: スマートフォン用 Googlebot」と表示される場合も、それ自体は登録エラーではありません。canonical や noindex とあわせて切り分ける流れは、[GSCでスマートフォン用Googlebotと表示されても登録エラーとは限らない](/blog/gsc-smartphone-googlebot-not-error)で整理しています。

---

## 確認フロー（まとめ）

```
apex / www のどちらを正規にするか決める
    ↓
ブラウザで3パターンのアクセスを確認
    ├── すべて正規URLに揃う → ステップ2へ
    └── 揃わない → Vercel Domains のリダイレクト設定を見直す
    ↓
ページソースで canonical href を確認
    ├── 正規URLと一致 → 問題なし
    └── 不一致 → Next.js metadata またはホスティング設定を見直す
    ↓
GSC は正規URL側のプロパティで確認する
```

---

## まとめ

| チェック項目         | 正常な状態                              |
| -------------------- | --------------------------------------- |
| apex / www の最終URL | どちらでアクセスしても同じ正規URLに揃う |
| canonical href       | リダイレクト後の正規URLと完全一致       |
| GSC プロパティ       | 正規URL側で確認している                 |

canonical とリダイレクトのズレは、サイト立ち上げ直後に一度確認しておくと後から修正する手戻りを防げます。

---

## 関連記事

- [新ドメインのSEOトラブル4ステップ診断](/blog/new-domain-seo-troubleshooting-4steps)（Hub）
- [Next.js の canonical 設定Tips](/blog/nextjs-canonical-settings-tips)
- [canonicalタグの設定場所を初心者向けに解説](/blog/canonical-tag-setup-location)
- [GSCの「リダイレクトあり」はループとは限らない｜見分け方と確認手順](/blog/gsc-redirect-loop-check-tips)
- [Vercelでdomain invalidが直らず苦戦した話](/blog/vercel-domain-invalid-nameserver)
- [GSCの「ページにリダイレクトがあります」はドメイン正規化なら放置でよい](/blog/gsc-redirect-domain-normalization)

---

本記事の内容は執筆時点（2026-06-12）の情報に基づいています。Next.js のメタデータ API・Vercel のドメイン設定・GSC の仕様は変更される可能性があります。重要な判断は各サービスの公式ドキュメントで確認してください。
