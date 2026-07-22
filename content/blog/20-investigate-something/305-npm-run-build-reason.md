---
title: "なぜnpm run buildが必要？｜毎回実行する理由"
description: "`npm run build`を毎回実行する理由を、Next.js初心者向けに整理します。`npm run dev`では通っても本番ビルドで型エラーが出る差と、push前に失敗を潰す手順を実務ログベースで解説します。"
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
last_update: 2026-07-16
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

ESLintの扱いはNext.jsのバージョンによって変わる可能性があります。執筆時点では、Next.js 16以降は`next build`が自動でLintを実行しなくなる方向性が示されており、`next lint`コマンド自体も廃止が進んでいます。利用しているNext.jsのバージョンでLintがビルドに含まれるかどうかは、公式ドキュメントで確認することをおすすめします。

また、CursorなどのAIツールでコードを生成した場合、エディタ上の型チェックとビルド時の型チェックが完全に一致しないケースもあります。AIが生成したコードだからこそ、pushする前の`npm run build`が最後の確認役になります。

## npm run buildを実行する手順

1. 変更が一区切りついたらターミナルを開きます
2. `npm run build` を実行します
3. エラーが出たら、最初の数行と該当ファイルパスを確認します
4. 修正したら、もう一度`npm run build`を実行します
5. 成功したことを確認してから、commit / pushに進みます

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

- [pushする前にnpm run buildを実行する理由](/blog/push-before-npm-run-build)
- [npm run buildのHTTP200・サイトマップ・OG画像フォールバック確認](/blog/npm-run-build-http200-sitemap-og-fallback-check)
- 同日公開：[Obsidianで✅を入力する方法｜絵文字パネルで簡単入力](/blog/obsidian-checkmark-input)
- 同日公開：[create-next-appを現在フォルダへ直接作成する方法](/blog/create-next-app-current-folder)
- 同日公開：[AIブログ記事の作り方｜source.md→Claude初稿→Cursor公開](/blog/ai-blog-writing-workflow-source-to-publish)

Next.jsやVercelのビルド挙動は、バージョンやプロジェクト構成によって変わることがあります。本記事は執筆時点（2026-07-01）の情報に基づいています。重要な判断をする際は、Next.js公式ドキュメントやVercelの公式ヘルプもあわせてご確認ください。
