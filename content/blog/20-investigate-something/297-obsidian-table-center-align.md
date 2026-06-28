---
title: "Obsidian表をHTMLで中央寄せする方法｜Source Mode手順"
description: "Obsidianで作成したMarkdown表が左寄せのままで困っていませんか。本記事では<div align=\"center\">タグで表を囲み、Source ModeとAdvanced Tablesを併用して中央寄せする手順を、実際の運用ログをもとに解説します。"
date: 2026-06-28
tags:
  - Obsidian
  - Markdown
  - HTML
  - Advanced Tables
  - 表組み
  - Source Mode
  - ノート術
site: toolarc.jp
target: "Obsidianで作成した表のレイアウトを整えたい初心者"
last_update: 2026-06-28
---

# Obsidian表をHTMLで中央寄せする方法｜Source Mode手順

Obsidianで表を作ったとき、「Reading Viewで見ると表が左寄せのままで、ノート全体のバランスが悪い」と感じたことはないでしょうか。純粋なMarkdownの表記法には、表の配置を指定する文法がないため、見た目を整えたいときは少し工夫が必要です。

筆者も同じ悩みに当たり、HTMLタグを併用することで表を中央寄せできることを確認しました。本記事では、その具体的な手順を紹介します。

> **今日の結論**
> - 純Markdown表だけでは中央寄せが難しい場合がある
> - `<div align="center">` で表を囲むと、Reading Viewで中央に寄せやすい
> - Advanced Tables併用時はSource Modeで編集すると、レイアウト崩れを防ぎやすい

## なぜMarkdown表だけでは中央寄せが難しいのか

Markdownの表記法には、もともと表の配置（左寄せ・中央寄せ・右寄せ）を指定する文法がありません。そのためObsidianの標準レンダラーでは、表は基本的に左寄せで表示されます。

ノートの見た目を整えたい場合は、Markdownだけで解決しようとせず、HTMLタグを併用する発想に切り替えるのが実務的です。

## HTMLタグで表を中央寄せする手順

1. **Obsidian をSource Modeにする**（またはLive PreviewでHTML埋め込みを許可する設定にする）
2. **表の前後を `<div align="center">` と `</div>` で囲む**
3. **表本体は通常のMarkdown表記法で書く**（div タグの中にそのまま記述する）
4. **Reading Viewで表示を確認する**
5. **期待通りに中央寄せにならない場合は、使用しているテーマのCSSスニペットで上書きする方法も検討する**（執筆時点では、すべてのテーマで同じ挙動になるとは限りません）

## 注意点

- **Advanced Tables プラグイン**を併用する場合、表の編集はSource Modeで行うことをおすすめします。Live Previewと混在させると、表組みが崩れることがあります。
- `<div align="center">` の効き方は、使用しているテーマによって異なる可能性があります。執筆時点での動作確認であり、テーマの更新により挙動が変わる場合があります。
- インラインHTMLを許可するかどうかは、Obsidianの設定や使用テーマに依存します。事前にご自身の環境で確認してください。

| 確認項目 | チェック |
| --- | --- |
| Source Mode、またはHTML許可設定になっているか | □ |
| `<div align="center">` で表全体を囲んでいるか | □ |
| Advanced Tables使用時はSource Modeで編集しているか | □ |
| Reading Viewで中央寄せを確認したか | □ |
| 使用テーマ特有の崩れがないか確認したか | □ |

## まとめ・次に読む

純Markdownだけで表の配置を整えるのは難しいため、`<div align="center">` タグを併用するのが手軽な対処法です。Advanced Tablesを使っている場合は、編集時のモードにも気を配ると、レイアウト崩れを防ぎやすくなります。

- Hub記事：[Claude × Obsidianワークフロー](/blog/claude-obsidian-workflow)
- 関連Tips：[Obsidian Advanced TablesをSource Modeで使う前提](/blog/obsidian-advanced-tables-source-mode)
- 関連Tips：[Markdown表で改行する方法](/blog/markdown-table-linebreak)
- 公開順で前の記事：[AIに渡す素材は「構造化」が鍵](/blog/ai-input-structuring-tips)
- 公開順で次の記事：[ChatGPTのプロジェクトと通常チャットの使い分け方](/blog/chatgpt-project-vs-normal-chat)

## 免責

本記事の内容は、執筆時点（2026-06-28）でのObsidianおよび関連プラグインの動作確認に基づきます。バージョンやテーマ、プラグインの更新により挙動が異なる場合があるため、ご自身の環境での確認をおすすめします。
