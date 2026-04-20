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

  const site = getSiteLocaleConfig(language)

  return (
    <div className="relative min-h-screen overflow-hidden text-[#101828]">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(15,118,110,0.12),_transparent_30%),radial-gradient(circle_at_82%_14%,_rgba(59,130,246,0.1),_transparent_28%),linear-gradient(180deg,_#f7f9fc,_#eef3f7)]" />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'linear-gradient(rgba(15,23,42,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.04) 1px, transparent 1px)',
            backgroundSize: '34px 34px',
            maskImage:
              'radial-gradient(circle at center, black 32%, transparent 88%)',
          }}
        />
      </div>
      <Navbar />
      {children}
      <footer className="page-shell pb-8 pt-4">
        <div className="surface-card px-6 py-5 text-sm text-[#526072]">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <p>© {new Date().getFullYear()} Jabin Chen</p>
            <p>{site.footerTagline}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
