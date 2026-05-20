import path from "path";
import type { BlogPostConfig, BlogPostMeta } from "./types";

/**
 * 公開記事レジストリ
 *
 * キー = 公開 URL の slug（/blog/[slug]）
 * contentId = 管理用フォルダ名（content/blog/[contentId]/）
 *
 * 新規記事の追加手順:
 * 1. content/blog/XX-my-post/ に Markdown を置く
 * 2. public/images/blog/my-post/ に画像を置く
 * 3. 下記に1件追加
 */
export const blogPosts = {
  "site-launch": {
    contentId: "01-site-launch",
    markdownFile: "site-launch-draft-v3.md",
    imageBasePath: "/images/blog/site-launch",
    publishedAt: "2026-05-20",
    ogImage: "01-success-webpage.png",
  },
} as const;

/** 公開 URL の slug 型（blogPosts のキーから自動生成） */
export type BlogSlug = keyof typeof blogPosts;

export const blogSlugs = Object.keys(blogPosts) as BlogSlug[];

export function isBlogSlug(slug: string): slug is BlogSlug {
  return slug in blogPosts;
}

function buildMarkdownPath(contentId: string, markdownFile: string): string {
  return path.join("content", "blog", contentId, markdownFile);
}

export function getPostMeta(slug: BlogSlug): BlogPostMeta {
  const config = blogPosts[slug];
  return {
    slug,
    ...config,
    markdownPath: buildMarkdownPath(config.contentId, config.markdownFile),
  };
}

export function getAllPostMeta(): BlogPostMeta[] {
  return blogSlugs.map(getPostMeta);
}
