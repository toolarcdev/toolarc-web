---
title: "Cursor 開発ガイド｜初心者向けの始め方と読む順番"
description: "CursorでAI開発を始めたい初心者向けに、Rules・Settings・参照ファイル指定の読む順番と、Claude Code・MCP・AIツール比較への分岐を整理した開発ガイドです。無料枠を使い切った実測記録も案内します。"
date: 2026-05-25
tags:
  - Cursor
  - Cursor開発
  - AIコーディング
  - Cursor Rules
  - Cursor Settings
  - Cursor Agent
  - 初心者向け
  - cursor-free-series
site: toolarc.jp
target: "CursorでAI開発を始めたいが、設定や機能をどの順番で学べばよいか迷っている初心者"
last_update: 2026-07-18
---

# Cursor 開発ガイド｜初心者向けの始め方と読む順番

Cursorを使い始めると、Settings、Rules、Agent、モード、MCPなど、似た用語が一度に出てきます。「最初に何を設定し、どの記事から読めばよいのか分からない」と迷う方もいるのではないでしょうか。

本記事は、ToolArcの**Cursor 開発シリーズのHub（入口）**です。個別機能を網羅するのではなく、公開済み記事の読む順番と、Claude Code・MCPなど隣のシリーズとの分かれ道を整理します。

> **今日の結論**
>
> - 最初はSettingsを確認し、次にRulesでプロジェクトの前提を伝えると進めやすくなります。
> - Agentへ依頼するときは、参照するファイルと作業範囲を先に確認します。
> - IDE内で差分を見ながら進めたい場合はCursor、ターミナル中心ならClaude Codeが入口です。
> - MCPの用語や接続方法は、専用のMCPガイドを正本として確認します。
> - 無料枠の実測記録は本記事で要点だけ残し、詳しい対策は個別記事で確認できます。

## このシリーズで分かること

Cursor 開発シリーズでは、AIへコードを書かせる方法だけでなく、**安全に依頼し、差分を確認しながら開発を進めるための土台**を扱います。

| 扱うこと | 具体例 |
| --- | --- |
| 初期設定 | プライバシー、モデル、インデックス、自動実行 |
| プロジェクトのルール | `.cursor/rules`、AGENTS.md、ファイル別の指示 |
| Agentへの依頼方法 | 参照ファイル、作業範囲、実行前の確認 |
| モードの使い分け | 調査・計画・実装を分ける考え方 |
| トラブル対応 | Agent停止、使用上限、エラーの切り分け |
| Git・実運用 | ブランチ、差分確認、PR作成 |

このシリーズが向くのは、Cursorを使い始めたばかりの方や、AIの編集範囲が広がりすぎて困った経験がある方です。

一方、Claudeをターミナルから使う手順や、MCPの共通仕様を詳しく調べたい場合は、隣のシリーズから読むほうが目的に合います。

## Cursorと隣クラスターの使い分け

Cursorだけですべてを学ぶ必要はありません。今いる作業場所と、知りたい内容から入口を選びます。

| 今知りたいこと | 読む入口 |
| --- | --- |
| IDE内でファイル編集・差分確認・Agent利用を進めたい | 本記事（Cursor 開発シリーズ） |
| ClaudeをCLI・ターミナル・API側から使いたい | [Claude Code ガイド](/blog/claude-code-guide) |
| CursorやClaudeと外部ツールを接続したい | [Model Context Protocol（MCP）ガイド](/blog/mcp-guide) |
| ChatGPT・Claude・Cursorのどれを使うか比較したい | [AIツール比較Hub](/blog/ai-tools-comparison) |

CursorとClaude Codeは、どちらか一方だけを選ぶ関係ではありません。エディタ内の差分確認はCursor、ターミナル寄りの作業はClaude Codeというように、作業ごとに分ける方法もあります。

MCPについては、本シリーズではCursor利用者向けの入口だけを扱います。Host・Client・Serverなどの用語や接続全体の地図は、[MCPガイド](/blog/mcp-guide)を確認してください。

## 今日の結論と最初の一歩

Cursorを導入した直後から、Agentへ大きな実装を依頼する必要はありません。まずは次の順番で土台を確認します。

1. Settingsでプライバシー・モデル・インデックス・自動実行を確認する
2. Rulesでプロジェクト共通の前提を伝える
3. Agentへ渡すファイルと作業範囲を限定する
4. 変更前後の差分を確認する
5. 必要になった段階でモードやMCPへ進む

最初の確認に使えるチェックリストです。

