import type { Metadata } from "next";
import Link from "next/link";
import { SeriesCard } from "@/components/blog/SeriesCard";
import { allSeries } from "@/lib/series/series";
import { blogSlugs, isBlogSlug } from "@/lib/blog/posts";
import { loadPost } from "@/lib/blog/load-post";

export const metadata: Metadata = {
  title: "ToolArc | AI開発・ワークフロー・技術アーカイブ",
  description:
    "Cursor、Claude、Next.js、Vercel を活用した開発・AI ワークフローの実践記録。シリーズ型の技術知識アーカイブ。",
};

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Tokyo",
  }).format(new Date(`${iso}T12:00:00+09:00`));
}

export default async function Home() {
  const allArticles = await Promise.all(
    blogSlugs.map(async (slug) => {
      const post = await loadPost(slug);
      return {
        slug,
        title: post.title,
        publishedAt: post.publishedAt,
      };
    }),
  );

  const latestArticles = [...allArticles]
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    )
    .slice(0, 3);

  const seriesWithCounts = allSeries.map((s) => ({
    ...s,
    articleCount:
      1 + (s.spokeSlugOrder?.filter((sp) => isBlogSlug(sp)).length ?? 0),
  }));

  return (
    <main>
      {/* Hero */}
      <section
        aria-labelledby="hero-heading"
        className="border-b border-slate-200 bg-slate-50 px-4 py-14 sm:px-6 sm:py-20"
      >
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-medium uppercase tracking-widest text-[#2563eb]">
            Technical Knowledge Archive
          </p>
          <h1
            id="hero-heading"
            className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
          >
            AI開発・ワークフロー・
            <br className="hidden sm:block" />
            トラブル解決の記録
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">
            Cursor、Claude、Next.js、Vercel を使った実践的な開発記録。
            単なるブログではなく、再利用できる知識システムとして整理しています。
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/series"
              className="inline-flex items-center rounded-lg bg-[#2563eb] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#1d4ed8]"
            >
              Series を見る
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 hover:border-slate-300 hover:text-slate-900"
            >
              全記事一覧
            </Link>
          </div>
        </div>
      </section>

      {/* Series */}
      <section
        aria-labelledby="series-heading"
        className="px-4 py-12 sm:px-6 sm:py-14"
      >
        <div className="mx-auto max-w-4xl">
          <div className="flex items-baseline justify-between">
            <h2
              id="series-heading"
              className="text-lg font-semibold text-slate-900"
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
        </div>
      </section>

      {/* Latest articles */}
      <section
        aria-labelledby="latest-heading"
        className="border-t border-slate-200 bg-slate-50 px-4 py-12 sm:px-6 sm:py-14"
      >
        <div className="mx-auto max-w-4xl">
          <div className="flex items-baseline justify-between">
            <h2
              id="latest-heading"
              className="text-lg font-semibold text-slate-900"
            >
              Latest Articles
            </h2>
            <Link
              href="/blog"
              className="text-sm text-[#2563eb] hover:underline"
            >
              全記事一覧 →
            </Link>
          </div>
          <ul className="mt-4 space-y-1" role="list">
            {latestArticles.map((article) => (
              <li key={article.slug}>
                <Link
                  href={`/blog/${article.slug}`}
                  className="group flex items-center justify-between rounded-lg px-3 py-3 hover:bg-white"
                >
                  <span className="font-medium text-slate-800 group-hover:text-[#2563eb]">
                    {article.title}
                  </span>
                  <time
                    dateTime={article.publishedAt}
                    className="ml-4 shrink-0 text-xs text-slate-400"
                  >
                    {formatDate(article.publishedAt)}
                  </time>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* About */}
      <section
        id="about"
        aria-labelledby="about-heading"
        className="px-4 py-12 sm:px-6 sm:py-14"
      >
        <div className="mx-auto max-w-4xl">
          <h2 id="about-heading" className="text-lg font-semibold text-slate-900">
            About
          </h2>
          <div className="mt-4 space-y-3 text-base leading-8 text-slate-600">
            <p>
              ToolArc は、個人開発・AI ツール活用の実践記録をシリーズ形式でまとめた技術アーカイブです。
            </p>
            <p>
              うまくいった手順だけでなく、詰まった場面・試した解決策も正直に記録しています。
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
