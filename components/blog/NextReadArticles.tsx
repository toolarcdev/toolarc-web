import Link from "next/link";
import { headingToId } from "@/lib/blog/heading-id";
import type { NextReadLink } from "@/lib/blog/split-next-read-section";

export type NextReadArticle = NextReadLink & {
  description?: string;
};

type NextReadArticlesProps = {
  articles: NextReadArticle[];
};

export function NextReadArticles({ articles }: NextReadArticlesProps) {
  const headingId = headingToId("次に読む");

  return (
    <section aria-labelledby={headingId} className="mt-12 border-t border-[#dbeafe] pt-8">
      <h2 id={headingId} className="text-lg font-semibold text-slate-900">
        次に読む
      </h2>
      <ul className="mt-4 space-y-3" role="list">
        {articles.map((article) => (
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
    </section>
  );
}
