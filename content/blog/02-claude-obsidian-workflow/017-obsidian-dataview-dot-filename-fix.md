---
title: "Obsidianで先頭ドットのファイル名がDataviewに出ないときの対処"
description: "Obsidianのfrontmatter条件は正しいのに、特定のノートだけDataviewのクエリに表示されないときの原因と対処法を解説します。ファイル名の先頭ドットが影響するケースの実測に基づく内容です。"
date: 2026-06-20
tags:
  - Obsidian
  - Dataview
  - frontmatter
  - ファイル名
  - ノート管理
  - AIワークフロー
  - claude-obsidian-workflow
site: toolarc.jp
target: "ObsidianとDataviewでノート管理をしている、Claude/Obsidianワークフローの初心者"
---

# Obsidianで先頭ドットのファイル名がDataviewに出ないときの対処

Obsidian で Dataview を使ってノートを一覧化していると、frontmatter の条件は揃っているはずなのに、特定のノートだけクエリ結果に出てこないことがあります。原因の一つとして、ノートのファイル名が先頭ドット（`.`）で始まっていることが考えられます。

> **今日の結論**
> - Dataview にノートが表示されないときは、まず frontmatter の条件（`type` / `owner` / `status` など）を確認します
> - 条件が正しいのに表示されない場合は、ファイル名が先頭ドットで始まっていないか確認します
> - 先頭ドットを避けてファイル名を変更すると、表示される場合があります
> - 表示上はドット付きの名前を残したい場合、frontmatter の `title` で対応できます

## 症状: frontmatterは正しいのにDataviewに出てこない

`type: tips`、`owner: toolarc`、`status` が `published` 以外、といった条件をすべて満たしているはずなのに、Dataview のクエリ結果に該当ノートが表示されない、ということがあります。他のノートは同じクエリで正しく表示されているため、frontmatter の書き方を見直しても原因が分からないケースです。

## 原因として考えられること: ファイル名の先頭ドット

筆者の環境では、2026年6月19日の実測で、`.cursorignore の重要性.md` というファイル名のノートが Dataview のクエリに表示されず、ファイル名を `cursorignore の重要性.md`（先頭ドットを外したもの）に変更したところ表示されるようになりました。

先頭ドットで始まるファイルは、一般的に「隠しファイル」として扱われる慣習があり、これが Obsidian や Dataview 側の扱いに影響している可能性があります。ただし、これは Obsidian / Dataview の公式仕様として明記されている挙動ではなく、執筆時点の一例です。プラグインのバージョンや環境によって状況が異なる可能性があります。

## 対処手順

1. frontmatter が `type: tips` / `owner: toolarc` / `status != published` になっているか確認する
2. 条件が正しいのに Dataview に出ない場合、ファイル名が `.cursorignore の重要性.md` のように先頭ドットで始まっていないか確認する
3. ファイル名を `cursorignore の重要性.md` のように先頭ドットなしへ変更する
4. 表示上 `.cursorignore` を残したい場合は、frontmatter の `title` に `.cursorignore の重要性` を残す

## 表示名と実ファイル名を分けて運用する

Obsidian のファイル名と frontmatter の `title` は別物として扱えます。ファイル名は Dataview などのプラグインが扱いやすい形にしておき、人間が読むときの表示名は `title` で管理する、という分担にすると、こうした表示トラブルを避けながら見た目も保てます。

## チェックリスト

| 項目 | 確認内容 |
| --- | --- |
| frontmatter条件 | `type` / `owner` / `status` が想定通りか |
| ファイル名 | 先頭ドットで始まっていないか |
| 変更後の表示 | ファイル名変更後にDataviewへ表示されたか |
| 表示名の維持 | 必要に応じて`title`にドット付きの名称を残したか |

## まとめ・次に読む

Dataview にノートが表示されないときは、frontmatter だけでなくファイル名そのものも確認してみてください。先頭ドットを避けるだけで解消する場合があります。

- Hub: [Claude × Obsidian ワークフローまとめ](/blog/claude-obsidian-workflow)

---

本記事の表示挙動は、筆者の環境における執筆時点（2026年6月20日）の実測例であり、Obsidian / Dataview の公式仕様として保証されたものではありません。プラグインの挙動は更新によって変わる可能性があるため、最新の情報は公式ドキュメントでご確認ください。
