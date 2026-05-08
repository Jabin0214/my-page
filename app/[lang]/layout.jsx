import { notFound } from 'next/navigation'
import Navbar from '../../src/components/pageComponents/Navbar'
import { SITE_CONFIG, getSiteLocaleConfig } from '../../src/config/site'
import {
  SUPPORTED_LANGUAGES,
  resolveLanguageParam,
} from '../../src/lib/language'

export const dynamicParams = false

export function generateStaticParams() {
  return SUPPORTED_LANGUAGES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }) {
  const { lang } = await params
  const language = resolveLanguageParam(lang) || SUPPORTED_LANGUAGES[0]
  const site = getSiteLocaleConfig(language)

  return {
    metadataBase: new URL(SITE_CONFIG.siteUrl),
    title: {
      default: site.title,
      template: `%s | ${SITE_CONFIG.owner}`,
    },
    description: site.description,
    keywords: Array.from(new Set([...SITE_CONFIG.keywords, ...site.keywords])),
    authors: [{ name: SITE_CONFIG.owner, url: SITE_CONFIG.siteUrl }],
    creator: SITE_CONFIG.owner,
    publisher: SITE_CONFIG.owner,
    applicationName: site.title,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    openGraph: {
      title: site.title,
      description: site.description,
      type: 'website',
      siteName: SITE_CONFIG.owner,
      locale: site.openGraphLocale,
      images: [
        {
          url: SITE_CONFIG.contact.ogImage,
          width: 1024,
          height: 1024,
          alt: `${SITE_CONFIG.owner} portfolio`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: site.title,
      description: site.description,
      images: [SITE_CONFIG.contact.ogImage],
    },
    category: 'technology',
  }
}

export default async function RootLayout({ children, params }) {
  const { lang } = await params
  const language = resolveLanguageParam(lang)

  if (!language) {
    notFound()
  }

  return (
    <div className="minimal-site-shell">
      <Navbar />
      {children}
      <footer className="minimal-site-footer">
        <div>
          <p>© {new Date().getFullYear()} Jabin Chen</p>
        </div>
      </footer>
    </div>
  )
}
