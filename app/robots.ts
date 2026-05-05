import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',      // Don't index your internal API routes, best practice
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}