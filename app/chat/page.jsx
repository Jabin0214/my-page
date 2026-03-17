import Chat from '../../src/views/Chat'
import { SITE_CONFIG } from '../../src/config/site'

export const metadata = {
  title: 'Chat',
  description:
    'Chat with an AI assistant trained on Jabin Chen’s projects, experience, and technical background.',
  alternates: {
    canonical: `${SITE_CONFIG.siteUrl}/chat`,
  },
}

export default function ChatPage() {
  return <Chat />
}
