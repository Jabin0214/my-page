import { SITE_CONFIG } from '../src/config/site'

export default function sitemap() {
  const baseUrl = SITE_CONFIG.siteUrl

  return [
    '',
    '/projects',
    '/contact',
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : 0.7,
  }))
}