- [ ] 自動実行の範囲を把握している
- [ ] AIに触らせたくないファイルやフォルダを確認した
- [ ] プロジェクト固有のルールを用意した
- [ ] 依頼文に対象ファイルと完了条件を書いた
- [ ] 実行後に差分とエラーを確認する

Cursorの画面名、モデル、利用上限、料金は変更されることがあります。設定を変更する前や有料プランを判断する前には、Cursorの公式ドキュメントと現在の管理画面も確認してください。

## 公開済み記事から読む順番

全部を一度に読む必要はありません。最初はSettingsとRulesを整え、実際に依頼するときに参照ファイルの指定へ進む順番がおすすめです。

| 優先 | こんなときに読む | 記事 |
| :---: | --- | --- |
| S | プロジェクトの前提を毎回貼り直している | [Cursor Rules 完全ガイド｜.cursor/rulesの書き方・テンプレ・失敗例](/blog/cursor-rules-file-tips) |
| S | 初期設定のまま使っており、安全性や自動実行が気になる | [Cursor Settings おすすめ設定一覧｜プライバシー・モデル・インデックス・自動実行](/blog/cursor-recommended-settings-tips) |
| A | Agentが意図しないファイルまで読んでしまう | [Cursorに参照ファイルを確認させるプロンプトの書き方](/blog/cursor-reference-file-prompt-tips) |
| A | Ask・Plan・Agentなどをいつ切り替えるか迷う | [Cursorモード使い分けガイド｜Agent・Plan・Askをいつ切り替える？](/blog/cursor-plan-mode-modify-before-build-tips) |

無料枠や消費量が気になる方は、次の補助記事へ進んでください。

- [Cursor無料版を長持ちさせるコツ｜実測で効いた5つの習慣](/blog/cursor-free-plan-tips)
- [Cursorで消費が激しい作業一覧｜無料版で枠が早く減る依頼パターン](/blog/cursor-token-heavy-tasks)

## 無料枠・実測の置き場と次に読む記事

筆者はToolArcの立ち上げ時にCursor無料版を使い、使用上限へ到達するまでの作業を記録しました。

当時の実測では、Webサイトの基本画面と記事2本の公開、画面調整などを進められました。一方、複数ページを横断する変更や、参照資料を大量に読み込ませる依頼では、消費が大きくなる傾向がありました。

| 実測で確認したこと | 結果 |
| --- | --- |
| 小規模サイト制作 | 基本画面と記事2本の公開まで進行 |
| 軽い文字・画面修正 | 複数回実行 |
| 複数ファイルを横断する変更 | 消費が大きくなりやすかった |
| 上限到達後 | 21時間後にも解除を確認できなかった |

これは当時の筆者環境における実測であり、現在のプラン仕様や、すべての利用者に同じ結果が出ることを示すものではありません。

無料枠を長持ちさせる具体策は、[Cursor無料版を長持ちさせる5つの習慣](/blog/cursor-free-plan-tips)で確認できます。どの依頼が重くなりやすいかを先に知りたい方は、[消費が激しい作業一覧](/blog/cursor-token-heavy-tasks)へ進んでください。

### まとめと次の一歩

Cursor開発で最初に必要なのは、すべての機能を覚えることではありません。Settings、Rules、参照範囲の3点を整え、小さな依頼から差分を確認することが基本です。

次に読む記事は、今の状況から1本選んでください。

1. 初期設定を確認したい → [Cursor Settings](/blog/cursor-recommended-settings-tips)
2. 毎回の前提指示を減らしたい → [Cursor Rules](/blog/cursor-rules-file-tips)
3. Agentの参照範囲を確認したい → [参照ファイル確認プロンプト](/blog/cursor-reference-file-prompt-tips)
4. ターミナル中心で開発したい → [Claude Code ガイド](/blog/claude-code-guide)
5. 外部ツールとの接続を知りたい → [MCPガイド](/blog/mcp-guide)

## Cursor開発シリーズ 記事一覧（テーマ別）

上の「読む順番」で土台を整えたあとは、必要になったテーマだけ拾い読みできます。このシリーズの公開記事をテーマ別にまとめました。

### モード・依頼の書き方

