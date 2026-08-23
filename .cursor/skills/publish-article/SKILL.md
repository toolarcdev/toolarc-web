---
name: publish-article
description: >-
  Publishes ToolArc blog articles to toolarc-web (slot ①): place Markdown under
  content/blog, register slug in lib/blog/posts.ts, set publish dates via Get-Date,
  run npm run build, add internal links and light debt fixes. Stops before
  commit/PR/merge — hand off to git-commit-pr then git-merge-cleanup. Use when
  the user asks for 記事公開, slot ①, posts.ts registration, or publishing a blog
  slug.
---

# publish-article（① 記事公開）

Skill = 手順。制約（公開日 Get-Date・PoE2 JSON 禁止）は `.cursor/rules/` が強制する。

## やること / やらないこと

**やる**: MD配置、`posts.ts` 登録、必要時 `series.ts`、内部リンク、`npm run build`、軽負債（コード側）、公開日確定  
**やらない**: 初稿・リライト案（④）、GSC（②）、Next 基盤横断（③）、PoE2/api、Vault 候補マスター本書き（⑥へ引き継ぎ可）、**commit / PR / merge / DailyNote・AI-log 追記**（後段 Skill へ委譲）

## Git 後段との接続

```text
本 Skill（①・リポ編集+build）
  → git-commit-pr（A・commit/PR）← 人間ゲート前で停止
  → 人間が GitHub 差分を確認
  → git-merge-cleanup（B・マージ+branch整理+当日 DailyNote/AI-log）
```

本 Skill 内では A/B を自動実行しない。完了報告で次手を明示する。

## 手順

1. **公開日を確定**: `Get-Date -Format "yyyy-MM-dd"`（手入力・inbox `publishDate`・初稿 `date` は使わない）
2. **本文 MD**: `content/blog/<contentId>/` に配置。contentId は `docs/ai-context/content-folders.md` の判断フロー（既存 A / 既存 B / 新 `23-…`。`21-cursor-models` 使用中。`22-game-dev-js` は `12-game-dev-js` へ昇格済）。**`20` へ新規は置かない**
3. **posts.ts**: slug キーで1件追加。`markdownFile` / `imageBasePath` / `publishedAt` / `category` を既存に合わせる
4. **日付反映**
   - 新規: frontmatter `date` と `publishedAt` を実装日で一致。免責「執筆時点」も同じ日
   - リライト: `date` / `publishedAt` 据え置き。`last_update` と免責日のみ実装日
5. **description 字数ゲート（必須・ハードストップ）** — 正本: `docs/ai-context/writing-rules.md` Frontmatter  
   - 触った各 MD の `description` を **Unicode 文字数で実測**する（推測・目視不可）
   - **合格: 120〜160 文字（両端含む）**。未満・超過は **未完了**（build 前でも commit/PR に進まない。MD を直してから再開）
   - 計測例:
     ```powershell
     node -e "const fs=require('fs'); const t=fs.readFileSync('PATH','utf8'); const m=t.match(/^description:\s*\"([^\"]+)\"/m); console.log([...m[1]].length)"
     ```
   - 完了報告に `description: NNN字` を必ず書く（複数 slug なら一覧）
   - **CTR meta**（title/H1/description のみ〜冒頭）のとき: ④/作業側で **案3つ＋各字数＋採用理由** が無い／字数未測なら①で止め、差し戻す（Vault `ctr-rewrite-queue`「meta 完了ゲート」）
6. **シリーズ（既存 A 追記時のみ）**: `lib/series/series.ts` に spoke 追加 ＋ **同一 PR で Hub 本文にスポーク反映**
7. **内部リンク**: `/blog/slug` のみ。未公開は「準備中」。同日複数本は公開順クロスリンク。B／`21-` は同ジャンル相互リンク
8. **build**: `npm run build` 成功。新 slug が静的生成に含まれること
9. **軽負債**（`docs/ai-context/debt-paydown-workflow.md`）: 上記6–7。`promotion_status`（A=`hub_updated` / B・21=`standalone`）は⑥へメモ可
10. **停止**: commit / PR / merge / Vault 追記はしない。完了定型で A → 人間 → B を案内

## 完了報告

- 公開 URL（`/blog/[slug]`）
- 変更ファイル一覧
- **description 字数**（各 slug: `NNN字`。120–160 外なら報告せず差し戻し）
- build 結果
- 相互リンク先
- 日付: 新規=一致確認 / リライト=据え置き+`last_update`
- 次手定型:

```text
①公開作業完了（build成功）。
次: git-commit-pr（commit/PR）。人間が差分確認後に git-merge-cleanup（マージ＋DailyNote/AI-log）。
```

## 参照（必要時のみ）

- Rule（強制制約）: `.cursor/rules/article-publish.mdc`
- 手順の詳細依頼文: `docs/ai-context/chat-operations.md`（①節）
- フォルダ: `docs/ai-context/content-folders.md`
- アフィ URL: `docs/ai-context/affiliate-registry.md`
- 記事本文ルールは扱わない（`writing-rules.md`）
- 後段: 個人 Skill `git-commit-pr` / `git-merge-cleanup`
