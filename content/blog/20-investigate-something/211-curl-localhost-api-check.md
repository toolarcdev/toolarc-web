---
title: "curlでlocalhost APIを動作確認する手順【Next.js対応】"
description: "ブラウザを使わずターミナルからAPIの動作を確認したい方向け。curl の基本的なGET・POSTコマンドと、Next.js API Route での確認手順を実例つきで解説します。"
date: 2026-06-02
tags:
  - curl
  - localhost
  - API
  - Next.js
  - API Route
  - デバッグ
  - 開発環境
  - tips
site: toolarc.jp
target: "Next.js で API Route を作り始めた初心者・個人開発者"
---

# curlでlocalhost APIを動作確認する手順【Next.js対応】

「API を書いたけど、本当に動いているか確認したい」そんなときにブラウザを開かずターミナル上でさっと確認できるのが `curl`（カール）です。

Next.js の API Route 開発中にも、リクエストの内容を細かく指定してテストできるため、デバッグの入口として重宝します。

> **この記事の結論**
>
> - `curl` はターミナルから HTTP リクエストを送るコマンドラインツール
> - Next.js API Route の疎通確認は `curl http://localhost:3000/api/...` で行える
> - POST・JSON 送信も curl で再現でき、ブラウザでは難しい確認が手軽にできる

---

## curl とは

`curl` は URL に対して HTTP リクエストを送り、レスポンスをターミナルに表示するツールです。macOS・Linux には標準で入っており、Windows（PowerShell 7 以降）でも利用できます（執筆時点）。

ブラウザと異なり、リクエストヘッダー・メソッド・ボディを自由に指定できるため、API の動作確認やデバッグに向いています。

---

## 手順

### 1. 開発サーバーを起動する

```bash
npm run dev
```

`http://localhost:3000` でサーバーが立ち上がっていることを確認します。

---

### 2. GET リクエストで疎通確認する

```bash
curl http://localhost:3000/api/test
```

API Route からレスポンスが返ってくれば、エンドポイントが正常に動作しています。何も返ってこない・エラーになる場合は、ファイルパスや `export default` の書き方を確認してください。

**レスポンス例（JSON を返す場合）:**

```json
{"message":"ok"}
```

---

### 3. POST リクエストで JSON を送信する

```bash
curl -X POST http://localhost:3000/api/test \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"toolarc\"}"
```

各オプションの意味は次のとおりです。

| オプション | 意味                                   |
| ---------- | -------------------------------------- |
| `-X POST`  | HTTP メソッドを POST に指定            |
| `-H`       | リクエストヘッダーを追加               |
| `-d`       | 送信するデータ（ボディ）を指定         |

`\"` はダブルクォートのエスケープです。シングルクォートが使える環境（macOS / Linux）では次のように書けて読みやすくなります。

```bash
curl -X POST http://localhost:3000/api/test \
  -H "Content-Type: application/json" \
  -d '{"name":"toolarc"}'
```

---

## レスポンスが見づらいときのヒント

JSON が1行で返ってくると読みにくい場合は、`| python3 -m json.tool` を末尾に追加すると整形して表示できます。

```bash
curl http://localhost:3000/api/test | python3 -m json.tool
```

---

## まとめ

| 確認したいこと       | コマンド例                                                                 |
| -------------------- | -------------------------------------------------------------------------- |
| GET の疎通           | `curl http://localhost:3000/api/test`                                      |
| POST + JSON 送信     | `curl -X POST ... -H "Content-Type: application/json" -d '{"key":"val"}'` |
| レスポンスの整形表示 | 末尾に `| python3 -m json.tool` を追加                                     |

curl を使いこなすと、フロントエンドを作る前に API 単体で動作を確認する習慣がつき、原因の切り分けが速くなります。まずは GET の疎通確認から試してみてください。

---

### 次に読む

- Next.js 運用ガイド（準備中）
- [curlは通るのにNext.jsで失敗する理由とCORSの確認手順](/blog/curl-nextjs-cors-tips)

---

> **免責**: 本記事は 2026-06-02 時点の情報をもとに執筆しています。curl のオプション仕様・Next.js API Route の挙動は変更される可能性があります。重要な判断は各公式ドキュメントでご確認ください。
