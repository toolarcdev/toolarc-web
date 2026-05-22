import Link from "next/link";

type RelatedArticle = {
  href: string;
  title: string;
  description: string;
  isParent?: boolean;
};

type RelatedArticlesProps = {
  articles: RelatedArticle[];
};

export function RelatedArticles({ articles }: RelatedArticlesProps) {
  const parent = articles.find((a) => a.isParent);
  const others = articles.filter((a) => !a.isParent);

  return (
    <section aria-labelledby="related-heading" className="mt-12 border-t border-[#dbeafe] pt-8">
      <h2
        id="related-heading"
        className="text-lg font-semibold text-slate-900"
      >
        関連記事
      </h2>

      {parent && (
        <div className="mt-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-400">
            この記事が属するシリーズ
          </p>
          <Link
            href={parent.href}
            className="group block rounded-xl border border-[#dbeafe] bg-[#f8fbff] p-5 transition-colors hover:border-[#60a5fa]"
          >
            <span className="mb-1 inline-block text-xs font-semibold text-[#2563eb]">
              親記事
            </span>
            <p className="font-semibold leading-snug text-slate-900 group-hover:text-[#2563eb]">
              {parent.title}
            </p>
            {parent.description && (
              <p className="mt-1.5 line-clamp-2 text-sm leading-6 text-slate-600">
                {parent.description}
              </p>
            )}
          </Link>
        </div>
      )}

      {others.length > 0 && (
        <div className="mt-5">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-400">
            ほかの記事
          </p>
          <ul className="space-y-3" role="list">
            {others.map((article) => (
              <li key={article.href}>
                <Link
                  href={article.href}
                  className="group block rounded-lg border border-[#dbeafe] bg-white p-4 transition-colors hover:border-[#60a5fa]"
                >
                  <span className="font-medium text-slate-900 group-hover:text-[#2563eb]">
                    {article.title}
                  </span>
                  {article.description && (
                    <p className="mt-1 line-clamp-2 text-sm leading-6 text-slate-600">
                      {article.description}
                    </p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
