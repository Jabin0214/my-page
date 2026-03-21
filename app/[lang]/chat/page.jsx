import ChatContent from './chat-content'
import { getPortfolioContent } from '../../../src/content/portfolio-content'
import { createPageMetadata } from '../../../src/lib/metadata'
import { resolveLanguageParam, DEFAULT_LANGUAGE } from '../../../src/lib/language'

export async function generateMetadata({ params }) {
  const { lang } = await params
  const language = resolveLanguageParam(lang) || DEFAULT_LANGUAGE
  const content = getPortfolioContent(language)
  const title =
    content.navigation.links.find((link) => link.path === '/chat')?.label || 'Chat'

  return createPageMetadata({
    lang: language,
    title,
    description: content.chat.description,
    path: '/chat',
  })
}

export default function ChatPage() {
  return <ChatContent />
}
