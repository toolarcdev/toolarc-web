---
title: "Next.js canonical設定の基本とインデックス未登録対策【実運用Tips】"
description: "Next.js App RouterでmetadataBaseとcanonicalを設定すると、重複URLの評価分散を防ぎインデックスが安定しやすくなります。layout.tsxへの追加手順を解説。"
date: 2026-05-28
tags:
  - Next.js
  - canonical
  - SEO
  - App Router
  - インデックス
  - metadataBase
  - tips
  - サイト公開
site: toolarc.jp
target: "Next.js App RouterでSEO設定を整えたい初心者〜中級者"
---

# Next.js canonical設定の基本とインデックス未登録対策【実運用Tips】

> **この記事の結論**
>
> - Next.js App Router では `metadataBase` と `canonical` を設定するとインデックスが安定しやすい
> - 重複 URL による評価分散を防ぐ最低限の対策になる
> - 設定場所は `layout.tsx` の `metadata` オブジェクト

---

## canonical を設定しないと URL の評価が分散する

Google などの検索エンジンは、同じコンテンツが複数の URL でアクセスできる場合、どちらを正規の URL として扱うかを自分で判断しようとします。

たとえば `https://toolarc.jp/blog/xxx` と `https://www.toolarc.jp/blog/xxx` は、実質的に同じページでも別 URL として認識されることがあります。canonical タグを設定していないと、評価が分散して検索順位に影響が出る可能性があります。

canonical（カノニカル）とは、「このページの正規 URL はここです」と検索エンジンに明示するための `<link>` タグです。Next.js App Router では `metadata` オブジェクトを使って設定できます。

---

## layout.tsx に metadataBase を追加する

まず、サイト全体の基準 URL を `metadataBase` として `layout.tsx` に設定します。

```tsx
// app/layout.tsx
export const metadata: Metadata = {
  metadataBase: new URL("https://www.toolarc.jp"),
  // 他の metadata...
};
```

`metadataBase` を設定しておくと、各ページで canonical を相対パスで書いたときに自動的に絶対 URL に変換されます。設定していない場合、Next.js がビルド時に警告を出すことがあります。

`www` あり・なしのどちらを正規にするかは、Search Console で設定したドメインと合わせてください。混在すると意図しない分散が起きる可能性があります。

---

## ページごとに alternates.canonical を設定する

`metadataBase` を設定した後、各ページの `metadata` に `alternates.canonical` を追加します。

トップページの例:

```tsx
// app/page.tsx
export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};
```

ブログ記事ページの例:

```tsx
// app/blog/[slug]/page.tsx
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    alternates: {
      canonical: `/blog/${params.slug}`,
    },
  };
}
```

相対パスで書くと、`metadataBase` と組み合わせて `https://www.toolarc.jp/blog/xxx` という絶対 URL が生成されます。全ページに設定するのが理想ですが、まずはトップページと記事ページから始めるのが現実的です。

---

## 設定後に確認する3つのステップ

設定後は以下の順番で確認します。

1. **ビルドエラーがないか確認する**

```bash
npm run build
```

`metadataBase` や `alternates` の書き方に誤りがあるとビルド時に警告が出ます。エラーなく完了することを確認してください。

2. **本番 HTML の canonical タグをブラウザで確認する**

デプロイ後、対象ページをブラウザで開き、右クリック →「ページのソースを表示」で `<link rel="canonical"` を検索します。意図した URL が入っていれば設定は正しく反映されています。

3. **Search Console で URL を検査する**

Google Search Console の「URL 検査」ツールで対象 URL を入力し、Google がどの canonical を認識しているか確認します。設定直後はすぐに反映されないことがあるため、数日〜1週間程度様子を見てください。

---

## まとめ・次に読む

Next.js App Router での canonical 設定手順をまとめます。

1. `layout.tsx` の `metadata` に `metadataBase: new URL("https://www.toolarc.jp")` を設定する
2. 各ページの `metadata` に `alternates.canonical` を設定する（トップは `"/"`）
3. `npm run build` でエラーがないか確認する
4. 本番 HTML の `link rel=canonical` をブラウザで確認する
5. Search Console で URL を検査する

サイト公開時の設定全体については、以下の記事も参考にしてください。

- [サイト公開チェックリスト](/blog/site-launch)
- [Claude + Obsidian ワークフロー](/blog/claude-obsidian-workflow)
- [GSCの「ページにリダイレクトがあります」はドメイン正規化なら放置でよい](/blog/gsc-redirect-domain-normalization)
- [GSCの「リダイレクトあり」はループとは限らない——見分け方と確認手順](/blog/gsc-redirect-loop-check-tips)
- [新規ドメインでcanonicalとwww統一を確認する4ステップ](/blog/new-domain-canonical-www-check-tips)

---

*本記事は 2026-05-28 時点の Next.js・Search Console の仕様をもとに書いています。各ツールのアップデートにより挙動が変わる可能性があります。最新情報は Next.js および Google Search Console の公式ドキュメントをご確認ください。*
