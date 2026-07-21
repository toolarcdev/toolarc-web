import type { SearchArticle } from "./filter-search-articles";
import { loadPost } from "./load-post";
import { getAllPostMeta, type BlogSlug } from "./posts";

export type { SearchArticle } from "./filter-search-articles";

function getSortedSlugs(): BlogSlug[] {
  return getAllPostMeta()
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    )
    .map((meta) => meta.slug as BlogSlug);
}

/** Build-time index for client-side blog search (title / description / tags / slug). */
export async function loadSearchIndex(): Promise<SearchArticle[]> {
  const slugs = getSortedSlugs();

  return Promise.all(
    slugs.map(async (slug) => {
      const post = await loadPost(slug);
      return {
        slug,
        title: post.title,
        description: post.description,
        tags: post.tags,
        publishedAt: post.publishedAt,
      };
    }),
  );
}
