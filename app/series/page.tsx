import type { Metadata } from "next";
import { SeriesCard } from "@/components/blog/SeriesCard";
import { allSeries } from "@/lib/series/series";
import { isBlogSlug } from "@/lib/blog/posts";

export const metadata: Metadata = {
  title: "Series | ToolArc",
  description:
    "テーマ別の連載技術記事シリーズ一覧。AI活用・開発・ワークフローをシリーズ形式で体系的にまとめています。",
  alternates: { canonical: "/series" },
};

export default function SeriesPage() {
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
            Series
          </h1>
          <p className="mt-2 text-base text-slate-600">
            テーマ別の連載記事シリーズ
          </p>
        </div>
      </div>

      <div className="px-4 py-10 sm:px-6 sm:py-12">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-4 sm:grid-cols-2">
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
      </div>
    </main>
  );
}
