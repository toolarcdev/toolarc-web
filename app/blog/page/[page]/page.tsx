import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { BlogIndexHeadLinks } from "@/components/blog/BlogIndexHeadLinks";
import { BlogIndexView } from "@/components/blog/BlogIndexView";
import { loadBlogIndexArticles } from "@/lib/blog/list-articles";
import {
  getBlogPagePath,
  getBlogTotalPages,
  parseBlogPageParam,
} from "@/lib/blog/pagination";
import { blogSlugs } from "@/lib/blog/posts";

type PageProps = {
  params: Promise<{ page: string }>;
};

export function generateStaticParams() {
  const totalPages = getBlogTotalPages(blogSlugs.length);
  if (totalPages <= 1) {
    return [];
  }

  return Array.from({ length: totalPages - 1 }, (_, index) => ({
    page: String(index + 2),
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { page: pageParam } = await params;
  const page = parseBlogPageParam(pageParam);
  if (page === null || page <= 1) {
    return {};
  }

  const canonical = getBlogPagePath(page);

  return {
    title: `Blog（${page}ページ目） | ToolArc`,
    description:
      "AI活用・開発・ワークフロー・トラブル解決の技術記事一覧。シリーズ形式で体系的にまとめています。",
    alternates: { canonical },
  };
}

export default async function BlogPaginatedPage({ params }: PageProps) {
  const { page: pageParam } = await params;
  const page = parseBlogPageParam(pageParam);

  if (page === null) {
    notFound();
  }

  if (page === 1) {
    redirect("/blog");
  }

  const data = await loadBlogIndexArticles(page);
  if (!data) {
    notFound();
  }

  return (
    <>
      <BlogIndexHeadLinks
        currentPage={data.page}
        totalPages={data.totalPages}
      />
      <BlogIndexView
        articles={data.articles}
        currentPage={data.page}
        totalPages={data.totalPages}
      />
    </>
  );
}
