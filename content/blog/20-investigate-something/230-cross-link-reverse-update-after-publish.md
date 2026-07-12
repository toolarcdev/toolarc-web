---
title: "公開後に既存記事へ相互リンクを逆更新する手順（211↔215型）"
description: "新記事を公開したら、既存記事側の「準備中」リンクも忘れずに更新。grep → 差し替え → ビルド確認の3ステップで相互リンクを完成させる手順を解説します。"
date: 2026-06-07
tags:
  - 内部リンク
  - 相互リンク
  - Next.js
  - 記事公開
  - 1分Tips
  - SEO
site: toolarc.jp
target: "toolarc-web で記事を公開した後の内部リンク整備を自分で完結させたい運用担当者"
---

# 公開後に既存記事へ相互リンクを逆更新する手順（211↔215型）

> **今日の結論**
>
> - 新記事公開時は、新記事側のリンクだけでなく、**既存記事から新記事への逆リンクも更新**する
> - 「準備中」表記や仮 slug を、公開済み slug（`/blog/{slug}`）に差し替えるのが基本
> - grep → 差し替え → ビルド確認の3ステップで完結する
> - 本日の例: curl localhost 記事（211）↔ CORS 記事（215）の相互リンク更新

---

## なぜ逆リンクの更新が必要なのか

新記事を公開するとき、新記事側の「関連記事」セクションに既存記事へのリンクを設定するのは自然な流れです。

一方で見落としやすいのが**逆方向のリンク**です。既存記事の中に「準備中」と書かれたリンクや仮 slug が残っていると、読者が記事を辿れないだけでなく、相互に評価し合う内部リンク構造が片方向のままになります。

公開のたびに逆リンクも整備する習慣を持つことで、内部リンクの網を確実に広げられます。

---

## 手順

### 1. 新記事の関連記事セクションを整備する

新記事の末尾に、関連する公開済み記事への内部リンクを設定します。リンクは `/blog/{slug}` 形式で記述し、「準備中」が残らないようにします。

```md
## 関連記事

- [curl で localhost を叩くときの CORS 対処](/blog/curl-nextjs-cors-tips)
```

### 2. 既存記事を grep して「準備中」や旧 slug を洗い出す

`content/blog/` 配下を対象に、今回公開した記事の slug や「準備中」表記を検索します。

```bash
grep -r "準備中" content/blog/
grep -r "cross-link-reverse-update" content/blog/
```

ヒットしたファイルが、逆リンクを更新すべき既存記事です。

### 3. 既存記事のリンクを新 slug に差し替える

ヒットした箇所を開き、「準備中」や仮リンクを公開済み slug に書き換えます。相互リンクがまだ設定されていない場合は、関連記事セクションに追記します。

```md
<!-- 変更前 -->
- 相互リンク更新の手順（準備中）

<!-- 変更後 -->
- [公開後に既存記事へ相互リンクを逆更新する手順](/blog/cross-link-reverse-update-after-publish)
```

### 4. ビルド後に両記事のリンク表示を確認する

```bash
npm run build
```

ビルド成功後、新記事・既存記事の両方をブラウザで開き、リンクが正しく表示・遷移できることを確認します。

---

## チェックリスト

| 確認項目 | 完了 |
|---|---|
| 新記事側の関連リンクに「準備中」が残っていない | ☐ |
| 既存記事を grep して「準備中」・旧 slug を洗い出した | ☐ |
| 既存記事の該当箇所を新 slug に差し替えた | ☐ |
| `npm run build` が成功した | ☐ |
| 両記事のリンクをブラウザで確認した | ☐ |

---

## まとめ

記事公開後の逆リンク更新は、grep → 差し替え → ビルド確認の3ステップで完結します。新記事を公開したタイミングで必ずセットで行うことで、内部リンクの片方向抜けを防げます。

本日の例では curl localhost 記事（211）と CORS 記事（215）の相互リンクをこの手順で整備しました。同日に複数記事を公開する場合は、公開順にクロスリンクを設定していくと漏れが減ります。

---

**関連記事**

- [Hub記事をシリーズ複数本の参照軸に据える設計【内部リンク整理術】](/blog/hub-article-as-reference-axis-for-series)
- [未公開記事への内部リンクはslug確定後に追記する【リンク切れ防止】](/blog/unpublished-link-after-slug-confirmed)
- [npm run build後にHTTP200・sitemap.xml・OG fallbackを確認する](/blog/npm-run-build-http200-sitemap-og-fallback-check)
- [Spoke記事は詳細を書かず内部リンクで役割分担する](/blog/spoke-article-internal-link-role-separation)
- [posts.tsに1エントリ追加するだけでsitemapとブログ一覧に自動反映される](/blog/posts-ts-auto-reflect-sitemap-blog-list)
- [curl で localhost を叩くときの Next.js CORS 対処](/blog/curl-nextjs-cors-tips)
- [内部リンクの「準備中」は公開と同時に差し替える](/blog/internal-link-draft-label-update)
- [Hub記事昇格後は既存SpokeのHubリンクを差し替える](/blog/hub-spoke-link-update-tips)
- Hub: [新規ドメインSEOの4段階（シリーズ入口）](/blog/new-domain-seo-troubleshooting-4steps)
- [Tips新規公開時は関連記事へ逆リンクを最低2本追記する](/blog/tips-publish-backlink-checklist)

---

*本記事の内容は 2026-06-07 執筆時点の toolarc-web の運用に基づきます。リポジトリ構成や公開フローの変更により、手順が変わる場合があります。*
