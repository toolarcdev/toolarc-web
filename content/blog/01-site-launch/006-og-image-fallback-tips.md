---
title: "OG画像が404になる前に｜fallback設計で公開品質を守る"
description: "Next.jsでOG画像が未配置のまま公開すると、SNSカードが壊れた状態になります。共通fallback画像を1か所で定義するだけで防げる設計を、コード例つきで解説します。"
date: 2026-05-29
tags:
  - Next.js
  - OGP
  - SEO
  - メタデータ
  - Tips
site: toolarc.jp
target: "Next.js初心者・OGタグはなんとなく知っているが実装は手探りな人"
---

# OG画像が404になる前に｜fallback設計で公開品質を守る

記事を公開したあとにXやSlackでURLを貼ったとき、カード画像が表示されなかった経験はないでしょうか。原因の多くは「OG画像のパスは書いたが、ファイル自体を配置し忘れた」です。

この問題は、**fallback画像を1か所で定義する**設計にするだけでほぼ防げます。

> **この記事の結論**
> - OG画像の404は「パスは書いたがファイルがない」が主因
> - 共通fallback画像を定義し、未配置のページにも必ず何かを返す設計にする
> - 本番反映前にSNSカードの確認ツールで動作確認する

---

## なぜ404が起きるのか

Next.jsでOG画像を設定するとき、`metadata`オブジェクトに画像パスを書きます。しかしそのパスに対応するファイルが`public/`以下に存在しないと、SNSのクローラーが画像を取得しようとした際に404を返します。

SNSによっては「画像なし」として処理し、カードがテキストのみになります。見た目の印象が大きく変わるため、公開品質として無視できません。

---

## fallback設計の考え方

ページごとにOG画像を用意するのが理想ですが、記事数が増えると漏れが出ます。そこで次の設計を採用します。

1. **共通fallback画像を1枚用意する**（例: `public/images/og-default.png`）
2. ページ固有の画像があればそちらを使い、なければfallbackを返す
3. fallbackのパスはサイト全体で1か所にまとめる

---

## Next.jsでの実装例

`app/`ディレクトリ構成（App Router）での例です。

まず、サイト共通のメタデータをまとめるファイルを作ります。

```ts
// lib/siteConfig.ts
export const siteConfig = {
  name: "ToolArc",
  url: "https://toolarc.jp",
  defaultOgImage: "/images/og-default.png",
} as const;
```

次に、記事ページの`generateMetadata`でfallbackを適用します。

```ts
// app/blog/[slug]/page.tsx（抜粋）
import { siteConfig } from "@/lib/siteConfig";

export async function generateMetadata({ params }: Props) {
  const post = getPostBySlug(params.slug);

  // 記事固有のOG画像があればそちらを、なければサイト共通画像を使う
  const ogImage = post?.ogImage ?? siteConfig.defaultOgImage;

  return {
    openGraph: {
      images: [
        {
          url: `${siteConfig.url}${ogImage}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}
```

`??`（Null合体演算子）を使い、`post.ogImage`が`undefined`または`null`のときだけfallbackに切り替わります。

---

## 確認チェックリスト

本番反映前に次の3点を確認します。

| 確認項目 | 方法 |
| --- | --- |
| fallback画像ファイルが`public/`に存在するか | ローカルで`/images/og-default.png`に直アクセス |
| OGタグが正しく出力されているか | ブラウザの「ページのソース」で`og:image`を検索 |
| SNSカードが正しく表示されるか | [OGP確認ツール（rakko.tools）](https://rakko.tools/tools/9/) などで検証 |

---

## まとめ

- OG画像の404は、ファイルの配置漏れが原因であることが多い
- `siteConfig`などに共通fallbackパスを1か所まとめると、漏れを構造的に防げる
- 公開前のSNSカード確認は手間が少ない割に効果が大きい

実装のフォールバック挙動を build で確認する手順は、以下も参考になります。

- [og.png未配置時はresolveOgImageがdefault-ogにフォールバックする](/blog/resolve-og-image-fallback-to-default)

OGP設定を含むSEO運用の全体像は、関連する公開Tipsを横断して確認してください（専用 Hub は準備中）。

---

*本記事の実装例は2026年5月時点のNext.js App Routerを前提にしています。バージョンによって`generateMetadata`の挙動が異なる場合があるため、重要な実装は[Next.js公式ドキュメント](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)をあわせて確認してください。*
