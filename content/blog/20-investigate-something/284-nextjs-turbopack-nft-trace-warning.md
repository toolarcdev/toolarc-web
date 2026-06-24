---
title: "TurbopackのNFT trace warningはnext.config設定エラーとは限らない"
description: "Turbopackビルドでnext.config.tsにNFT trace warningが出たときの確認手順を解説。Import traceの読み方と、fsやpath.joinの動的読み込みが原因のケースの切り分け方を実測ベースで紹介します。"
date: 2026-06-24
tags:
  - Next.js
  - Turbopack
  - next.config.ts
  - ビルドエラー
  - トラブルシューティング
  - sitemap.ts
site: toolarc.jp
target: "Next.jsをTurbopackでbuildしている初心者〜実践者"
last_update: 2026-06-24
---

# TurbopackのNFT trace warningはnext.config設定エラーとは限らない

Next.js の build を Turbopack で実行したとき、`next.config.ts` に warning が出ると「設定ファイルを壊してしまったのでは」と不安になります。エラーではなく warning なので build 自体は通っているものの、原因がはっきりしないまま放置するのも気持ちのいいものではありません。

筆者も実際に同じ warning に遭遇しましたが、確認してみると `next.config.ts` 自体に問題はなく、別のファイルでの動的なパス読み込みが広く trace されていただけ、というケースでした。今回はその切り分け方を整理します。

> **今日の結論**
> - `next.config.ts` に warning が出ても、設定ファイルそのものが壊れているとは限りません
> - Turbopack の NFT trace warning は、`fs.readFile` や `path.join(process.cwd(), ...)` のような動的パス読み込みが広く見えている場合に出ることがあります
> - build が成功しているなら緊急度は低めですが、読み込み先を固定サブフォルダに絞ると改善しやすいです
> - 判断の起点は warning 本文ではなく `Import trace` です

## warningが出たらまず確認すること

build が成功しているのに warning だけ出ている場合、最初に見るべきは warning のタイトル行ではなく `Import trace` の部分です。タイトル行には `./next.config.ts` のように設定ファイル名が出ますが、これは「最終的に trace の起点として表示されているファイル」であり、「設定ファイルの記述が原因」という意味ではありません。

筆者が実際に遭遇した warning は次のような内容でした。

```text
Turbopack build encountered 1 warnings:
./next.config.ts
Encountered unexpected file in NFT list
A file was traced that indicates that the whole project was traced unintentionally.

Import trace:
  App Route:
    ./next.config.ts
    ./lib/blog/load-post.ts
    ./app/sitemap.ts
    ./app/sitemap--route-entry.js
```

ここで見るべきは `Import trace` の4行です。`next.config.ts` の次に `load-post.ts` → `sitemap.ts` → ルートエントリと続いており、実際に読み込みが広がっている起点は `sitemap.ts` 側であることが分かります。

## なぜnext.config.tsの名前で表示されるのか

Turbopack の NFT（Node File Trace）は、ビルド時にどのファイルが実際に必要かを追跡する仕組みです。この追跡の起点表示が `next.config.ts` になっているのは、Turbopack の内部処理上、設定読み込みのタイミングで trace 結果がまとめて報告されているためと考えられます。

筆者の環境では、`app/sitemap.ts` が `lib/blog/load-post.ts` を呼び出し、その中で `process.cwd()` を起点にした動的なパス読み込みを行っていました。この**「動的に組み立てたパスから読み込む」処理**が、Turbopack には「プロジェクト全体を読む可能性がある」と見えてしまい、warningとして報告されたという理解が近いです。

なお、これは Turbopack の内部挙動に関する執筆時点（2026-06-24）での実測に基づく理解であり、公式に明文化された仕様として断定できるものではありません。バージョンによって warning の出方や条件が変わる可能性があります。

## 実際にどこを直せばいいか

設定ファイルの中身をいじる前に、次の順番で切り分けると手戻りが少なくなります。

1. warning の `Import trace` を見て、どの route / file から読み込みが広がっているかを確認する
2. `next.config.ts` の名前だけで判断せず、trace 先のコードで `fs.readFile` や `path.join(process.cwd(), ...)`、`readFile` のような動的パス読み込みを探す
3. 記事 Markdown など読み込み元の置き場所が決まっている場合は、読み込みパスを固定サブフォルダ（例: `content/blog`）に絞ってから build を再確認する

筆者の場合、`load-post.ts` が `meta.markdownPath` というプロパティを参照していましたが、これ自体がファイル全体を検索しているわけではありませんでした。あくまで `process.cwd()` を起点にした動的パスの組み立てが、Turbopack 側からは「範囲が広い読み込み」に見えていた、という整理になります。

## チェックリスト

| チェック項目 | 確認内容 |
| --- | --- |
| warning の起点を見たか | タイトル行の `next.config.ts` だけで判断していないか |
| Import trace を確認したか | どの route / file から読み込みが広がっているか |
| 動的パス読み込みを探したか | `fs.readFile` / `path.join(process.cwd(), ...)` の有無 |
| build が成功しているか | warning のままでも build 自体が通っているか |
| パスを固定できそうか | 読み込み元を `content/blog` のような固定サブフォルダに絞れるか |

## まとめ・次に読む

Turbopack の NFT trace warning は、表示上は `next.config.ts` が起点に見えますが、実際の原因は `Import trace` の先にある動的なパス読み込みであることが多いです。build が成功しているなら焦って設定ファイルを書き換える前に、まずは trace 先のコードを確認することをおすすめします。

- 関連記事: [Next.js の Markdown 記事管理で見る、登録と読み込みの基本](/blog/nextjs-blog-markdown-management)
- 関連記事: [Next.jsのpublic/images配下に画像を置く理由](/blog/nextjs-public-images-absolute-path)
- 関連記事: sitemap.ts / load-post.ts の静的スコープ化（準備中）

---

本記事は2026-06-24時点での実測に基づく内容です。Next.js・Turbopackの仕様は今後変更される可能性があるため、重要な判断を行う際は公式ドキュメントもあわせてご確認ください。
