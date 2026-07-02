import { loadPost } from "@/lib/blog/load-post";
import { isBlogSlug } from "@/lib/blog/posts";
import {
  hrefToBlogSlug,
  type NextReadLink,
} from "@/lib/blog/split-next-read-section";
import type { NextReadArticle } from "@/components/blog/NextReadArticles";

export async function resolveNextReadArticles(
  links: NextReadLink[],
): Promise<NextReadArticle[]> {
  return Promise.all(
    links.map(async (link) => {
      const slug = hrefToBlogSlug(link.href);
      if (slug && isBlogSlug(slug)) {
        try {
          const post = await loadPost(slug);
          return {
            ...link,
            description: post.description || undefined,
          };
        } catch {
          return link;
        }
      }
      return link;
    }),
  );
}
