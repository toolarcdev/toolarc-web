export const BLOG_PAGE_SIZE = 15;

export const BLOG_ALL_ARTICLES_ID = "all-articles";

export function getBlogTotalPages(totalArticles: number): number {
  return Math.max(1, Math.ceil(totalArticles / BLOG_PAGE_SIZE));
}

export function getBlogPagePath(page: number): string {
  if (page <= 1) return "/blog";
  return `/blog/page/${page}`;
}

export function getBlogPaginatedHref(page: number): string {
  return `${getBlogPagePath(page)}#${BLOG_ALL_ARTICLES_ID}`;
}

export function parseBlogPageParam(raw: string): number | null {
  if (!/^\d+$/.test(raw)) return null;
  const page = Number.parseInt(raw, 10);
  if (!Number.isFinite(page) || page < 1) return null;
  return page;
}
