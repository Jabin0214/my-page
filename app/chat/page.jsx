import Chat from '../../src/views/Chat'
import { createPageMetadata } from '../../src/lib/metadata'

export const metadata = createPageMetadata({
  title: 'Chat',
  description:
    'Chat with an AI assistant trained on Jabin Chen’s projects, experience, and technical background.',
  path: '/chat',
})

export default function ChatPage() {
  return <Chat />
}
