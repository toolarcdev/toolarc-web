---
title: "Obsidianの3モード使い分け｜Live PreviewとSourceを切り替える基本"
description: "ObsidianのReading・Live Preview・Source Modeの違いと使い分けを解説。frontmatter編集や表の作成はSource Modeが安定します。Ctrl+Eの切替操作も初心者向けに説明します。"
date: 2026-06-16
tags:
  - Obsidian
  - Live Preview
  - Source Mode
  - frontmatter
  - Obsidian使い方
  - 1分Tips
  - claude-obsidian-workflow
site: toolarc.jp
target: "ObsidianでメモやDailyNoteを書き始めた初心者"
last_update:
---

# Obsidianの3モード使い分け｜Live PreviewとSourceを切り替える基本

Obsidianを使い始めたとき、「なぜか表が崩れる」「frontmatterを編集しようとしたら見た目がおかしくなった」という経験はありませんか。

原因のほとんどは、**編集モードの選択**にあります。Obsidianには3つのモードがあり、作業内容に合わせて使い分けることで、こうしたトラブルを避けられます。

> **この記事の結論**
>
> - **Live Preview** が日常の編集向き（使用頻度の約90%）
> - **Source Mode** は frontmatter・表・プラグイン操作で安定する
> - **`Ctrl+E`** でLive PreviewとSource Modeをすばやく切り替えられる

---

## Obsidianの3つのモードとは

Obsidianには、1つのノートを3つの異なる形式で表示・編集できる仕組みがあります。

| モード | 表示の特徴 | 主な用途 |
|--------|-----------|----------|
| **Reading View**（読み取り） | 完全にレンダリングされた状態。編集不可 | 書いた内容を最終確認するとき |
| **Live Preview**（ライブプレビュー） | 書きながらリアルタイムでレンダリング。カーソル外は整形済み表示 | 日常のメモ・DailyNote・本文執筆 |
| **Source Mode**（ソースモード） | Markdownの生テキストをそのまま表示 | frontmatter編集・表の細かい修正・プラグイン操作 |

初期設定ではLive Previewになっており、多くの場面ではそのまま使えます。

---

## 使い分けの基本：場面別の選び方

### 日常のメモ・DailyNoteはLive Preview

通常のメモ書きや日次ログ（DailyNote）は、Live Previewで問題ありません。見出し・箇条書き・リンクがリアルタイムで整形されるため、書きながら最終的な見た目を確認できます。

### frontmatterの編集はSource Modeへ

記事の冒頭にある `---` で囲まれた管理情報（タイトル・タグ・日付など）のことを **frontmatter** といいます。Live Previewでfrontmatterを編集しようとすると、予期しない表示崩れが起きることがあります。

frontmatterを触るときは、`Ctrl+E` でSource Modeに切り替えてから編集するのが安定です。

```yaml
---
title: "記事タイトル"
date: 2026-06-16
tags:
  - Obsidian
---
```

### 表・Advanced Tablesの操作もSource Modeが安全

Markdownの表（テーブル）を手で編集するときや、**Advanced Tables**（表を補完してくれるプラグイン）を使うときも、Source Modeを推奨します。Live Previewでの表編集は、セル内でのカーソル位置がずれやすく、意図しない改行や記号の混入が起きやすいです。プラグインが動かないときの確認手順は「[ObsidianのAdvanced TablesはSource Modeで使う](/blog/obsidian-advanced-tables-source-mode)」を参照してください。

---

## Ctrl+E でモードを切り替える

Live Preview と Source Mode の切り替えは、**`Ctrl+E`**（Mac は `Cmd+E`）一発です。

作業の流れとしては次のようになります。

1. 通常のメモは **Live Preview** で書く
2. frontmatter や表を編集するとき → **`Ctrl+E`** で Source Mode へ
3. 編集が終わったら → **`Ctrl+E`** で Live Preview に戻る
4. 表示が崩れたと感じたら、モードを切り替えて再確認する

モードを変えるだけで解決するケースが多いため、Obsidianで何か表示がおかしいと思ったときは、まず `Ctrl+E` を試してみてください。

---

## まとめ

ObsidianのLive PreviewとSource Modeは、作業内容によって使い分けるものです。日常のメモはLive Preview、frontmatterや表を編集するときはSource Mode——この2パターンを覚えておくだけで、表示崩れや編集ミスの大半を防げます。

Obsidianを使ったAIログ・DailyNoteの運用については、以下の記事もあわせてどうぞ。

- [Claude × Obsidianワークフロー（Hub）](/blog/claude-obsidian-workflow)
- [ObsidianのDailyNoteでAIログを管理する方法](/blog/obsidian-daily-notes-ai-log)
- [ObsidianのAdvanced TablesはSource Modeで使う【動かないときの確認手順】](/blog/obsidian-advanced-tables-source-mode)

---

> **免責**: 本記事の内容は2026年6月時点のObsidian（デスクトップ版）の実測に基づきます。バージョンアップや設定によって動作が異なる場合があります。最新情報は[Obsidian公式ドキュメント](https://help.obsidian.md/)でご確認ください。
