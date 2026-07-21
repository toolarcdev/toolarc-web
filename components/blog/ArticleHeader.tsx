import { ArticleIntro } from "@/components/blog/ArticleIntro";

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
    <header className="pb-0">
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
      <ArticleIntro description={description} tags={tags} />
    </header>
  );
}
