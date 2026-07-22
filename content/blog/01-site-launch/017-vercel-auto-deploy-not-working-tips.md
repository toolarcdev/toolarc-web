---
title: "VercelのAuto Deployが動かないときに確認する設定"
description: "VercelでAuto Deployが動かないとき、Production Branch・git.deploymentEnabled（Ignored Build Step）・Deployment Protectionの3点を順番に確認する方法を初心者向けに整理します。"
date: 2026-06-30
tags:
  - Vercel
  - Auto Deploy
  - Production Branch
  - Ignored Build Step
  - Deployment Protection
  - デプロイ
  - Next.js
  - site-launch
site: toolarc.jp
target: "ToolArcでサイトを運用しVercel + GitHub連携でNext.jsを公開している初心者〜実務者で、pushしてもAuto Deployが動かず困っている読者"
last_update: 2026-06-30
---

# VercelのAuto Deployが動かないときに確認する設定

GitHubにpushしたのに、Vercel側でビルドが始まらない。そんなときに焦って何度もpushし直しても、設定が原因であれば解決しません。本記事では、Auto Deploy（自動デプロイ）が動かないときに確認すべき設定を、優先順位の高いものから整理します。

## 結論（1分）

- まず `Settings > Git` で Production Branch が、実際にpushしているブランチ（多くは `main`）と一致しているか確認します。
- 次に `vercel.json` の `git.deploymentEnabled` や「Ignored Build Step」の設定で、対象ブランチのデプロイが意図せずスキップされていないか確認します。
- Deployment Protection は基本的に「ビルドを止める」設定ではなく「アクセスを制限する」設定です。デプロイ自体は動いているのに認証画面が出て中身が見えない、というケースと区別します。
- 上記で解決しない場合は、GitHub連携（Webhook・Git認証）の状態を見直します。

## 確認その1：Production Branchの設定

VercelはProduction Branchとして指定したブランチへのpush・mergeに対してのみ、Productionデプロイを作成します。`Settings > Git` の「Production Branch」を開き、実際にpushしているブランチ名と一致しているか確認します。多くのプロジェクトでは `main` ですが、新規プロジェクト作成時に `master` など別のブランチが設定されている場合や、途中で運用ブランチを変えた場合にズレが起きやすいポイントです。

## 確認その2：git.deploymentEnabled / Ignored Build Step

ブランチ名が合っていても動かない場合、デプロイそのものをスキップする設定が入っていないか確認します。

- **`git.deploymentEnabled`**：`vercel.json` でブランチ単位、または全体でデプロイを無効化できる設定です。`false` にしている、または対象ブランチだけ `false` にしていないか確認します。
- **Ignored Build Step**：`Settings > Git` にある設定で、指定したスクリプト（または「Only build Production」などのプリセット）の終了コードによってビルドの実行・スキップを判定します。終了コード `0` の場合はビルドがスキップされ、`1` 以上の場合はビルドが実行される仕組みです。意図せず「常にスキップ」になるスクリプトが設定されていると、pushしてもビルドが始まりません。

どちらもプロジェクト側で意図的に設定するものなので、過去に誰か（自分も含む）が設定した内容が残っていないか、一度見直す価値があります。

## 確認その3：Deployment Protectionなど「見え方」の問題

`Settings > Deployment Protection` も確認対象の一つですが、注意点があります。Deployment Protectionは基本的に「誰がデプロイにアクセスできるか」を制限する機能で、ビルド自体を止める機能ではありません。Hobby（無料）プランの場合、Standard Protectionが有効でもProductionドメインは基本的に公開されたままで、保護の対象は主にPreviewデプロイです（Production自体を保護対象にするにはPro/Enterpriseプランの設定が必要です）。

つまり「ビルドは成功しているのに、アクセスすると認証画面が出て中身が確認できない」という症状であれば、Deployment Protectionが原因である可能性があります。一方で「Deploymentsタブにビルドそのものが出てこない」という症状であれば、確認その1・確認その2の方が原因として近いと考えられます。症状を区別して確認すると、原因の切り分けが早くなります。

## まとめ・関連記事

Auto Deployが動かないときは、思い込みで設定を変える前に「Production Branch → git.deploymentEnabled / Ignored Build Step → Deployment Protection」の順で確認すると、原因の切り分けがしやすくなります。

Vercel関連のトラブルは、本記事の他にも以下で扱っています。

- Hub記事：[AI初心者がゼロからWebサイトを公開するまでにやったこと・詰まったこと全部まとめ](/blog/site-launch)
- 関連：[Vercel Previewを本番前に確認する理由｜PR単位でミスを防ぐ手順](/blog/nextjs-vercel-preview-check-tips)
- 関連：[VercelでPreviewだけ更新されProductionに反映されないときの確認手順](/blog/vercel-production-not-reflecting-tips)
- 関連：[VercelのPromote to Productionとは？本番反映に使う場面](/blog/vercel-promote-to-production-tips)

> 本記事の内容は執筆時点（2026-06-30）のVercelの仕様に基づきます。プランによって利用できる機能や挙動が異なる場合があり、UIや仕様もアップデートで変更される可能性があるため、重要な判断の前には必ず[Vercel公式ドキュメント](https://vercel.com/docs/deployment-protection)で最新情報をご確認ください。
