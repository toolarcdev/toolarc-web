import { blogPosts, type BlogSlug } from "@/lib/blog/posts";
import type { ArticleLayout, BlogPostConfig } from "@/lib/blog/types";

export function getArticleLayout(slug: BlogSlug): ArticleLayout {
  const config = blogPosts[slug] as BlogPostConfig;
  if (config.layout === "rich-toc") return "rich-toc";
  if (config.layout === "hands-on") return "hands-on";
  return "default";
}
