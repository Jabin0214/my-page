import HomeContent from './home-content'
import { getSiteLocaleConfig } from '../../src/config/site'
import {
  buildPersonJsonLd,
  buildWebsiteJsonLd,
  createPageMetadata,
} from '../../src/lib/metadata'
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
  const personJsonLd = buildPersonJsonLd({ language, path: '/' })
  const websiteJsonLd = buildWebsiteJsonLd({ language, path: '/' })

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
