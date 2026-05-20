type ArticleHeaderProps = {
  title: string;
  description: string;
  publishedAt: string;
};

function formatDate(iso: string): string {
  // タイムゾーン差で SSR / クライアントの表示がずれないよう固定
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Tokyo",
  }).format(new Date(`${iso}T12:00:00+09:00`));
}

export function ArticleHeader({
  title,
  description,
  publishedAt,
}: ArticleHeaderProps) {
  return (
    <header className="mb-10 border-b border-white/6 pb-10 sm:mb-12 sm:pb-12">
      <time
        dateTime={publishedAt}
        className="font-mono text-xs tracking-wide text-zinc-500"
      >
        {formatDate(publishedAt)}
      </time>
      <h1 className="mt-4 text-2xl font-semibold leading-tight tracking-tight text-zinc-50 sm:text-3xl sm:leading-snug">
        {title}
      </h1>
      <p className="mt-4 text-base leading-relaxed text-zinc-400 sm:text-lg">
        {description}
      </p>
    </header>
  );
}
