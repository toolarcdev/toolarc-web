import { MetadataRoute } from "next";
import { blogSlugs } from "@/lib/blog/posts";
import { loadPost } from "@/lib/blog/load-post";
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
    { url: `${baseUrl}/search`, lastModified: latestModified },
    { url: `${baseUrl}/series`, lastModified: latestModified },
    { url: `${baseUrl}/tools/poe2-regex`, lastModified: latestModified },
    { url: `${baseUrl}/about`, lastModified: latestModified },
    { url: `${baseUrl}/privacy`, lastModified: latestModified },
    { url: `${baseUrl}/disclaimer`, lastModified: latestModified },
    { url: `${baseUrl}/affiliate-disclosure`, lastModified: latestModified },
    { url: `${baseUrl}/contact`, lastModified: latestModified },
    // LP publish date (do not use new Date() — avoid churn on every rebuild)
    {
      url: `${baseUrl}/lp/ai-skill-academy-free-seminar`,
      lastModified: new Date("2026-09-15"),
    },
    // The paid-school LP's publication date is not set until deployment.
    { url: `${baseUrl}/lp/ai-skill-academy-paid-school` },
    // The ByTech LP's publication date is not set until deployment.
    { url: `${baseUrl}/lp/bytech-generative-ai` },
    {
      url: `${baseUrl}/lp/internet-academy-generative-ai`,
      lastModified: new Date("2026-10-08"),
    },
    // Publication date is recorded after deployment.
    { url: `${baseUrl}/lp/programming-hacks` },
  ];

  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
  }));

  const seriesPages: MetadataRoute.Sitemap = allSeries.map((series) => ({
    url: `${baseUrl}/series/${series.slug}`,
    lastModified: new Date(series.publishedAt),
  }));

  return [...staticPages, ...blogPages, ...seriesPages];
}
