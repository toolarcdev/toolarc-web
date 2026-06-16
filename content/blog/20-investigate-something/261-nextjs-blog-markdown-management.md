---
title: "MarkdownブログをNext.jsで管理するメリット｜AI原稿との相性とslug管理"
description: "Next.js + Markdownでブログを管理するメリットを解説。Gitによるバージョン管理、AI生成原稿との相性の良さ、posts.tsでのslug一元管理など、初心者が知っておくと運用が楽になるポイントをまとめました。"
date: 2026-06-16
tags:
  - Next.js
  - Markdown
  - ブログ運用
  - posts.ts
  - Git
  - AI活用
  - 1分Tips
  - cursor-free
site: toolarc.jp
target: "Next.jsでMarkdownブログを始めた、または検討している初心者"
last_update:
---

# MarkdownブログをNext.jsで管理するメリット｜AI原稿との相性とslug管理

WordPressのようなCMSではなく、Next.js + Markdownでブログを管理する——なぜこの構成を選ぶのか、最初は分かりにくいかもしれません。

実際に運用してみると、**Git管理・AI原稿との相性・slug一元管理**の3点で、CMSにはない使いやすさがあります。

> **この記事の結論**
>
> - Markdown + Git で記事をバージョン管理でき、変更履歴を残せる
> - AI が生成した原稿テキストをそのままファイルに置きやすい
> - `posts.ts` で slug と公開日を一元管理できるため、URL設計がシンプルになる

---

## メリット1：Gitで記事の変更履歴が残る

Markdownファイルはプレーンテキストなので、**Gitのバージョン管理と相性が抜群**です。

WordPressのようなDBベースのCMSでは、記事の変更履歴を残すには専用プラグインが必要なことが多いです。Next.js + Markdownの構成であれば、`git commit` するだけで「いつ・何を変えたか」がそのまま記録されます。

誤って記事を書き換えてしまったときも、`git diff` や `git restore` で以前の状態に戻せます。

---

## メリット2：AI生成の原稿をそのまま置ける

ClaudeやChatGPTが出力する原稿は、Markdown形式がそのまま使えます。コピーして `content/blog/` 配下のファイルに貼り付けるだけで、ほぼそのまま記事になります。

CMSへの入稿では「見出しの形式を変換する」「画像パスを書き直す」などの手間が発生しやすいですが、Markdownファイル管理であればその工数をほぼゼロにできます。

---

## メリット3：`posts.ts` でslugと公開日を一元管理できる

Next.jsブログでは、`lib/blog/posts.ts` に各記事の slug・公開日・タイトルなどをまとめて定義する構成が一般的です。

```ts
{
  slug: "nextjs-blog-markdown-management",
  publishedAt: "2026-06-16",
  title: "MarkdownブログをNext.jsで管理するメリット",
  contentId: "20-investigate-something",
}
```

このファイルを見るだけで「どの記事がいつ公開されたか」「どのURLで公開されているか」が一覧できます。記事の公開日がサイト表示とズレた場合も、このファイルと frontmatter の `date` を同じ値に揃えるだけで解決します。

---

## 基本的なファイル配置

Next.js + Markdownブログの運用では、次の3か所にファイルを置きます。

| 置き場所 | 内容 |
|----------|------|
| `content/blog/XX-slug/` | 記事本文の `.md` ファイル |
| `lib/blog/posts.ts` | slug・公開日・タイトルの登録 |
| `public/images/blog/` | 記事内で使う画像ファイル |

### 記事を追加するときの手順

1. `content/blog/[contentId]/記事名.md` にMarkdownファイルを置く
2. `lib/blog/posts.ts` に slug を登録する
3. `public/images/blog/` に使用画像を置く
4. `npm run dev` でローカルプレビューして確認する
5. ビルドが成功したら GitHub へ push してデプロイする

---

## まとめ

Next.js + Markdownのブログ管理は、Gitによる履歴管理・AI原稿との相性・`posts.ts`を使ったslug一元管理という3つの実務的なメリットがあります。初期設定こそ必要ですが、一度構成が整えば記事の追加・修正がシンプルな手順に収まります。

Cursorを使った実際の記事公開フローについては、以下の記事もあわせてどうぞ。

- [Cursor無料版でブログを運営する方法（Hub）](/blog/cursor-free)
- [toolarc.jpのサイト公開まとめ](/blog/site-launch)

---

> **免責**: 本記事の内容は2026年6月時点の実測に基づきます。Next.jsのバージョンや独自のリポジトリ構成によって、ファイルパスや運用手順が異なる場合があります。実際の環境に合わせてご確認ください。
