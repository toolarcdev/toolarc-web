# ProgrammingHacks LP（公開保留・PRレビュー用）

Last Updated: 2026-10-08 20:26

ルート: `/lp/programming-hacks`。R1・R2は承認済み。ユーザーはOG-PH-02の採用とcommit／PRまでの作業を承認。R3は追加画像を検討できる状態で継続。公開前の確認事項が残るため、公開保留のDraft PRとして提出する。マージ・デプロイ・本番確認は別工程。

本文正本は案件資料の「ProgrammingHacksアフィリエイトLP_公開用本文_R2_v2」。制作状態は「ProgrammingHacksアフィリエイトLP制作記録」、確認結果は「ProgrammingHacksアフィリエイトLP_R4実装・ブラウザ記録」。実行時にVaultや制作補助スクリプトへ依存しない。

## 実装と表示

- `page.tsx`: 承認済み本文、メタデータ、安定した構成・要素番号。
- `page.module.css`: やわらかい学習ノート型。紙に近い背景・深緑のCTA・局所CSS。
- `LpActions.tsx`: 既存のリンク解決とイベント基盤を利用。文言は「ProgrammingHacksの学習内容とプランを見る」。文言とLucide ChevronRightを一つの中央揃えのグループにし、左右余白を均等化。
- `LpDebugMode.tsx`: developmentかつ`lpDebug=1`のときだけ確認パネルと番号。productionではクエリ指定があっても無効。
- `components/layout/SiteChrome.tsx`: 専用LPの判定を1件追加。共通ヘッダー・広告帯・フッターの二重表示を避ける。

構成順はS01→S02→S06→S03→S04→S05。現在の要素は28件。廃止S04-E04・S05-E04は欠番を維持し、再利用しない。CTAは導入CTA1=S01-E04、動画・LINE質問の末尾CTA4=S03-E04、記事末尾CTA3=S05-E05の3件。料金直後のCTA2は廃止。

ヘッダーとフッターのToolArcはホームへリンク。Ruby／Railsの用語説明は初期閉状態のdetails。スマホの表は列名つきの縦積み表示。

## 画像

- 本文: `public/images/lp/programming-hacks/home-learning-v1.webp`、1536×1024、249,814bytes。S01-E05の画像と対応注記は同じfigure。切替なし。R3の追加画像検討は継続。
- OG: `public/images/lp/programming-hacks/og-home-learning.jpg`、1200×630、182,058bytes。ユーザー承認済みOG-PH-02。Open GraphとTwitterのsummary_large_imageへ設定済み。
- `lucide-LICENSE.txt`: CTAのSVGアイコンの上流ライセンス。

生成人物は実在の受講者・講師ではない。本文注記は画像と一緒に表示。OGは生成した学習イラストであり、教材画面や学習成果を示すものではない。

## 公開前の確認事項

案件資料のU01・U02（ASP素材の単品設定先・現行提携・成果対象）とU11（今から始める受講者の代替学習環境・PC要件・追加費用）が未確認。保存済み識別子の一致や公式単品ページの存在だけで、素材別の着地や成果対象を確定しない。自己クリック・広告計測画像の読込みで補完しない。

このため`CTA_DESTINATION_VERIFIED = false`を維持。productionのCTAは無効、広告リンクとAffiliateImpressionは出力しない。開発時のCTAはローカル案内のみ。LPのクリック／表示イベントも停止する。未確認リンクを公開ボタンとして有効化しない。

`noindex, nofollow`とサイトマップ未登録を維持。ブログ一覧・posts.ts・案件正本は変更しない。公開条件を確認した後、根拠を記録し、CTA接続・検索登録を変更して再検証する。Draft PRの作成を公開完了とは扱わない。

有効化後は`programming-hacks:text`からリンクを解決。既存pushEventの`lp_cta_impression`（50%以上の表示・CTAごと1回）と`outbound_click`、識別子はlp_id／program_id=`programming-hacks`、creative_id=`text`、cta_id=CTA1・CTA4・CTA3。ASP URLの任意書換えなし。

## 検証

descriptionはUnicode実測132字。ESLintと`validate:affiliate`成功。ローカル表示では320／375／414／768／1280／1440／1920pxの横はみ出しなし、本文一致、用語説明、ホームリンク、CTA配置、開発デバッグを確認済み。外部通信は遮断し、自己クリック・LP広告計測なし。

本番用ビルド成功（346ページ、専用ルートを静的生成）。初回はsandboxの出力先権限制約で停止し、同じ検証を権限制約外で再実行して成功。

本番相当localhost:4182で上記7幅の表示、28要素・CTA1／CTA4／CTA3の順、用語説明のキーボード開閉、OG画像HTTP 200・1200×630、canonicalを確認。`lpDebug=1`でも番号・操作パネルは無効。3CTAは無効ボタン、ASPリンク・ASP通信・LPイベントなし。ページエラー0。noindex／nofollowとサイトマップ未登録も確認済み。

人間レビュー、公開前確認の解消、マージ、本番の画面・画像・属性確認が残る。制作記録の「現在」を更新し、R5 Draft PRへ進む。R3は継続中。
