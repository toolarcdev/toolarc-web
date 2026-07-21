import type { BlogSlug } from "./posts";

export type SearchArticle = {
  slug: BlogSlug;
  title: string;
  description: string;
  tags: string[];
  publishedAt: string;
};

export function filterSearchArticles(
  articles: SearchArticle[],
  query: string,
): SearchArticle[] {
  const tokens = query
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);

  if (tokens.length === 0) {
    return [];
  }

  return articles.filter((article) => {
    const haystack = [
      article.title,
      article.description,
      article.slug,
      ...article.tags,
    ]
      .join(" ")
      .toLowerCase();

    return tokens.every((token) => haystack.includes(token));
  });
}
