import { loadPost } from "./load-post";
import { BLOG_PAGE_SIZE, getBlogTotalPages } from "./pagination";
import { getAllPostMeta, type BlogSlug } from "./posts";

export type BlogIndexArticle = {
  slug: BlogSlug;
  title: string;
  description: string;
  publishedAt: string;
};

export type BlogIndexPageData = {
  articles: BlogIndexArticle[];
  page: number;
  totalPages: number;
  totalArticles: number;
};

function getSortedSlugs(): BlogSlug[] {
  return getAllPostMeta()
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    )
    .map((meta) => meta.slug as BlogSlug);
}

export async function loadBlogIndexArticles(
  page: number,
): Promise<BlogIndexPageData | null> {
  const sortedSlugs = getSortedSlugs();
  const totalArticles = sortedSlugs.length;
  const totalPages = getBlogTotalPages(totalArticles);

  if (page < 1 || page > totalPages) {
    return null;
  }

  const start = (page - 1) * BLOG_PAGE_SIZE;
  const pageSlugs = sortedSlugs.slice(start, start + BLOG_PAGE_SIZE);

  const articles = await Promise.all(
    pageSlugs.map(async (slug) => {
      const post = await loadPost(slug);
      return {
        slug,
        title: post.title,
        description: post.description,
        publishedAt: post.publishedAt,
      };
    }),
  );

  return { articles, page, totalPages, totalArticles };
}
