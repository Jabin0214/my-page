import Contact from '../../src/views/Contact'

export const metadata = {
  title: 'Contact',
  description: 'Contact Jabin Chen for full-stack engineering opportunities and collaborations.',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.jabinchen.com'}/contact`,
  },
}

export default function ContactPage() {
  return <Contact />
}
