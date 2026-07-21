---
name: blog-image-router
description: >-
  Routes ToolArc blog image work by intent and reuse gates, then delegates to
  annotate-screenshot, generate-decision-diagram, generate-blog-image, or
  bake-og-text. Use when the user asks how to handle article images, which
  image skill to use, or for image routing without generating yet. Does not
  call GenerateImage itself.
---

# blog-image-router

ハブ Skill。**GenerateImage は呼ばない**。種別判定 → 流用ゲート → 専門 Skill へ委譲する。

参照: `docs/ai-context/image-intent-map.md` / `.cursor/rules/blog-image-tone.mdc`

## 起動条件

- 「この記事の画像」「画像どうする」「どの Skill」「注釈か生成か」など、振り分け・方針の依頼
- ユーザーが明示的に **生成して** と言っている場合でも、まず本ハブで手段を確定してから専門へ渡す

## 手順（毎回）

1. slug / `imageBasePath` / 目的（本文挿絵・OG・Series 帯など）を1文で確認する
2. Claude「画像提案」やジョブ票があれば、手段列に落とす（自動生成しない）
3. `public/images/blog/<imageBasePath>/` と `caption.md` を読む（**流用ゲート省略禁止**）
4. 流用できそうなら生成せず候補を提示し、人間確認を待つ
5. 下表で専門へ委譲する（委譲先の SKILL.md を読んで続行）

## 振り分け表

| 条件 | 委譲先 | 備考 |
|------|--------|------|
| 実UI手順・設定画面・エラー画面 | `annotate-screenshot` | 撮影は人間。偽UI生成禁止 |
| 比較・分岐・チェック入口の図 | `generate-decision-diagram` | 流用優先。後編集必須 |
| eyecatch / og / mood / section | `generate-blog-image` | 明示の生成依頼が必要 |
| OG／Series の日本語帯焼きこみ | `bake-og-text` | 構図再生成しない。staging 経由 |
| 数値表・ランキング表 | （生成しない） | 本文表 / Canvas / コード |
| `posts.ts` / build / 公開日 | `publish-article` | 画像配線の最終登録 |

## 出力（ハブ完了時）

- 判定した手段と委譲先 Skill 名（1行）
- 流用候補の有無（パス or なし）
- 次に人間が言うべき依頼文の例（例: 「annotate-screenshot で ss-02 に番号を付けて」）

## 禁止

- 本 Skill 内で `GenerateImage` を呼ぶこと
- 流用ゲートを飛ばして専門へ丸投げすること
- WIP を `public/` に直接置くこと（採用前は Vault `blog-image-staging`）
