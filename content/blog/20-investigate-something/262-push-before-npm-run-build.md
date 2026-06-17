---
title: "push前にnpm run buildを実行すべき理由【Vercelのビルド失敗を防ぐ】"
description: "Cursor＋Vercelで開発する初心者向け。pushの前にローカルでnpm run buildを走らせることで、TypeScript・Nextのエラーを本番前に潰す手順と、画像差し替え時の.next削除もあわせて解説します。"
date: 2026-06-17
tags:
  - npm
  - Next.js
  - Vercel
  - TypeScript
  - Cursor
  - ビルドエラー
  - 1分Tips
  - cursor-free-series
site: toolarc.jp
target: "Cursor＋Vercelで開発しているNext.js初心者"
last_update:
---

# push前にnpm run buildを実行すべき理由【Vercelのビルド失敗を防ぐ】

「push したのに Vercel のデプロイが失敗した」という経験はありませんか？

ローカルでは問題なく動いていたのに、本番ビルドではじめてエラーが発覚する——Cursor を使って開発している初心者の筆者も、何度かこの落とし穴にはまりました。

この記事では、push 前に `npm run build` を実行する習慣が**なぜ重要か**と、その手順をまとめます。

---

> **今日の結論**
>
> - `npm run build` を push 前にローカルで実行するとビルドエラーをその場で検知できる
> - Vercel 上ではじめてエラーに気づく「後追いデバッグ」を減らせる
> - 画像を差し替えた後は `.next` フォルダの削除もあわせて検討する
> - エラーが出たらログを AI に渡せばすぐ修正できる

---

## なぜ「push してから気づく」のか

Next.js＋Vercel の開発では、ローカルの開発サーバー（`npm run dev`）と Vercel の本番ビルドで**動作環境が異なります**。

`npm run dev` は TypeScript の型チェックを省略しながら動作するため、型エラーがあってもローカルでは普通に表示されることがあります。一方、Vercel は `npm run build` を実行してデプロイするため、型エラーがあれば**ここではじめてビルドが止まります**。

結果として、「ローカルは動くのに Vercel が失敗する」という状況が生まれます。

---

## push前の5ステップ

```bash
# 1. ローカルで build を実行
npm run build
```

| ステップ | 内容 |
|----------|------|
| 1 | `npm run build` を実行する |
| 2 | エラーログが出たら AI（Cursor / Claude）に渡して修正する |
| 3 | build が成功したら push する |
| 4 | Vercel の Preview URL で表示を確認する |
| 5 | 問題なければ本番ブランチにマージする |

build エラーのログは**そのままコピーして AI に貼り付けるだけ**で、原因と修正案を提示してくれます。

---

## 画像を差し替えたときは `.next` 削除も検討する

画像を差し替えた後、`npm run dev` や `npm run build` でキャッシュが残っていて**古い画像が表示され続ける**ことがあります。

そのような場合は `.next` フォルダを削除してから build をやり直すと解決することがあります。

```bash
# .next を削除してからビルドし直す
rm -rf .next
npm run build
```

詳しい手順は「[Next.jsで画像を差し替えたのに反映されない場合の対処法](/blog/nextjs-image-replace-not-reflecting)」で解説しています。

---

## まとめ：push前の1コマンドが後戻りを防ぐ

`npm run build` は1〜2分かかりますが、Vercel 上でビルドが失敗してから原因を調べる時間に比べれば格段に短いです。

push の前に1コマンド実行する習慣をつけるだけで、デプロイの失敗率はかなり下がります。

`git status` やブランチ確認を含む push 前の5項目チェックリストは「[GitHub push前の確認ポイント5つ](/blog/github-push-checklist)」もあわせてどうぞ。

Cursor を使った Next.js 開発の全体像は「[Cursor 無料版で Next.js サイトを作る](/blog/cursor-free)」シリーズでまとめていますので、あわせてご覧ください。

---

**免責**: 本記事は 2026年6月17日 時点の情報をもとに執筆しています。Next.js・Vercel・Cursor の仕様は変更される可能性がありますので、最新情報は各公式ドキュメントをご確認ください。
