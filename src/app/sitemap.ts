import type { MetadataRoute } from 'next';

const BASE = 'https://casa-xicun.vercel.app';

const routes = [
  '',
  '/rooms',
  '/rooms/king-suite',
  '/rooms/boho-double',
  '/rooms/social-dorm',
  '/rooms/garden-double',
  '/experiences',
  '/the-house',
  '/journal',
  '/contact',
  '/book',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.flatMap((path) =>
    (['en', 'es'] as const).map((lang) => ({
      url: `${BASE}/${lang}${path}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: path === '' ? 1 : path.startsWith('/rooms') ? 0.9 : 0.7,
      alternates: {
        languages: {
          en: `${BASE}/en${path}`,
          es: `${BASE}/es${path}`,
        },
      },
    })),
  );
}
