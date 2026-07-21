# 検索意図 → 画像種別マップ

正本の調査: Vault `06_toolarc-business/202607/画像生成SKILL改善/優良ブログ_画像・図解傾向と画像生成SKILL分析_2026-07.md` §3.2  
運用制約: `.cursor/rules/blog-image-tone.mdc`  
入口ハブ: `.cursor/skills/blog-image-router/SKILL.md`

Round1（C1）で rule/Skill 参照用に本ファイルを正とする。

## 振り分け表

| 検索意図 | 推奨ビジュアル | 手段 | 生成？ | Skill／工程 |
|---|---|---|---|---|
| How-to / エラー解決 | 注釈付きスクショ | 撮影＋注釈 | **否**（偽UI禁止） | `annotate-screenshot` |
| 比較 / どっち | 2パネル＋結果 | 流用優先 → decision＋後編集 | 可 | `generate-decision-diagram` |
| チェックリスト入口 | 分岐図 or 既存比較図 | **流用優先** | 流用不可時のみ可 | 流用ゲート → `generate-decision-diagram` |
| 概念理解 | ステップ／アイコン物語 | mood / section | 可 | `generate-blog-image` |
| アイキャッチ / OG / 共有面 | 数字・対比が読める構図 | eyecatch / og（日本語帯は後工程） | 可 | `generate-blog-image` → `bake-og-text` |
| 数値・比較データ表 | 表 / Canvas / コード | 生成しない | **否** | 本文表など |
| ランキング／スクール系 | 写真・表・バナー | 素材／表 | 低 | ToolArc 主戦場外（参考のみ） |
| 疑念系 | before/after・注意点の図 | 誇張禁止・証拠境界 | 条件付き可 | decision / mood／スクショ |
| 迷ったとき | — | ハブで判定 | — | `blog-image-router` |

## 判定の短い手順

1. 記事の主検索意図を1つ決める（複数なら H2 ごとに振り分ける）
2. 上表で **手段** を決める（流用 → 撮影 → 生成の順を崩さない）
3. 生成する場合だけ種別（`eyecatch` / `og` / `diagram-mood` / `diagram-decision` / `section`）を確定する
4. Claude 初稿の「画像提案」がある場合はジョブ票化し、本表の手段列に落とす（自動 GenerateImage はしない）

## 既定トーンについて

白＋`#60a5fa` フラットは **現状の既定**。振り分けや輸入候補の拒否理由にしない。詳細は分析書 §0「現行トーンの扱い」。

## WIP 置き場

採用前: Vault `06_toolarc-business/blog-image-staging/`  
採用後: `public/images/blog/<imageBasePath>/`
