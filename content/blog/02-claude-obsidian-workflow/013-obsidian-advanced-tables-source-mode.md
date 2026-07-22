---
title: "ObsidianのAdvanced TablesはSource Modeで使う【動かないときの確認手順】"
description: "ObsidianでAdvanced Tablesプラグインが正しく動かない場合の原因と対処法を解説。Source Modeへの切り替えが前提で、Live Previewでは挙動が安定しないことがあります。導入済みの方にすぐ使える確認手順つき。"
date: 2026-06-17
tags:
  - Obsidian
  - Advanced Tables
  - Source Mode
  - プラグイン
  - Markdown
  - 1分Tips
  - claude-obsidian-workflow-series
site: toolarc.jp
target: "ObsidianでAdvanced Tablesを使い始めた初心者"
last_update:
---

# ObsidianのAdvanced TablesはSource Modeで使う【動かないときの確認手順】

「Advanced Tables を入れたのに、Tab を押しても表が整形されない」。そんな経験はありませんか？

Obsidian のコミュニティプラグイン **Advanced Tables**（拡張テーブル編集機能）は、Markdown の表をキーボードショートカットで素早く編集できる便利なプラグインです。ただし、**編集モードによって動作が大きく変わります**。筆者が実際に試したところ、Source Mode（ソースモード）以外では期待通りに動かないケースが多くありました。

---

> **今日の結論**
>
> - Advanced Tables は **Source Mode** で使うのが基本
> - Live Preview モードでは Tab/Enter のショートカットが効かないことがある
> - 複雑な表は HTML 直打ちを避け、Markdown 表に統一する運用ルールを決めておくと安定する

---

## Advanced Tables とは

Advanced Tables は、Obsidian のコミュニティプラグインのひとつです。Markdown の表（`|` で区切った形式）を編集するとき、次のような操作ができます。

| ショートカット | 動作 |
|--------------|------|
| Tab | 次のセルへ移動・列を自動整形 |
| Enter | 次の行へ移動 |
| Ctrl+Shift+D など | 列の追加・削除 |

表のセルを Tab で移動しながら書けるため、列数が多い表や繰り返し編集する表で特に便利です。

---

## なぜ Source Mode が前提なのか

Obsidian には主に2つの編集モードがあります。

| モード | 特徴 |
|--------|------|
| **Source Mode** | Markdown をそのまま表示・編集する |
| **Live Preview** | 入力しながらリアルタイムにプレビューが適用される |

Advanced Tables の Tab/Enter ショートカットは、Markdown のテキストに直接介入して動作します。Live Preview モードでは Obsidian 自体のカーソル制御と干渉しやすく、**ショートカットが効かない・表が崩れる**といった問題が起きやすいです。

Source Mode に切り替えると、Markdown テキストをそのまま操作するためプラグインが安定して動きます。

---

## 確認手順

```
1. コミュニティプラグインで Advanced Tables を有効化する
2. 編集中のノートを Source Mode に切り替える
   （右上のメニュー → 「Source mode」を選択）
3. 表の行で Tab / Enter を試す
4. Live Preview に戻して表示が崩れないか確認する
5. 複雑な表は HTML 直打ちを避け、Markdown 表に統一するルールを決める
```

**Source Mode の切り替え方**（3ステップ）

1. ノート右上の「︙」メニューを開く
2. 「Source mode」をクリック
3. ツールバーが表示され、表の編集中に Tab が効くようになる

---

## まとめ

Advanced Tables は Source Mode で使うと安定します。Live Preview でうまく動かない場合は、まずモードの確認から試してみてください。

内部資料（個人メモ）では表をコピペ中心で運用していても、この Tips を知っておくだけで **「なぜか動かない」に悩む時間を減らせます**。

Source Mode と Live Preview の使い分けは「[Obsidianの3モード使い分け](/blog/obsidian-mode-live-preview-source)」も参照してください。

Claude と Obsidian を組み合わせたワークフロー全体は「[Claude＋Obsidianワークフローシリーズ](/blog/claude-obsidian-workflow)」でまとめていますので、あわせてご覧ください。

---

**免責**: 本記事は 2026年6月17日 時点の情報をもとに執筆しています。Obsidian および Advanced Tables プラグインの仕様は変更される可能性があります。最新の動作は公式ドキュメントおよびプラグインの GitHub リポジトリをご確認ください。
