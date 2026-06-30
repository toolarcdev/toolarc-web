---
title: "VercelのPromote to Productionとは？本番反映に使う場面"
description: "VercelのPromote to Productionとは何か、自動反映が止まったときの手動上書きやStaged Productionでの段階公開など、使う場面を初心者向けに整理します。"
date: 2026-06-30
tags:
  - Vercel
  - Promote to Production
  - Production Deployment
  - デプロイ
  - Next.js
  - GitHub連携
  - site-launch
site: toolarc.jp
target: "ToolArcでサイトを運用しVercel + GitHub連携でNext.jsを公開している初心者〜実務者で、Promote to Productionをいつ使えばよいか分からず困っている読者"
last_update: 2026-06-30
---

# VercelのPromote to Productionとは？本番反映に使う場面

VercelのDeployments画面で「Promote to Production」というメニューを見かけて、いつ使う機能なのか分からなかった、という人もいると思います。本記事では、Promote to Productionの基本的な役割と、実際に使う場面を整理します。

## 結論（1分）

- `Promote to Production` は、特定のDeploymentを「これを本番として配信する」と手動で指定する操作です。
- 通常は本番ブランチへのpush・mergeで自動的にProductionへ反映されますが、何らかの理由で自動反映が止まった場合の手動上書きとして使います。
- 操作はDeploymentsタブから、対象デプロイの「…」（省略記号）メニュー→「Promote to Production」を選ぶだけです。
- Preview用とProduction用で環境変数が異なる場合、Promote後はProduction側の環境変数に切り替わります。
- 一度Promoted状態になったデプロイは再度Promoteできません。別のデプロイへ戻したい場合はRollbackを使います。

## Promote to Productionとは何か

普段、本番ブランチ（多くは `main`）へpush・mergeすると、Vercelは自動的にそのビルドをProductionへ反映します。Promote to Productionは、この自動反映が何らかの理由で止まった場合や、あえて手動でタイミングをコントロールしたい場合に使う「手動上書き」の機能です。

公式ドキュメントでは、Productionデプロイの状態として「Staged（pushはされたが、まだドメインが割り当てられていない）」「Promoted（Stagedから本番へ昇格済み）」という区分が説明されています。Promote to Productionは、Staged状態のデプロイ、またはPreview Deploymentを、リビルドを伴って本番へ切り替える操作です。なお、過去にすでに本番配信していたデプロイへ戻したい場合は、Promote to ProductionではなくInstant Rollback（リビルドなしで瞬時に切り替える機能）を使うのが適切です。

## 使う場面

1. **自動反映が止まったとき**：依存パッケージの脆弱性が検出されるなど、ビルド時のセキュリティチェックで自動Production反映が止まることがあります。次のコミットのビルド自体は成功してもPreviewのまま扱われるケースがあり、その場合に手動でPromoteします。
2. **段階的に確認してから本番公開したいとき（Staged Production）**：ドメインの自動割り当てをオフにしてビルドし、社内確認やテストを済ませてから本番ドメインに反映したい場合に使います。
3. **特定のコミットだけを本番に出したいとき**：問題のあるコミットを飛ばし、その前の安定したビルドを本番に出したい場合にも使えます（ただし、すでに本番配信済みのデプロイへ戻す場合はRollbackが適切です）。

## 操作手順

1. VercelのDeploymentsタブを開き、本番に反映したいデプロイを探します。
2. 対象デプロイの「…」（省略記号）メニューをクリックします。
3. 「Promote to Production」を選択します。
4. 確認ダイアログに、どのドメインがこのデプロイに紐づくかが表示されるので内容を確認します。
5. 「Promote to Production」を実行します。通常はリビルドが行われます（Staged Production Buildの場合はリビルドなしで即時反映されます）。

CLIを使う場合は `vercel promote <deployment-url>` でも同じ操作が可能です（`--yes` を付けると確認プロンプトをスキップできます）。

## 注意点・まとめ

- Preview用とProduction用で環境変数が異なる場合、Promote後はProduction側の値に切り替わります。Preview環境変数のままでは本番運用できない点に注意します。
- 一度Promoted状態になったデプロイは、同じデプロイを再度Promoteすることはできません。別のデプロイへ戻したい場合はRollbackを使います。
- Vercelには、Productionデプロイの履歴だけを一覧・検索する標準機能はありません。Promoteを多用する場合は、Gitタグなどで履歴を残しておくと後から追いやすくなります。

Promote to Productionは「困ったときの最終手段」というより、「本番反映のタイミングを自分でコントロールする手段」として理解しておくと使いどころが見えやすくなります。

Vercel関連のトラブルは、本記事の他にも以下で扱っています。

- Hub記事：[AI初心者がゼロからWebサイトを公開するまでにやったこと・詰まったこと全部まとめ](/blog/site-launch)
- 関連：[Vercel Previewを本番前に確認する理由——PR単位でミスを防ぐ手順](/blog/nextjs-vercel-preview-check-tips)
- 関連：[VercelでPreviewだけ更新されProductionに反映されないときの確認手順](/blog/vercel-production-not-reflecting-tips)
- 関連：[VercelのAuto Deployが動かないときに確認する設定](/blog/vercel-auto-deploy-not-working-tips)

> 本記事の内容は執筆時点（2026-06-30）のVercelの仕様に基づきます。UIや挙動はアップデートで変更される可能性があるため、重要な判断の前には必ず[Vercel公式ドキュメント](https://vercel.com/docs/deployments/promoting-a-deployment)で最新情報をご確認ください。
