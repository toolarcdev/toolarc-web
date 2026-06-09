---
title: "series.tsにspokeを追加してシリーズページを更新する方法"
description: "既存Tips記事をシリーズのSpokeに載せるにはseries.tsのspokes配列にslugを追加するだけです。posts.tsを変えずにシリーズページだけ更新できるケースも解説します。"
date: 2026-06-09
tags:
  - series.ts
  - Hub/Spoke
  - 内部リンク
  - Next.js
  - 1分Tips
  - サイト設計
  - toolarc
site: toolarc.jp
target: "ToolArcのシリーズ管理・series.tsの運用に取り組んでいる運営者"
---

# series.tsにspokeを追加してシリーズページを更新する方法

公開済みの Tips 記事をシリーズにまとめたいとき、`posts.ts` を触らずに**`lib/series/series.ts` だけ更新すれば済む**ケースがあります。記事は既に公開済みのため、シリーズページへの追加のみが目的のときはこの方法が最小変更です。

> **この記事の結論**
>
> - 既存 Tips をシリーズの Spoke に載せるときは `lib/series/series.ts` の `spokes` 配列に slug を追加する
> - `posts.ts` を変えずにシリーズページだけ更新できるケースがある（記事が既に公開済みのとき）
> - Hub 記事 slug は `hub` フィールドに、シリーズ URL は `/series/<series-id>` で表示される

---

## 作業手順

### 1. 対象シリーズの `hub` と既存 `spokes` を確認する

`lib/series/series.ts` を開き、更新したいシリーズのエントリーを探します。`hub` フィールドと現在の `spokes` 配列を把握してから次のステップへ進みます。

### 2. 追加する slug が `posts.ts` に登録済みか確認する

`lib/blog/posts.ts` で、追加したい記事の slug が存在するかを確認します。**未登録の slug を `spokes` に書いてもシリーズページには表示されません。**

### 3. `spokes` 配列に slug を1件追加する

```typescript
// 例: new-domain-seo-series への追加
spokes: [
  "gsc-index-report-tips",
  "gsc-image-url-404-tips",
  "your-new-slug-here", // ← 追加
],
```

重複して書くとビルドエラーや意図しない表示が起きることがあるため、既存の slug と被っていないかを確認してから追加します。

### 4. `npm run build` でシリーズページの生成を確認する

```bash
npm run build
```

`/series/<series-id>` のページが正常に生成されるかをビルドログで確認します。

### 5. Hub・Spoke 記事本文の相互リンクを確認する

必要に応じて、Hub 記事の「関連記事」「次に読む」に新しい Spoke へのリンクを追加します。逆に Spoke 記事から Hub へのリンクが抜けていないかも合わせて確認します。

---

## チェックリスト

| チェック項目 | 確認 |
|------------|------|
| `series.ts` で対象シリーズの `hub` と `spokes` を確認した | ☐ |
| 追加する slug が `posts.ts` に登録済みであることを確認した | ☐ |
| `spokes` 配列に slug を追加した（重複なし） | ☐ |
| `npm run build` を実行してエラーがないことを確認した | ☐ |
| `/series/<series-id>` のページに記事が表示されることをブラウザで確認した | ☐ |
| Hub・Spoke 記事本文の相互リンクを更新した（必要な場合） | ☐ |

---

## 次に読む

- [シリーズページの更新タイミングと運用判断](/blog/hub-series-update-timing-tips)
- [new-domain-seo シリーズページ](/series/new-domain-seo-series)
- [posts.tsに1エントリ追加するだけでsitemapとブログ一覧に自動反映される](/blog/posts-ts-auto-reflect-sitemap-blog-list)
- [Hub記事昇格後は既存SpokeのHubリンクを差し替える](/blog/hub-spoke-link-update-tips)

---

> **免責**: 本記事は 2026-06-09 時点の情報をもとに執筆しています。`series.ts` の型定義やビルド挙動は Next.js・サイト実装のバージョンによって異なることがあります。最新の動作はビルドログとリポジトリのコードでご確認ください。
