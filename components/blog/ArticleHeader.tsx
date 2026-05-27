type ArticleHeaderProps = {
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  tags?: string[];
};

function formatDate(iso: string): string {
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
  updatedAt,
  tags = [],
}: ArticleHeaderProps) {
  return (
    <header className="border-b border-[#dbeafe] pb-8 sm:pb-10">
      <p className="text-sm font-medium text-[#2563eb]">ブログ記事</p>
      <time
        dateTime={publishedAt}
        className="mt-3 block text-sm text-slate-500"
      >
        公開日: {formatDate(publishedAt)}
      </time>
      {updatedAt && (
        <time dateTime={updatedAt} className="mt-1 block text-sm text-slate-500">
          最終更新日: {formatDate(updatedAt)}
        </time>
      )}
      {tags.length > 0 && (
        <ul
          className="mt-3 flex flex-wrap gap-2"
          aria-label="記事タグ"
        >
          {tags.map((tag) => (
            <li key={tag}>
              <span className="inline-block rounded-full border border-[#dbeafe] bg-[#f8fbff] px-3 py-1 text-xs font-medium text-slate-600">
                {tag}
              </span>
            </li>
          ))}
        </ul>
      )}
      <h1 className="mt-4 text-2xl font-bold leading-tight tracking-tight text-slate-900 sm:text-3xl sm:leading-snug">
        {title}
      </h1>
      <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">
        {description}
      </p>
    </header>
  );
}
