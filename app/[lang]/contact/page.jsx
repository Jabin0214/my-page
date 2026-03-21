import ContactContent from './contact-content'
import { getPortfolioContent } from '../../../src/content/portfolio-content'
import { createPageMetadata } from '../../../src/lib/metadata'
import { resolveLanguageParam, DEFAULT_LANGUAGE } from '../../../src/lib/language'

export async function generateMetadata({ params }) {
  const { lang } = await params
  const language = resolveLanguageParam(lang) || DEFAULT_LANGUAGE
  const content = getPortfolioContent(language)
  const title =
    content.navigation.links.find((link) => link.path === '/contact')?.label ||
    'Contact'

  return createPageMetadata({
    lang: language,
    title,
    description: content.contact.description,
    path: '/contact',
  })
}

export default function ContactPage() {
  return <ContactContent />
}
