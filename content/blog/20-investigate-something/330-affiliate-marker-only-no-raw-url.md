---
title: "記事Markdownはaffiliateマーカーのみ｜生URL禁止ルール"
description: "記事Markdownには`affiliate:programId:creativeId`形式のマーカーのみを書き、ASPの生URLを本文に置かない運用ルールをまとめました。validate:affiliateによるCIチェックの仕組みもあわせて紹介します。"
date: 2026-07-07
slug: affiliate-marker-only-no-raw-url
tags:
  - アフィリエイト
  - Markdown
  - Next.js
  - 実装
  - 執筆ルール
site: toolarc.jp
target: "自作ブログでアフィリエイトリンクを独自のマーカー方式で管理している、または管理したい個人開発者"
last_update: 2026-07-07
---

# 記事Markdownはaffiliateマーカーのみ｜生URL禁止ルール

記事を書いているとき、紹介したい案件のURLをそのままMarkdownに貼ってしまいそうになったことがあります。急いでいるとつい「あとで直せばいい」と思ってしまうのですが、これを放置すると、ASP側の仕様変更のたびに記事本文を1本ずつ直して回ることになります。今回は、そうならないために決めている「記事本文にはマーカーのみを書く」というルールを整理します。

> **今日の結論**
>
> - 記事Markdownには `[表示テキスト](affiliate:programId:creativeId)` 形式のマーカーのみを書きます
> - バナーリンクは `<!-- affiliate:banner:programId:creativeId -->` というコメント形式を使います
> - A8・AccessTradeなどの生URLは `lib/affiliate/programs/*.ts` に集約し、記事本文には一切書きません
> - `npm run validate:affiliate` が本文中の生URLを検出するとCIを止めるため、コミット前に必ず実行します
> - 新しいASPを追加するときの実装手順は[AccessTrade追加時のチェックリスト](/blog/accesstrade-affiliate-setup-checklist)にまとめています

## なぜ本文に生URLを書かない運用にしたのか

最初のうちは、案件のURLを直接Markdownに貼ってしまっても動作上は問題ありませんでした。ただ、ASP側でURLの形式が変わったり、案件自体を差し替えたりするたびに、該当記事を1本ずつ探して直す必要があり、記事数が増えるほど手間が増えていくことに気づきました。

そこで、記事本文には案件を指すマーカーだけを書き、実際のURLへの変換は別ファイルに集約する方式に切り替えました。これにより、URL側の変更は変換先のファイルを直すだけで済み、記事本文を触らずに済むようになりました。

## 記事Markdownで使う2つの書き方

記事本文で使う書き方は、次の2パターンだけです。

**テキストリンク**

```md
[表示テキスト](affiliate:programId:creativeId)
```

**バナー（画像リンク）**

```md
<!-- affiliate:banner:programId:creativeId -->
```

どちらの場合も、`programId` と `creativeId` の組み合わせだけを書き、実際のクリックURLや画像URLは書きません。表示方法（テキストかバナーか）に関わらず、本文側で意識するのは「どの案件のどのクリエイティブを使うか」だけで済む形にしています。

## 生URLをCIで止める仕組み

マーカー方式を決めていても、うっかり生URLを貼ってしまう可能性はゼロにはなりません。そこで、コミット前に `npm run validate:affiliate` を実行し、本文中に生URLが残っていないかを検出する仕組みを入れています。

生URLが検出された場合はCIが止まる設定にしているため、「気づかずに生URLのまま公開してしまう」ことを防げます。ASP追加時の実装手順や検証コマンドの詳細は、[AccessTrade追加時のチェックリスト](/blog/accesstrade-affiliate-setup-checklist)で整理しています。

## 執筆前チェックリスト

記事を書き終えたあと、公開前に確認している項目です。

- [ ] 本文中のリンクがすべて `affiliate:programId:creativeId` 形式になっているか確認した
- [ ] バナーは `<!-- affiliate:banner:programId:creativeId -->` 形式になっているか確認した
- [ ] ASPの生URL（クリックURL・画像URLなど）を本文に貼っていないか確認した
- [ ] `npm run validate:affiliate` を実行し、警告が出ていないか確認した

## まとめ・次に読む

記事Markdownにはマーカーだけを書き、実際のURLは1か所に集約する。このルールを徹底しておくと、ASP側の仕様変更があっても記事本文を触らずに対応できるようになります。react-markdown環境でマーカーが正しく表示されない場合の対処法は、こちらの記事で整理しています。

- [AccessTrade追加時のチェックリスト](/blog/accesstrade-affiliate-setup-checklist)
- [react-markdownでaffiliate:リンクが空になるときの対処法](/blog/react-markdown-affiliate-link-empty-fix)
- [AIの基礎を無料で学ぶ方法｜ChatGPT・Claudeを使う前のチェックリスト](/blog/ai-basics-before-chatgpt-claude-checklist)（実際にマーカー方式を使っている記事の例です）

---

**免責**：本記事は筆者が実際に運用しているルール（2026-07-07時点）をもとにしています。ASPの仕様やURL形式は変更される場合があるため、実際の実装では各ASPの公式ドキュメントもあわせてご確認ください。
