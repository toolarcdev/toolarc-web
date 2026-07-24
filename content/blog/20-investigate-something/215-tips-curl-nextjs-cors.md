---
title: "curlは通るのにNext.jsで失敗する理由とCORSの確認手順"
description: "curlで成功するAPIリクエストがNext.jsのブラウザ環境で失敗する原因はCORSです。初心者向けに原因の仕組みと3ステップの切り分け手順を解説します。"
date: 2026-06-03
tags:
  - Next.js
  - CORS
  - curl
  - API
  - デバッグ
  - devops
  - トラブルシューティング
  - 初心者
site: toolarc.jp
target: "Next.jsでAPIを呼び出したときにエラーが出て困っている初心者"
---

# curlは通るのにNext.jsで失敗する理由とCORSの確認手順

「curlではAPIの応答が返ってくるのに、Next.jsで同じリクエストを送るとエラーになる」

この現象に初めて遭遇すると、コードのどこが悪いのか見当がつかず、かなり時間を溶かします。筆者も最初は「なぜcurlとブラウザで結果が違うのか」が理解できませんでした。

原因はほぼ確実に **CORS（Cross-Origin Resource Sharing、クロスオリジンリソース共有）** です。仕組みを一度理解すれば、次から数分で原因を特定できます。

> **この記事の結論**
>
> - curlはブラウザではないため、CORSの制限を受けない
> - そのため「curlでは成功、Next.jsでは失敗」という現象が起きる
> - 切り分けはcurlでAPIを確認 → ブラウザのNetworkタブでCORSエラーを確認 → API側のヘッダー設定を見直す、の3ステップ

---

## なぜcurlとブラウザで結果が違うのか

CORSはブラウザが持つセキュリティの仕組みです。異なるオリジン（ドメイン・ポート・プロトコルの組み合わせ）へのリクエストを、ブラウザが自動的に制限します。

**curlはブラウザではない**ため、この制限が一切かかりません。APIサーバーに直接リクエストを投げるだけです。一方、Next.jsのフロントエンドからAPIを呼び出す場合、ブラウザがCORSのルールに基づいてリクエストをブロックすることがあります。

| 実行環境 | CORSの影響 |
|---|---|
| curl | 受けない（ブラウザではないため） |
| ブラウザ（Next.js含む） | 受ける（異なるオリジンへのリクエストは制限される） |

この非対称性が「curlは通るのにブラウザで失敗する」現象の根本原因です。

---

## 3ステップで原因を切り分ける

### ステップ1：curlでAPIが正常応答するか確認する

まずAPIサーバー自体に問題がないかを確認します。

```bash
curl -i https://api.example.com/endpoint
```

`-i` オプションをつけるとレスポンスヘッダーも表示されます。ステータスコードが `200` であれば、API本体は正常です。この時点でエラーが出る場合は、CORS以前にAPIサーバー側の問題です。

### ステップ2：ブラウザの開発者ツールでCORSエラーを確認する

Next.jsを動かしているブラウザで開発者ツールを開き、**Networkタブ**を確認します。

CORSエラーの場合、コンソールに次のようなメッセージが表示されます:

```text
Access to fetch at 'https://api.example.com/endpoint' from origin
'http://localhost:3000' has been blocked by CORS policy:
No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

`Access-Control-Allow-Origin` というヘッダーがAPI側のレスポンスに含まれていないことが原因です。

### ステップ3：API側のCORSヘッダー設定を見直す

CORSエラーが確認できたら、**APIサーバー側**でレスポンスに `Access-Control-Allow-Origin` ヘッダーを返すよう設定します。自分でAPIを管理している場合は設定変更が可能ですが、外部APIの場合は仕様を確認してください。

Next.jsの `/api` ルートを使っている場合は、レスポンスにヘッダーを追加することで対応できます（執筆時点のNext.js仕様に基づきます）。

---

## まとめ

「curlは通るのにブラウザで失敗する」現象は、CORSという**ブラウザ固有のセキュリティ制限**が原因です。curlとブラウザの違いを知っていれば、原因の切り分けは3ステップで完了します。

1. curlでAPI本体の正常動作を確認
2. ブラウザのNetworkタブでCORSエラーを確認
3. API側の `Access-Control-Allow-Origin` ヘッダー設定を見直す

関連記事:
- [curlでlocalhostのAPIを動作確認する手順](/blog/curl-localhost-api-check)

---

*本記事は2026年6月時点の情報をもとにしています。Next.jsおよびブラウザの仕様は変更されることがあります。重要な判断は公式ドキュメントをご確認ください。*
