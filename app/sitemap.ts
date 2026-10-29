import type { MetadataRoute } from 'next';
import { APP_CONFIG } from '@/lib/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = APP_CONFIG.metadata.siteUrl;
  const lastMod = new Date('2026-10-29');

  return [
    {
      url: baseUrl,
      lastModified: lastMod,
      changeFrequency: 'daily',
      priority: 1.0
    },
    {
      url: `${baseUrl}/daftar`,
      lastModified: lastMod,
      changeFrequency: 'weekly',
      priority: 0.9
    }
  ];
}
