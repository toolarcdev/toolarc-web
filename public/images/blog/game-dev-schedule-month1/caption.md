# game-dev-schedule-month1 画像メモ

Last Updated: 2026-08-09 11:08

slug想定: `game-dev-schedule-month1`／`imageBasePath`: `/images/blog/game-dev-schedule-month1`  
現状: **自前 PNG なし**。シリーズ既存図を絶対パスで流用（コピーしない）。

## 流用採用

### learning-cycle-diagram.png（Spoke1）

- パス: `/images/blog/game-dev-beginner-first-steps/learning-cycle-diagram.png`
- 挿入位置: 「はじめに：1か月目で目指すこと」末尾（学ぶ→作るの週次サイクル直後）
- 理由: 1か月目の軸である「毎週・学ぶことと作るものをセット／小さく完成」と、5ステップ学習サイクルが一致
- alt: 学ぶ・作る・完成させる・公開する・改善するの5ステップ学習サイクル図

### html-css-js-roles-diagram.png（Spoke1）

- パス: `/images/blog/game-dev-beginner-first-steps/html-css-js-roles-diagram.png`
- 挿入位置: 「第4週：ブラウザを操作しよう」冒頭（学ぶことリストのあと）
- 理由: 第4週の HTML/JS 連携・イベント処理の前提として、役割分担図がそのまま使える
- alt: HTMLは骨組み、CSSは見た目、JavaScriptは動き。3つが組み合わさってゲームが動く役割分担の図

## 流用見送り

| 提案（AI-log 画像提案） | 判定 | 理由 |
|-------------------------|------|------|
| Cursorインストール／拡張機能パネルのスクショ | 見送り | `030-cursor-free` 等の既存スクショは料金・制限・MCP向けで、インストール手順用ではない。実UIは撮影＋`annotate-screenshot`（偽UI生成禁止） |
| 1か月・4週間のカレンダー風俯瞰図 | 見送り | 週別俯瞰図の既存資産なし。本文の週別 Markdown 表で代替（表は生成しない） |
| おみくじプログラム完成画面（任意） | 見送り | 該当スクショなし。任意のため未配置 |

| シリーズ既存図 | 理由 |
|----------------|------|
| `game-dev-roadmap-5-overview.png` | ロードマップ比較の全体像。スケジュール記事の主戦場外 |
| `roadmap-purpose-flowchart.png` | 目的別分岐。1か月目の週次手順とは不一致 |
| `js-game-dev-language-choice-overview.png` / `javascript-six-reasons-diagram.png` | 言語選定・6理由。本記事は実践スケジュール |

## caption

```md
1か月目の「学ぶ→作る」サイクルと、第4週のHTML/CSS/JavaScript役割分担を、シリーズ既存図の流用で示します。
```

## alt text

```md
学ぶ・作る・完成させる・公開する・改善するの5ステップ学習サイクル図
HTMLは骨組み、CSSは見た目、JavaScriptは動き。3つが組み合わさってゲームが動く役割分担の図
```
