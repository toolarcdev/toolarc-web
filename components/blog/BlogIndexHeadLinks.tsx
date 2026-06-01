import { SITE_URL } from "@/lib/blog/constants";
import { getBlogPagePath } from "@/lib/blog/pagination";

type BlogIndexHeadLinksProps = {
  currentPage: number;
  totalPages: number;
};

export function BlogIndexHeadLinks({
  currentPage,
  totalPages,
}: BlogIndexHeadLinksProps) {
  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;

  return (
    <>
      {prevPage !== null && (
        <link
          rel="prev"
          href={`${SITE_URL}${getBlogPagePath(prevPage)}`}
        />
      )}
      {nextPage !== null && (
        <link
          rel="next"
          href={`${SITE_URL}${getBlogPagePath(nextPage)}`}
        />
      )}
    </>
  );
}
