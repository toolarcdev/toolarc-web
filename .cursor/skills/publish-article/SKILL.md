---
name: publish-article
description: >-
  Publishes ToolArc blog articles to toolarc-web (slot ①): place Markdown under
  content/blog, register slug in lib/blog/posts.ts, set publish dates via Get-Date,
  run npm run build, add internal links and light debt fixes. Use when the user
  asks for 記事公開, slot ①, posts.ts registration, or publishing a blog slug.
---

# publish-article（① 記事公開）

Skill = 手順。制約（公開日 Get-Date・PoE2 JSON 禁止）は `.cursor/rules/` が強制する。

## やること / やらないこと

**やる**: MD配置、`posts.ts` 登録、必要時 `series.ts`、内部リンク、`npm run build`、軽負債、公開日確定  
**やらない**: 初稿・リライト案（④）、GSC（②）、Next 基盤横断（③）、PoE2/api、Vault 候補マスター本書き（⑥へ引き継ぎ可）

## 手順

1. **公開日を確定**: `Get-Date -Format "yyyy-MM-dd"`（手入力・inbox `publishDate`・初稿 `date` は使わない）
2. **本文 MD**: `content/blog/<contentId>/` に配置。新規1分Tipsは `contentId` = `20-investigate-something`
3. **posts.ts**: slug キーで1件追加。`markdownFile` / `imageBasePath` / `publishedAt` / `category` を既存に合わせる
4. **日付反映**
   - 新規: frontmatter `date` と `publishedAt` を実装日で一致。免責「執筆時点」も同じ日
   - リライト: `date` / `publishedAt` 据え置き。`last_update` と免責日のみ実装日
5. **シリーズ**: Hub/シリーズなら `lib/series/series.ts` に spoke 追加
6. **内部リンク**: `/blog/slug` のみ。未公開は「準備中」。同日複数本は公開順クロスリンク
7. **build**: `npm run build` 成功。新 slug が静的生成に含まれること
8. **軽負債**（`docs/ai-context/debt-paydown-workflow.md`）: Hubリンク1本、series spoke、`promotion_status: published_in_20` は⑥へメモ可

## 完了報告

- 公開 URL（`/blog/[slug]`）
- 変更ファイル一覧
- build 結果
- 相互リンク先
- 日付: 新規=一致確認 / リライト=据え置き+`last_update`

## 参照（必要時のみ）

- Rule: `.cursor/rules/article-publish.mdc`
- 詳細: `docs/ai-context/chat-operations.md`（①節）
- フォルダ: `docs/ai-context/content-folders.md`
- アフィ URL: `docs/ai-context/affiliate-registry.md`
