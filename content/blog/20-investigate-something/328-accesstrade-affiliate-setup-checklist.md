---
title: "AccessTrade追加時のチェックリスト｜ASPごとの実装ログ"
description: "自作のアフィリエイトリンク管理システムに新しいASP『AccessTrade』を追加したときの実装チェックリストです。クリックURLの形式や確認すべきファイルを、筆者の実装ログをもとに整理しました。"
date: 2026-07-07
slug: accesstrade-affiliate-setup-checklist
tags:
  - AccessTrade
  - アフィリエイト
  - Next.js
  - 実装
  - チェックリスト
  - ASP
site: toolarc.jp
target: "自作ブログで独自のアフィリエイトリンク管理システムを運用している個人開発者"
last_update: 2026-07-07
---

# AccessTrade追加時のチェックリスト｜ASPごとの実装ログ

新しいASP案件を扱うとき、「プログラム一覧に追記するだけでいい」と考えて手を動かし始めると、思ったより手順が多いことに気づきます。筆者も今回AccessTrade案件を追加する際、最初は登録ファイルを1つ増やすだけのつもりが、URL分岐や検証まわりまで一緒に見直すことになりました。

> **今日の結論**
>
> - AccessTrade追加は「programs登録」だけでなく、ASP分岐・URL検証までセットで直す必要がある
> - クリックURLは `/sp/cc`、画像・計測は `/sp/rr`。A8の形式とは別物として扱う
> - 記事本文には `affiliate:programId:creativeId` のマーカーだけを書き、実URLは1か所に集約する
> - 登録後は検証コマンドとビルドの両方を通してから公開判断する
> - ファイルの役割を一覧化しておくと、次のASP追加でも同じ手順を使い回せる

## なぜ「programs登録」だけでは動かないのか

筆者の管理システムでは、記事本文にはASPの生URLを書かず、`affiliate:programId:creativeId` というマーカーだけを置き、実際のURLへの変換は別ファイルに集約する設計にしています。

この設計だと、新しいASPを追加するときも「programsファイルにURLを書けば終わり」に見えます。ただ実際には、ASPごとにクリックURLや計測タグの形式が異なるため、変換ロジック（ASP分岐）と、生URLが本文に紛れ込んでいないかを確認する検証ロジックの両方を、同時に見直す必要がありました。

## AccessTrade特有のURL形式を確認する

今回の実装で確認できたAccessTradeの形式は、次のとおりです。

- クリックURLは `/sp/cc` 形式
- 画像・計測タグは `/sp/rr` 形式
- 同じ管理システムで扱っているA8の `a8mat` 形式とは別物

ASPごとにURLの組み立て方が違うため、既存ASP用の分岐をそのまま流用すると意図しない形式でリンクが生成されてしまう可能性があります。記事本文側は引き続き `affiliate:programId:creativeId` のマーカーだけを書く運用のままで問題ありません。マーカー方式の執筆ルール全体は、[記事Markdownはaffiliateマーカーのみ｜生URL禁止ルール](/blog/affiliate-marker-only-no-raw-url)にまとめています。独自スキームのリンクがreact-markdown環境で正しく機能しない場合の対処は、[react-markdownでaffiliate:リンクが空になるときの対処法](/blog/react-markdown-affiliate-link-empty-fix)で整理しています。

## 実際に触ったファイルと役割

今回の対応で触ったファイルと役割は、次のとおりです。

| ファイル | 役割 | 対応内容 |
| --- | --- | --- |
| `lib/affiliate/programs/<programId>.ts` | 案件ごとの登録情報 | 新規作成 |
| `lib/affiliate/types.ts` | プログラムIDの型定義 | AccessTrade分を追加 |
| `lib/affiliate/registry.ts` | 登録情報の接続先 | 新規プログラムを接続 |
| `lib/affiliate/asp/accesstrade.ts` | ASPごとのURL組み立て | 新規作成 |
| `lib/affiliate/resolve.ts` | マーカー→実URLの解決 | ASP分岐を追加 |
| `lib/affiliate/validate.ts` | 生URL混入の検出 | AccessTrade形式を検出パターンに追加 |

## 登録前チェックリスト

新しいASPを追加するときに、筆者が確認している項目です。

- [ ] 案件ごとのcreative一覧を確認し、`programs/<programId>.ts` を作成した
- [ ] `types.ts` にプログラムIDを追加した
- [ ] `registry.ts` で新規プログラムを接続した
- [ ] `asp/<ASP名>.ts` を追加し、`resolve.ts` でASP分岐を実装した
- [ ] `validate.ts` の生URL検出パターンに新ASPの形式を追加した

## 動作確認コマンド

登録が終わったら、次の2つを通してから公開判断をしています。

1. `npm run validate:affiliate` を実行し、記事本文に生URLが紛れ込んでいないかを確認する
2. `npm run build` を実行し、ビルドが通ることを確認する

どちらか一方だけでは、マーカーの解決漏れや生URL混入に気づけないことがあるため、2つセットでの確認を基本にしています。

## まとめ・次に読む

新しいASPの追加は、programs登録だけで完結するわけではなく、URL形式の違いを踏まえたASP分岐と検証ロジックの見直しがセットになります。今回整理した手順は、次にASPを追加するときのチェックリストとしてそのまま使う想定です。

- [記事Markdownはaffiliateマーカーのみ｜生URL禁止ルール](/blog/affiliate-marker-only-no-raw-url)
- [react-markdownでaffiliate:リンクが空になるときの対処法](/blog/react-markdown-affiliate-link-empty-fix)
- 今回のAccessTrade案件は、[AIの基礎を無料で学ぶ方法｜ChatGPT・Claudeを使う前のチェックリスト](/blog/ai-basics-before-chatgpt-claude-checklist)内でも実際に使用しています

---

**免責**：本記事は筆者が実際に行った実装（2026-07-07時点）をもとにしています。ASP側の仕様やURL形式は変更される場合があるため、実装前に各ASPの公式ドキュメントもあわせてご確認ください。
