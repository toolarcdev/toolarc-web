---
title: "MarkdownのhttpリンクはNext.jsで外部リンク扱いになる"
description: "記事本文に絶対URLを書くと、同一サイト内でも外部リンクとして処理されます。内部リンクは相対パス `/blog/slug` で書く理由と確認手順を解説します。"
date: 2026-06-05
tags:
  - Markdown
  - Next.js
  - 内部リンク
  - ブログ設計
  - Tips
site: toolarc.jp
target: "Next.jsブログの記事を手動またはAI生成で書いている初心者・個人開発者"
---

# MarkdownのhttpリンクはNext.jsで外部リンク扱いになる

記事を手動編集したり、AIに本文を生成させたりすると、関連記事リンクが `https://www.toolarc.jp/blog/...` のような絶対URLで書かれることがあります。  
一見正しそうに見えますが、これは **内部リンクの扱いから外れる場合があります**。

> **この記事の結論**
>
> - `http` / `https` で始まるリンクは外部リンクと判定されやすい
> - 同一サイト内のリンクは **`/blog/<slug>` 形式の相対パス**が安全
> - AI生成の本文は公開前にリンク形式を確認する習慣をつける

---

## なぜ絶対URLが問題になるか

Next.jsでは、`<a href="https://...">` は外部リンクとして処理されます。  
`<Link href="/blog/slug">` のような内部遷移（クライアントサイドルーティング）が効かず、ページ全体のリロードが発生します。

Markdownの場合、多くのNext.js環境では以下のように変換されます。

| 書き方 | 変換後 | 扱い |
|---|---|---|
| `[記事名](/blog/slug)` | `<Link href="/blog/slug">` | 内部リンク（高速遷移） |
| `[記事名](https://www.toolarc.jp/blog/slug)` | `<a href="https://...">` | 外部リンク（フルリロード） |

パフォーマンスへの影響は環境によって異なりますが、**外部リンクアイコンが表示される・`rel="noopener"` が付く**など、見た目や挙動に差が出ることがあります（執筆時点 2026-06-05、実装は要確認）。

---

## 内部リンクの書き方

### 基本：相対パスで書く

```md
<!-- 推奨 -->
[AIワークフローの設計Tips](/blog/gpt-claude-two-stage-ai-workflow-tips)

<!-- 避ける -->
[AIワークフローの設計Tips](https://www.toolarc.jp/blog/gpt-claude-two-stage-ai-workflow-tips)
```

slugは `lib/blog/posts.ts` に登録されているキーを使います。未公開の記事は「準備中」と書いてリンクしないのが無難です。

### 絶対URLを使う場面

外部サイトへのリンク、またはOGPやsitemapで正規URLが必要な場合のみ絶対URLを使います。  
記事本文の内部リンクに絶対URLが必要なケースは、基本的にありません。

---

## AI生成本文のリンクは必ず確認する

AIに記事本文を生成させると、関連記事リンクが絶対URLで出力されることがあります。  
公開前に以下の方法で確認しておくと安心です。

```bash
# Markdownファイル内のhttps://を含むリンクを確認する
grep -n "](https://" content/blog/your-article/index.md
```

自サイトのドメインが含まれていたら、相対パスに直します。

---

## チェックリスト

- [ ] 記事内の関連リンクが `/blog/<slug>` 形式になっているか確認した
- [ ] `https://www.toolarc.jp/...` で書いた内部リンクがないか grep した
- [ ] 未公開記事へのリンクは「準備中」と明記してリンクを外した
- [ ] プレビューで外部リンクアイコンの有無を確認した

---

## 次に読む

- [未公開記事への内部リンクはslug確定後に追記する【リンク切れ防止】](/blog/unpublished-link-after-slug-confirmed)
- [CursorのPlanモードはbuild前にPlanを修正できる](/blog/cursor-plan-mode-modify-before-build-tips)
- [ブログ一覧を15件ずつページ送りにする目安（Next.js）](/blog/blog-page-size-15-tips)
- [AIとsource.mdで記事設計を構造化するTips](/blog/source-md-tips)
- [ChatGPT→Claude 2段階ワークフローのTips](/blog/gpt-claude-two-stage-ai-workflow-tips)

---

*本記事の内容はNext.jsの仕様・利用しているMarkdownレンダラーによって異なります。実装時は既存コードの挙動をあわせてご確認ください。掲載情報は執筆時点（2026-06-05）のものです。*
