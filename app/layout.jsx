import './globals.css'
import Providers from './providers'
import Navbar from '../src/components/pageComponents/Navbar'
import Footer from '../src/components/pageComponents/Footer'
import BackgroundVisual from '../src/components/ui/BackgroundVisual'
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
        <Providers initialLanguage={DEFAULT_LANGUAGE}>
          <div className="relative min-h-screen overflow-hidden text-[#101828]">
            <BackgroundVisual />
            <Navbar />
            {children}
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
