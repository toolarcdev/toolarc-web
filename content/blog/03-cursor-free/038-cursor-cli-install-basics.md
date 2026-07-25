---
title: "Cursor CLIのインストールと基本操作｜agentコマンドで始める手順"
description: "Cursorをエディタでは使い始めたがターミナルでもAgentを動かしたい初心者向けに、CLIのインストール手順とagentの基本操作を公式手順ベースで整理します。"
date: 2026-07-25
tags:
  - Cursor
  - Cursor CLI
  - agentコマンド
  - ターミナル
  - インストール
  - Tips
  - 初心者
  - cursor-free-series
site: toolarc.jp
target: "Cursorをエディタでは使い始めたが、ターミナル／CLIでの使い方を知りたい初心者"
---

# Cursor CLIのインストールと基本操作｜agentコマンドで始める手順

Cursorをエディタで使い始めると、「ターミナルでも同じAgentを動かしたい」という場面が出てきます。SSH先やCI、エディタを開きたくない短い作業では、CLI（コマンドライン）の方が扱いやすいことがあります。

本記事では、執筆時点（2026-07-25）の[公式インストール手順](https://cursor.com/docs/cli/installation)と[CLI概要](https://cursor.com/docs/cli/overview)を正本に、インストールから最初の対話までの流れをまとめます。筆者の作業環境では当日時点で `agent` コマンドが未導入だったため、**本記事は公式ドキュメントの手順整理が中心**です。実際の画面表示や認証フローは、手元で確認してから進めてください。シリーズ入口は [Cursor 開発ガイド](/blog/cursor-free) です。

> **今日の結論**
>
> - Cursor CLI は公式の1行インストールで導入し、確認は `agent --version`
> - 対話の起点は `agent`。モードは Agent / Plan / Ask を切り替えられる（執筆時点）
> - Windows は PowerShell 用の導入コマンド、macOS / Linux / WSL は curl 用の導入コマンドを使う
> - PATH に `~/.local/bin` が入っていないと、インストール後でもコマンドが見つからないことがある
> - ターミナル中心の別入口として [Claude Code ガイド](/blog/claude-code-guide) もある。目的で選ぶ

---

## Cursor CLIとは何か（エディタとの違い）

Cursor CLI は、ターミナルから AI Agent に依頼してコードの作成・確認・修正を進めるための公式ツールです。エディタの Cursor と同じく Agent / Plan / Ask の考え方があり、対話セッションやスクリプト向けの非対話実行にも対応します（執筆時点の公式概要）。

向くのは次のような場面です。

- エディタを開かずに、短い調査や修正をターミナルで済ませたい
- 既存のシェル作業の流れに Agent を挟みたい
- 将来的に自動化や CI へつなぐ前提で、まず手元で触っておきたい

一方、差分をGUIで細かく見ながら進めたい初期段階は、エディタ側の方が分かりやすいことも多いです。モードの考え方自体は [Cursorモード使い分けガイド](/blog/cursor-plan-mode-modify-before-build-tips) と揃えておくと迷いが減ります。

---

## インストール手順（OS別）

公式の導入コマンドは OS で分かれます。コピーする前に、自分が使うシェルを確認してください。

### macOS / Linux / WSL

```bash
curl https://cursor.com/install -fsS | bash
```

### Windows（ネイティブ PowerShell）

```powershell
irm 'https://cursor.com/install?win32=true' | iex
```

### インストール後の確認

```bash
agent --version
```

バージョンが表示されれば、コマンド自体は認識されています。表示されない場合は、次の PATH 設定を確認してください。

### PATH に入れる（見つからないとき）

公式手順では、インストール後に `~/.local/bin` を PATH へ追加します。

bash の例:

```bash
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

zsh の例:

```bash
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

Windows の PATH 反映は環境によって異なるため、導入後に新しいターミナルを開き直してから `agent --version` を再実行するのが安全です。

---

## 基本操作（最初に覚えるコマンド）

導入できたあとは、まず対話セッションから始めるのが分かりやすいです。

```bash
# 対話を開始する
agent

# 最初の依頼文を付けて開始する
agent "認証まわりのリファクタ方針を整理して"

# 手動で最新版へ更新する（自動更新もある）
agent update
```

執筆時点の公式概要では、モード切り替えもできます。

| モード | 用途の目安 | 例（執筆時点） |
|--------|------------|----------------|
| Agent | 実装・ファイル操作まで進める | 既定、または通常起動 |
| Plan | 方針を先に固める | `--plan` / `--mode=plan` / `/plan` |
| Ask | 読む・調べるだけで変更しない | `--mode=ask` / `/ask` |

非対話（スクリプト向け）の例もあります。

```bash
agent -p "この差分のセキュリティ観点をレビューして" --output-format text
```

セッションの再開は `agent ls` / `agent resume` / `agent --continue` などが案内されています。詳細なフラグや認証（`agent auth` や API キー）は変更されやすいので、作業前に[公式の認証リファレンス](https://cursor.com/docs/cli/reference/authentication)を確認してください。

---

## 導入チェックリスト

| チェック項目 | 確認 |
|--------------|------|
| OSに合った公式インストールコマンドを使った | ☐ |
| `agent --version` でバージョンが出る | ☐ |
| 出ない場合、PATH（`~/.local/bin` 等）を見直した | ☐ |
| `agent` で対話を一度起動できた | ☐ |
| 変更したくない調査は Ask、実装は Agent と分けて考えた | ☐ |
| 公式ドキュメントの日付・手順を再確認した | ☐ |

---

## まとめ・次に読む

Cursor CLI は「エディタの代わり」というより、**ターミナルでも同じ Agent 体験を使える入口**です。まずは公式インストール → `agent --version` → `agent` の3手で十分です。細かい自動化や Cloud Agent 連携は、手元で対話が通ってから広げると安全です。

- Hub: [Cursor 開発ガイド｜初心者向けの始め方と読む順番](/blog/cursor-free)
- 隣の入口: [Claude Code ガイド](/blog/claude-code-guide)（ターミナル志向の別クラスター）
- モードの考え方: [Cursorモード使い分けガイド](/blog/cursor-plan-mode-modify-before-build-tips)
- Agentの使いどころ: [Cursor Agentは記事一括公開と基盤横断変更に絞って使う](/blog/cursor-agent-scope-tips)

公式の入口ページ: [Cursor CLI](https://cursor.com/cli) / [Installation](https://cursor.com/docs/cli/installation) / [Overview](https://cursor.com/docs/cli/overview)

---

本記事は 2026-07-25 時点の Cursor 公式ドキュメントをもとに整理しています。インストールコマンド、`agent` のサブコマンド、モード名、認証方法、料金・利用上限は変更されることがあります。重要な作業の前には公式ドキュメントで最新手順を確認してください。
