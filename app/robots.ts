import { MetadataRoute } from 'next'

const baseUrl = 'https://www.toolarc.jp'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}