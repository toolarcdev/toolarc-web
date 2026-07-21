import type { BlogSlug } from "@/lib/blog/posts";

/**
 * 記事末「よく読まれている記事」スロット（週次更新前提）。
 * 初回は仮データ。水曜⑥で GSC 表示回数・CTR 上位約3件に差し替える。
 * @see docs/ai-context/internal-link-placement.md
 */
export const POPULAR_ARTICLE_SLUGS = [
  "ai-blog-writing-workflow-source-to-publish",
  "cursor-free",
  "ai-tools-comparison",
] as const satisfies readonly BlogSlug[];

/** true while POPULAR_ARTICLE_SLUGS is provisional (not yet from weekly GSC). */
export const POPULAR_ARTICLES_IS_PROVISIONAL = true;
