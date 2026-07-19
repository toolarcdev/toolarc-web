---
name: daily-maintenance-lite
description: >-
  Runs ToolArc lightweight daily maintenance (slot ⑥): update DailyNote,
  candidate master, Dashboard focus, inbox publish sync, and CTR rewrite
  transfer with minimal file reads. Use when the user asks for 日次メンテ,
  ⑥, daily maintenance, or daily-maintenance-prompt execution. Not for Wednesday
  weekly maintenance.
---

# daily-maintenance-lite（⑥ 日次・軽量）

## 正本と同期方針

| 層 | パス | 役割 |
|----|------|------|
| **コピペ正本（人）** | Vault `00-dashboard/daily-maintenance-prompt.md` | ⑥チャットに貼る送信ブロック。文言変更はここが先 |
| **Skill（Agent）** | 本ファイル | 手順の再現。Vault 正本と矛盾したら **Vault を優先**し、本 Skill を追従更新する |
| 詳細（迷ったとき） | Vault `maintenance_1min-Tips` の該当節のみ | 全文は読まない |
| リポ補足 | `docs/ai-context/chat-operations.md` | スロット境界 |

**水曜**: 本 Skill を使わない。`weekly-maintenance-prompt` を使う。

## token節約（必須）

- 今日の日次メンテ専用。完了後にチャットを閉じる前提
- 対象ファイル以外は読まない。Inbox 全体・reader-theme-backlog・読者軸定義・debt/HUB広範囲は毎回読まない
- 広範囲探索が必要なら実行前に確認

## 手順

開始時: `Get-Date -Format "yyyy-MM-dd HH:mm"` → 編集したファイルの `Last Updated` に使う（手入力禁止）

1. DailyNote・候補マスター・Dashboard・必要な inbox（最大20件）だけ確認
2. DailyNote / AI-log / ⑤ handoff から新規候補を最大10件まで追加
3. title 確定後、分類コマンド実行 → frontmatter `audience_axis`
4. inbox必須処理（下記）
5. 公開フォーカス3件を選び、DailyNote「明日やること」・Dashboard・該当 inbox `publish_date`（翌日）を同期（勝ち2+柔軟1）
6. `ctr-rewrite-queue` の「表示用」を Dashboard「CTRリライト候補」へ転記（GSC再取得しない）
7. debt/HUB広範囲は水曜へ。当日公開や①引き継ぎがあるときだけ軽く補完
8. 実施サマリ・変更ファイル・主要変更・実行後チェック・明日の推奨を短く報告
9. **AI-log 転記（プロンプトに AI-log パスがある日だけ）**: 手順8の完了報告を当日 AI-log 末尾へ転記する。パス指定が無い日は転記しない（DailyNote への報告のみ）

## 必須パス

- DailyNote: `D:\ObsidianVault\Vault\01_Daily\{YYMM}\{YYMMDD}\{YYYY-MM-DD}.md`
- 候補マスター: `D:\ObsidianVault\Vault\00-dashboard\toolarc_1min_tips_article_candidates.md`
- Dashboard: `D:\ObsidianVault\Vault\00-dashboard\dashboard.md`
- Inbox: `D:\ObsidianVault\Vault\04-Tips\inbox`（必要ファイルだけ）
- 分類: `node D:\ObsidianVault\Vault\00-dashboard\_classify_title.mjs "記事タイトル"`
- CTRキュー: `D:\ObsidianVault\Vault\00-dashboard\ctr-rewrite-queue.md`

## inbox必須処理

必ず確認する対象:

1. `publish_date` が今日以前
2. `status` が `inbox` / `draft` / `published`
3. DailyNote「今日／明日やること」に載っている
4. 候補マスター / Dashboard のフォーカスに載っている

公開済み inbox は `status` / `published_at` / `slug` / `promotion_status` を更新し `04-Tips/published` へ移動。マスター・Dashboard・DailyNote も反映。対象外 inbox は読まない。

## ⑤ handoff

- `slot-handoff-template` 形式があれば reader タイトル案は⑥で生成せず優先反映
- handoff が無くても DailyNote / AI-log の問題・解決・実測は直接タイトル化してよい

## 完了報告（短く）

- 実施サマリ（新規 inbox 件数・フォーカス3件・移動件数）
- 変更ファイル一覧
- 明日の推奨アクション 1〜3

## AI-log 転記（条件付き）

- **プロンプトに AI-log パスが記載された日だけ**、完了報告を当日 AI-log の末尾へ転記する（`# 日次メンテ実行結果（⑥・日時）` 節）
- パス記載が無い日は転記しない（token節約。DailyNote への反映で足りる）
- 転記時も AI-log の `Last Updated` を Get-Date 値で更新する
