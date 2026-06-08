---
title: "og.png未配置時はresolveOgImageがdefault-ogにフォールバックする"
description: "記事専用のog.pngが存在しない場合、resolveOgImageがdefault-og.pngへ自動フォールバックする挙動を2026-06-04のbuild検証で確認しました。OG画像が表示されない・差し替えたい場合の確認手順を解説します。"
date: 2026-06-08
tags:
  - Next.js
  - OG画像
  - SEO
  - フォールバック
  - new-domain-seo
  - Tips
  - toolarc運用
site: toolarc.jp
target: "Next.jsブログでOG画像が正しく表示されているか確認したい開発者・ブログ運営者"
---

# og.png未配置時はresolveOgImageがdefault-ogにフォールバックする

> **この記事の結論**
>
> - 記事専用の `og.png` が無い場合、`resolveOgImage` が `default-og.png` へ自動的にフォールバックする
> - OG 画像が 404 でも記事の表示自体は継続する（2026-06-04 build 検証で確認）
> - 記事ごとに OG を差し替えたい場合は、該当パスに `og.png` を配置して再デプロイする

---

## どういう挙動か

ToolArc の Next.js 構成では、`resolveOgImage` という処理が OG 画像のパスを解決します。記事ごとの `og.png` が `public/` 配下に存在しない場合、この関数が `default-og.png` へフォールバックする挙動が確認されています。

2026-06-04 の build 検証では、`public/images/blog/20-investigate-something/og.png` が 404 の状態でも、SNS シェア時の OG 画像表示は `default-og.png` で継続していました。

**つまり、og.png を置かなくてもサイトは壊れない。ただし全記事が同じデフォルト画像になる。**

> **注意**: `resolveOgImage` の実装詳細はサイトの構成によって異なります。本記事は 2026-06-04 時点の build 検証に基づいています。実際の挙動はコードで確認してください。

---

## 確認手順：4ステップ

1. **`posts.ts` を確認する**：対象記事の `imageBasePath` と `ogImage` フィールドを確認する
2. **`public/` 配下のファイルを確認する**：`imageBasePath` で指定されたパスに `og.png` が実在するか確認する
3. **フォールバックを確認する**：ファイルが無い場合、ローカルで `npm run build` → `npm start` を実行し、`og:image` に `default-og.png` が出るか確認する
4. **専用 OG が必要なら追加する**：`og.png` を該当パスに配置して再デプロイする

---

## 専用OGを配置する場合のパス例

```text
public/
└── images/
    └── blog/
        └── 20-investigate-something/
            └── og.png   ← ここに配置
```

`posts.ts` の `imageBasePath` が `"20-investigate-something"` であれば、上記パスが参照されます。配置後は `npm run build` でパスの解決を確認してください。

---

## まとめ

| 状況 | OG 画像の挙動 |
|------|---------------|
| `og.png` あり | 記事専用の OG 画像を表示 |
| `og.png` なし | `default-og.png` へフォールバック |
| `default-og.png` もなし | 要確認（構成次第） |

og.png を置いていない記事が多い段階では、フォールバック運用で問題ありません。SNS シェアの見栄えを記事ごとに最適化したいタイミングで、順次 `og.png` を追加していく方針が現実的です。

---

**関連記事**

- [Next.jsのOG画像fallback設定](/blog/nextjs-og-image-fallback-tips)
- [デプロイ前にimageBasePathとOG画像ファイルを突合して404を防ぐ](/blog/deploy-check-image-basepath-og-file)
- [npm run build後にHTTP200・sitemap.xml・OG fallbackを確認する](/blog/npm-run-build-http200-sitemap-og-fallback-check)
- [GSCの画像404とdefault-og.png fallbackは別問題として切り分ける](/blog/gsc-image-404-vs-default-og-fallback)

---

*本記事の内容は 2026-06-04 の build 検証に基づいています。Next.js のバージョンやサイトの実装によって挙動が異なる場合があります。重要な判断はコードおよび公式ドキュメントで確認してください。*
