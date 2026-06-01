import Link from "next/link";
import { BlogPagination } from "@/components/blog/BlogPagination";
import { BlogScrollToAllArticles } from "@/components/blog/BlogScrollToAllArticles";
import { SeriesCard } from "@/components/blog/SeriesCard";
import type { BlogIndexArticle } from "@/lib/blog/list-articles";
import { isBlogSlug } from "@/lib/blog/posts";
import { BLOG_ALL_ARTICLES_ID } from "@/lib/blog/pagination";
import { allSeries } from "@/lib/series/series";

type BlogIndexViewProps = {
  articles: BlogIndexArticle[];
  currentPage: number;
  totalPages: number;
};

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Tokyo",
  }).format(new Date(`${iso}T12:00:00+09:00`));
}

export function BlogIndexView({
  articles,
  currentPage,
  totalPages,
}: BlogIndexViewProps) {
  const seriesWithCounts = allSeries.map((s) => ({
    ...s,
    articleCount:
      1 + (s.spokeSlugOrder?.filter((sp) => isBlogSlug(sp)).length ?? 0),
  }));

  return (
    <main>
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

          <section
            id={BLOG_ALL_ARTICLES_ID}
            aria-labelledby="all-articles-heading"
            className="scroll-mt-14"
          >
            <h2
              id="all-articles-heading"
              className="text-sm font-semibold uppercase tracking-wider text-slate-500"
            >
              All Articles
            </h2>
            <ul className="mt-4 space-y-3" role="list">
              {articles.map((article) => (
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

            <BlogPagination
              currentPage={currentPage}
              totalPages={totalPages}
            />
          </section>
        </div>
      </div>
      <BlogScrollToAllArticles />
    </main>
  );
}
