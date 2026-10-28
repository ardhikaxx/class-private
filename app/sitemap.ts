import type { MetadataRoute } from 'next';
import { APP_CONFIG } from '@/lib/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = APP_CONFIG.metadata.siteUrl;

  return [
    {
      url: baseUrl,
      lastModified: new Date('2026-10-28'),
      changeFrequency: 'weekly',
      priority: 1.0
    },
    {
      url: `${baseUrl}/daftar`,
      lastModified: new Date('2026-10-28'),
      changeFrequency: 'weekly',
      priority: 0.9
    }
  ];
}
