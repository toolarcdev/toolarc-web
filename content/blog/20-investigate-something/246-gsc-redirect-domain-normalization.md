---
title: "GSCの「ページにリダイレクトがあります」はドメイン正規化なら放置でよい"
description: "Google Search Consoleで「ページにリダイレクトがあります」が出ても、http→httpsや非www→wwwへの正規化リダイレクトなら問題ありません。確認すべき3点と週1ウォッチの判断基準を解説します。"
date: 2026-06-11
tags:
  - GSC
  - GoogleSearchConsole
  - リダイレクト
  - ドメイン正規化
  - Vercel
  - Next.js
  - SEO
  - 1分Tips
site: toolarc.jp
target: "GSCでリダイレクト警告が出て対応すべきか迷っているNext.js運用者"
---

# GSCの「ページにリダイレクトがあります」はドメイン正規化なら放置でよい

Google Search Console（GSC）の「ページにリダイレクトがあります」という報告を見て、「何か壊れているのか」と慌てて対応してしまう方は多いです。ただし、ルートドメイン付近の数件であればドメイン正規化として**正常な動作であることがほとんど**です。

> **今日の結論**
> - 「ページにリダイレクトがあります」は canonical 未設定や重複とは別の報告枠
> - `http://` / 非www などが `https://www.` へ飛ぶルート3件程度は、ドメイン正規化として正常なことが多い
> - 正規URLがインデックスされており、件数がルート付近で増えていなければ週1のウォッチで十分

## 「リダイレクトがあります」は何を意味するか

GSC がクロールした URL がリダイレクトを返したとき、この報告が記録されます。canonical 設定ミスや意図しない重複ページとは**別の枠**で管理されています。

Vercel でカスタムドメインを設定すると、次の3パターンが自動的にリダイレクトされます。

| クロールされたURL | リダイレクト先 |
|---|---|
| `http://toolarc.jp/` | `https://www.toolarc.jp/` |
| `http://www.toolarc.jp/` | `https://www.toolarc.jp/` |
| `https://toolarc.jp/`（非www） | `https://www.toolarc.jp/` |

これらは Vercel Domains が処理するドメイン正規化であり、**意図どおりの動作**です。

## 確認手順：問題のあるリダイレクトと区別する

### 1. 該当URLがルート（apex / 非www / http）か確認する

GSC で報告されている URL を見て、上表のパターンに当てはまるかを確認します。ブログ記事の URL（`/blog/xxx`）が大量に並んでいる場合は別の問題が発生している可能性があります。

### 2. リダイレクト先が意図どおりか確認する

ブラウザのアドレスバーで該当 URL を開き、`https://www.` の正規 URL に飛ぶことを確認します。curl で確認する場合は以下のようにします。

```bash
curl -I http://toolarc.jp/
# Location: https://www.toolarc.jp/ が返ればOK
```

### 3. canonical とリダイレクトの担当を切り分ける

Next.js の `metadata` が担当するのは **canonical タグ**（正規 URL の宣言）、Vercel Domains が担当するのは **HTTP レベルのリダイレクト**です。両者は独立しており、どちらかを修正しても片方には影響しません。GSC の報告がどちらに属するかを混同しないようにします。

### 4. 件数を週1で確認する

ルート付近の3件前後で安定しており、正規 URL がインデックスされていれば対応不要です。週1回、件数だけ確認して**増えていないかをウォッチする**程度で十分です。

## まとめ

| 状況 | 対応 |
|---|---|
| ルートのhttp/非wwwが数件のみ | ドメイン正規化として正常。放置でよい |
| 正規URLがインデックスされている | 問題なし。週1ウォッチに切り替える |
| ブログ記事URLが大量に報告されている | 別の原因を調査する |
| リダイレクト先が意図しないURLになっている | Vercel Domains の設定を確認する |

GSC の報告はすべてを即時対応しようとすると消耗します。**ルートの正規化リダイレクトは正常系**と覚えておくと、本当に対応が必要なシグナルに集中できます。

## 関連記事

- [Next.js canonical設定の基本とインデックス未登録対策【実運用Tips】](/blog/nextjs-canonical-settings-tips)
- [GSCインデックスレポートの最終更新日が止まっても障害とは限らない](/blog/gsc-index-last-updated-not-a-failure)
- [Vercelでdomain invalidが直らず苦戦した話](/blog/vercel-domain-invalid-nameserver)
- [新規ドメインSEOのトラブルシューティング4ステップ](/blog/new-domain-seo-troubleshooting-4steps)
- [新規ドメインのGSCインデックス状況を確認する4ステップ](/blog/gsc-index-count-new-domain)
- [GSCの「リダイレクトあり」はループとは限らない——見分け方と確認手順](/blog/gsc-redirect-loop-check-tips)
- [新規ドメインでcanonicalとwww統一を確認する4ステップ](/blog/new-domain-canonical-www-check-tips)

---

> **免責**: 本記事は2026年6月時点の Google Search Console および Vercel の動作をもとに執筆しています。GSC の報告カテゴリや Vercel の仕様は予告なく変更される場合があります。最新情報は各公式ドキュメントをご確認ください。
