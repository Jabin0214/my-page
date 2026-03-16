import { SITE_CONFIG } from '../src/config/site'

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${SITE_CONFIG.siteUrl}/sitemap.xml`,
  }
}
