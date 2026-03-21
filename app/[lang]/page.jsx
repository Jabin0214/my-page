import HomeContent from './home-content'
import { SITE_CONFIG, getSiteLocaleConfig } from '../../src/config/site'
import { createPageMetadata, buildCanonicalUrl } from '../../src/lib/metadata'
import { resolveLanguageParam, DEFAULT_LANGUAGE } from '../../src/lib/language'

export async function generateMetadata({ params }) {
  const { lang } = await params
  const language = resolveLanguageParam(lang) || DEFAULT_LANGUAGE
  const site = getSiteLocaleConfig(language)

  return createPageMetadata({
    lang: language,
    absoluteTitle: site.title,
    description: site.description,
    path: '/',
  })
}

export default async function Page({ params }) {
  const { lang } = await params
  const language = resolveLanguageParam(lang) || DEFAULT_LANGUAGE
  const site = getSiteLocaleConfig(language)
  const localizedUrl = buildCanonicalUrl('/', language)

  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE_CONFIG.owner,
    url: localizedUrl,
    jobTitle: site.jobTitle,
    description: site.description,
    homeLocation: {
      '@type': 'Place',
      name: SITE_CONFIG.location,
    },
    sameAs: [SITE_CONFIG.social.github],
    email: `mailto:${SITE_CONFIG.contact.email}`,
    inLanguage: language,
  }

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.title,
    url: localizedUrl,
    description: site.description,
    inLanguage: language,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <HomeContent />
    </>
  )
}
