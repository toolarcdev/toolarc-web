type ArticleHeaderProps = {
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  tags?: string[];
};

const VISIBLE_TAG_LIMIT = 5;

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
  const visibleTags = tags.slice(0, VISIBLE_TAG_LIMIT);
  const hiddenTagCount = Math.max(0, tags.length - VISIBLE_TAG_LIMIT);

  return (
    <header className="border-b border-[#dbeafe] pb-8 sm:pb-10">
      <h1 className="text-2xl font-bold leading-tight tracking-tight text-slate-900 sm:text-3xl sm:leading-snug">
        {title}
      </h1>
      <p className="mt-3 text-sm text-slate-500">
        <time dateTime={publishedAt}>公開 {formatDate(publishedAt)}</time>
        {updatedAt && (
          <>
            <span aria-hidden="true"> ／ </span>
            <time dateTime={updatedAt}>更新 {formatDate(updatedAt)}</time>
          </>
        )}
      </p>
      <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">
        {description}
      </p>
      {tags.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="記事タグ">
          {visibleTags.map((tag) => (
            <li key={tag}>
              <span className="inline-block rounded-full border border-[#dbeafe] bg-[#f8fbff] px-3 py-1 text-xs font-medium text-slate-600">
                {tag}
              </span>
            </li>
          ))}
          {hiddenTagCount > 0 && (
            <li>
              <span className="inline-block rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-500">
                他{hiddenTagCount}
              </span>
            </li>
          )}
        </ul>
      )}
    </header>
  );
}
