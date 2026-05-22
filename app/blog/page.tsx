import type { Metadata } from "next";
import Link from "next/link";
import { SeriesCard } from "@/components/blog/SeriesCard";
import { allSeries } from "@/lib/series/series";
import { blogSlugs, isBlogSlug } from "@/lib/blog/posts";
import { loadPost } from "@/lib/blog/load-post";

export const metadata: Metadata = {
  title: "Blog | ToolArc",
  description:
    "AI活用・開発・ワークフロー・トラブル解決の技術記事一覧。シリーズ形式で体系的にまとめています。",
  alternates: { canonical: "/blog" },
};

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Tokyo",
  }).format(new Date(`${iso}T12:00:00+09:00`));
}

export default async function BlogPage() {
  const articles = await Promise.all(
    blogSlugs.map(async (slug) => {
      const post = await loadPost(slug);
      return {
        slug,
        title: post.title,
        description: post.description,
        publishedAt: post.publishedAt,
      };
    }),
  );

  const sortedArticles = [...articles].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

  const seriesWithCounts = allSeries.map((s) => ({
    ...s,
    articleCount:
      1 + (s.spokeSlugOrder?.filter((sp) => isBlogSlug(sp)).length ?? 0),
  }));

  return (
    <main>
      {/* Page header */}
      <div className="border-b border-slate-200 bg-slate-50 px-4 py-10 sm:px-6 sm:py-12">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Blog
          </h1>
          <p className="mt-2 text-base text-slate-600">
            AI活用・開発・ワークフロー・トラブル解決の技術記事
          </p>
        </div>
      </div>

      <div className="px-4 py-10 sm:px-6 sm:py-12">
        <div className="mx-auto max-w-4xl space-y-12">
          {/* Series section */}
          <section aria-labelledby="series-heading">
            <div className="flex items-baseline justify-between">
              <h2
                id="series-heading"
                className="text-sm font-semibold uppercase tracking-wider text-slate-500"
              >
                Series
              </h2>
              <Link
                href="/series"
                className="text-sm text-[#2563eb] hover:underline"
              >
                すべて見る →
              </Link>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {seriesWithCounts.map((s) => (
                <SeriesCard
                  key={s.slug}
                  slug={s.slug}
                  title={s.title}
                  description={s.description}
                  articleCount={s.articleCount}
                  publishedAt={s.publishedAt}
                />
              ))}
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* All articles */}
          <section aria-labelledby="all-articles-heading">
            <h2
              id="all-articles-heading"
              className="text-sm font-semibold uppercase tracking-wider text-slate-500"
            >
              All Articles
            </h2>
            <ul className="mt-4 space-y-3" role="list">
              {sortedArticles.map((article) => (
                <li key={article.slug}>
                  <Link
                    href={`/blog/${article.slug}`}
                    className="group flex flex-col rounded-xl border border-slate-200 bg-white p-4 transition-colors hover:border-[#93c5fd] sm:flex-row sm:items-start sm:gap-6 sm:p-5"
                  >
                    <time
                      dateTime={article.publishedAt}
                      className="shrink-0 text-xs text-slate-400 sm:w-28 sm:pt-0.5"
                    >
                      {formatDate(article.publishedAt)}
                    </time>
                    <div className="mt-1.5 sm:mt-0">
                      <p className="font-medium text-slate-900 group-hover:text-[#2563eb]">
                        {article.title}
                      </p>
                      {article.description && (
                        <p className="mt-1 text-sm leading-6 text-slate-500 line-clamp-2">
                          {article.description}
                        </p>
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
