---
name: weekly-intake
description: >-
  Builds ToolArc Wednesday weekly-intake (slot ② / Skill A) from GSC collector
  plus Coverage ZIP and ASP CSVs auto-discovered in the work folder. Triggers on
  short prompts: 週次メンテナンス実行, 週次インテーク, weekly-intake, Skill A;
  optional work-folder path on the next line. On Wednesday, path may be omitted
  (resolves 01_Daily/YYMM/YYMMDD from Get-Date). Not for Skill B Commit, daily
  maintenance, or reader-theme batch (⑤).
---

# weekly-intake（② Skill A）

## 起動（短プロンプト）

**本線（案1）** — パス必須:

```text
週次メンテナンス実行
D:\ObsidianVault\Vault\01_Daily\2607\260722
```

**水曜ショートカット（案2）** — パス省略可:

```text
週次メンテナンス実行
```

別名トリガー: `週次インテーク` / `weekly-intake` / `Skill A`（同じパス規則）。

長文の必須入力リストをユーザーに要求しない。足りないファイルだけ短く聞く。

## 作業フォルダの解決

1. `Get-Date` で日時取得（メタデータ用）
2. メッセージに `01_Daily\...` または絶対パスがあればそれを作業フォルダとする
3. パスが無く、かつ **今日が水曜** → `D:\ObsidianVault\Vault\01_Daily\{yyMM}\{yyMMdd}\`（例: 2026-07-22 → `2607\260722`）
4. パスが無く、水曜以外 → **HOLD**（パスを促す）
5. フォルダが無ければ作成してよいか確認（または作成して intake を置く）

日付 `YYYY-MM-DD` はフォルダ名 `YYMMDD` から復元（`260722` → `2026-07-22`）。

## フォルダ内の自動探索

作業フォルダを走査し、見つかったパスを使う（複数なら最新の LastWriteTime）。

| 用途 | パターン（例） |
|------|----------------|
| Coverage | `*Coverage*.zip` / `*coverage*.zip` |
| A8 | `*program_summary*.csv` |
| もしも | `*report-kpi*.csv` / `*kpi-site*.csv` |
| AT | `*site_report*.csv` |
| VC | ファイル無し → §4 で 0・プログラムなし |
| 既存 intake | `weekly-intake-*.md` |
| DailyNote | `YYYY-MM-DD.md` |
| AI-log | `AI-log-*.md`（A では参照任意） |

Collector 既定: `D:\ObsidianVault\Vault\03-gsc-collector`  
探索で必須が欠けたら **HOLD**（どれが欠けているか列挙。サイトログインはしない）。

## 正本

| 層 | パス |
|----|------|
| **テンプレ** | Vault `00-dashboard/weekly-intake-template.md` |
| **設計・付録** | Vault `06_toolarc-business/202607/週次メンテSKILL化/週次メンテSKILL化_段階計画.md`（付録A/B） |
| **後段** | `.cursor/skills/weekly-maintenance/`（Skill B） |

**やらないこと**: dashboard 転記（B）、⑤ batch、§5.1 執筆、日次メンテ。

## 手順

1. 作業フォルダ解決 → 自動探索 → 欠損があれば HOLD
2. `weekly-intake-YYYY-MM-DD.md` をテンプレから作成（無ければ）
3. **Collector**: 完全窓 weekly MD → §1 Performance。`page-daily.csv` → §2。クエリ上位10〜15 → §1.5。ページ表示上位 → **§1.6**（人気スロット約3 slug）
4. §1.5 統合クラスタ → **§5 選抜3件（勝ち≤1）**。§1 KPI クエリ3件は別記載可
5. **Coverage**: 索引系。最終更新 ≤ 前週水 → `更新なし（最終更新: …）`
6. **ASP**（CP932・直近3か月前提のCSV）: 合算 → §4（期間日付必須）。もしも CTR>100% なら汚染疑い
7. 判断1行・先週比（dashboard 前週列）。§5.1 は触らない
8. §0 `②受領完了`。変更計画 → 承認後編集（運用どおり）

## 完了報告（短く）

- 作業フォルダ / intake パス
- 自動探索で使った ZIP・CSV 名
- §1 要約 / Coverage 更新なし有無 / ASP N/10
- §1.6 人気スロット候補 slug（あれば）
- §5 選抜3件
- 次: ⑤（§5 のみ）→ 新規チャットで `週次メンテナンス続き`（＋同じフォルダパス）
