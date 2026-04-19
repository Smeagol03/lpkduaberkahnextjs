import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin/', 
        '/api/', 
        '/debug/',
        '/test-api/'
      ],
    },
    sitemap: 'https://www.lpkduaberkah.com/sitemap.xml',
  };
}
