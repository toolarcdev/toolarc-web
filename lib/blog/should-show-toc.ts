import { extractTocHeadings } from "@/lib/blog/heading-id";
import { getArticleLayout } from "@/lib/blog/article-layout";
import type { BlogSlug } from "@/lib/blog/posts";
import { isHubPost } from "@/lib/series/series";

/** 本命CV（収益記事）— TOC 拡大対象の明示リスト */
const REVENUE_CV_SLUGS = new Set<string>([
  "ai-blog-writing-workflow-source-to-publish",
  "doraverse-trial-btob-checklist-tips",
  "multi-generative-ai-comparison-business",
]);

const MIN_HEADINGS_LONG = 5;
const MIN_HEADINGS_HUB_OR_CV = 3;

/**
 * Sticky TOC を出すか。短尺 Tips には無理付けしない。
 * rich-toc 明示 / Hub / 本命CV / 見出し数による長文判定。
 */
export function shouldShowStickyToc(slug: BlogSlug, content: string): boolean {
  if (getArticleLayout(slug) === "rich-toc") return true;

  const headingCount = extractTocHeadings(content).length;
  if (headingCount === 0) return false;

  if (isHubPost(slug) && headingCount >= MIN_HEADINGS_HUB_OR_CV) return true;
  if (REVENUE_CV_SLUGS.has(slug) && headingCount >= MIN_HEADINGS_HUB_OR_CV) {
    return true;
  }
  if (headingCount >= MIN_HEADINGS_LONG) return true;

  return false;
}
