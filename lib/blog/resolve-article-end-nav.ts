import { loadPost } from "@/lib/blog/load-post";
import { getAllPostMeta, isBlogSlug, type BlogSlug } from "@/lib/blog/posts";
import {
  POPULAR_ARTICLE_SLUGS,
  POPULAR_ARTICLES_IS_PROVISIONAL,
} from "@/lib/blog/popular-articles";
import {
  hrefToBlogSlug,
  type NextReadLink,
} from "@/lib/blog/split-next-read-section";
import { getSeriesForPost, isHubPost, isSpokePost } from "@/lib/series/series";

export type EndNavArticle = {
  slug: BlogSlug;
  href: string;
  title: string;
  description?: string;
};

export type ArticleEndNavData = {
  connected: EndNavArticle | null;
  latest: EndNavArticle[];
  popular: EndNavArticle[];
  popularIsProvisional: boolean;
};

async function toEndNavArticle(slug: BlogSlug): Promise<EndNavArticle> {
  const post = await loadPost(slug);
  return {
    slug,
    href: `/blog/${slug}`,
    title: post.title,
    description: post.description || undefined,
  };
}

async function resolveConnected(
  currentSlug: BlogSlug,
  nextReadLinks: NextReadLink[],
): Promise<EndNavArticle | null> {
  const first = nextReadLinks[0];
  if (first) {
    const fromHref = hrefToBlogSlug(first.href);
    if (fromHref && isBlogSlug(fromHref) && fromHref !== currentSlug) {
      try {
        const article = await toEndNavArticle(fromHref);
        return { ...article, title: first.title || article.title };
      } catch {
        return {
          slug: fromHref,
          href: first.href,
          title: first.title,
        };
      }
    }
    if (first.href.startsWith("/")) {
      return {
        slug: (fromHref ?? currentSlug) as BlogSlug,
        href: first.href,
        title: first.title,
      };
    }
  }

  const series = getSeriesForPost(currentSlug);
  if (!series) return null;

  if (isSpokePost(currentSlug) && isBlogSlug(series.hubSlug)) {
    return toEndNavArticle(series.hubSlug);
  }

  if (isHubPost(currentSlug)) {
    const spoke = (series.spokeSlugOrder ?? []).find(
      (s): s is BlogSlug => isBlogSlug(s) && s !== currentSlug,
    );
    if (spoke) return toEndNavArticle(spoke);
  }

  return null;
}

async function resolveLatest(
  currentSlug: BlogSlug,
  exclude: Set<string>,
  limit = 3,
): Promise<EndNavArticle[]> {
  const sorted = getAllPostMeta()
    .filter((m) => m.slug !== currentSlug && !exclude.has(m.slug))
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    )
    .slice(0, limit);

  return Promise.all(
    sorted.map((m) => toEndNavArticle(m.slug as BlogSlug)),
  );
}

async function resolvePopular(
  currentSlug: BlogSlug,
  exclude: Set<string>,
): Promise<EndNavArticle[]> {
  const slugs = POPULAR_ARTICLE_SLUGS.filter(
    (s) => s !== currentSlug && !exclude.has(s) && isBlogSlug(s),
  );
  return Promise.all(slugs.map((s) => toEndNavArticle(s)));
}

/** 記事末回遊ブロック用データ（接続型1＋最新＋人気） */
export async function resolveArticleEndNav(
  currentSlug: BlogSlug,
  nextReadLinks: NextReadLink[] = [],
): Promise<ArticleEndNavData> {
  const connected = await resolveConnected(currentSlug, nextReadLinks);
  const exclude = new Set<string>();
  if (connected) exclude.add(connected.slug);

  const latest = await resolveLatest(currentSlug, exclude);
  for (const item of latest) exclude.add(item.slug);

  const popular = await resolvePopular(currentSlug, exclude);

  return {
    connected,
    latest,
    popular,
    popularIsProvisional: POPULAR_ARTICLES_IS_PROVISIONAL,
  };
}
