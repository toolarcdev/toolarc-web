# game-dev-roadmap（Hub）画像メモ

Last Updated: 2026-08-08 15:03

Hub slug想定: `game-dev-roadmap`／`imageBasePath`: `/images/blog/game-dev-roadmap`  
現状: **自前 PNG なし**。シリーズ既存図を絶対パスで流用（コピーしない）。

## 流用採用

### learning-cycle-diagram.png（Spoke1）

- パス: `/images/blog/game-dev-beginner-first-steps/learning-cycle-diagram.png`
- 挿入位置: 「このシリーズで目指すこと」直後
- 理由: Hubのゴール（作って公開する）と、学ぶ→作る→完成→公開→改善のサイクルが一致
- alt: 学ぶ・作る・完成させる・公開する・改善するの5ステップ学習サイクル図

### game-dev-roadmap-5-overview.png（Spoke3）

- パス: `/images/blog/game-dev-roadmap-comparison/game-dev-roadmap-5-overview.png`
- 挿入位置: 「今日の結論」直後（暫定アイキャッチ／OG候補）
- 理由: シリーズ入口で「目的別にルートを選ぶ」全体像を先に見せられる。Spoke3本文の要約図
- alt: 初心者向けゲーム制作の学習ロードマップ5選。目的別に比較し、早く公開したいならJavaScriptでWebゲームから始める概要図

### roadmap-purpose-flowchart.png（Spoke3）

- パス: `/images/blog/game-dev-roadmap-comparison/roadmap-purpose-flowchart.png`
- 挿入位置: 「公開済みの記事」節の直前（ロードマップ比較への橋渡し）
- 理由: 公開済み3本のあと実践に進む前に、目的別の選び方を一目で再確認できる
- alt: どのロードマップを選ぶかの簡易フローチャート。早く公開したい・Web制作も学びたい・エンジンを使いたい・基礎を固めたいの目的別分岐

## 流用見送り

| 画像 | 理由 |
|------|------|
| `html-css-js-roles-diagram.png` | Hubに役割分担の節がなく、Spoke1専用の説明図 |
| `js-game-dev-language-choice-overview.png` | 言語比較はSpoke2の主戦場。Hubではリンク案内で足りる |
| `javascript-six-reasons-diagram.png` | Spoke2の6理由一覧。Hubの案内図と重複感が強い |

## 画像提案との突合（生成要否）

| 提案 | 流用で足りるか | 判定 |
|------|----------------|------|
| シリーズ全体フロー（動機→選び→3か月実践→公開後）＋現在地の色分け | 学習サイクル図・5選概要・目的別フローは**部分的に近い**が、Hub固有の段階ラベルと「公開済み範囲の色分け」は無い | **生成しない（見送り・2026-08-08）**。流用3点で代替。詳細は AI-log「Hub（game-dev-roadmap）画像：流用と生成要否」 |
| 手書き2週間→3週目からAIの2分割ビフォーアフター | 既存図に該当なし（six-reasonsのAI言及も切り替え図ではない） | **生成しない（見送り・2026-08-08）**。本文説明のみ。同上 AI-log |

## caption

```md
シリーズ入口として、学習サイクルとロードマップ選びの全体像を既存図の流用で示します。
```

## alt text

```md
初心者向けゲーム制作の学習ロードマップ5選。目的別に比較し、早く公開したいならJavaScriptでWebゲームから始める概要図
学ぶ・作る・完成させる・公開する・改善するの5ステップ学習サイクル図
どのロードマップを選ぶかの簡易フローチャート。早く公開したい・Web制作も学びたい・エンジンを使いたい・基礎を固めたいの目的別分岐
```
