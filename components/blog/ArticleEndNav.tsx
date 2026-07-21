import Link from "next/link";
import type { ArticleEndNavData, EndNavArticle } from "@/lib/blog/resolve-article-end-nav";
import { stripWrappingQuotes } from "@/lib/blog/strip-wrapping-quotes";

type ArticleEndNavProps = {
  data: ArticleEndNavData;
};

function EndNavLinkCard({ article }: { article: EndNavArticle }) {
  const description = article.description
    ? stripWrappingQuotes(article.description)
    : "";

  return (
    <Link
      href={article.href}
      className="group block rounded-lg border border-[#dbeafe] bg-white p-4 transition-colors hover:border-[#60a5fa]"
    >
      <span className="font-medium text-slate-900 group-hover:text-[#2563eb]">
        {article.title}
      </span>
      {description ? (
        <p className="mt-1 line-clamp-2 text-sm leading-6 text-slate-600">
          {description}
        </p>
      ) : null}
    </Link>
  );
}

function EndNavSection({
  title,
  articles,
}: {
  title: string;
  articles: EndNavArticle[];
}) {
  if (articles.length === 0) return null;
  const headingId = `end-nav-${title}`;

  return (
    <section aria-labelledby={headingId} className="mt-8 first:mt-0">
      <h3
        id={headingId}
        className="text-sm font-semibold uppercase tracking-wider text-slate-500"
      >
        {title}
      </h3>
      <ul className="mt-3 space-y-3" role="list">
        {articles.map((article) => (
          <li key={article.href}>
            <EndNavLinkCard article={article} />
          </li>
        ))}
      </ul>
    </section>
  );
}

/**
 * 記事末の標準回遊ブロック（接続型＋最新＋人気）。
 * @see docs/ai-context/internal-link-placement.md
 */
export function ArticleEndNav({ data }: ArticleEndNavProps) {
  const hasAny =
    data.connected !== null ||
    data.latest.length > 0 ||
    data.popular.length > 0;
  if (!hasAny) return null;

  return (
    <aside
      aria-label="記事の回遊"
      className="mt-12 border-t border-[#dbeafe] pt-8"
    >
      <p className="text-lg font-semibold text-slate-900">続きを読む</p>
      {data.connected ? (
        <EndNavSection title="接続して読む" articles={[data.connected]} />
      ) : null}
      <EndNavSection title="最新の記事" articles={data.latest} />
      <EndNavSection title="よく読まれている記事" articles={data.popular} />
    </aside>
  );
}
