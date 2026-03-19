import Chat from '../../src/views/Chat'
import { createPageMetadata } from '../../src/lib/metadata'

export const metadata = createPageMetadata({
  title: 'Chat',
  description:
    'Chat with a conversational AI version of Jabin Chen to explore projects, engineering choices, experience, and career story.',
  path: '/chat',
})

export default function ChatPage() {
  return <Chat />
}
