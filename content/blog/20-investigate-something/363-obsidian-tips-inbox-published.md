---
title: "Tipsノートは公開時にinboxからpublishedフォルダへ移す"
description: "ObsidianのTipsノートは公開時に04-Tips/inboxからpublishedへ移すと、Dataviewのstatus整合が取りやすくなります。frontmatter更新と候補マスター同期まで、実務でつまずきやすい手順をまとめました。"
date: 2026-07-15
tags:
  - Obsidian
  - AI Workflow
  - 候補管理
  - 日次運用
site: toolarc.jp
target: "Obsidian×Cursorで記事管理を運用している実践者・運営担当者"
last_update: 2026-07-15
---

# Tipsノートは公開時にinboxからpublishedフォルダへ移す

公開したはずのTipsノートが、いつまでも `inbox` フォルダに残ったままになっていて、Dataviewの一覧やstatusがズレてしまった──という経験はないでしょうか。筆者も最初のうちは、公開後にfrontmatterだけ更新してノートの移動を忘れ、候補マスターとの整合が取れなくなることがありました。

この記事では、**Tipsノートを公開したタイミングで `04-Tips/inbox` から `04-Tips/published` へ移し、frontmatterと候補マスターを同時に更新する運用**を紹介します。

> **今日の結論**
>
> - Tipsノートは公開時に `04-Tips/inbox` から `04-Tips/published` へ移すと、Dataviewのstatus整合が取りやすい
> - frontmatterの `status: published` と `published_date` は同時に更新する
> - 候補マスター側にも `✅ YYYY-MM-DD` と公開URLを追記し、二重管理を避ける

---

## フォルダ移動を忘れると何が崩れるのか

Tipsノートのfrontmatterだけ `status: published` に更新して、ノート自体は `inbox` フォルダに残したままにしていると、Dataviewの一覧表示で「公開済みのはずなのにinboxに表示される」というズレが起きます。

これが積み重なると、inboxフォルダに公開済み・未公開のノートが混在し、日次メンテのたびに1件ずつ中身を確認する手間が発生します。**frontmatterの更新とフォルダ移動は必ずセットで行う**のがポイントです。

---

## 公開時の4ステップ

Tipsノートを公開するときは、次の順番で進めます。

1. **本番公開と `posts.ts` 登録を完了する**
2. **inboxノートのfrontmatterを `published` に更新する**（例: `status: published` と `published_date: YYYY-MM-DD` を同時に書く）
3. **ノートを `04-Tips/published/` へ移動する**
4. **候補マスターの日次メンテで status と URL を同期する**（例: `✅ YYYY-MM-DD` と `/blog/slug` を追記）

frontmatter更新とフォルダ移動を別タイミングで行うと、どちらか一方を忘れやすくなります。公開作業の一連の流れの中で、この2つを連続して実施することをおすすめします。

候補マスター側にも `✅ YYYY-MM-DD` の形式で公開日と公開URLを追記しておくと、ノート本体と候補マスターの二重管理を避けられます。調査メモから候補を増やす前日の流れは、[Cursor Ask調査結果をAI-logに残して翌日候補化する運用](/blog/cursor-ask-ai-log-tips)とつなぐと運用全体が見えやすくなります。

---

## 実例：GSC関連4本をpublishedへ移行

筆者の実例では、2026年6月4日にGSC関連のTipsノート4本をまとめて `04-Tips/inbox` から `04-Tips/published/` へ移行しました。複数本をまとめて移動する場合も、frontmatterの更新漏れがないか1件ずつ確認してから移すと安全です。

---

## まとめ・次に読む

- Tipsノートは公開時に `inbox` から `published` へ必ず移動する
- frontmatterの `status` と `published_date` はフォルダ移動とセットで更新する
- 候補マスターにも公開日とURLを追記し、二重管理を避ける
- 複数本まとめて移動するときは、1件ずつ更新漏れがないか確認する

**次に読む**

- [Obsidianで素材整理 → Claudeで記事生成 → Cursorで公開するブログ制作ワークフロー（Hub）](/blog/claude-obsidian-workflow)
- [Dashboard.mdを3〜10件フォーカスで回す日次運用【Obsidian Tips】](/blog/obsidian-dashboard-focus-tips)
- [Cursor Ask調査結果をAI-logに残して翌日候補化する運用](/blog/cursor-ask-ai-log-tips)
- 同日公開: [Hub記事を頻繁に更新すべき理由と3つの更新タイミング](/blog/hub-article-update-frequency-tips)

---

*本記事は執筆時点（2026-07-15）の運用方法に基づいています。Obsidianの仕様やプラグインの挙動は変更される場合があります。最新情報は公式ドキュメントもあわせてご確認ください。*
