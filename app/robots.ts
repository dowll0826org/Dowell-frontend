import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/dashboard/', // Dashboard and user-specific routes should not be indexed
        '/api/',       // API routes should not be crawled
        '/_next/',     // Next.js internal files
      ],
    },
    sitemap: 'https://dowll.com/sitemap.xml',
  };
}
