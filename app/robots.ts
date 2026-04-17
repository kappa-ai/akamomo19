import type { MetadataRoute } from 'next'

const BASE = 'https://app.akamomopartners.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${BASE}/sitemap.xml`,
  }
}
