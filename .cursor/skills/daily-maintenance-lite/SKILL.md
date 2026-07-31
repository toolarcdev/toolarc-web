---
name: daily-maintenance-lite
description: >-
  Runs ToolArc lightweight daily maintenance (slot ⑥): update DailyNote,
  candidate master, week-queue same-day digest, inbox publish sync, and CTR
  rewrite transfer with minimal file reads. Use when the user asks for 日次メンテ,
  ⑥, daily maintenance, or daily-maintenance-prompt execution. Not for
  Wednesday weekly work — use weekly-intake (Skill A) then weekly-maintenance
  (Skill B) instead of this skill.
---

# daily-maintenance-lite（⑥ 日次・軽量）

## 正本と同期方針

| 層 | パス | 役割 |
|----|------|------|
| **コピペ正本（人）** | Vault `00-dashboard/daily-maintenance-prompt.md` | ⑥チャットに貼る送信ブロック。文言変更はここが先 |
| **Skill（Agent）** | 本ファイル | 手順の再現。Vault 正本と矛盾したら **Vault を優先**し、本 Skill を追従更新する |
| 詳細（迷ったとき） | Vault `maintenance_1min-Tips` の該当節のみ | 全文は読まない |
| リポ補足 | `docs/ai-context/chat-operations.md` | スロット境界 |
| フェーズ／キュー | `docs/plan/phase-now.md` / `docs/seo-goals.md` | 評価フェーズ・公開ノルマなし |
| 方針正本 | Vault `06_toolarc-business/評価フェーズ移行検討/toolarc.jp_評価フェーズ移行_現状と方針検討_2026-07-31.md` §5.2・§5.4 | week-queue・例外ゲート |

**評価フェーズ（固定）**: 公開フォーカス3本選定は**廃止**。日次は active な `week-queue-*.md` の**当日 `day` 行**を消化するだけ。公開下限・上限なし。薄味inboxで枠埋め禁止（§5.2 根拠バー）。`type=new` の途中追加は §5.2 ゲート必須（理由1行＋`source`）。

**水曜**: 本 Skill を使わない。  
短プロンプト: `週次メンテナンス実行`（A）→ ⑤ → `週次メンテナンス続き`（B）。  
詳細は `.cursor/skills/weekly-intake/` / `weekly-maintenance/`。フォールバックのみ Vault `weekly-maintenance-prompt.md`。

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
5. **week-queue 当日消化（旧E置換）**: 実行中の active `week-queue-YYYY-MM-DD.md`（木〜水週・正本1ファイル）から**今日の `day` 行**を DailyNote「今日やること」へ投影。翌日分は**選定しない**（翌朝は翌日 `day` 行を投影）。`type=new` かつ公開する行だけ、該当 inbox の `publish_date` をその `day` に合わせる。**公開3本固定・勝ち2+柔軟1・空日の公開埋めはしない**。週途中の行追加は可（理由1行＋`source`；`new` は §5.2）。Dashboard の旧「公開フォーカス3本」同期は行わず、week-queue 要約方針に合わせる
6. `ctr-rewrite-queue` の「表示用」を Dashboard「CTRリライト候補」へ転記（GSC再取得しない）
7. debt/HUB広範囲は水曜へ。当日公開や①引き継ぎがあるときだけ軽く補完
7.5. **レーンB完了同期（保険・軽量）**: 当日 AI-log／DailyNote で手順が `closed` なのに `active-tasks` 週枠が残っていたら、運用設計 §6（Board削除＋`done-tasks-log`追記＋任意残の単発切出し）を実行。毎回 Board 全文は読まない。正本: Vault `タスク管理_ActiveBoard/運用設計` §6.1（案D）
8. 実施サマリ・変更ファイル・主要変更・実行後チェック・明日の推奨を短く報告
9. **AI-log 転記（プロンプトに AI-log パスがある日だけ）**: 手順8の完了報告を当日 AI-log 末尾へ転記する。パス指定が無い日は転記しない（DailyNote への報告のみ）

## 必須パス

- DailyNote: `D:\ObsidianVault\Vault\01_Daily\{YYMM}\{YYMMDD}\{YYYY-MM-DD}.md`
- 候補マスター: `D:\ObsidianVault\Vault\00-dashboard\toolarc_1min_tips_article_candidates.md`
- Dashboard: `D:\ObsidianVault\Vault\00-dashboard\dashboard.md`
- Inbox: `D:\ObsidianVault\Vault\04-Tips\inbox`（必要ファイルだけ）
- 分類: `node D:\ObsidianVault\Vault\00-dashboard\_classify_title.mjs "記事タイトル"`
- CTRキュー: `D:\ObsidianVault\Vault\00-dashboard\ctr-rewrite-queue.md`
- Active Board（必要時のみ）: `D:\ObsidianVault\Vault\00-dashboard\active-tasks.md`／`done-tasks-log.md`

## inbox必須処理

必ず確認する対象:

1. `publish_date` が今日以前
2. `status` が `inbox` / `draft` / `published`
3. DailyNote「今日やること」／week-queue 当日行に載っている
4. 候補マスターに載っている（旧「公開フォーカス3本」前提の枠埋めはしない）

公開済み inbox は `status` / `published_at` / `slug` / `promotion_status` を更新し `04-Tips/published` へ移動。マスター・Dashboard・DailyNote も反映。対象外 inbox は読まない。

## ⑤ handoff

- `slot-handoff-template` 形式があれば reader タイトル案は⑥で生成せず優先反映
- handoff が無くても DailyNote / AI-log の問題・解決・実測は直接タイトル化してよい

## 完了報告（短く）

- 実施サマリ（新規 inbox 件数・week-queue 当日行 id・移動件数）
- 変更ファイル一覧
- 明日の推奨アクション 1〜3

## AI-log 転記（条件付き）

- **プロンプトに AI-log パスが記載された日だけ**、完了報告を当日 AI-log の末尾へ転記する（`# 日次メンテ実行結果（⑥・日時）` 節）
- パス記載が無い日は転記しない（token節約。DailyNote への反映で足りる）
- 転記時も AI-log の `Last Updated` を Get-Date 値で更新する
