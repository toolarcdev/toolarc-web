import type { BlogSlug } from "@/lib/blog/posts";

/**
 * 記事末「よく読まれている記事」スロット（週次更新前提）。
 * 初回は仮データ。水曜⑥（Skill B）で intake §1.6 → 本ファイルを差し替える。
 * 手順: `.cursor/skills/weekly-maintenance/SKILL.md` / Vault `weekly-intake-template` §1.6
 * @see docs/ai-context/internal-link-placement.md
 */
export const POPULAR_ARTICLE_SLUGS = [
  "ai-blog-writing-workflow-source-to-publish",
  "cursor-free",
  "ai-tools-comparison",
] as const satisfies readonly BlogSlug[];

/** true while POPULAR_ARTICLE_SLUGS is provisional (not yet from weekly GSC). */
export const POPULAR_ARTICLES_IS_PROVISIONAL = true;
