import { SITE_CONFIG } from '../config/site'

export function buildCanonicalUrl(path = '/') {
  return new URL(path, SITE_CONFIG.siteUrl).toString()
}

export function createPageMetadata({ absoluteTitle, title, description, path = '/' }) {
  const canonical = buildCanonicalUrl(path)
  const metadataTitle = absoluteTitle
    ? { absolute: absoluteTitle }
    : title

  return {
    title: metadataTitle,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: absoluteTitle || title || SITE_CONFIG.title,
      description,
      url: canonical,
    },
  }
}
