import { MetadataRoute } from "next";
import { blogSlugs } from "@/lib/blog/posts";
import { loadPost } from "@/lib/blog/load-post";
import { getBlogTotalPages } from "@/lib/blog/pagination";
import { allSeries } from "@/lib/series/series";

const baseUrl = "https://www.toolarc.jp";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await Promise.all(blogSlugs.map((slug) => loadPost(slug)));

  const allDates = [
    ...posts.map((post) => new Date(post.updatedAt ?? post.publishedAt)),
    ...allSeries.map((series) => new Date(series.publishedAt)),
  ];

  const latestModified = allDates.reduce(
    (latest, d) => (d > latest ? d : latest),
    new Date(0),
  );

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: latestModified },
    { url: `${baseUrl}/blog`, lastModified: latestModified },
    { url: `${baseUrl}/series`, lastModified: latestModified },
    { url: `${baseUrl}/tools/poe2-regex`, lastModified: latestModified },
    { url: `${baseUrl}/about`, lastModified: latestModified },
    { url: `${baseUrl}/privacy`, lastModified: latestModified },
    { url: `${baseUrl}/disclaimer`, lastModified: latestModified },
    { url: `${baseUrl}/affiliate-disclosure`, lastModified: latestModified },
    { url: `${baseUrl}/contact`, lastModified: latestModified },
  ];

  const blogIndexPages: MetadataRoute.Sitemap = Array.from(
    { length: getBlogTotalPages(blogSlugs.length) - 1 },
    (_, index) => ({
      url: `${baseUrl}/blog/page/${index + 2}`,
      lastModified: latestModified,
    }),
  );

  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
  }));

  const seriesPages: MetadataRoute.Sitemap = allSeries.map((series) => ({
    url: `${baseUrl}/series/${series.slug}`,
    lastModified: new Date(series.publishedAt),
  }));

  return [...staticPages, ...blogIndexPages, ...blogPages, ...seriesPages];
}