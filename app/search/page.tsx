import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchView } from "@/components/search/SearchView";
import { loadSearchIndex } from "@/lib/blog/search-articles";

export const metadata: Metadata = {
  title: "記事を検索 | ToolArc",
  description:
    "ToolArc ブログ記事をタイトル・説明・タグから検索できます。AI活用・開発・ワークフローのTipsを素早く見つけられます。",
  alternates: { canonical: "/search" },
};

function SearchFallback() {
  return (
    <main className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-4xl text-sm text-slate-500">
        検索を読み込んでいます…
      </div>
    </main>
  );
}

export default async function SearchPage() {
  const articles = await loadSearchIndex();

  return (
    <Suspense fallback={<SearchFallback />}>
      <SearchView articles={articles} />
    </Suspense>
  );
}
