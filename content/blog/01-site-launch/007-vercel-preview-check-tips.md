---
title: "Vercel Previewを本番前に確認する理由——PR単位でミスを防ぐ手順"
description: "VercelのPreview URLを使うと、本番に影響を出さず画像・canonical・メタデータを確認できます。GitHub連携で自動生成されるPreview環境の使い方を初心者向けに解説します。"
date: 2026-05-29
tags:
  - Vercel
  - Preview
  - GitHub
  - デプロイ
  - Tips
site: toolarc.jp
target: "Next.js + Vercel構成で記事を公開し始めた初心者・本番で初めてミスに気づいた経験がある人"
---

# Vercel Previewを本番前に確認する理由——PR単位でミスを防ぐ手順

「本番にマージしたら画像が表示されていなかった」「OGタグが古いままだった」——そういったミスに気づくのが公開後、というのはよくあることです。

Vercelには**Preview環境**という仕組みがあり、PRを作るだけで本番と同等の確認URLが自動生成されます。これを使えば、マージ前に本番さながらの確認ができます。

> **この記事の結論**
> - PR を push するだけで Vercel が Preview URL を自動生成する
> - 画像・canonical・メタデータはローカルではなく Preview URL で確認する
> - 問題があればブランチ側で修正して再 push するだけで URL が更新される

---

## Vercel PreviewはなぜローカルPreviewより信頼できるのか

`next dev` で立ち上げるローカル環境と Vercel の Preview 環境は、いくつかの点で挙動が異なります。

| 確認項目 | ローカル（`next dev`） | Vercel Preview |
| --- | --- | --- |
| 画像の配信パス | ローカルファイル参照 | 本番と同じCDN経由 |
| 環境変数 | `.env.local` の値 | Vercel に設定した値 |
| canonical URL | `localhost:3000` | 本番ドメインに近い形 |
| OGPカードの確認 | SNSクローラーが到達できない | Preview URLで検証ツールが使える |

特にOGPやcanonical（正規URL）は、ローカルでは確認しづらい項目です。Preview URL を使うと、SNSカード確認ツールからもアクセスできます。

---

## 手順（5ステップ）

### 1. ブランチを push して PR を作る

作業ブランチで変更をコミットし、GitHubにpushします。

```bash
git add .
git commit -m "feat: 記事追加 cursor-agent-pause-recovery"
git push origin feature/add-article
```

GitHubでPRを作成します（draft PRでも Preview は生成されます）。

### 2. Vercel の Preview URL を開く

PRを作成すると、数分以内にVercelがビルドを開始します。完了するとPRのコメント欄またはVercelダッシュボードに次のような形式のURLが表示されます。

```
https://toolarc-git-feature-add-article-xxxxx.vercel.app
```

このURLが Preview 環境です。

### 3. 記事ページ・画像・リンクをクリック確認する

Preview URL を開き、以下を重点的に確認します。

| 確認項目 | 確認方法 |
| --- | --- |
| 画像が表示されているか | 記事ページを目視 |
| OGP画像が正しいか | [OGP確認ツール（rakko.tools）](https://rakko.tools/tools/9/)にPreview URLを貼る |
| canonical タグが正しいか | ブラウザの「ページのソース」で `canonical` を検索 |
| 内部リンクが404でないか | リンクをクリックして遷移確認 |

### 4. 問題があればブランチで修正して再 push する

ミスを見つけたら、同じブランチで修正してpushします。

```bash
# 修正後
git add .
git commit -m "fix: OG画像パスを修正"
git push origin feature/add-article
```

再pushすると Vercel が自動で再ビルドし、同じ Preview URL が更新されます。PRを作り直す必要はありません。

### 5. 確認できたら merge する

すべての確認が取れたら、`main`ブランチにマージします。マージ後に本番デプロイが自動実行されます。

---

## 確認チェックリスト

マージ前に次を一通り確認します。

- [ ] 記事ページが正しく表示される
- [ ] 画像（本文・OGP）が表示されている
- [ ] canonical タグが正しいパスを指している
- [ ] 内部リンクが404になっていない
- [ ] SNSカード確認ツールでOGPカードが表示される

---

## まとめ

- Vercel Preview は PR を push するだけで自動生成される本番同等環境
- OGP・canonical・画像の確認はローカルより Preview URL が信頼できる
- 修正→再push→URL更新のサイクルで、本番に出す前にミスを潰せる

Cursor からのデプロイ〜公開フローの全体像は、以下の記事もあわせてどうぞ。

→ [Cursor無料版はどこまで使える？](/blog/cursor-free)  
→ [Vercelのドメイン設定でネームサーバーエラーが出たときの対処法](/blog/vercel-domain-invalid-nameserver)

---

*本記事は2026年5月時点のVercel・GitHub連携の動作をもとにしています。UIやビルド挙動はアップデートで変わる場合があるため、詳細は[Vercel公式ドキュメント](https://vercel.com/docs)をあわせてご確認ください。*
