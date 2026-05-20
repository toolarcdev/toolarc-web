import type { Metadata } from "next";
import { ArticleHeader } from "@/components/blog/ArticleHeader";
import { BlogShell } from "@/components/blog/BlogShell";
import { MarkdownArticle } from "@/components/blog/MarkdownArticle";
import { loadPost } from "@/lib/blog/load-post";

const SLUG = "01-site-launch" as const;
const SITE_URL = "https://www.toolarc.jp";

export async function generateMetadata(): Promise<Metadata> {
  const post = await loadPost(SLUG);
  const url = `${SITE_URL}/blog/${SLUG}`;
  const ogImage = `${post.imageBasePath}/01-success-webpage.png`;

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: url,
    },
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

export default async function SiteLaunchArticlePage() {
  const post = await loadPost(SLUG);
  const url = `${SITE_URL}/blog/${SLUG}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    author: {
      "@type": "Organization",
      name: "ToolArc",
    },
    publisher: {
      "@type": "Organization",
      name: "ToolArc",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    image: `${SITE_URL}${post.imageBasePath}/01-success-webpage.png`,
  };

  return (
    <BlogShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-14 lg:py-16">
        <ArticleHeader
          title={post.title}
          description={post.description}
          publishedAt={post.publishedAt}
        />
        <div className="article">
          <MarkdownArticle
            content={post.content}
            imageBasePath={post.imageBasePath}
          />
        </div>
      </article>
    </BlogShell>
  );
}
