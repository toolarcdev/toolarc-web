---
title: "Hub記事昇格後は既存SpokeのHubリンクを差し替える"
description: "Tips記事をHubに昇格したとき、既存Spokeが参照していた旧Hubリンクの差し替えを忘れると回遊導線が弱まります。series.ts登録からbuild確認までの手順をまとめました。"
date: 2026-06-09
tags:
  - Hub/Spoke
  - 内部リンク
  - series.ts
  - GSC
  - 1分Tips
  - サイト設計
  - toolarc
site: toolarc.jp
target: "ToolArcのシリーズ設計・内部リンク管理に取り組んでいる運営者"
---

# Hub記事昇格後は既存SpokeのHubリンクを差し替える

Tips 記事を Hub に昇格するとき、やりがちな抜け漏れが**既存 Spoke の旧 Hub リンク差し替え忘れ**です。新しい Hub を設定しても Spoke が旧 URL を参照し続けると、シリーズ全体の回遊導線と専門性のつながりが弱まる可能性があります（効果は要確認）。

> **この記事の結論**
>
> - Tips 記事を Hub に昇格すると、既存 Spoke が参照していた旧 Hub リンクを差し替える必要がある
> - 昇格後は `series.ts` に Hub + Spoke を登録し、Hub URL とシリーズページ URL を GSC 依頼候補に加える
> - 差し替え漏れは回遊と専門性の導線を弱める可能性がある（効果は要確認）

---

## 昇格作業の手順

### 1. 昇格する slug と旧参照先をメモする

どの記事が Hub になるか、そして現在の Spoke が参照している旧 Hub URL はどれかを最初に整理します。後の差し替えステップで抜け漏れを防ぐためのリストです。

### 2. Hub 本文・source.md を更新する

Hub 記事の本文を Hub としての内容に整えます。合わせて `posts.ts` の該当エントリーを確認し、必要であれば frontmatter も更新します。

### 3. `series.ts` に Hub + Spoke を登録する

新しいシリーズ定義を `series.ts` に追加します。Hub slug と各 Spoke slug を `spokeSlugOrder` に並べ、登録順がシリーズページの表示順になります。

### 4. 既存 Spoke の Hub リンクを新 slug に差し替える

昇格前に旧 Hub を参照していた既存 Spoke 記事の「関連記事」「次に読む」セクションを開き、リンク先を新しい Hub slug に更新します。**ここが最も抜け漏れしやすいステップ**です。

### 5. build 後にブラウザで相互リンクを確認する

```bash
npm run build
```

ビルド後、Hub・シリーズページ・各 Spoke をブラウザで開き、リンクの向き先が正しいかを目視で確認します。

---

## 差し替え後のチェックリスト

| チェック項目 | 確認 |
|------------|------|
| 昇格する slug と旧参照先をリストアップした | ☐ |
| Hub 本文・source.md を更新した | ☐ |
| `posts.ts` / frontmatter を整えた | ☐ |
| `series.ts` に hub + spokes を登録した | ☐ |
| 既存 Spoke の Hub リンクをすべて新 slug に差し替えた | ☐ |
| `npm run build` を実行してエラーがないことを確認した | ☐ |
| ブラウザで Hub・シリーズ・Spoke の相互リンクを目視確認した | ☐ |
| Hub URL とシリーズページ URL を GSC 依頼候補に追加した | ☐ |

---

## 次に読む

- [新規ドメインSEOのトラブルシューティング4ステップ](/blog/new-domain-seo-troubleshooting-4steps)
- [GSC画像URL 404の確認と対処](/blog/gsc-image-url-404-tips)
- [Hub記事をシリーズ複数本の参照軸に据える設計【内部リンク整理術】](/blog/hub-article-as-reference-axis-for-series)
- [公開後に既存記事へ相互リンクを逆更新する手順](/blog/cross-link-reverse-update-after-publish)
- [Spoke記事は詳細を書かず内部リンクで役割分担する](/blog/spoke-article-internal-link-role-separation)
- [series.tsにspokeを追加してシリーズページを更新する方法](/blog/series-ts-spoke-add-tips)
- [GSCのインデックス登録リクエストには1日の上限がある【新規ドメイン運用メモ】](/blog/gsc-index-request-daily-limit)

---

> **免責**: 本記事は 2026-06-09 時点の情報をもとに執筆しています。`series.ts` の仕様や Next.js のビルド挙動は変更されることがあります。最新の動作はビルドログと公式ドキュメントでご確認ください。
