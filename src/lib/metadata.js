import { SITE_CONFIG, getSiteLocaleConfig } from '../config/site.js'
import { SUPPORTED_LANGUAGES, localizePath, normalizeLanguage } from './language.js'

export function buildCanonicalUrl(path = '/', language) {
  const resolvedPath = language ? localizePath(path, language) : path
  return new URL(resolvedPath, SITE_CONFIG.siteUrl).toString()
}

export function buildAlternateLanguageLinks(path = '/') {
  const alternates = Object.fromEntries(
    SUPPORTED_LANGUAGES.map((language) => [language, buildCanonicalUrl(path, language)])
  )

  alternates['x-default'] = new URL(path, SITE_CONFIG.siteUrl).toString()

  return alternates
}

export function createPageMetadata({
  lang,
  absoluteTitle,
  title,
  description,
  path = '/',
}) {
  const language = normalizeLanguage(lang)
  const site = getSiteLocaleConfig(language)
  const canonical = buildCanonicalUrl(path, language)
  const metadataTitle = absoluteTitle
    ? { absolute: absoluteTitle }
    : title

  return {
    title: metadataTitle,
    description,
    alternates: {
      canonical,
      languages: buildAlternateLanguageLinks(path),
    },
    openGraph: {
      title: absoluteTitle || title || site.title,
      description,
      url: canonical,
      locale: site.openGraphLocale,
      alternateLocale: SUPPORTED_LANGUAGES.filter((entry) => entry !== language).map(
        (entry) => getSiteLocaleConfig(entry).openGraphLocale
      ),
    },
    twitter: {
      title: absoluteTitle || title || site.title,
      description,
      images: [SITE_CONFIG.contact.ogImage],
    },
  }
}

export function buildPersonJsonLd({ language, path = '/' } = {}) {
  const normalizedLanguage = normalizeLanguage(language)
  const site = getSiteLocaleConfig(normalizedLanguage)
  const url = buildCanonicalUrl(path, normalizedLanguage)

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE_CONFIG.owner,
    alternateName: SITE_CONFIG.alternateNames,
    url,
    mainEntityOfPage: url,
    jobTitle: site.jobTitle,
    description: site.description,
    email: `mailto:${SITE_CONFIG.contact.email}`,
    image: new URL(SITE_CONFIG.contact.ogImage, SITE_CONFIG.siteUrl).toString(),
    sameAs: SITE_CONFIG.profileUrls,
    homeLocation: {
      '@type': 'Place',
      name: SITE_CONFIG.location,
    },
    knowsAbout: [
      'React',
      'Next.js',
      '.NET',
      'AI applications',
      'Cloud development',
      'Full stack development',
    ],
    inLanguage: normalizedLanguage,
  }
}

export function buildWebsiteJsonLd({ language, path = '/' } = {}) {
  const normalizedLanguage = normalizeLanguage(language)
  const site = getSiteLocaleConfig(normalizedLanguage)
  const url = buildCanonicalUrl(path, normalizedLanguage)

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.title,
    alternateName: SITE_CONFIG.alternateNames,
    url,
    description: site.description,
    inLanguage: normalizedLanguage,
    publisher: {
      '@type': 'Person',
      name: SITE_CONFIG.owner,
      alternateName: SITE_CONFIG.alternateNames,
      url,
    },
    about: {
      '@type': 'Person',
      name: SITE_CONFIG.owner,
      alternateName: SITE_CONFIG.alternateNames,
      jobTitle: site.jobTitle,
      url,
    },
  }
}
