# インターネット・アカデミー 生成AI活用実践講座 LP

Last Updated: 2026-10-08 12:49

公開URL: https://www.toolarc.jp/lp/internet-academy-generative-ai

実装日・公開メタデータの日付: 2026-10-08（実装時にPCのGet-Dateで取得）。PR #387・#388をマージし、本番公開・確認完了。

## 公開と本番確認

- PR #387: merge `66f90b1a92ef21c267747602bbaec193700d4249`（本文・画像・OG・CTA）。
- PR #388: merge `25a416b4d6e615335f90ec12575add71c497080c`（B00・B08のロゴリンク）。main同期・対象ブランチ整理完了。
- 人間目視に続き、ツールで本番HTTP 200、B00・B08ロゴの実クリックによるホーム遷移、OG／Twitterの画像URLと画像実寸1200×630pxを確認。公開ページは `?lpDebug=1` でも番号・操作パネル非表示。
- 公開用Markdownへ、B02-01キャプション削除・B05-01短答・B06予約フォームリンク解除を反映。Vaultの制作・設計・画像・案件管理資料にも公開結果を記録。
- IA-02は未掲載。本文PNGは原寸のまま配信し、圧縮・WebP化は未実施。最新ASP条件・実遷移先照合・成果実績確認は本番表示確認の範囲外。ASPへの自己クリックなし。

## 承認済み資料との対応

本文は「インターネット・アカデミー生成AI活用実践講座_公開用記事本文.md」、表示は承認済みデザイン・ワイヤーフレームv1とブラウザ確認後の修正を反映したものです。採用画像はv02のIA-01 PC版1枚とスマホ版3枚です。

既存LPと同じ専用`/lp`ルートへ実装しました。同じ本文を`/blog`へ重複公開せず、ブログのposts.ts・シリーズ・記事一覧は変更していません。検索用の登録先はサイトマップです。

本番実装は`app/lp/internet-academy-generative-ai/`、画像は`public/images/lp/internet-academy-generative-ai/`です。Vaultやローカル生成スクリプトへの実行時依存はありません。今後の本文・メタデータ修正はpage.tsx、表示修正はpage.module.cssで行います。

- タイトル: インターネット・アカデミー生成AI活用実践講座｜料金と向く人
- description: 承認済み記事冒頭のdescriptionを採用。Unicodeで138字。
- canonical: 公開URLと同一。
- OG・Twitter画像: 承認済みOG-01「生成AIを仕事で使う」を採用。`og-work-ai.jpg`（1200×630px、JPEG、128,423bytes）。原寸PNGはVaultの案件フォルダ内`OG画像_生成AI活用実践講座_v01/OG-01_生成AIを仕事で使う.png`に保持。切り抜かず白背景で縦横比を合わせて縮小し、配信用に圧縮。本文画像IMG01〜04は従来どおり。
- プレビュー用のタイトル末尾・noindex・操作パネルは公開ページに出しません。

承認後に確定した修正:

- B00・B08のToolArcロゴは、既存のBytech LPと同じ`https://www.toolarc.jp/`へ同じタブで遷移。B08の「ページの先頭へ」はページ内リンクを維持。
- B02-01を全幅で削除し、番号は欠番として保持。
- IMG01は1064px以上、IMG02〜04は1063px以下に表示。画像内の注記と各スマホ画像直下の中央寄せキャプションを維持。
- 透明な代替SVGのURLをエンコードし、srcsetの未変換空白による解析警告を解消。
- B05-01は「A. **プログラミング知識不要**です。」。PC操作・アカウント準備の補足は開閉式。
- B06の「公式の予約フォーム」は通常テキスト。予約の導線はCTAを経由。
- 学習成果の保証、未確認の給付金適用・全額返金・個別支援条件は追加していません。

## CTAと計測

3つのCTAは案件正本・直アフィ方針に従い、`internet-academy:text-business-ai`から解決します。ASP URLをページに手入力していません。リンクにはValueCommerce用の属性とsponsoredを適用します。

- CTA1: 導入・結論の後
- CTA2: 料金と学び方の後
- CTA3: 相談の準備の後

本番でCTAが半分以上表示されたときに`lp_cta_impression`を各CTAにつき1回送信し、クリック時に`outbound_click`を送ります。両イベントの識別子は`lp_id=internet-academy-generative-ai`、`program_id=internet-academy`、`creative_id=text-business-ai`、`cta_id=CTA1〜3`です。ValueCommerceのインプレッション画像は案件から解決し、本番に1枚配置します。

開発モードでは予約リンクをボタンに置き換え、ASPへの遷移・インプレッション画像・LPのCTA計測を停止します。番号表示は開発モード専用です。

```text
/lp/internet-academy-generative-ai?lpDebug=1
/lp/internet-academy-generative-ai?lpDebug=1&blocks=off
```

右下から構成番号・要素番号の切替、構成への移動、補足の一括開閉ができます。B00〜B08、B02-02〜04、IMG01〜04、CTA1〜3などの既存番号は維持します。

## 確認内容

- OG-01設定後に再ビルド・対象ページのESLintを実施。OG／Twitterの画像URL、OGの寸法1200×630、画像のHTTP 200・JPEG形式・実寸が一致することを確認。配信用画像を目視し、文字・人物に欠けなし。
- `npm run build`: 新しいLPの静的生成を含めて成功。
- 対象ページ・SiteChrome・sitemapのESLint: エラー・警告なし。
- `npm run validate:affiliate`: 成功。
- 本番相当・開発モードで320・375・414・768・1024・1063・1064・1280・1440pxを確認。横はみ出し、B02-01削除、画像の切替・読込、中央寄せキャプション、Q&A、承認済み本文との照合を確認。
- 検索メタデータ・canonical・サイトマップ、共通ヘッダー／フッターの重複がないこと、公開時にデバッグ番号・操作パネルが出ないことを確認。
- 本番CTAの接続先・リンク属性・表示イベントを確認。検証ブラウザでは外部通信を遮断し、ASPへ自己クリックしていません。
- 開発モードの番号切替・CTA遷移停止・CTA計測停止を確認。

初回PR作成後、ユーザー承認でマージ・ブランチ整理を実行し、DailyNote／AI-logへ記録済み。本番確認結果は冒頭の「公開と本番確認」を参照。
