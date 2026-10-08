# ProgrammingHacks LP（公開承認済み・人間レビュー待ち）

Last Updated: 2026-10-08 20:59

ルート: `/lp/programming-hacks`。R1・R2は承認済み。ユーザーはOG-PH-02の採用とcommit／PRまでの作業を承認。R3は追加画像を検討できる状態で継続。ユーザーがU02詳細・U11を未確定のまま公開する方針を承認。公開保留を解除し、人間レビュー用PRへ反映する。マージ・デプロイ・本番確認は別工程。

本文正本は案件資料の「ProgrammingHacksアフィリエイトLP_公開用本文_R2_v2」。制作状態は「ProgrammingHacksアフィリエイトLP制作記録」、確認結果は「ProgrammingHacksアフィリエイトLP_R4実装・ブラウザ記録」。実行時にVaultや制作補助スクリプトへ依存しない。

## 実装と表示

- `page.tsx`: 承認済み本文、メタデータ、安定した構成・要素番号。
- `page.module.css`: やわらかい学習ノート型。紙に近い背景・深緑のCTA・局所CSS。
- `config.ts`: サーバーのリンク解決とクライアントの計測で使う素材名を一つに統一。
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

U01は現行ASP管理画面で提携中と素材別設定先を確認済み。自由テキスト31555は旧Skill Hacksを指すため採用しない。単品を指す登録済みbanner-300x250（31548）を選択する。ログイン後FAQの「取得したアフィリエイトタグを書き換えても違反にはなりませんか。」（faq953）でURL単独利用が違反ではないことを確認した。クリックURLを変更せず、同じ31548のimpressionを維持する。広告画像は加工しない。非アフィリエイトの旧単品URLを直接開き、旧ドメインのままProgrammingHacks単品ページが表示されることも確認済み。広告クリック・成果発生テストは行わない。

U02の一般的な成果承認条件は現行ASP画面で確認済み。コース別の成果対象とドメイン移行・総合経由の計測条件は未確認。U11の現行代替環境・PC要件・追加費用・環境構築支援も、運営の公開資料では確定できなかった。問い合わせ文面を案件資料の「ProgrammingHacks_公開前確認_U01-U02-U11_現行照合と問い合わせ」に保存した（ユーザー指示により送信しない）。自己クリックで補完しない。

ユーザーの公開承認に基づき`PUBLICATION_APPROVED = true`へ変更。U02詳細・U11の確認完了を意味しない。productionでは3CTA・対応AffiliateImpression・既存の表示／クリックイベントを有効化する。開発プレビューでは外部移動と計測を停止する。

`index, follow`へ変更し、サイトマップに専用LPを登録する。ブログ一覧・posts.ts・案件正本は変更しない。公開日は本番デプロイ後に記録する。PR反映を本番公開完了とは扱わない。記事に「問い合わせ中」等は追加せず、未確認の購入条件を確定事実へ置き換えない。

productionでは`programming-hacks:banner-300x250`からリンクを解決。既存pushEventの`lp_cta_impression`（50%以上の表示・CTAごと1回）と`outbound_click`、識別子はlp_id／program_id=`programming-hacks`、creative_id=`banner-300x250`、cta_id=CTA1・CTA4・CTA3。ASP URLの任意書換えなし。

## 過去の検証（公開保留時点）

descriptionはUnicode実測132字。ESLintと`validate:affiliate`成功。ローカル表示では320／375／414／768／1280／1440／1920pxの横はみ出しなし、本文一致、用語説明、ホームリンク、CTA配置、開発デバッグを確認済み。外部通信は遮断し、自己クリック・LP広告計測なし。

本番用ビルド成功（346ページ、専用ルートを静的生成）。初回はsandboxの出力先権限制約で停止し、同じ検証を権限制約外で再実行して成功。

本番相当localhost:4182で上記7幅の表示、28要素・CTA1／CTA4／CTA3の順、用語説明のキーボード開閉、OG画像HTTP 200・1200×630、canonicalを確認。`lpDebug=1`でも番号・操作パネルは無効。3CTAは無効ボタン、ASPリンク・ASP通信・LPイベントなし。ページエラー0。noindex／nofollowとサイトマップ未登録も確認済み。

人間レビュー、マージ、本番の画面・画像・属性確認が残る。未確認事項の解消は今回の公開条件から外すが、確認済みとは記録しない。R5の既存Draft PR #390へ確認結果を反映済み。R3は継続中。

追加検証：選択素材のclickとimpressionの登録識別子一致（pl_id=31548）をネットワーク通信なしで確認。素材変更後の本番用ビルド成功。

素材変更後のlocalhost:4183をアプリ内ブラウザで再確認：28要素、3CTA無効、ASPリンク0・ASP画像0、開発デバッグ無効、canonical・noindex／nofollow維持。

## 現在の公開判断

U02詳細・U11は未確定のまま公開することをユーザーが承認。問い合わせ文面は保存のみ・未送信。記事本文は承認済みR2_v2のままで、問い合わせ状況の表記なし。CTA・検索登録を有効化したPRを人間レビュー後にマージする。R3追加画像検討は継続。

公開承認反映後の検証：build（346ページ）、対象ESLint、validate:affiliate成功。生成済みproduction HTMLから3CTAの有効なanchor・登録31548のclickとimpression一致・nofollow/sponsored・index/follow・サイトマップ1件・28要素・デバッグ無効を確認。記事本文は直前commitと同一、問い合わせ状況文言なし、description132字。ASP通信を発生させないため、本番HTMLの静的読取で確認。レイアウトの変更なし。
