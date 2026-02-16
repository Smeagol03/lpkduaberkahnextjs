import { MetadataRoute } from 'next';

const siteUrl = 'https://lpkduaberkah.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const paketSlugs = ['paket1', 'paket2', 'paket3', 'paket4', 'paket5'];

  const paketPages = paketSlugs.map((slug) => ({
    url: `${siteUrl}/paket/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${siteUrl}/paket`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/daftar`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...paketPages,
  ];
}
