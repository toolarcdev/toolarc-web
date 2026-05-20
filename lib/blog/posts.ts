import type { BlogPostMeta, BlogPostSlug } from "./types";

/**
 * 公開する記事の一覧。
 * 新しい記事を追加するときは、ここに1件追加して app/blog/[slug]/page.tsx を作る。
 */
export const blogPosts: Record<BlogPostSlug, BlogPostMeta> = {
  "01-site-launch": {
    slug: "01-site-launch",
    markdownPath: "content/blog/01-site-launch/site-launch-draft-v3.md",
    imageBasePath: "/images/blog/site-launch",
    publishedAt: "2026-05-20",
  },
};

export function getPostMeta(slug: BlogPostSlug): BlogPostMeta {
  const post = blogPosts[slug];
  if (!post) {
    throw new Error(`Unknown blog post slug: ${slug}`);
  }
  return post;
}
