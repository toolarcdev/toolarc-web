import { MetadataRoute } from 'next'
import { getAllPostMeta } from '@/lib/blog/posts'
import { allSeries } from '@/lib/series/series'

const baseUrl = 'https://www.toolarc.jp'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPostMeta()

  const allDates = [
    ...posts.map((post) => new Date(post.publishedAt)),
    ...allSeries.map((series) => new Date(series.publishedAt)),
  ]

  const latestModified = allDates.reduce(
    (latest, d) => (d > latest ? d : latest),
    new Date(0)
  )

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: latestModified },
    { url: `${baseUrl}/blog`, lastModified: latestModified },
    { url: `${baseUrl}/series`, lastModified: latestModified },
    { url: `${baseUrl}/tools/poe2-regex`, lastModified: latestModified },
  ]

  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
  }))

  const seriesPages: MetadataRoute.Sitemap = allSeries.map((series) => ({
    url: `${baseUrl}/series/${series.slug}`,
    lastModified: new Date(series.publishedAt),
  }))

  return [...staticPages, ...blogPages, ...seriesPages]
}