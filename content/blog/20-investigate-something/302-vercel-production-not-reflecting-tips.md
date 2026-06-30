---
title: "VercelでPreviewだけ更新されProductionに反映されないときの確認手順"
description: "VercelでPreviewは更新されているのにProductionだけ古いまま、という状況に困っている人向けに、Production Deploymentの作成確認からブランチ設定、ドメインのGit Branch指定までの確認手順を実体験ベースでまとめます。"
date: 2026-06-30
tags:
  - Vercel
  - Production Deployment
  - Preview Deployment
  - Next.js
  - デプロイトラブル
  - GitHub連携
  - site-launch
site: toolarc.jp
target: "ToolArcでサイトを運用しVercel + GitHub連携でNext.jsを公開している初心者〜実務者で、Previewは更新されるのにProductionが反映されず困っている読者"
last_update: 2026-06-30
---

# VercelでPreviewだけ更新されProductionに反映されないときの確認手順

Vercelでデプロイしたはずなのに、本番URLだけ内容が変わっていない——Preview URLでは新しい内容が見えているのに、本番ドメインを開くと古いままという経験をしたことがある人は少なくないと思います。筆者自身もこの状況に遭遇し、何度もRedeployを押す前に確認すべきポイントがあることに気づきました。本記事では、その確認手順を実体験ベースでまとめます。

## 結論（1分）

- まずVercelのDeploymentsタブで、対象のpushに対して「Production」ラベル付きのデプロイが作成されているかを確認します。
- 作成されていない場合は、Settings → Git の「Production Branch」が、実際にpush・mergeしたブランチと一致しているか確認します。
- 独自ドメインを使っている場合は、Settings → Domains の対象ドメインで「Git Branch」欄が古いブランチ名で固定されていないか確認します。
- `vercel.json` で `git.deploymentEnabled` を `false` にしていないか、コミットメッセージに `[skip-vercel]` 等のタグが入っていないかも合わせて確認します。
- ここまでで解決しない場合は、GitHub連携（Webhook）を一度外して再連携を試します。

## なぜPreviewだけ更新されてProductionが反映されないのか

筆者が調べた範囲では、原因は大きく次の4パターンに分かれます。Vercelの仕様は変更される可能性があるため、執筆時点（2026-06-30）の情報として読んでください。

1. **Production Branchの設定ズレ**：Vercelは、Settings → Git で指定した「Production Branch」（多くは `main`）へのpushに対してのみProduction Deploymentを作成します。それ以外のブランチへpushしている場合、Preview Deploymentは作られますが、Productionは更新されません。
2. **ドメイン側のGit Branch指定**：独自ドメインの設定（Settings → Domains → Edit Domain）で「Git Branch」が古いブランチ名のまま固定されていると、Production Deployment自体は作成されていても、ドメインへの反映だけがされないことがあります。
3. **デプロイの無効化設定**：`vercel.json` の `git.deploymentEnabled` を `false` にしている、またはコミットメッセージに `[skip-vercel]` 等のタグが含まれていると、そのpushはデプロイ自体がスキップされます。
4. **GitHub Webhookの不具合**：Vercel側のGit認証連携が外れている、または同じGitアカウントが複数のVercelアカウントに紐づいている場合、push自体がVercelに正しく届かないことがあります。

## 確認手順

1. VercelのDeploymentsタブで、対象pushに対応するデプロイが作成されているか確認します。Preview Deploymentのみで止まっている場合は次に進みます。
2. Settings → Git の「Production Branch」を確認し、実際にpush・mergeしたブランチと一致しているか見ます。
3. Settings → Domains で対象ドメインを開き、「Git Branch」欄が空欄（Production Branchに自動追従）になっているか確認します。
4. プロジェクトに `vercel.json` がある場合、`git.deploymentEnabled` の値を確認します。
5. ここまでで原因が見つからない場合は、VercelのGitHub Integrationを一度外し、再連携を試します。

## それでも直らないとき

- コミットのGit Author（メールアドレス）が、Vercelに連携しているGitアカウントと一致しているかを確認します。一致していないと、そもそもデプロイが作成されないことがあります。
- 同じGitアカウントが複数のVercelアカウントに紐づいている場合、連携が片方に上書きされていることがあります。心当たりがあれば、Vercel側のアカウント設定を見直します。
- 上記をすべて確認しても直らない場合は、プロジェクトを一度削除し、GitHubから再importする方法もあります。手間はかかりますが、原因不明のまま時間を消費するより早く解決することがあります。

## まとめ・関連記事

Previewだけ更新されてProductionが反映されない状況は、焦って何度もRedeployを押す前に「Production Deploymentが作成されているか」を確認するのが近道です。設定項目自体はシンプルなだけに、見落としやすいポイントでもあります。

Vercel関連のトラブルは、本記事の他にも以下で扱っています。

- Hub記事：[AI初心者がゼロからWebサイトを公開するまでにやったこと・詰まったこと全部まとめ](/blog/site-launch)
- 関連：[Vercel独自ドメイン接続で詰まりやすいポイント5選【DNS設定完全チェック】](/blog/vercel-domain-connection-tips)
- 関連：[Vercel Previewを本番前に確認する理由——PR単位でミスを防ぐ手順](/blog/nextjs-vercel-preview-check-tips)
- 関連：[VercelのPromote to Productionとは？本番反映に使う場面](/blog/vercel-promote-to-production-tips)
- 関連：[VercelのAuto Deployが動かないときに確認する設定](/blog/vercel-auto-deploy-not-working-tips)

> 本記事の内容はVercelの仕様に基づくため、執筆時点（2026-06-30）以降に画面構成や挙動が変更されている可能性があります。重要な判断の前には、必ず[Vercel公式ドキュメント](https://vercel.com/docs/git)で最新情報をご確認ください。
