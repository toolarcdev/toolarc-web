# 新規記事インプット（スキーマ正本）

`create-source-md` 開始前に人が揃える固定情報。**記事品質の床**。Q番号はここに含めない（week-queue 運用目印）。

## 配置（必須・source.md と同フォルダ）

```text
D:\ObsidianVault\Vault\01_Daily\{YYMM}\{YYMMDD}\input-{slug}.md
```

- `{YYMMDD}` は作業日（当日フォルダが無ければ `prepare-daily-workfolder` を案内して止める）
- ファイル名は `input-{slug}.md`（チャット貼付のみは不可。必ず Vault に md を残す）
- 既存があれば上書きせず確認（内容追記・修正は可）
- `Last Updated` は `Get-Date -Format "yyyy-MM-dd HH:mm"`（手入力・`user_info` 禁止）

欠けたら source 作成を止める。

---

## 雛形

```markdown
---
title: input-{slug}
slug: {slug}
status: input
type: article-input
site: toolarc.jp
Last Updated: {yyyy-MM-dd HH:mm}
related:
  - "[[week-queue-YYYY-MM-DD]]"
---

# 新規記事インプット｜{slug}

本ファイルは **create-source-md 開始前の固定情報**。ペルソナ・本文初稿・source.md 本体は対象外。

## 必須

- slug: {slug}
- 検索意図の型: How-to / 比較 / チェックリスト / Hub
- 所属 Hub/シリーズ: {例: claude-developer-series / mcp-series}
- 隣記事境界:
  - `{adjacent-slug}` → {委譲する内容／触らない理由}
- 根拠の種:
  - {公式Docs URL または確認予定のページ名}
  - {実測メモ／「実測なし・公式準拠」}
  - 断定禁止: {例: 料金の永久断定、未確認のレート数値}
- 収益導線方針: {しない / 末尾関連・Hub 1本 / 直アフィ: 案件名}

## 任意

- 読者の生の一言:
- 結論の核（最大3）:
- 内部リンク候補:
- 深さの上限・やらないこと（戦略）:

## Agent 起案（人がこのファイルに書かない）

- ペルソナ2〜3
- 記事の仕事
- 構成 H2・Output Contract 詳細

→ 次: Skill `create-source-md` で同フォルダに `source-{slug}.md`
```

---

## 必須6の合格条件

| 項目 | 合格 |
|------|------|
| slug | 1値。公開 URL `/blog/{slug}` と一致予定。ファイル名の `{slug}` と一致 |
| 検索意図の型 | 4型のいずれか1つ |
| 所属 | Hub またはシリーズ名が特定できる（「未定」不可） |
| 隣記事境界 | 最低1本。slug と委譲／禁止が対である |
| 根拠の種 | URL／実測／「実測なし・公式準拠」のいずれか＋断定禁止が空でない |
| 収益導線方針 | 1行以上。空欄や「あとで」は不合格 |

## 含めないもの

- week-queue の **Q番号**（運用突合は Skill 側でキューから行う）
- ペルソナ表・記事の仕事の完成形（Agent 起案 → `source-{slug}.md` → 人間ゲート）
- source 用の長文プロンプト（Skill が手順正本）
