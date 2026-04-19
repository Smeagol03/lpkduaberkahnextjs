import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.lpkduaberkah.com';
  
  // Daftar route statis
  const routes = [
    '',
    '/daftar',
    '/paket',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Di masa depan, Anda bisa fetch slug paket dari Firebase di sini
  const paketSlugs = ['paket1', 'paket2', 'paket3', 'paket4', 'paket5'];
  const paketRoutes = paketSlugs.map((slug) => ({
    url: `${baseUrl}/paket/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...routes, ...paketRoutes];
}
