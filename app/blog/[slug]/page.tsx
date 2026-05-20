import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleHeader } from "@/components/blog/ArticleHeader";
import { BlogShell } from "@/components/blog/BlogShell";
import { MarkdownArticle } from "@/components/blog/MarkdownArticle";
import { blogPostUrl, SITE_URL } from "@/lib/blog/constants";
import { loadPost } from "@/lib/blog/load-post";
import { blogSlugs, isBlogSlug } from "@/lib/blog/posts";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!isBlogSlug(slug)) {
    return {};
  }

  const post = await loadPost(slug);
  const url = blogPostUrl(slug);
  const ogImage = `${post.imageBasePath}/${post.ogImage}`;

  return {
    title: `${post.title} | ToolArc`,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      locale: "ja_JP",
      url,
      title: post.title,
      description: post.description,
      siteName: "ToolArc",
      publishedTime: post.publishedAt,
      images: [{ url: ogImage, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogImage],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  if (!isBlogSlug(slug)) {
    notFound();
  }

  const post = await loadPost(slug);
  const url = blogPostUrl(slug);
  const ogImageUrl = `${SITE_URL}${post.imageBasePath}/${post.ogImage}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    inLanguage: "ja",
    author: { "@type": "Organization", name: "ToolArc" },
    publisher: { "@type": "Organization", name: "ToolArc" },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: ogImageUrl,
  };

  return (
    <BlogShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-3xl">
          <nav aria-label="パンくずリスト" className="mb-8 text-sm text-slate-500">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-[#2563eb]">
                  トップ
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/#articles" className="hover:text-[#2563eb]">
                  記事一覧
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-slate-700" aria-current="page">
                記事
              </li>
            </ol>
          </nav>

          <article itemScope itemType="https://schema.org/BlogPosting">
            <ArticleHeader
              title={post.title}
              description={post.description}
              publishedAt={post.publishedAt}
            />
            <div className="article mt-10">
              <MarkdownArticle
                content={post.content}
                imageBasePath={post.imageBasePath}
              />
            </div>
          </article>

          <footer className="mt-12 border-t border-[#dbeafe] pt-8">
            <Link
              href="/#articles"
              className="text-sm font-medium text-[#2563eb] hover:underline"
            >
              ← 記事一覧に戻る
            </Link>
          </footer>
        </div>
      </main>
    </BlogShell>
  );
}
