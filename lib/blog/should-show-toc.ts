import { extractTocHeadings } from "@/lib/blog/heading-id";
import { getArticleLayout } from "@/lib/blog/article-layout";
import type { BlogSlug } from "@/lib/blog/posts";

/**
 * Sticky TOC を出すか。
 * 記事ページの UI を揃えるため、H2 が1本以上あれば表示する（空レールのみ避ける）。
 * rich-toc 明示レイアウトは常時 TOC。
 */
export function shouldShowStickyToc(slug: BlogSlug, content: string): boolean {
  if (getArticleLayout(slug) === "rich-toc") return true;
  return extractTocHeadings(content).length >= 1;
}
