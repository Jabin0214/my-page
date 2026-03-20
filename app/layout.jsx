import './globals.css'
import { LanguageProvider } from '../src/providers/language-provider'
import Navbar from '../src/components/pageComponents/Navbar'
import { SITE_CONFIG } from '../src/config/site'
import { DEFAULT_LANGUAGE } from '../src/lib/language'

export const metadata = {
  metadataBase: new URL(SITE_CONFIG.siteUrl),
  title: {
    default: SITE_CONFIG.title,
    template: `%s | Jabin Chen`,
  },
  description: SITE_CONFIG.description,
  keywords: SITE_CONFIG.keywords,
  authors: [{ name: SITE_CONFIG.owner, url: SITE_CONFIG.siteUrl }],
  creator: SITE_CONFIG.owner,
  publisher: SITE_CONFIG.owner,
  applicationName: SITE_CONFIG.title,
  alternates: {
    canonical: SITE_CONFIG.siteUrl,
  },
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
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    type: 'website',
    url: SITE_CONFIG.siteUrl,
    siteName: SITE_CONFIG.owner,
    locale: 'en_NZ',
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
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    images: [SITE_CONFIG.contact.ogImage],
  },
  category: 'technology',
}

export default function RootLayout({ children }) {
  return (
    <html lang={DEFAULT_LANGUAGE}>
      <body>
        <LanguageProvider initialLanguage={DEFAULT_LANGUAGE}>
          <div className="relative min-h-screen overflow-hidden text-[#101828]">
            <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(15,118,110,0.12),_transparent_30%),radial-gradient(circle_at_82%_14%,_rgba(59,130,246,0.1),_transparent_28%),linear-gradient(180deg,_#f7f9fc,_#eef3f7)]" />
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(15,23,42,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.04) 1px, transparent 1px)',
                  backgroundSize: '34px 34px',
                  maskImage: 'radial-gradient(circle at center, black 32%, transparent 88%)',
                }}
              />
            </div>
            <Navbar />
            {children}
            <footer className="page-shell pb-8 pt-4">
              <div className="surface-card px-6 py-5 text-sm text-[#526072]">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <p>© {new Date().getFullYear()} Jabin Chen</p>
                  <p>Built with Next.js, a personal point of view, and a lot less chaos.</p>
                </div>
              </div>
            </footer>
          </div>
        </LanguageProvider>
      </body>
    </html>
  )
}
