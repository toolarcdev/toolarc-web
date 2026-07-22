---
title: "app/page.tsx を編集するとTOPページを変更できる"
description: "Next.js App RouterでTOPページを変更したいときは app/page.tsx を編集します。レイアウトとの役割の違いから、npm run devでの確認、commit・Preview確認までの手順を初心者向けに整理しました。"
date: 2026-07-10
tags:
  - Next.js
  - App Router
  - page.tsx
  - TOPページ
  - Vercel
  - 初心者向け
site: toolarc.jp
target: "Next.js App RouterでTOPページの編集方法が分からない初心者"
last_update: 2026-07-10
---

# app/page.tsx を編集するとTOPページを変更できる

Next.jsでサイトを作り始めたばかりだと、「TOPページの中身はどのファイルを編集すればいいのか」で迷うことがあります。

筆者もサイト公開の初期に、TOPページの本体がどこにあるのか探した経験があります。今回はNext.js App Routerでの基本を1分Tipsとして整理します。

> **今日の結論**
>
> - Next.js App Routerでは `app/page.tsx` がTOPページの本体です
> - 全体のレイアウト（ヘッダー・フッターなど）は `app/layout.tsx` が担当します
> - 編集後は `npm run dev` でローカル確認してからcommit・Previewへ進みます

## app/page.tsx がTOPページの本体である理由

Next.jsのApp Router（Next.js 13以降で導入されたルーティング方式で、`app` ディレクトリ配下のファイル構成がそのままURLに対応します）では、`app/page.tsx` がルートURL（`/`）に対応するファイルです。つまりTOPページに表示したい内容は、このファイルのJSXを編集することで変更できます。

一方、ヘッダー・フッターやサイト全体の共通レイアウトは `app/layout.tsx` が担当します。ページごとの中身と、全体の枠組みを別ファイルに分ける構成がApp Routerの基本です。編集箇所を間違えると、TOPページを直したつもりが全ページに影響してしまうこともあるため、この役割分担は意識しておくとよいです。

## 編集から確認までの手順

1. プロジェクトルート（`package.json` がある階層）をエディタで開く
2. `app/page.tsx` を開く
3. 表示したいJSXを編集する
4. `npm run dev` でローカル（`localhost:3000`）を確認する
5. スタイルはTailwindクラスまたはCSS Modulesで調整する
6. 問題なければcommit → Previewで確認する

### チェックリスト

| 項目 | 確認内容 |
|---|---|
| ファイル | 編集対象が `app/page.tsx` になっているか |
| レイアウト | ヘッダー・フッターの変更を誤って `app/layout.tsx` 側に加えていないか |
| ローカル確認 | `npm run dev` で `localhost:3000` の表示を確認したか |
| Preview確認 | commit後、本番反映前にPreview URLで確認したか |

## まとめ

- TOPページの中身は `app/page.tsx`、全体の枠組みは `app/layout.tsx` と役割が分かれています
- 迷ったときはまずこの2ファイルの役割を思い出すと、編集箇所を判断しやすくなります
- 次に読む: [AI初心者がゼロからWebサイトを公開するまでにやったこと・詰まったこと全部まとめ](/blog/site-launch)
- 同日公開: [AIへの依頼は評価軸と候補を先に出すと1案に収まりやすい](/blog/ai-request-evaluation-axis-tips)
- 同日公開: [Cursorで複数リポジトリを開く方法](/blog/cursor-workspace-multi-repo-tips)

---

本記事は2026年7月時点の実測に基づきます。Next.jsのバージョンによってApp Routerの仕様が異なる場合があるため、実装時は利用中のNext.jsのドキュメント（`node_modules/next/dist/docs/`）も確認してください。なお、プロジェクトによっては `src/app/page.tsx` のように `src` 配下に `app` がある構成もあります。
