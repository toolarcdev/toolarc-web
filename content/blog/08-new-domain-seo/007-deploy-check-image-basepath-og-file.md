---
title: "デプロイ前にimageBasePathとOG画像ファイルを突合して404を防ぐ"
description: "Next.jsでog:imageが404になる原因の多くは、posts.tsのimageBasePathと実ファイルのパスずれです。デプロイ前の確認手順をチェックリスト形式で解説します。"
date: 2026-06-04
tags:
  - Next.js
  - OGP
  - og:image
  - imageBasePath
  - SEO
  - デプロイ
  - 404予防
  - tips
site: toolarc.jp
target: "Next.jsで記事公開後にog:imageが404になった経験がある、またはこれから防ぎたい初心者〜中級者"
---

# デプロイ前にimageBasePathとOG画像ファイルを突合して404を防ぐ

記事を公開した直後、GSCやSNSシェアで `og:image` が404になっているのに気づく――よくあるパターンです。原因の多くは、**メタデータに出力される画像URLと、リポジトリ上の実ファイルのパスがずれていること**です。

デプロイ前に一度突合するだけで、このパターンの大半は予防できます。

> **この記事の結論**
> - `imageBasePath`（または `ogImage` 等の設定）と `public/images/` 配下の実ファイルは別管理になりやすく、ずれが起きやすい
> - デプロイ前に両者を突合すると、公開直後の画像404を減らしやすい
> - ローカルプレビューで `og:image` のURLが200を返すかを確認するのが最速の検証手段
> - 修正後のGSC確認方法は別記事を参照

---

## なぜずれが起きるのか

Next.jsでは、記事のメタデータ（`og:image` など）を `posts.ts` や類似のファイルで一元管理することが多いです。一方、実ファイルは `public/images/blog/` 配下に置きます。

この2つは**コード上の設定値**と**ファイルシステム上のパス**として独立しているため、次のようなケースでずれが生じます。

- `imageBasePath` の末尾スラッシュの有無が一致していない
- ファイル名を変更したが設定値を更新し忘れた
- 画像ファイルをコミットし忘れてプッシュした
- ローカルには存在するが `.gitignore` 対象になっていた

どれも「ローカルでは動いていた」状態のまま本番に出てしまうパターンです。

---

## デプロイ前の確認手順

### 1. posts.ts の imageBasePath を確認する

記事登録ファイル（`posts.ts` または同等のファイル）を開き、対象記事の `imageBasePath` または `ogImage` に設定されているパスを確認します。

```typescript
// posts.ts の例
{
  slug: "my-article",
  imageBasePath: "/images/blog/my-article",
  ogImage: "og.png",
}
```

この場合、最終的に出力される `og:image` のURLは `/images/blog/my-article/og.png` になります。設定の結合ロジックはプロジェクトによって異なるため、実際の出力URLをHTMLで確認します（手順3参照）。

### 2. public/ 配下に実ファイルがあるかを確認する

手順1で把握したパスに対応するファイルが、`public/` 配下に存在するかを確認します。

```bash
# ファイルの存在確認例
ls public/images/blog/my-article/
```

ファイルがなければ、この時点で追加・コミットします。**コミット漏れが最も多い原因**です。

### 3. ローカルプレビューで og:image のURLを開いて200か確認する

`next dev` でローカルプレビューを起動し、ブラウザで記事ページを開きます。ページのHTMLソース（`Ctrl+U` / `Cmd+U`）から `og:image` の値を取得し、そのURLをブラウザのアドレスバーに直接入力して画像が表示されるか確認します。

```bash
# curlで確認する場合
curl -o /dev/null -s -w "%{http_code}\n" http://localhost:3000/images/blog/my-article/og.png
# → 200 が返れば問題なし
```

ローカルで404が出る場合は、パスのずれかファイル未配置が原因です。デプロイ前に解消します。

### 4. 本番デプロイ後に同URLを再確認する

デプロイ完了後、手順3と同じURLを本番ドメインで確認します。

```bash
curl -o /dev/null -s -w "%{http_code}\n" https://example.com/images/blog/my-article/og.png
```

ローカルで200でも本番で404になる場合は、デプロイ時のファイル転送漏れ（Vercelなら `public/` の同期漏れ）を疑います。

---

## デプロイ前チェックリスト

| 確認項目 | 方法 |
| --- | --- |
| `imageBasePath` / `ogImage` の設定値を確認した | posts.ts を目視 |
| 対応する実ファイルが `public/` 配下にある | `ls` またはファイルツリー確認 |
| 実ファイルがコミット済みである | `git status` で確認 |
| ローカルで `og:image` URLが200を返す | ブラウザ or curl |
| 本番デプロイ後に同URLが200を返す | ブラウザ or curl |

---

## 修正後のGSC確認は別記事で

デプロイ後にGSCの404が解消されるまでの流れと確認方法は、関連記事で解説しています。

- 関連: [og.png未配置時はresolveOgImageがdefault-ogにフォールバックする](/blog/resolve-og-image-fallback-to-default)
- 関連: [npm run build後にHTTP200・sitemap.xml・OG fallbackを確認する](/blog/npm-run-build-http200-sitemap-og-fallback-check)
- 関連: [OG画像の404を修正したあとGSCで確認すべきこと](/blog/gsc-og-image-404-fixed-verify)
- 関連: [GSCで画像URLだけ404になる理由](/blog/gsc-image-url-404-tips)
- 関連: [Next.jsのOG画像fallback設定](/blog/nextjs-og-image-fallback-tips)
- 関連: [og:imageとJSON-LD imageをページソースで確認する方法](/blog/og-image-json-ld-pagesource-check)
- 関連: [XでOG画像が出ないときは本番404とキャッシュを疑う](/blog/x-og-image-404-cache)
- 関連: [ChatGPTでOG画像を狙い通りに生成するプロンプト設計【1分Tips】](/blog/chatgpt-og-image-prompt-design)

---

> **免責・執筆時点の注記**  
> 本記事は2026年6月4日時点の情報をもとに執筆しています。Next.jsのAPI・設定ファイルの慣習はバージョンによって異なります。実装詳細はプロジェクトの既存コードに合わせて確認してください。
