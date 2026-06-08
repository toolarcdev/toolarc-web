---
title: "GSCの画像404とdefault-og.png fallbackは別問題として切り分ける"
description: "GSCに出る画像URLの404と、default-og.pngのfallback設定は原因も対処も異なります。混同しやすい2つの問題を切り分けて、迷わず対処するための手順を解説します。"
date: 2026-06-04
tags:
  - GSC
  - Google Search Console
  - OGP
  - og:image
  - Next.js
  - fallback
  - default-og
  - 404
  - tips
site: toolarc.jp
target: "GSCの画像404を調べているうちにfallback設定と混乱してしまった初心者〜中級者"
---

# GSCの画像404とdefault-og.png fallbackは別問題として切り分ける

GSCで画像URLの404を調べているとき、`default-og.png` という共通ファイルの話が出てきて「これを直せばいいのか？」と迷うことがあります。しかし、**2つは原因も対処も異なる別の問題**です。混同すると作業が空振りしやすいため、最初に切り分けることが重要です。

> **この記事の結論**
>
> - `default-og.png` は記事専用OG画像がない場合の**fallback**用ファイルであり、本番への配置が前提
> - GSCに出ている特定の画像URL404は、**過去のパス不整合**が原因の可能性が高い
> - 2つは独立した問題のため、それぞれ別の手順で対処する

---

## 2つの問題の違い

| 問題                            | 原因                                                             | 対処                                               |
| ------------------------------- | ---------------------------------------------------------------- | -------------------------------------------------- |
| GSCの特定画像URL404             | 過去に出力されたパスに実ファイルがない                           | 記事ごとの `imageBasePath` / `ogImage` を修正する  |
| `default-og.png` が表示されない | fallbackファイルが本番未配置、またはfallback設計が機能していない | `default-og.png` を `public/` に配置・デプロイする |

GSCの404は**過去にGoogleがクロールしたURLの記録**です。そのURLに対応するファイルが今も存在しないために404が出続けています。一方 `default-og.png` は、記事専用のOG画像が設定されていないときに**代替として出力される共通ファイル**であり、それ自体が404になっている場合は配置漏れが原因です。

---

## 確認手順：5ステップで切り分ける

### 1. GSCの404 URLが記事専用OGか共通fallbackかを確認する

GSCのカバレッジレポートで404になっているURLを開き、パスを確認します。

- `/images/blog/my-article/og.png` のような記事固有のパス → 記事ごとの修正が必要
- `/images/default-og.png` のような共通パス → fallbackファイルの配置確認が必要

両方混在している場合は、それぞれ別の作業として分けて対処します。

### 2. fallback設計は公開済みTipsの手順で確認する

`default-og.png` をfallbackとして機能させる設計（メタデータ生成ロジックでの参照方法など）は、[Next.jsのOG画像fallback設定](/blog/nextjs-og-image-fallback-tips)で解説しています。fallbackの仕組み自体に問題がある場合はそちらを参照してください。

### 3. 記事ごとの imageBasePath / ogImage を個別に修正する

GSCの404が記事専用パスであった場合、`posts.ts` などの記事登録ファイルで該当記事の `imageBasePath` または `ogImage` の設定値を確認し、実ファイルのパスと一致させます。

確認・修正の具体的な手順は[デプロイ前にimageBasePathとOG画像ファイルを突合して404を防ぐ](/blog/deploy-check-image-basepath-og-file)を参照してください。

### 4. default-og が本番にデプロイされているか確認する

`default-og.png` が対象の場合、`public/` 配下に実ファイルが存在するか、コミット・デプロイ済みかを確認します。

```bash
# ローカルで確認
ls public/images/default-og.png

# 本番で確認
curl -o /dev/null -s -w "%{http_code}\n" https://example.com/images/default-og.png
# → 200 が返れば問題なし
```

### 5. 修正後は画像URLの消滅確認フローへ進む

どちらの問題を修正した場合も、デプロイ後はGSCで該当URLの404が解消されるかを定期確認します。手順は[OG画像の404を修正したあとGSCで確認すべきこと](/blog/gsc-og-image-404-fixed-verify)を参照してください。

---

## まとめ：迷ったときの判断フロー

```
GSCに画像URL404が出ている
        ↓
そのURLは /default-og.png か？
    ├─ Yes → fallbackファイルの配置を確認する（手順4）
    └─ No  → 記事ごとのimageBasePath / ogImageを確認する（手順3）
        ↓
修正・デプロイ後にGSCで消滅を確認する（手順5）
```

2つを混同せず、URLのパターンで判断先を分けることが、最短で解決するコツです。

- 関連: [og.png未配置時はresolveOgImageがdefault-ogにフォールバックする](/blog/resolve-og-image-fallback-to-default)
- 関連: [GSCで画像URLだけ404になる理由](/blog/gsc-image-url-404-tips)
- 関連: [OG画像の404を修正したあとGSCで確認すべきこと](/blog/gsc-og-image-404-fixed-verify)
- 関連: [Next.jsのOG画像fallback設定](/blog/nextjs-og-image-fallback-tips)

---

> **免責・執筆時点の注記**  
> 本記事は2026年6月4日時点の情報をもとに執筆しています。Next.jsの設定やGSCの仕様は変更されることがあります。実装詳細はプロジェクトの既存コードおよび[GSC公式ヘルプ](https://support.google.com/webmasters)でご確認ください。
