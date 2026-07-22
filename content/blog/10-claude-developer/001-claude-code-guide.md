---
title: "Claude Code ガイド（開発者向け入口）"
description: "Claudeをコード・CLI・API側から使いたい方向けに、Claude CodeとCursorの役割分担と公開記事の読む順番をまとめた開発シリーズの入口です。執筆・Obsidian系とは線引きしています（執筆時点の情報）。"
date: 2026-07-16
tags:
  - Claude
  - Claude Code
  - Cursor
  - 開発
  - AIツール
  - 初心者
  - MCP
site: toolarc.jp
target: "Claudeをコード／CLI／API側から使いたい個人開発〜小チームの初心者〜中級（執筆・Vault用途は別）"
last_update: 2026-07-16
---

# Claude Code ガイド（開発者向け入口）

> **今日の結論**
>
> - このページは Claude を**開発**（コード・CLI・API）側から使うためのシリーズ入口です。執筆・Vault 運用は [Obsidian×Claude ワークフロー](/blog/claude-obsidian-workflow) 側です。
> - Claude Code はターミナル寄りの実装支援、Cursor は IDE・Agent。どちらか一方に絞る必要はなく、用途で分担・併用できます。
> - 当面の Spoke は、すでに公開済みの比較・プロンプト系5本です。Code の手順本はこれから追加します（準備中）。
> - ツール連携（MCP）の地図は [Model Context Protocol（MCP）ガイド](/blog/mcp-guide) にまとめます。
> - プラン・モデル名・コマンドは変わりやすいので、重要判断は公式情報の確認を優先してください。

「Claude Code を調べ始めたが、Cursor や Obsidian 記事とどこが違うのか分からない」「開発で Claude を使うなら、どの記事から読めばよいか知りたい」。そんな迷い向けの入口ページです。

本記事は **Claude 開発クラスターの Hub（入口）** です。インストール手順やコマンド一覧を長く書く場ではなく、「何を読めばよいか」の地図と、隣シリーズとの線引きを先に示します。

## このシリーズで分かること — 入口地図と読まない線引き

このシリーズで扱う中心は、次の3つです。

| 扱うこと | いまの状態 |
| --- | --- |
| Claude をコード／CLI／API 側で使う入口の整理 | 本 Hub |
| ChatGPT・Claude・モデル比較やプロンプトの読む順 | 公開済み Spoke 5本（下表） |
| Claude Code 自体の始め方・手順 | Spoke として追加予定（準備中） |

一方で、次のテーマは**このシリーズの本筋ではありません**。

| 読まない／別入口 | 行き先 |
| --- | --- |
| Obsidian での素材整理、記事執筆、Vault 運用 | [Obsidian×Claude ワークフロー](/blog/claude-obsidian-workflow) |
| IDE 内でファイル編集・Agent・無料枠の実測 | [Cursor無料版の実測レビュー（Cursor Hub）](/blog/cursor-free) |
| ChatGPT・Claude・Cursor の横断比較 | [AIツール比較 Hub](/blog/ai-tools-comparison) |
| AI と外部ツールをつなぐ接続（MCP） | [Model Context Protocol（MCP）ガイド](/blog/mcp-guide) |

執筆系 Tip（長文分割・公開前レビューなど）も、開発クラスターへ移管しません。必要なら執筆側の記事へリンクするだけに留めます。

- [Claudeで長い原稿を分割して渡すときの進め方](/blog/claude-long-text-split-tips)
- [Claudeの初稿を公開前にレビューするときの確認ポイント](/blog/claude-draft-review-before-publish)

## Claude Code と Cursor の役割分担 — 相互リンク方針

名前が似て見えるため、「Claude Code と Cursor はどちらを使えばよいか」で止まりやすいです。執筆時点の整理としては、次の分担が分かりやすいです。

| 観点 | Claude Code（本クラスター） | Cursor（隣 Hub） |
| --- | --- | --- |
| ひとことで | ターミナル寄りの実装支援 | IDE に入った Agent／編集環境 |
| 向きやすい場面 | CLI・リポジトリ単位の作業、対話で実装を進める流れ | 実ファイルの差分確認、エディタ内での修正・反映 |
| ToolArc での入口 | 本記事（`claude-code-guide`） | [Cursor Hub](/blog/cursor-free) |

どちらが「上位」ではなく、役割が違います。エディタ中心で進めたいなら Cursor、ターミナルや Claude 側の開発体験を主にしたいなら本クラスター、という分け方が迷いを減らしやすいです。併用も問題ありません。

役割分担の補足（主所属は Cursor 側）:

- [ClaudeとCursorの2ステップ運用 Tips](/blog/claude-cursor-2step-workflow-tips)

