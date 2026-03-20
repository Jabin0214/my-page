import ContactContent from './contact-content'
import { createPageMetadata } from '../../src/lib/metadata'

export const metadata = createPageMetadata({
  title: 'Contact',
  description: 'Contact Jabin Chen for full-stack engineering opportunities and collaborations.',
  path: '/contact',
})

export default function ContactPage() {
  return <ContactContent />
}
