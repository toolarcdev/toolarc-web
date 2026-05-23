import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleHeader } from "@/components/blog/ArticleHeader";
import { BlogShell } from "@/components/blog/BlogShell";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/blog/Breadcrumbs";
import { MarkdownArticle } from "@/components/blog/MarkdownArticle";
import { SeriesArticleLink } from "@/components/blog/SeriesArticleLink";
import { ScrollDepthTracker } from "@/components/analytics/ScrollDepthTracker";
import { blogPostUrl, SITE_URL } from "@/lib/blog/constants";
import { loadPost } from "@/lib/blog/load-post";
import { estimateReadingTime } from "@/lib/blog/reading-time";
import { blogSlugs, isBlogSlug, type BlogSlug } from "@/lib/blog/posts";
import { getSeriesForPost, isSpokePost } from "@/lib/series/series";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!isBlogSlug(slug)) {
    return {};
  }

  const post = await loadPost(slug);
  const url = blogPostUrl(slug);
  const ogImage = `${post.imageBasePath}/${post.ogImage}`;

  return {
    title: `${post.title} | ToolArc`,
    description: post.description,
    keywords: post.tags.length > 0 ? post.tags : undefined,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      locale: "ja_JP",
      url,
      title: post.title,
      description: post.description,
      siteName: "ToolArc",
      publishedTime: post.publishedAt,
      images: [{ url: ogImage, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogImage],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  if (!isBlogSlug(slug)) {
    notFound();
  }

  const post = await loadPost(slug);
  const url = blogPostUrl(slug);
  const ogImageUrl = `${SITE_URL}${post.imageBasePath}/${post.ogImage}`;

  // --- Series awareness ---
  const series = getSeriesForPost(slug);
  const isSpoke = isSpokePost(slug);
  const readingTime = estimateReadingTime(post.content);

  // Breadcrumbs: Home / Blog / [Series] / Article
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    ...(series && isSpoke
      ? [{ label: series.title, href: `/series/${series.slug}` }]
      : []),
    { label: post.title },
  ];

  // Related: series siblings for series articles; otherwise 3 most-recent others
  const relatedPosts = await (async () => {
    if (series) {
      const siblingCandidates = isSpoke
        ? [series.hubSlug, ...(series.spokeSlugOrder ?? []).filter((s) => s !== slug)]
        : (series.spokeSlugOrder ?? []);

      return Promise.all(
        siblingCandidates
          .filter((s): s is BlogSlug => isBlogSlug(s))
          .slice(0, 3)
          .map(async (s) => {
            const p = await loadPost(s);
            return {
              slug: s,
              title: p.title,
              description: p.description,
              isSeries: true,
            };
          }),
      );
    }

    return Promise.all(
      blogSlugs
        .filter((s) => s !== slug)
        .slice(0, 3)
        .map(async (s) => {
          const p = await loadPost(s);
          return { slug: s, title: p.title, description: p.description, isSeries: false };
        }),
    );
  })();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    inLanguage: "ja",
    author: { "@type": "Organization", name: "ToolArc" },
    publisher: { "@type": "Organization", name: "ToolArc" },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: ogImageUrl,
  };

  return (
    <BlogShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ScrollDepthTracker
        slug={slug}
        seriesSlug={series?.slug ?? null}
        readingTime={readingTime}
        category={post.category}
      />
      <main className="px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-3xl">
          <Breadcrumbs items={breadcrumbItems} />

          {/* Series badge for spoke articles */}
          {series && isSpoke && (
            <div className="mt-5">
              <SeriesArticleLink
                href={`/series/${series.slug}`}
                seriesSlug={series.slug}
                targetSlug={series.hubSlug}
                linkType="badge"
                className="inline-flex items-center gap-1.5 rounded-full border border-[#bfdbfe] bg-[#eff6ff] px-3 py-1 text-xs font-medium text-[#2563eb] hover:border-[#93c5fd]"
              >
                <span>Series:</span>
                <span>{series.title}</span>
              </SeriesArticleLink>
            </div>
          )}
          {/* Series badge for hub articles */}
          {series && !isSpoke && (
            <div className="mt-5">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#bfdbfe] bg-[#eff6ff] px-3 py-1 text-xs font-medium text-[#2563eb]">
                Series Hub
              </span>
            </div>
          )}

          <article
            className="mt-6"
            itemScope
            itemType="https://schema.org/BlogPosting"
          >
            <ArticleHeader
              title={post.title}
              description={post.description}
              publishedAt={post.publishedAt}
              tags={post.tags}
            />
            <div className="article mt-10">
              <MarkdownArticle
                content={post.content}
                imageBasePath={post.imageBasePath}
              />
            </div>
          </article>

          <footer className="mt-12 border-t border-slate-200 pt-8">
            {relatedPosts.length > 0 && (
              <section aria-labelledby="related-heading" className="mb-8">
                <h2
                  id="related-heading"
                  className="text-sm font-semibold uppercase tracking-wider text-slate-500"
                >
                  {series ? "このシリーズの記事" : "ほかの記事"}
                </h2>
                <ul className="mt-4 space-y-3" role="list">
                  {relatedPosts.map((related) => (
                    <li key={related.slug}>
                      {series && related.isSeries ? (
                        <SeriesArticleLink
                          href={`/blog/${related.slug}`}
                          seriesSlug={series.slug}
                          targetSlug={related.slug}
                          linkType={related.slug === series.hubSlug ? "hub" : "spoke"}
                          className="group block rounded-xl border border-slate-200 bg-white p-4 transition-colors hover:border-[#93c5fd]"
                        >
                          <span className="font-medium text-slate-900 group-hover:text-[#2563eb]">
                            {related.title}
                          </span>
                          {related.description && (
                            <p className="mt-1 text-sm leading-6 text-slate-500 line-clamp-2">
                              {related.description}
                            </p>
                          )}
                        </SeriesArticleLink>
                      ) : (
                        <Link
                          href={`/blog/${related.slug}`}
                          className="group block rounded-xl border border-slate-200 bg-white p-4 transition-colors hover:border-[#93c5fd]"
                        >
                          <span className="font-medium text-slate-900 group-hover:text-[#2563eb]">
                            {related.title}
                          </span>
                          {related.description && (
                            <p className="mt-1 text-sm leading-6 text-slate-500 line-clamp-2">
                              {related.description}
                            </p>
                          )}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {series && (
              <SeriesArticleLink
                href={`/series/${series.slug}`}
                seriesSlug={series.slug}
                targetSlug={series.hubSlug}
                linkType="hub"
                className="mb-4 block text-sm font-medium text-[#2563eb] hover:underline"
              >
                ← {series.title} のシリーズ一覧へ
              </SeriesArticleLink>
            )}

            <Link
              href="/blog"
              className="text-sm text-slate-500 hover:text-[#2563eb]"
            >
              ← 全記事一覧へ
            </Link>
          </footer>
        </div>
      </main>
    </BlogShell>
  );
}
