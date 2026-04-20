import './globals.css'
import { SITE_CONFIG } from '../src/config/site'
import { DEFAULT_LANGUAGE, resolveLanguageParam } from '../src/lib/language'

export const metadata = {
  metadataBase: new URL(SITE_CONFIG.siteUrl),
}

export default async function RootLayout({ children, params }) {
  const resolvedParams = await params
  const language = resolveLanguageParam(resolvedParams?.lang) || DEFAULT_LANGUAGE

  return (
    <html lang={language}>
      <body>{children}</body>
    </html>
  )
}
