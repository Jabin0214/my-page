import HomeContent from './home-content'
import { SITE_CONFIG } from '../src/config/site'
import { createPageMetadata } from '../src/lib/metadata'

export const metadata = createPageMetadata({
  absoluteTitle: SITE_CONFIG.title,
  description: SITE_CONFIG.description,
  path: '/',
})

export default function Page() {
  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE_CONFIG.owner,
    url: SITE_CONFIG.siteUrl,
    jobTitle: SITE_CONFIG.jobTitle,
    description: SITE_CONFIG.description,
    homeLocation: {
      '@type': 'Place',
      name: SITE_CONFIG.location,
    },
    sameAs: [
      SITE_CONFIG.social.github,
    ],
    email: `mailto:${SITE_CONFIG.contact.email}`,
  }

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_CONFIG.title,
    url: SITE_CONFIG.siteUrl,
    description: SITE_CONFIG.description,
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
