---
name: hallmark
description: >-
  ToolArc-scoped Hallmark (anti-AI-slop UI). Use when the user asks for hallmark
  audit/redesign/study, a new landing or marketing UI, or to score/redesign
  toolarc.jp pages for AI-slop. Not for blog Markdown, L1, publish, or daily/weekly
  maintenance. Upstream rule-set lives in .agents/skills/hallmark/.
---

# Hallmark（ToolArc ラッパー）

Upstream 正本: [`.agents/skills/hallmark/SKILL.md`](../../../.agents/skills/hallmark/SKILL.md)  
更新: `npx skills add nutlope/hallmark`（リポ根で再実行）

この Skill を使うときは **必ず upstream の SKILL.md と必要な `references/` を読んで従う**。そのうえで、次の ToolArc 制約を **upstream より優先**する。

## ToolArc 制約（必須）

1. **デザイン正本**: `docs/design-system.md`
   - 白基調、セクション背景 `#f8fbff`、アクセント `#60a5fa`、可読性優先
2. **禁止**: ダーク SaaS / サイバーパンク / Terminal・Midnight 系の暗い紙面を既定にしない
3. **テーマ**: catalog を回す場合も bright / modern-minimal / editorial（紙面は白〜ごく薄いブルー）に寄せる。ユーザーが明示しない限り dark catalog を選ばない
4. **対象外**:
   - `content/blog` の記事 Markdown 執筆・L1・公開（①）
   - ⑥日次 / 水曜週次 / 記事画像 Skills
   - PoE2 / ゲーム JSON（公開リポへ置かない）
5. **マルチページ一貫性**: 既存サイト改修では「毎回違うサイト」より **既存トークン・ルート・コンポーネント境界**を優先。先に `design.md` があればそれに従う
6. **破壊的変更**: ファイル削除・ルート丸ごと置換はユーザー確認後のみ（upstream safety rail と同じ）

## 動詞（upstream と同じ）

| 呼び出し | 動作 |
| --- | --- |
| *(default)* | 新規 UI。Design flow（制約付きテーマ） |
| `hallmark audit <target>` | 採点のみ・編集禁止 |
| `hallmark redesign <target>` | コピー・IA・ブランド維持で視覚層を作り直し |
| `hallmark study <screenshot \| URL>` | DNA 抽出。ピクセルコピー禁止 |

## 起動手順

1. このラッパーの制約を適用する
2. `.agents/skills/hallmark/SKILL.md` を読む
3. 動詞に応じて同ディレクトリの `references/`（および `references/verbs/`）を読む
4. Pre-flight で既存の `app/`・グローバル CSS・`docs/design-system.md` を読む
5. audit 以外で編集する場合は、触るファイル一覧を先に出す

## 更新メモ

- upstream 本体は `.agents/skills/hallmark/`（`npx skills add` の配置先）
- 本ファイルは ToolArc 固有の上書きのみ。upstream 再インストール後もこのラッパーは残す
