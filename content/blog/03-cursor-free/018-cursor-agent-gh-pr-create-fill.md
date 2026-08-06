---
title: "Cursor×GitHub連携ガイド｜Agentでgh pr createする手順"
description: "Cursor AgentでGitHubのPR作成まで進めたい人向けに、gh認証の前提から--fill付き依頼、権限・リモート・下書きPRのつまずきまでを1本の手順として整理しました。"
date: 2026-06-11
tags:
  - Cursor
  - CursorAgent
  - GitHub
  - gh-cli
  - PR作成
  - 1分Tips
  - DevOps
  - cursor-free
site: toolarc.jp
target: "Cursor AgentにGitHub操作を任せたい初心者・実践者"
last_update: 2026-08-06
---

# Cursor×GitHub連携ガイド｜Agentでgh pr createする手順

Cursor Agent は CLI（コマンドラインインターフェース）上で `git commit` や `gh pr create` などの GitHub 操作を実行できます。ただし、依頼の仕方を少し間違えると、対話プロンプト（title や body を入力してください、という確認）で処理が止まってしまいます。

初心者のうちは「Agentに任せたいのに、権限やリモートの手前で詰まる」ことも多い。本記事では、`--fill` を軸に、前提確認からつまずきまでを**連携ガイド**として通読できるようにまとめます。トークンや認証情報の実値は書きません。

> **今日の結論**
> - Cursor Agent は CLI で GitHub 操作（commit・push・PR 作成）が可能
> - 先に `gh` のログイン状態とリモートを確認してから Agent に任せる
> - `gh pr create` だけだと対話プロンプトが発生し、自動化環境では止まりやすい
> - 依頼文に `--fill` を明示すれば、直近のコミットメッセージから PR 本文を自動生成できる
> - 権限・リモート・下書きPRの扱いで止まったら、対話を増やす前に前提を見直す

## 前提（gh と認証）

次が揃っているかを、Agent に任せる前に確認します。

1. **GitHub CLI（`gh`）が入っている**: ターミナルで `gh --version` が通る
2. **ログイン済み**: `gh auth status` でアカウントとスコープが見える（表示にトークン実値は出さない）
3. **リモートが正しい**: `git remote -v` で push 先が意図したリポジトリになっている
4. **作業ブランチ**: `main` 直コミットを避け、feature ブランチ上で変更している

開発前の画面確認（使用量・モデル・ルール）は、[Cursor初心者の1日ワークフロー｜開発前に見る3画面チェック](/blog/cursor-pre-dev-checklist) の流れと合わせておくと止まりにくいです。

## なぜ `--fill` が必要なのか

`gh pr create`（GitHub CLI のプルリクエスト作成コマンド）は、デフォルトでタイトルと本文の入力を対話形式で求めます。人間がターミナルを操作している場合は問題ありませんが、Cursor Agent のような自動実行環境では**対話への応答ができず、処理がそのまま止まる**ことがあります。

`--fill` オプションを付けると、直近のコミットメッセージを元にタイトルと本文を自動補完してくれるため、対話なしで PR を作成できます。

## 手順：AgentへのPR作成依頼

```bash
# 1. ブランチで変更をコミット（AgentまたはGit手動）
git commit -m "fix: OG画像フォールバック修正"

# 2. リモートへプッシュ
git push -u origin HEAD

# 3. --fill でPR作成（対話なし）
gh pr create --fill
```

**Cursor Agent への依頼文の例：**

```text
今のブランチをpushして、gh pr create --fill でPRを作成してください。
```

タイトルや本文を自分で指定したい場合は、`--title` と `--body` を追加します。

```bash
gh pr create --fill --title "fix: OG画像フォールバック修正" --body "fallback先をdefault-og.pngに変更"
```

push 前の確認を習慣にしたい場合は、[GitHub push前の確認ポイント5つ](/blog/github-push-checklist) もあわせてどうぞ。

## つまずきやすいところ

### 権限・認証

`gh auth status` が失敗する、または PR 作成で権限エラーになる場合は、Agent に何度も同じ依頼を出すより先に、手元でログインし直します。組織リポジトリでは SSO や追加権限が必要なことがあります。認証情報の文字列はチャットや記事に貼らない。

### リモート・ブランチ

`git push` が別リポジトリや別アカウントに向いていると、PR 先が意図とずれます。`git remote -v` と現在ブランチ名を先に確認する。複数リポジトリを1つのウィンドウで扱っている場合は、[Cursorで複数リポジトリを扱うときの注意](/blog/cursor-workspace-multi-repo-tips) も参考にしてください。

### 下書きPR・空の差分

コミットが無い、またはリモートに未 push のままだと、PR 作成が空振りしやすいです。また、下書き（draft）で作りたい場合は依頼文にその旨を明示します。対話プロンプトで止まっているように見えても、実体は「差分なし」「権限不足」のことが多い。

Agent が途中で止まったときの再開は、[Cursor Agentが止まったときの再開と確認手順](/blog/cursor-agent-pause-recovery-tips) を参照してください。

## チェックリスト

- [ ] `gh --version` と `gh auth status` を確認した（実値は残さない）
- [ ] `git remote -v` と作業ブランチを確認した
- [ ] 変更を commit し、`git push -u origin HEAD` した
- [ ] Agent への依頼文に `gh pr create --fill` を明示した
- [ ] 必要なら `--title` / `--body`、または draft の指定を足した

## まとめ・次に読む

| 依頼方法 | 対話プロンプト | 自動化環境 |
|---|---|---|
| `gh pr create`（オプションなし） | 発生する | 止まりやすい |
| `gh pr create --fill` | 発生しない | スムーズ |
| `--title` `--body` 併記 | 発生しない | スムーズ |

Cursor Agent に GitHub 操作を任せるときは、**対話が発生しないコマンド形式を依頼文に明示する**のが確実です。`--fill` を習慣にしておくと、PR 作成での詰まりがなくなります。

シリーズ入口は [Cursor Free（無料枠）｜初心者が最初に確認する開発ガイド](/blog/cursor-free) です。Agent の使いどころは [Cursor Agentは記事一括公開と基盤横断変更に絞って使う](/blog/cursor-agent-scope-tips)、PR 後の確認は [Vercel Previewを本番前に確認する理由](/blog/nextjs-vercel-preview-check-tips) もあわせてどうぞ。

本記事の内容は執筆時点（2026-08-06）の情報に基づきます（初出 2026-06）。Cursor Agent および GitHub CLI（gh）の仕様は予告なく変更される場合があります。最新情報は[GitHub CLI 公式ドキュメント](https://cli.github.com/manual/gh_pr_create)をご確認ください。
