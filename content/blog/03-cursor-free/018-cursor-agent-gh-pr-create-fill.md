---
title: "Cursor AgentにPR作成を依頼するなら--fillオプションが確実"
description: "Cursor AgentはCLIでgh pr createを実行できますが、対話プロンプトで止まることがあります。--fillを指定すればコミットメッセージからPR本文を自動生成でき、スムーズに作業が進みます。"
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
---

# Cursor AgentにPR作成を依頼するなら--fillオプションが確実

Cursor Agent は CLI（コマンドラインインターフェース）上で `git commit` や `gh pr create` などの GitHub 操作を実行できます。ただし、依頼の仕方を少し間違えると、対話プロンプト（title や body を入力してください、という確認）で処理が止まってしまいます。

> **今日の結論**
> - Cursor Agent は CLI で GitHub 操作（commit・push・PR 作成）が可能
> - `gh pr create` だけだと対話プロンプトが発生し、自動化環境では止まりやすい
> - 依頼文に `--fill` を明示すれば、直近のコミットメッセージから PR 本文を自動生成できる

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

## まとめ

| 依頼方法 | 対話プロンプト | 自動化環境 |
|---|---|---|
| `gh pr create`（オプションなし） | 発生する | 止まりやすい |
| `gh pr create --fill` | 発生しない | スムーズ |
| `--title` `--body` 併記 | 発生しない | スムーズ |

Cursor Agent に GitHub 操作を任せるときは、**対話が発生しないコマンド形式を依頼文に明示する**のが確実です。`--fill` を習慣にしておくと、PR 作成での詰まりがなくなります。

## 関連記事

- [Cursor無料版はどこまで使える？（実測レビュー）](/blog/cursor-free)
- [Cursor Agentは記事一括公開と基盤横断変更に絞って使う](/blog/cursor-agent-scope-tips)
- [Cursor Agentが止まったときの再開と確認手順](/blog/cursor-agent-pause-recovery-tips)
- [Vercel Previewを本番前に確認する理由｜PR単位でミスを防ぐ手順](/blog/nextjs-vercel-preview-check-tips)
- [GitHub push前の確認ポイント5つ【git statusを最初に習慣化する】](/blog/github-push-checklist)

---

> **免責**: 本記事は2026年6月時点の Cursor Agent および GitHub CLI（gh）の動作をもとに執筆しています。仕様は予告なく変更される場合があります。最新情報は[GitHub CLI 公式ドキュメント](https://cli.github.com/manual/gh_pr_create)をご確認ください。
