# ブログ画像 正サンプル registry

用途: `reference_image_paths` と流用判断の索引。完成見本のみ（WIP は Vault staging）。

最終更新: シェルで取得した日時を追記時に更新すること。

| path | 用途 | 種別 | メモ |
|------|------|------|------|
| `public/images/blog/040-chatgpt_account_migration/pattern-comparison-both.png` | アカウント移行 比較 | decision | 左右パネル＋結果の正本候補 |
| `public/images/blog/040-chatgpt_account_migration/pattern1-*.png` / `pattern2-*.png` | 同シリーズ 単パターン | decision | 片側ケースの密度参照 |
| `public/images/blog/040-chatgpt_account_migration/ss-*.png` | 実機スクショ | annotate 原図 | 生成で代替しない |
| Vault `blog-image-staging/jobs/2026-07-21__series-og__all8/` | Series OG 候補 | og raw/baked | 採用前。adopt 後に public へ |

各 `imageBasePath` の詳細・alt は同フォルダ `caption.md` を正とする。本表は横断索引。
