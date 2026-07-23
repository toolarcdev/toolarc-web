---
name: prepare-daily-workfolder
description: >-
  Prepares ToolArc daily work folder under Obsidian Vault 01_Daily
  (YYMM/YYMMDD) with DailyNote and AI-log. Uses Get-Date by default, or a
  user-specified date. Stops without overwrite if either file already exists.
  Asks the user when the target date is ambiguous. Use when the user asks for
  DailyNote作成, AI-log作成, 作業フォルダを用意, or 明日の作業フォルダ.
  Not for ⑥日次メンテ (daily-maintenance-lite) or Wednesday weekly skills.
---

# prepare-daily-workfolder（DailyNote / AI-log 作業フォルダ用意）

## やること / やらないこと

- **やる**: 対象日の `01_Daily/{YYMM}/{YYMMDD}/` を用意し、DailyNote と AI-log を新規作成
- **やらない**: 既存ファイルの上書き、⑥メンテ、記事公開、候補マスター更新

## 日付の決め方（必須）

1. 開始時に必ず実行（手入力・`user_info` 禁止）:

```powershell
Get-Date -Format "yyyy-MM-dd HH:mm"
Get-Date -Format "yyyy-MM-dd"
```

2. **対象日 `TargetDate`**:
   - 日付指定なし → 上記の当日
   - 明示日付（`2026-07-24` / `7/24` / `0724` 等）→ その日
   - 相対（`明日` / `明後日` / `昨日`）→ `Get-Date` 基準で算出
3. **迷い・ブレがあるとき**（解釈が複数、週の曖昧指定、タイムゾーン疑い等）:
   - **作成せず停止**
   - 候補日付を1つ提示し、ユーザー承認後に再開
4. 承認後も `TargetDate` からパスを再計算する（推測で進めない）

## パス規則

Vault ルート: `D:\ObsidianVault\Vault`

| 要素 | 形式 | 例（TargetDate=2026-07-23） |
|------|------|------------------------------|
| 月フォルダ | `YYMM` | `2607` |
| 日フォルダ | `YYMMDD` | `260723` |
| DailyNote | `{YYYY-MM-DD}.md` | `2026-07-23.md` |
| AI-log | `AI-log-{YYYY-MM-DD}.md` | `AI-log-2026-07-23.md` |

フル:

- `D:\ObsidianVault\Vault\01_Daily\{YYMM}\{YYMMDD}\{YYYY-MM-DD}.md`
- `D:\ObsidianVault\Vault\01_Daily\{YYMM}\{YYMMDD}\AI-log-{YYYY-MM-DD}.md`

## 上書き禁止（必須）

作成前に両ファイルの有無を確認する。

- **どちらか一方でも存在する** → **上書きせず停止**。存在するパスを報告し終了
- 両方とも無い → フォルダを用意して新規作成（フォルダだけ先にあっても可）

`obsidian create` の `overwrite` は使わない。

## 作成手順

1. `TargetDate` 確定（曖昧なら確認待ち）
2. 存在チェック → 既存なら停止
3. Obsidian が起動している前提で **obsidian-cli** を使う:

```bash
obsidian create path="01_Daily/{YYMM}/{YYMMDD}/{YYYY-MM-DD}.md" content="..." silent
obsidian create path="01_Daily/{YYMM}/{YYMMDD}/AI-log-{YYYY-MM-DD}.md" content="..." silent
```

4. 文字化けしたら Vault パスへ UTF-8 で書き直してよい（内容はテンプレ準拠）
5. **obsidian-markdown** に従い、Vault 内リンクは `[[wikilink]]`、埋め込みは `![[...]]`、callout 可
6. 完了報告: TargetDate / 作成パス2つ / 公開フォーカス引き継ぎ有無

## DailyNote テンプレ（必須構造）

正本: Vault `運用設計` §3（レーンA/B）。骨格:

```markdown
# {YYYY-MM-DD}

## 今日の結論

- （作業後に追記）

## 今日やること

### 公開フォーカス3本（⑤→④→①）

（前日 DailyNote「明日やること → 公開フォーカス3本」があれば引き継ぐ。無ければ空＋⑥ E 待ちの注記）

### その他（`publish_date` 対象外）

> [!info] レーンB
> 未完了の正本は [[active-tasks]]。DailyNote は投影のみ。

![[active-tasks#投影用チェックリスト（単発）]]

![[active-tasks#投影用チェックリスト（週枠）]]

## 今日の成果物

## 学んだこと

## 再利用できる知識

## 問題・詰まった点

## 解決したこと

## 明日やること

### 公開フォーカス3本（⑤→④→①）

>（⑥ E で inbox から選定）

### その他（`publish_date` 対象外）

![[active-tasks#投影用チェックリスト（単発）]]

![[active-tasks#投影用チェックリスト（週枠）]]

---

## 作業ログ
```

### 公開フォーカス引き継ぎルール

- **引き継ぐのは公開フォーカス3本のみ**（レーンA）
- W3 / Review-2 等の一般タスクは DailyNote にコピーしない（正本 [[active-tasks]]）
- 前日ノートが無い／公開フォーカス節が空 → 空欄のまま（推測で埋めない）

## AI-log テンプレ

```markdown
# AI-log-{YYYY-MM-DD}

Last Updated: {Get-Date の yyyy-MM-dd HH:mm}
```

- **ルール読み込み枠は入れない**（Claude プロジェクト側で自動読み込み）
- それ以外の作業ログは書かない（開始時点は空）

## 完了報告（短く）

- TargetDate
- 作成した2パス（または停止理由: 既存あり / 日付確認待ち）
- 公開フォーカス引き継ぎ: あり（件数）/ なし
