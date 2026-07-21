"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useId, useState } from "react";
import {
  filterSearchArticles,
  type SearchArticle,
} from "@/lib/blog/filter-search-articles";

type SearchViewProps = {
  articles: SearchArticle[];
};

const URL_SYNC_MS = 200;

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Tokyo",
  }).format(new Date(`${iso}T12:00:00+09:00`));
}

export function SearchView({ articles }: SearchViewProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const inputId = useId();
  const resultsId = useId();

  const initialQuery = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    const trimmed = query.trim();
    const current = searchParams.get("q") ?? "";

    if (trimmed === current) {
      return;
    }

    const timer = window.setTimeout(() => {
      const next = trimmed
        ? `/search?q=${encodeURIComponent(trimmed)}`
        : "/search";
      router.replace(next, { scroll: false });
    }, URL_SYNC_MS);

    return () => window.clearTimeout(timer);
  }, [query, router, searchParams]);

  const trimmedQuery = query.trim();
  const results = trimmedQuery
    ? filterSearchArticles(articles, trimmedQuery)
    : [];
  const recentArticles = articles.slice(0, 8);

  const resultsSummary = trimmedQuery
    ? `${results.length}件の記事が見つかりました`
    : "";

  return (
    <main>
      <div className="border-b border-slate-200 bg-slate-50 px-4 py-10 sm:px-6 sm:py-12">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            記事を検索
          </h1>
          <p className="mt-2 text-base text-slate-600">
            タイトル・説明・タグからブログ記事を探せます
          </p>
        </div>
      </div>

      <div className="px-4 py-10 sm:px-6 sm:py-12">
        <div className="mx-auto max-w-4xl space-y-8">
          <form
            role="search"
            onSubmit={(event) => event.preventDefault()}
            className="space-y-2"
          >
            <label
              htmlFor={inputId}
              className="block text-sm font-medium text-slate-700"
            >
              キーワード
            </label>
            <input
              id={inputId}
              type="search"
              name="q"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="例: Cursor git ChatGPT"
              autoComplete="off"
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-base text-slate-900 shadow-sm outline-none transition-colors placeholder:text-slate-400 focus:border-[#93c5fd] focus:ring-2 focus:ring-[#dbeafe]"
            />
            <p className="text-sm text-slate-500">
              複数語はスペース区切り（すべて含む記事を表示）
            </p>
          </form>

          <div
            id={resultsId}
            aria-live="polite"
            aria-atomic="true"
            className="space-y-4"
          >
            {trimmedQuery ? (
              <>
                <p className="text-sm text-slate-600">{resultsSummary}</p>
                {results.length > 0 ? (
                  <ul className="space-y-3" role="list">
                    {results.map((article) => (
                      <li key={article.slug}>
                        <Link
                          href={`/blog/${article.slug}`}
                          className="group flex flex-col rounded-xl border border-slate-200 bg-white p-4 transition-colors hover:border-[#93c5fd] sm:flex-row sm:items-start sm:gap-6 sm:p-5"
                        >
                          <time
                            dateTime={article.publishedAt}
                            className="shrink-0 text-xs text-slate-400 sm:w-28 sm:pt-0.5"
                          >
                            {formatDate(article.publishedAt)}
                          </time>
                          <div className="mt-1.5 sm:mt-0">
                            <p className="font-medium text-slate-900 group-hover:text-[#2563eb]">
                              {article.title}
                            </p>
                            {article.description ? (
                              <p className="mt-1 text-sm leading-6 text-slate-500 line-clamp-2">
                                {article.description}
                              </p>
                            ) : null}
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="rounded-xl border border-slate-200 bg-white p-6 text-slate-700">
                    <p className="font-medium text-slate-900">
                      該当する記事は見つかりませんでした
                    </p>
                    <p className="mt-2 text-sm text-slate-600">
                      別のキーワードを試すか、一覧から探してください。
                    </p>
                    <div className="mt-4 flex flex-wrap gap-4 text-sm">
                      <Link
                        href="/blog"
                        className="text-[#2563eb] hover:underline"
                      >
                        Blog 一覧へ
                      </Link>
                      <Link
                        href="/series"
                        className="text-[#2563eb] hover:underline"
                      >
                        Series 一覧へ
                      </Link>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <section aria-labelledby="recent-articles-heading">
                <h2
                  id="recent-articles-heading"
                  className="text-sm font-semibold uppercase tracking-wider text-slate-500"
                >
                  最近の記事
                </h2>
                <ul className="mt-4 space-y-3" role="list">
                  {recentArticles.map((article) => (
                    <li key={article.slug}>
                      <Link
                        href={`/blog/${article.slug}`}
                        className="group flex flex-col rounded-xl border border-slate-200 bg-white p-4 transition-colors hover:border-[#93c5fd] sm:flex-row sm:items-start sm:gap-6 sm:p-5"
                      >
                        <time
                          dateTime={article.publishedAt}
                          className="shrink-0 text-xs text-slate-400 sm:w-28 sm:pt-0.5"
                        >
                          {formatDate(article.publishedAt)}
                        </time>
                        <div className="mt-1.5 sm:mt-0">
                          <p className="font-medium text-slate-900 group-hover:text-[#2563eb]">
                            {article.title}
                          </p>
                          {article.description ? (
                            <p className="mt-1 text-sm leading-6 text-slate-500 line-clamp-2">
                              {article.description}
                            </p>
                          ) : null}
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-slate-600">
                  <Link href="/blog" className="text-[#2563eb] hover:underline">
                    Blog 一覧を見る →
                  </Link>
                </p>
              </section>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
