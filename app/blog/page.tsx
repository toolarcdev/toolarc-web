import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogIndexHeadLinks } from "@/components/blog/BlogIndexHeadLinks";
import { BlogIndexView } from "@/components/blog/BlogIndexView";
import { loadBlogIndexArticles } from "@/lib/blog/list-articles";

export const metadata: Metadata = {
  title: "Blog | ToolArc",
  description:
    "AI活用・開発・ワークフロー・トラブル解決の技術記事一覧。シリーズ形式で体系的にまとめています。",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const data = await loadBlogIndexArticles(1);
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
