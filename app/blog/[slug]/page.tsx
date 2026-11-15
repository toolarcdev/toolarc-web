import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleHeader } from "@/components/blog/ArticleHeader";
import styles from "@/components/blog/ArticlePage.module.css";
import { ArticleBody } from "@/components/blog/ArticleBody";
import { ArticleEndNav } from "@/components/blog/ArticleEndNav";
import { AuthorBox } from "@/components/blog/AuthorBox";
import { BlogShell } from "@/components/blog/BlogShell";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/blog/Breadcrumbs";
import { RichArticleLayout } from "@/components/blog/RichArticleLayout";
import { SeriesArticleLink } from "@/components/blog/SeriesArticleLink";
import { NarrowAffiliateSlot } from "@/components/affiliate/NarrowAffiliateSlot";
import { ScrollDepthTracker } from "@/components/analytics/ScrollDepthTracker";
import { blogPostUrl, SITE_URL } from "@/lib/blog/constants";
import { getArticleLayout } from "@/lib/blog/article-layout";
import { extractTocHeadings } from "@/lib/blog/heading-id";
import { loadPost } from "@/lib/blog/load-post";
import { estimateReadingTime } from "@/lib/blog/reading-time";
import { resolveArticleEndNav } from "@/lib/blog/resolve-article-end-nav";
import { shouldShowStickyToc } from "@/lib/blog/should-show-toc";
import { splitNextReadSection } from "@/lib/blog/split-next-read-section";
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
  const ogImage = `${post.ogImageBasePath}/${post.ogImage}`;

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
  const ogImageUrl = `${SITE_URL}${post.ogImageBasePath}/${post.ogImage}`;
  const nextReadSplit = splitNextReadSection(post.content);
  const articleContent = nextReadSplit
    ? `${nextReadSplit.before}\n\n${nextReadSplit.after}`.trim()
    : post.content;
  const showToc = shouldShowStickyToc(slug, articleContent);
  const articleLayout = getArticleLayout(slug);
  const isHandsOn = articleLayout === "hands-on";
  const tocItems = showToc ? extractTocHeadings(articleContent) : [];
  const endNav = await resolveArticleEndNav(
    slug,
    nextReadSplit?.links ?? [],
  );

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

  // Series siblings only（サイト全体の最新／人気は ArticleEndNav）
  const seriesRelatedPosts = series
    ? await Promise.all(
        (isSpoke
          ? [
              series.hubSlug,
              ...(series.spokeSlugOrder ?? []).filter((s) => s !== slug),
            ]
          : (series.spokeSlugOrder ?? [])
        )
          .filter((s): s is BlogSlug => isBlogSlug(s))
          .slice(0, 3)
          .map(async (s) => {
            const p = await loadPost(s);
            return {
              slug: s,
              title: p.title,
              description: p.description,
            };
          }),
      )
    : [];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    inLanguage: "ja",
    author: { "@type": "Organization", name: "ToolArc" },
    publisher: { "@type": "Organization", name: "ToolArc" },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: ogImageUrl,
  };

  const article = (
    <div className={`article${isHandsOn ? " article--hands-on" : ""}`}>
      <ArticleBody
        content={articleContent}
        imageBasePath={post.imageBasePath}
        slug={slug}
        variant={isHandsOn ? "hands-on" : "default"}
      />
    </div>
  );

  const afterArticle = (
    <>
      {post.tags.length > 0 && (
        <ul className={styles.tags} aria-label="記事タグ">
          {post.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      )}
      <p className={styles.disclosure}>
        ※記事により広告・アフィリエイトリンクを含む場合があります。
      </p>
      <NarrowAffiliateSlot />
      <ArticleEndNav data={endNav} />
      <AuthorBox />
      <footer className="mt-12 border-t border-slate-200 pt-8">
        {seriesRelatedPosts.length > 0 && series && (
          <section aria-labelledby="related-heading" className="mb-8">
            <h2
              id="related-heading"
              className="text-sm font-semibold uppercase tracking-wider text-slate-500"
            >
              このシリーズの記事
            </h2>
            <ul className="mt-4 space-y-3" role="list">
              {seriesRelatedPosts.map((related) => (
                <li key={related.slug}>
                  <SeriesArticleLink
                    href={`/blog/${related.slug}`}
                    seriesSlug={series.slug}
                    targetSlug={related.slug}
                    linkType={
                      related.slug === series.hubSlug ? "hub" : "spoke"
                    }
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
    </>
  );

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
      <main className={styles.page}>
        <article itemScope itemType="https://schema.org/BlogPosting">
          <ArticleHeader
            title={post.title}
            publishedAt={post.publishedAt}
            updatedAt={post.updatedAt}
            showToc={showToc}
          />
          <div className={`${styles.container} ${styles.content}${showToc ? "" : ` ${styles.narrow}`}`}>
            <div className={styles.breadcrumbs}>
              <Breadcrumbs items={breadcrumbItems} />
              {/* Series badge: パンくずと同列に寄せる（D） */}
              {series && isSpoke && (
                <SeriesArticleLink
                  href={`/series/${series.slug}`}
                  seriesSlug={series.slug}
                  targetSlug={series.hubSlug}
                  linkType="badge"
                  className={styles.seriesBadge}
                >
                  <span>Series:</span>
                  <span>{series.title}</span>
                </SeriesArticleLink>
              )}
              {series && !isSpoke && (
                <span className={styles.seriesBadge}>
                  Series Hub
                </span>
              )}
            </div>

            {showToc ? (
              <RichArticleLayout tocItems={tocItems}>
                {article}
                {/* 左カラム内: sticky 右レールが末尾ブロックと重ならないようにする */}
                {afterArticle}
              </RichArticleLayout>
            ) : (
              <>
                {article}
                {afterArticle}
              </>
            )}
          </div>
        </article>
      </main>
    </BlogShell>
  );
}
