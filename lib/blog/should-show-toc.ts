import { extractTocHeadings } from "@/lib/blog/heading-id";
import { getArticleLayout } from "@/lib/blog/article-layout";
import type { BlogSlug } from "@/lib/blog/posts";

/**
 * Sticky TOC を出すか。
 * 記事ページの UI を揃えるため、H2 が1本以上あれば表示する（空レールのみ避ける）。
 * rich-toc / hands-on 明示レイアウトは常時 TOC。
 */
export function shouldShowStickyToc(slug: BlogSlug, content: string): boolean {
  const layout = getArticleLayout(slug);
  if (layout === "rich-toc" || layout === "hands-on") return true;
  return extractTocHeadings(content).length >= 1;
}
