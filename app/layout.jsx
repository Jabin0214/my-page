import './globals.css'
import Providers from './providers'
import Navbar from '../src/components/pageComponents/Navbar'
import Footer from '../src/components/pageComponents/Footer'
import BackgroundVisual from '../src/components/ui/BackgroundVisual'
import { SITE_CONFIG } from '../src/config/site'

export const metadata = {
  metadataBase: new URL(SITE_CONFIG.siteUrl),
  title: {
    default: SITE_CONFIG.title,
    template: `%s | ${SITE_CONFIG.owner}`,
  },
  description: SITE_CONFIG.description,
  openGraph: {
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    type: 'website',
    url: SITE_CONFIG.siteUrl,
    siteName: SITE_CONFIG.owner,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="relative min-h-screen overflow-hidden bg-neutral-900 text-white">
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
