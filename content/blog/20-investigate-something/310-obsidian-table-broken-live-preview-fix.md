---
title: "Obsidianライブプレビューで表が崩れる直し方"
description: "Obsidianのライブプレビューで編集中に表が突然崩れたとき、まず確認したい3つのポイント（Markdown記法・モード切替による切り分け・プラグイン干渉）を診断の順番とあわせて整理しました。表の直し方を素早く判断したい方向けの実務Tipsです。"
date: 2026-07-02
tags:
  - Obsidian
  - ライブプレビュー
  - 表
  - Markdown
  - Advanced Tables
  - トラブルシューティング
  - Claude+Obsidianワークフロー
  - ソースモード
site: toolarc.jp
target: "Obsidianのライブプレビューで表を編集中に表示が崩れて困っている人"
last_update: 2026-07-02
---

# Obsidianライブプレビューで表が崩れる直し方

Obsidianのライブプレビューで表（テーブル）を編集していたら、急に列がずれたり罫線が消えたりして崩れてしまった——という経験はないでしょうか。筆者もDailyNoteに表を貼り付けて編集していたときに、同じ症状に遭遇しました。原因を切り分けずにあれこれ直そうとすると、かえって崩れが広がってしまうこともあります。

この記事では、ライブプレビューで表が崩れたときに何から確認すればよいかを、3つのチェックポイントに絞って整理します。Obsidianの編集モード全体の使い分けや、Advanced Tablesプラグイン単体のトラブルは別記事で詳しく扱っているため、ここでは「表が崩れたときにまず何を確認するか」という切り分けの流れに特化します。

> **今日の結論**
> - まず**Markdownの表記法**（パイプ・ヘッダー区切り行）が正しいか確認する
> - **Live PreviewとSource Modeを切り替え**て、どちらで崩れるかを切り分ける
> - それでも直らなければ**Advanced Tables等のプラグイン干渉**を疑う
> - 3点を順番に確認すると、原因の見当がつけやすくなる

## 確認①：表のMarkdown記法が正しいか確認する

表が崩れる原因として一番多いのは、実はプラグインやモードではなく、**Markdownの記法そのものの間違い**です。まず以下の3点を見てください。

- **ヘッダー区切り行の「-」の数**が、各列で最低3つ以上あるか
- **各行のパイプ（`|`）の数**が、ヘッダー行と揃っているか（列数がずれていないか）
- **表の直前に空行**が入っているか（地の文とくっついていると表として認識されないことがあります）

正しい表記の例です。

```md
| 項目 | 内容 |
| --- | --- |
| 確認① | Markdown記法 |
```

パイプの数がずれていたり、区切り行の「-」が抜けていたりすると、表として認識されずレイアウトが崩れます。Source Modeに切り替えて生のMarkdownを見ると、この手のミスは見つけやすくなります。

## 確認②：Live PreviewとSource Modeを切り替えて切り分ける

`Ctrl+E`（Macは`Cmd+E`）でLive PreviewとSource Modeを切り替え、**どちらのモードでも崩れるか**を確認します。

- **Source Modeでも崩れて見える** → Markdown記法自体に誤りがある可能性が高いです。確認①に戻って表記を見直してください。
- **Source Modeでは正しく見えるが、Live Previewだけ崩れる** → 記法自体は正しく、レンダリングやプラグイン側の問題である可能性が高いです。次の確認③に進んでください。

モードの基本的な使い分けは「[Obsidianの3モード使い分け](/blog/obsidian-mode-live-preview-source)」で詳しく解説しています。

## 確認③：Advanced Tables等のプラグイン干渉を疑う

Live Previewでのみ表が崩れる場合、Advanced Tablesなど表編集を補助するプラグインが、Live Previewとの相性で意図しない挙動を起こしていることがあります。Tab/Enterで整形しようとしたときに列がずれる場合は、プラグインをSource Modeで使うことで安定するケースが多いです。

Advanced Tablesが動かない・崩れるときの詳しい確認手順は「[ObsidianのAdvanced TablesはSource Modeで使う](/blog/obsidian-advanced-tables-source-mode)」にまとめているので、プラグインを使っている方はあわせてご確認ください。

## 3確認チェックリスト

| # | 確認項目 | 見るポイント |
| --- | --- | --- |
| 1 | Markdown記法 | パイプの数・ヘッダー区切り行の「-」・表前の空行 |
| 2 | モード切替（`Ctrl+E`） | Source Modeでも崩れるか／Live Previewだけ崩れるか |
| 3 | プラグイン干渉 | Advanced Tables等、表編集プラグインの有無 |

## まとめ・次に読む

表が崩れたときは、記法・モード・プラグインの3点を順番に確認すると原因を切り分けやすくなります。それぞれをより詳しく知りたい方は、以下の記事もあわせてご覧ください。

- Obsidian × Claudeワークフロー全体（Hub）: [Obsidianで素材整理 → Claudeで記事生成 → Cursorで公開するブログ制作ワークフロー](/blog/claude-obsidian-workflow)
- モードの使い分け: [Obsidianの3モード使い分け｜Live PreviewとSourceを切り替える基本](/blog/obsidian-mode-live-preview-source)
- プラグインのトラブル: [ObsidianのAdvanced TablesはSource Modeで使う【動かないときの確認手順】](/blog/obsidian-advanced-tables-source-mode)
- 同日公開の関連記事:
  - [ChatGPT機種変更で履歴が見えないときの3確認](/blog/chatgpt-history-missing-device-change)
  - [Obsidianで✅からチェックボックスを作る方法](/blog/obsidian-checkmark-to-checkbox)

本記事の内容は執筆時点（2026-07-02）のObsidianの挙動に基づいています。バージョンアップやプラグインの仕様変更によって挙動が異なる場合があるため、最新情報は公式ドキュメントもあわせてご確認ください。
