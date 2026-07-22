---
title: "Cursor Agentが意図せず編集したときはgit restoreで戻す"
description: "Cursor Agentがお願いしていない範囲まで編集してしまったときの戻し方を整理しました。git restoreでファイルを戻し、新規フォルダはRemove-Itemやgit cleanで削除、Vault（Obsidian）はgit管理外という注意点まで解説します。"
date: 2026-07-17
tags:
  - Cursor
  - Git
  - git restore
  - Agent
  - PowerShell
  - 開発ワークフロー
site: toolarc.jp
target: "Cursor AgentにNext.jsサイトの修正を任せていて、想定外の範囲まで編集された初心者読者"
last_update: 2026-07-17
slug: cursor-agent-unintended-edit-git-restore-tips
---

# Cursor Agentが意図せず編集したときはgit restoreで戻す

Cursor Agentに「このファイルだけ直して」と頼んだはずなのに、確認したら関係ないファイルまで書き換わっていた。そんな経験はないでしょうか。

筆者も同じ状況になり、一瞬「元に戻せないのでは」と焦りましたが、コミットさえしていなければ、Gitの標準機能だけで安全に戻せます。

この記事では、Cursor Agentが意図しない範囲まで編集してしまったときに、`git restore` と関連コマンドで元の状態に戻す手順を1分で整理します。実行例のパスは筆者環境の例です。自分のリポジトリのルートに読み替えてください。

> **今日の結論**
>
> - `git pull origin main` をしても、手元の未コミット変更は消えない（up to date のまま残るだけ）
> - 意図しない編集をされたファイルは `git restore <ファイル>` で戻せる
> - Agentが新規作成したフォルダは `Remove-Item` または `git clean -fd <path>` で削除する
> - Vault（Obsidian）はGit管理外のため、`git restore` は効かない点に注意する
> - 最後は `git status` で「変更なし」の状態を確認してから作業を再開する

---

## 手順1｜意図しない変更をgit restoreで戻す

**状況**：Agentに依頼した範囲以外のファイルまで、内容が書き換わっている。

**原因**：Agentがプロジェクト全体を参照した際に、依頼外のファイルまで「関連がある」と判断して編集してしまうことがあります。

**対策**：まだコミットしていなければ、対象ファイルを指定して元に戻します。

```powershell
cd C:\projects\toolarc-web
git restore <変更ファイル>
```

複数ファイルをまとめて戻したい場合は、パスをスペース区切りで並べて指定できます。

## 手順2｜新規に作られたフォルダを削除する

**状況**：`git restore` をかけても、Agentが新しく作ったフォルダやファイルが残っている。

**原因**：`git restore` は「Gitが把握している既存ファイルの内容」を戻すコマンドで、新規作成されたファイル・フォルダ（未追跡状態）には効きません。

**対策**：不要な新規フォルダを削除します。

```powershell
Remove-Item -Recurse -Force <新規フォルダ> -ErrorAction SilentlyContinue
```

対象が複数にまたがる場合や、どこが新規か把握しきれない場合は、Git側に未追跡ファイルをまとめて削除させる方法もあります。

```powershell
git clean -fd <対象パス>
```

`git clean` は削除すると元に戻せないため、先に `git clean -nd <対象パス>`（ドライラン）で削除対象を確認してから実行すると安全です。

## 手順3｜git statusで最終確認する

**状況**：ファイルを戻し、新規フォルダも削除した。

**対策**：最後に `git status` を実行し、意図しない変更が残っていないかを確認します。

```powershell
git status
```

`nothing to commit, working tree clean` と表示されれば、意図しない編集はすべて解消されている状態です。

---

## 注意｜Vault（Obsidian）はgit restoreが効かない

Obsidian で管理している Vault は、多くの場合 Git 管理下に置いていません。そのため、Vault 側のファイルが意図せず書き換わった場合、`git restore` では戻せません。

Vault側の変更は、Obsidianの「ファイル復元」機能やバックアップ・同期設定側で対応する必要があります。リポジトリ（toolarc-web など）とVaultは別の仕組みで管理されている、という前提を持っておくと混乱しにくくなります。

---

## 確認チェックリスト

- □ まだコミットしていないことを確認した（コミット済みの場合は別の戻し方が必要）
- □ 意図しない変更ファイルを `git restore` で戻した
- □ Agentが新規作成したフォルダ・ファイルを `Remove-Item` または `git clean` で削除した
- □ `git clean` の前に `-n`（ドライラン）で削除対象を確認した
- □ `git status` が `nothing to commit, working tree clean` になっている
- □ Vault（Obsidian）側の変更は、git restoreとは別の方法で確認した

## まとめ・次に読む

Agentが依頼範囲外まで編集してしまっても、コミット前であれば `git restore` と `git clean` の組み合わせで安全に戻せます。落ち着いて `git status` から状況を確認する習慣をつけておくと、復旧がスムーズになります。

Agentの動きがAuto-runで止まってしまったときの復旧手順は、[Cursor AgentがAuto-runで止まった｜3ステップの復旧手順](/blog/cursor-agent-pause-recovery-tips) を参照してください。

記事修正を安全に進めたい場合は、[Gitブランチを安全に切る基本手順｜記事1本＝1ブランチ運用のすすめ](/blog/git-branch-basic-tips) もあわせて読むと、そもそも意図しない編集の影響範囲を小さくできます。

Cursor無料版の使い方・消費を抑えるコツ全体は、シリーズのHub記事 [Cursor無料版はどこまで使える？実際に上限到達まで使った記録と制限](/blog/cursor-free) にまとまっています。

同日公開の関連記事: [ChatGPT機種変更で最初に見る3画面｜ログイン・履歴・プラン表示](/blog/chatgpt-device-change-3-screens-tips)、[series.tsのシリーズ判定は先勝ち｜移管は同一コミットで完結させる](/blog/series-ts-get-series-for-post-first-win-same-commit-tips)

---

※ 本記事の内容は執筆時点（2026-07-17）の手順です。Cursor・Gitのバージョンや仕様は変更される場合があるため、最新の挙動と異なる場合は公式ドキュメントもあわせてご確認ください。
