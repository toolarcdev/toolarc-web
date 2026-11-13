---
title: "なぜnpm run buildが必要？｜毎回実行する理由"
description: Next.jsでnpm run devは動くのに公開時のbuildで失敗する人向けに、本番向けビルドを実行する理由とpush前の確認手順を整理します。型チェックとLintの違い、エラーログや環境変数の確認、build成功後にPreviewで画像・リンクを確かめるところまで解説します。
date: 2026-07-01
tags:
  - npm run build
  - Next.js
  - Vercel
  - ビルドエラー
  - デプロイ
  - 開発Tips
site: toolarc.jp
target: "Next.jsで開発を始めたばかりで、pushのたびにVercelの本番ビルドエラーに気づく初心者"
last_update: 2026-11-13
---

# なぜnpm run buildが必要？｜毎回実行する理由

「なぜ毎回`npm run build`が必要なのか？」`npm run dev`では問題なくても、push後にVercelの本番ビルドで初めて型エラーに気づく、という経験がある方は少なくありません。筆者自身もtoolarc.jpの運用で、開発サーバーでは気づかなかった型エラーが本番ビルドで表面化したことが何度もあります。

原因の多くは、開発サーバーと本番ビルドでチェックの厳しさが違うことです。この記事では、毎回実行すべき理由と、エラー時の見方を1分で分かる形にまとめます。

> **今日の結論**
> - `npm run dev`で問題なく動いていても、`npm run build`でエラーが出ることがあります
> - 原因の多くは型エラーやESLintエラーで、開発サーバーでは警告どまりになりやすいためです
> - pushする前にローカルで`npm run build`を実行しておくと、Vercelでの失敗や公開後の修正戻りを減らせます
> - エラーが出たら、最初の数行と該当ファイルパスを確認すると原因を切り分けやすくなります

## なぜローカルでは問題なくても本番ビルドで落ちるのか

`npm run dev`は開発中の使い勝手を優先しており、型エラーがあってもブラウザ上にエラーオーバーレイを出しつつ動作を続けることがあります。一方`npm run build`は本番向けの厳格なチェックを行うため、TypeScriptの型エラーがあるとビルド自体が失敗します。

Next.js 16では`next build`がESLintを自動実行しません。buildが通ってもLintを実行済みとは限らないため、プロジェクトで用意したLintコマンドを別に実行してください。[ESLintの公式説明](https://nextjs.org/docs/app/api-reference/config/eslint)と、[ビルド時の型チェック](https://nextjs.org/docs/app/api-reference/config/next-config-js/typescript)を分けて確認できます。

また、CursorなどのAIツールでコードを生成した場合、エディタ上の型チェックとビルド時の型チェックが完全に一致しないケースもあります。AIが生成したコードだからこそ、pushする前の`npm run build`が最後の確認役になります。

## npm run buildを実行する手順

1. 変更が一区切りついたらターミナルを開きます
2. `npm run build` を実行します
3. エラーが出たら、最初の数行と該当ファイルパスを確認します
4. 修正したら、もう一度`npm run build`を実行します
5. 成功したことを確認してから、commit / pushに進みます

## buildが通ったあとも公開画面を確認する

ローカルのbuildは、実際の公開画面の表示確認までは行いません。push後は、VercelのPreview URLでページ・画像・リンクを確認し、レビューを経て本番反映へ進めます。[push前のチェックリスト](/blog/github-push-checklist)では、変更内容やブランチを確認する項目も扱っています。

画像が古いままなら、buildの成功とは別に、[画像差し替えが反映されないときの切り分け](/blog/nextjs-image-replace-not-reflecting)へ進んでください。画像の症状を確かめる前に、毎回キャッシュを削除する手順にはしません。

## ビルドが失敗したときの確認ポイント

エラーメッセージが長く表示されて戸惑うこともありますが、まずは先頭の数行に注目すれば十分です。多くの場合、エラー種別（Type errorかLint errorか）とファイルパスさえ分かれば、修正の見当がつきます。

環境変数の設定漏れが原因になることもあります。ローカルの`.env.local`では動いていても、Vercel側に同じ環境変数が設定されていないと、ビルドやデプロイ後の挙動がずれることがあるため、あわせて確認しておくと安心です。

## チェックリスト：pushする前に確認したいこと

| 確認項目 | 見るポイント |
| --- | --- |
| エラー種別 | Type errorかESLint errorかを見分ける |
| ファイルパス | エラーメッセージ内のファイル名と行番号を特定する |
| 環境変数 | ローカルの`.env.local`とVercel側の設定に差がないか |
| import / exportの記述 | パスの誤りやdefault exportの有無 |
| 再実行 | 修正後にもう一度`npm run build`を実行して成功を確認する |

## まとめ・次に読む

`npm run build`をpush前に実行する習慣は、地味に見えても公開後の手戻りを減らす効果があります。関連して、pushのタイミングや本番ビルドの確認範囲についてさらに知りたい方は、以下の記事もあわせてご覧ください。

- [npm run buildのHTTP200・サイトマップ・OG画像フォールバック確認](/blog/npm-run-build-http200-sitemap-og-fallback-check)
- 関連：[Obsidianで✅を入力する方法｜絵文字パネルで簡単入力](/blog/windows-emoji-panel-shortcut)
- 同日公開：[create-next-appを現在フォルダへ直接作成する方法](/blog/create-next-app-current-folder)
- 同日公開：[AIブログ記事の作り方｜source.md→Claude初稿→Cursor公開](/blog/ai-blog-writing-workflow-source-to-publish)

Next.jsやVercelのビルド挙動は、バージョンやプロジェクト構成によって変わることがあります。本記事は執筆時点（2026-07-01）の情報に基づいています。重要な判断をする際は、Next.js公式ドキュメントやVercelの公式ヘルプもあわせてご確認ください。

今回の統合・追記は2026-11-13に行いました。元の実務経験と過去の操作日は維持しており、新しい実測を行ったという意味ではありません。
