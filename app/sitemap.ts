import type { MetadataRoute } from 'next'
import { RECIPES } from '@/lib/recipes'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://calcuchela.com'

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${base}/cocteles`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${base}/acerca`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${base}/privacidad`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  const recipeRoutes: MetadataRoute.Sitemap = RECIPES.map((r) => ({
    url: `${base}/cocteles/${r.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [...staticRoutes, ...recipeRoutes]
}
