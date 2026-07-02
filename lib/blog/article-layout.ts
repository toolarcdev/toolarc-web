import { blogPosts, type BlogSlug } from "@/lib/blog/posts";
import type { ArticleLayout, BlogPostConfig } from "@/lib/blog/types";

export function getArticleLayout(slug: BlogSlug): ArticleLayout {
  const config = blogPosts[slug] as BlogPostConfig;
  return config.layout === "rich-toc" ? "rich-toc" : "default";
}
