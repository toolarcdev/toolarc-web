import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/blog/Breadcrumbs";
import { allSeries, seriesMap } from "@/lib/series/series";
import { isBlogSlug, type BlogSlug } from "@/lib/blog/posts";
import { loadPost } from "@/lib/blog/load-post";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return allSeries.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const series = seriesMap[slug];
  if (!series) return {};
  return {
    title: `${series.title} | ToolArc`,
    description: series.description,
    alternates: { canonical: `/series/${slug}` },
  };
}

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Tokyo",
  }).format(new Date(`${iso}T12:00:00+09:00`));
}

export default async function SeriesDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const series = seriesMap[slug];
  if (!series) notFound();

  const hubPost = isBlogSlug(series.hubSlug)
    ? await loadPost(series.hubSlug as BlogSlug)
    : null;

  const spokes = await Promise.all(
    (series.spokeSlugOrder ?? [])
      .filter((s): s is BlogSlug => isBlogSlug(s))
      .map(async (spokeSlug) => {
        const post = await loadPost(spokeSlug);
        return {
          slug: spokeSlug,
          title: post.title,
          description: post.description,
          publishedAt: post.publishedAt,
        };
      }),
  );

  return (
    <main className="px-4 py-10 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-4xl">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Series", href: "/series" },
            { label: series.title },
          ]}
        />

        {/* Series header */}
        <div className="mt-8">
          <p className="text-xs font-medium uppercase tracking-widest text-[#2563eb]">
            Series
          </p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            {series.title}
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
            {series.description}
          </p>
        </div>

        {/* Hub article */}
        {hubPost && (
          <div className="mt-10">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Series Overview
            </h2>
            <Link
              href={`/blog/${series.hubSlug}`}
              className="group mt-3 flex flex-col rounded-xl border-2 border-[#bfdbfe] bg-[#eff6ff] p-5 transition-colors hover:border-[#60a5fa] sm:p-6"
            >
              <p className="text-xs font-medium text-[#2563eb]">Hub Article</p>
              <p className="mt-1.5 text-base font-semibold text-slate-900 group-hover:text-[#2563eb]">
                {hubPost.title}
              </p>
              {hubPost.description && (
                <p className="mt-2 text-sm leading-6 text-slate-600 line-clamp-2">
                  {hubPost.description}
                </p>
              )}
              <time
                dateTime={hubPost.publishedAt}
                className="mt-3 text-xs text-slate-400"
              >
                {formatDate(hubPost.publishedAt)}
              </time>
            </Link>
          </div>
        )}

        {/* Spoke articles */}
        {spokes.length > 0 ? (
          <div className="mt-10">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Articles ({spokes.length})
            </h2>
            <ul className="mt-3 space-y-3" role="list">
              {spokes.map((spoke, i) => (
                <li key={spoke.slug}>
                  <Link
                    href={`/blog/${spoke.slug}`}
                    className="group flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-4 transition-colors hover:border-[#93c5fd] sm:p-5"
                  >
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#eff6ff] text-xs font-medium text-[#2563eb]">
                      {i + 1}
                    </span>
                    <div className="min-w-0">
                      <p className="font-medium text-slate-900 group-hover:text-[#2563eb]">
                        {spoke.title}
                      </p>
                      {spoke.description && (
                        <p className="mt-1 text-sm leading-6 text-slate-500 line-clamp-2">
                          {spoke.description}
                        </p>
                      )}
                      <time
                        dateTime={spoke.publishedAt}
                        className="mt-1.5 block text-xs text-slate-400"
                      >
                        {formatDate(spoke.publishedAt)}
                      </time>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="mt-8 rounded-xl border border-dashed border-slate-200 p-8 text-center text-sm text-slate-500">
            このシリーズの記事は準備中です
          </div>
        )}

        <div className="mt-10 border-t border-slate-200 pt-6">
          <Link
            href="/series"
            className="text-sm font-medium text-[#2563eb] hover:underline"
          >
            ← Series 一覧へ
          </Link>
        </div>
      </div>
    </main>
  );
}
