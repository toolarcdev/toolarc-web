---
title: "Next.jsブログの公開日がズレたら直す2箇所【frontmatter + posts.ts】"
description: "Next.jsブログで公開日の表示がおかしいとき、修正が必要なのはfrontmatterのdateとposts.tsのpublishedAtの2箇所。初心者でも再現できる手順を実測ベースで解説します。"
date: 2026-06-16
tags:
  - Next.js
  - ブログ運用
  - frontmatter
  - posts.ts
  - 公開日
  - トラブル解決
  - 1分Tips
site: toolarc.jp
target: "Next.jsでブログを運営していて、記事の公開日表示がズレて困っている初心者"
last_update:
---

# Next.jsブログの公開日がズレたら直す2箇所【frontmatter + posts.ts】

記事をデプロイしたのに、サイトに表示される公開日が違う——そんな経験はありませんか。

Next.jsブログでは、**公開日はデプロイ日から自動で取得されない**仕様です。Markdownファイルと管理ファイルの2箇所に日付を手で書く必要があり、どちらかが古いままだとズレが生じます。

> **この記事の結論**
>
> - 公開日の表示は、記事 `.md` の frontmatter `date` が優先される
> - 一覧の並び順は `lib/blog/posts.ts` の `publishedAt` も参照するため、**2か所を同じ日付**に揃える必要がある
> - デプロイ日ではなく「設定値」が表示されるため、ズレたら両方を手で修正してから再ビルドする

---

## なぜ公開日がズレるのか

Next.jsブログの日付表示は、**ファイルのタイムスタンプではなく、コード内に書かれた値**を参照します。

- **記事ページの日付** → Markdown の frontmatter `date`
- **一覧ページの並び順・日付** → `lib/blog/posts.ts` の `publishedAt`

この2つが食い違っていると、「記事ページは今日の日付なのに一覧では1週間前の順番に表示される」といった状況が起きます。

---

## 修正手順（所要時間：約2分）

### 1. 対象記事の Markdown を開いて `date` を直す

記事ファイルは `content/blog/[contentId]/記事名.md` にあります。先頭の frontmatter を確認し、`date` を正しい公開日に修正します。

```md
---
title: "記事タイトル"
date: 2026-06-16   ← ここを正しい日付に直す
---
```

### 2. `lib/blog/posts.ts` の `publishedAt` を同じ日付に直す

`posts.ts` で同じ slug のエントリを探し、`publishedAt` を frontmatter の `date` と一致させます。

```ts
{
  slug: "nextjs-blog-date-mismatch-fix",
  publishedAt: "2026-06-16",   // ← date と同じ値にする
  // ...
}
```

### 3. ビルドして両方の日付が一致しているか確認する

```bash
npm run build
```

ビルド後、記事ページと一覧ページの両方で日付が揃っていれば修正完了です。

---

## よくある混乱ポイント

| 状況 | 原因 |
|------|------|
| 記事ページの日付は正しいが一覧の並び順がおかしい | `posts.ts` の `publishedAt` が古いまま |
| 一覧の日付は正しいが記事ページに古い日付が出る | frontmatter の `date` が古いまま |
| デプロイした日付が自動で入ると思っていた | Next.jsは自動取得しない。手動設定が必要 |

---

## まとめ

Next.jsブログの公開日ズレは、**frontmatter の `date`** と **`posts.ts` の `publishedAt`** の2箇所を同じ値に揃えることで解決します。どちらか片方だけ直しても表示が完全に一致しないため、セットで修正するのが確実です。

修正後は必ず `npm run build` を実行し、記事ページと一覧の両方で日付を目視確認する習慣をつけておくと、同じミスを繰り返しにくくなります。

---

**関連記事**

- `lib/blog/posts.ts` 登録の最小チェックリスト（準備中）
- [MarkdownブログをNext.jsで管理するメリット](/blog/nextjs-blog-markdown-management)

---

> **免責**: 本記事の手順は2026年6月時点の実測に基づきます。Next.jsのバージョンや独自カスタマイズによって挙動が異なる場合があります。重要な変更を行う前は、公式ドキュメントおよびお使いの環境で動作を確認してください。