- [資料を先読みさせるときはAskモードを使う](/blog/cursor-ask-mode-tips)｜調査と実装でモードを分けたい人向け
- [Agentは一括公開・基盤横断変更に絞って使う](/blog/cursor-agent-scope-tips)｜Agentの使いどころを決めたい人向け
- [Plan出力は.plan.mdで保存すると実装がぶれない](/blog/cursor-plan-mode-md-save-tips)｜計画を残して実装を安定させたい人向け
- [Plan Modeでplan.mdが作られないときの依頼文](/blog/cursor-implementation-plan-file-request)｜計画ファイルが出ないときの人向け
- [.cursorignoreでtoken消費を抑える](/blog/cursor-cursorignore-token-context)｜読み込ませたくないファイルを除外したい人向け
- [外部AIの記事をリファクタする前に判断する](/blog/cursor-refactor-judgment-before-apply-tips)｜他AIの出力を取り込む前に確認したい人向け
- [依頼文に「初心者向けに説明して」を足す](/blog/ai-prompt-beginner-friendly)｜AIの説明を分かりやすくしたい人向け
- [デバッグ依頼は「整理しすぎない」方がいい](/blog/ai-debug-keep-raw-error-info)｜エラー情報の渡し方に迷う人向け

### Agent運用・事前チェック

- [開発前に見る3つの画面](/blog/cursor-pre-dev-checklist)｜依頼前の確認手順を固めたい初心者向け
- [変更前に確認したいファイルの見方](/blog/cursor-file-check-before-edit)｜編集範囲を先に把握したい人向け
- [AgentがAuto-runで止まったときの復旧3ステップ](/blog/cursor-agent-pause-recovery-tips)｜Agentが途中で止まる人向け
- [Agentが意図せず編集したらgit restoreで戻す](/blog/cursor-agent-unintended-edit-git-restore-tips)｜想定外の変更を戻したい人向け
- [Agent failedが出たときの切り分け手順](/blog/cursor-agent-failed-tips)｜Agentが失敗する人向け
- [Claudeで構成→Cursorで実装の2ステップ](/blog/claude-cursor-2step-workflow-tips)｜文案と実装を分けたい人向け
- [下書き→ChatGPTレビューの手順](/blog/cursor-chatgpt-review-tips)｜公開前にレビューを挟みたい人向け

### 差分・変更の確認

- [「何を直したか」を確認する3つの見方](/blog/cursor-diff-check-tips)｜変更内容を見落としたくない人向け
- [変更箇所を確認するショートカット](/blog/cursor-diff-shortcut-tips)｜差分確認を素早くしたい人向け

### エラー・重さのトラブル対応

- [エラーが出た時の切り分け順](/blog/cursor-error-triage-checklist)｜どこから調べるか迷う初心者向け
- [ターミナルエラーを読む最初の3行](/blog/cursor-terminal-error-first-3-lines)｜エラーの読み方が分からない人向け
- [同じエラーが続くときに試す3つの順番](/blog/cursor-repeated-error-tips)｜エラーが直らない人向け
- [急に重くなった時に確認したいこと](/blog/cursor-slow-troubleshoot-tips)｜動作が重い人向け
- [Windowsだけ重いときに確認すること](/blog/cursor-windows-slow-check-tips)｜Windows環境で重い人向け

### 使用上限・モデル

- [Proの「Total usage limit reached」対処法](/blog/cursor-pro-total-usage-limit-reached)｜上限に到達した有料ユーザー向け
- [total usage limit reachedの対処3ステップ](/blog/cursor-usage-limit-reached-3-steps)｜上限表示を早く解消したい人向け
- [Auto/手動モデル切替で品質が落ちたときの対処](/blog/cursor-auto-manual-model-quality-tips)｜出力品質が不安定な人向け

### Git・環境・その他

- [Gitブランチを安全に切る基本手順](/blog/git-branch-basic-tips)｜記事1本＝1ブランチ運用を始めたい人向け
- [git stash popで元に戻す使い方](/blog/git-stash-pop-tips)｜作業を一時退避したい人向け
- [Agentに--fillでPR作成を依頼する](/blog/cursor-agent-gh-pr-create-fill)｜PR作成を自動化したい人向け
- [複数リポジトリを開く方法](/blog/cursor-workspace-multi-repo-tips)｜複数プロジェクトを横断したい人向け
- [配色（テーマ）を変更する方法](/blog/cursor-theme-color-change-tips)｜画面が見づらくなった人向け

### 比較・使い分け

- [Cursorでできること・苦手なこと](/blog/cursor-strengths-weaknesses)｜導入前に判断したい人向け
- [CursorとClaudeの使い分け](/blog/cursor-claude-usecase-comparison)｜2つの役割分担を知りたい人向け
- [CursorとChatGPTの使い分け](/blog/cursor-chatgpt-usecase-comparison)｜用途で選び分けたい人向け

---

本記事は、2026-07-18時点の公開記事構成と筆者の実運用に基づいています。Cursorの画面、モード、モデル、料金、利用上限などは変更される可能性があります。重要な設定や契約判断の前には、Cursorの公式ドキュメントと現在の管理画面を確認してください。