横断で「今の悩みに近い比較記事」を選びたい場合は、[ChatGPT・Claude・Cursorの違いと使い分けまとめ](/blog/ai-tools-comparison) から入ると探しやすいです。

## 今日の結論と最初の1歩 — 前提と公式確認ポイント

最初の1歩は、手順を深く覚えることより、**自分の今の目的が「開発」か「執筆」かを分けること**です。

1. 執筆・Vault が主目的 → [claude-obsidian-workflow](/blog/claude-obsidian-workflow) へ戻る
2. IDE・Agent・無料枠の実測が主目的 → [cursor-free](/blog/cursor-free) へ進む
3. Claude を開発・比較・プロンプト順で押さえたい → 次の「読む順番」表の1番から読む

Claude Pro の加入判断は、本 Hub では断定しません。判断材料は比較 Spoke に委譲します。

- [Claude Proは必要か？無料版との違いと判断基準3つ](/blog/claude-pro-free-comparison)

公式確認のポイント（執筆時点のチェックリスト）:

- 利用プラン・上限・料金は変わっていないか
- モデル名・提供状況は自分の用途に合っているか
- CLI／製品名の呼び方・導入手順は公式ドキュメントと一致しているか

未確認の仕様を「公式保証」のように扱わないことが、判断ミスを減らす前提です。

## 公開済み記事から読む順番 — 初期 Spoke 5本表

Code 手順本が揃うまでの当面は、次の公開済み5本を初期 Spoke として読んでください。すべて既存記事への実リンクです。

| 順 | こんなときに読む | 記事 |
| --- | ---: | --- |
| 1 | ChatGPT と Claude の用途差を先に押さえたい | [ChatGPTとClaudeの違いとは？初心者向けに用途で比較](/blog/chatgpt-claude-comparison) |
| 2 | Pro 加入を判断したい | [Claude Proは必要か？無料版との違いと判断基準3つ](/blog/claude-pro-free-comparison) |
| 3 | GPT整理→Claude記事化の2段階を知りたい | [GPTで情報整理→Claudeで記事化する2段階AI運用](/blog/gpt-claude-two-stage-ai-workflow-tips) |
| 4 | モデル聞き比べ・役割分担の実測を見たい | [Claude Opus 4.8を4モデルで聞き比べたメモ](/blog/compare-ai-models-opus48-tips) |
| 5 | プロンプトの学ぶ順番を知りたい | [プロンプトエンジニアリングを初心者が学ぶ順番](/blog/ai-prompt-engineering-beginner-roadmap) |

全部を一気に読む必要はありません。いまの迷いが「用途差」「料金判断」「分担運用」「モデル差」「プロンプト順」のどれに近いかで、1本選んで進めてください。

## 今後の Spoke（準備中）と隣のクラスター — Code／MCP／Cursor Hub

今後このクラスターで追加予定の Spoke（slug 未確定のため、偽リンクは置かず「準備中」のみ）:

- Claude Code の始め方（導入の地図）
- CLI・ターミナル寄りの手順
- API 側の入り方（必要になった読者向け）

隣のクラスター（迷子防止用）:

| 隣の入口 | 役割 |
| --- | --- |
| [Cursor無料版の実測レビュー（Cursor Hub）](/blog/cursor-free) | IDE・Agent・無料枠の入口 |
| [Obsidian×Claude ワークフロー](/blog/claude-obsidian-workflow) | 執筆・Vault（読まない線の先） |
| [AIツール比較 Hub](/blog/ai-tools-comparison) | ChatGPT／Claude／Cursor の横断比較 |
| [Model Context Protocol（MCP）ガイド](/blog/mcp-guide) | ツール連携の地図 |

MCP を先に知りたい場合も、まずは [MCP Hub](/blog/mcp-guide) へ進み、Client 別の細かい設定は各 Spoke に分けて読む想定です。

## まとめ

Claude Code 周りで迷ったときは、「執筆か開発か」「エディタかターミナルか」の線引きから入ると、読む記事が決まりやすくなります。本 Hub は開発クラスターの入口として、まず公開済み5本の読む順と、隣 Hub への分かれ道だけを先に置いています。

次の一手の例:

1. 用途差から固めたい → [ChatGPTとClaudeの違い](/blog/chatgpt-claude-comparison)
2. IDE 中心で進めたい → [Cursor Hub](/blog/cursor-free)
3. 執筆フローが主目的だった → [Obsidian×Claude](/blog/claude-obsidian-workflow)

---

本記事の整理は、2026-07-16執筆時点の情報と公開済み記事構成に基づきます。Anthropic／Claude Code／プラン・モデル名・コマンド、および関連サービスの仕様・料金は変更される可能性があります。重要な判断の前には、各サービスの公式ドキュメントを確認してください。
