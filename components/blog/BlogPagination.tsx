import Link from "next/link";
import { getBlogPagePath } from "@/lib/blog/pagination";

type BlogPaginationProps = {
  currentPage: number;
  totalPages: number;
};

export function BlogPagination({ currentPage, totalPages }: BlogPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav
      aria-label="記事一覧のページ送り"
      className="mt-8 flex flex-wrap items-center justify-center gap-2"
    >
      {currentPage > 1 ? (
        <Link
          href={getBlogPagePath(currentPage - 1)}
          className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-600 transition-colors hover:border-[#93c5fd] hover:text-[#2563eb]"
        >
          前へ
        </Link>
      ) : (
        <span className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-1.5 text-sm text-slate-300">
          前へ
        </span>
      )}

      <div className="flex flex-wrap items-center gap-1">
        {pages.map((page) => {
          const isCurrent = page === currentPage;

          if (isCurrent) {
            return (
              <span
                key={page}
                aria-current="page"
                className="rounded-lg bg-[#2563eb] px-3 py-1.5 text-sm font-medium text-white"
              >
                {page}
              </span>
            );
          }

          return (
            <Link
              key={page}
              href={getBlogPagePath(page)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-600 transition-colors hover:border-[#93c5fd] hover:text-[#2563eb]"
            >
              {page}
            </Link>
          );
        })}
      </div>

      {currentPage < totalPages ? (
        <Link
          href={getBlogPagePath(currentPage + 1)}
          className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-600 transition-colors hover:border-[#93c5fd] hover:text-[#2563eb]"
        >
          次へ
        </Link>
      ) : (
        <span className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-1.5 text-sm text-slate-300">
          次へ
        </span>
      )}
    </nav>
  );
}
