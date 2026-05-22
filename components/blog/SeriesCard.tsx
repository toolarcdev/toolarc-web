import Link from "next/link";

type SeriesCardProps = {
  slug: string;
  title: string;
  description: string;
  articleCount: number;
  publishedAt: string;
};

function formatMonth(iso: string): string {
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "long",
    timeZone: "Asia/Tokyo",
  }).format(new Date(`${iso}T12:00:00+09:00`));
}

export function SeriesCard({
  slug,
  title,
  description,
  articleCount,
  publishedAt,
}: SeriesCardProps) {
  return (
    <Link
      href={`/series/${slug}`}
      className="group block rounded-xl border border-slate-200 bg-white p-5 transition-colors hover:border-[#93c5fd] sm:p-6"
    >
      <p className="text-xs font-medium uppercase tracking-wider text-[#2563eb]">
        Series
      </p>
      <h3 className="mt-2 text-base font-semibold leading-snug text-slate-900 group-hover:text-[#2563eb]">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-6 text-slate-600 line-clamp-2">
        {description}
      </p>
      <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
        <span>{articleCount} 記事</span>
        <span aria-hidden="true">·</span>
        <time dateTime={publishedAt}>{formatMonth(publishedAt)}</time>
      </div>
    </Link>
  );
}
