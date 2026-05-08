import Link from 'next/link'
import { SITE_CONFIG } from '../src/config/site'
import {
  buildAlternateLanguageLinks,
  buildPersonJsonLd,
  buildWebsiteJsonLd,
} from '../src/lib/metadata'

export const metadata = {
  title: 'Jabin Chen | Official Website',
  description:
    'Official website of Jabin Chen. Choose English or Chinese to view Jabin Chen’s portfolio, projects, experience, and contact details.',
  alternates: {
    canonical: '/',
    languages: buildAlternateLanguageLinks('/'),
  },
  robots: {
    index: true,
    follow: true,
  },
}

const languageOptions = [
  {
    href: '/en',
    label: 'English',
    description: 'Enter the English site',
  },
  {
    href: '/zh',
    label: '中文',
    description: '进入中文站点',
  },
]

export default function Page() {
  const personJsonLd = buildPersonJsonLd()
  const websiteJsonLd = buildWebsiteJsonLd()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <main className="minimal-language-page">
        <section className="minimal-language-shell">
          <p className="minimal-kicker">Choose Language</p>
          <h1>Jabin Chen</h1>

          <div className="minimal-language-options">
            {languageOptions.map((option) => (
              <Link
                key={option.href}
                href={option.href}
                className="minimal-language-option"
              >
                <span>{option.label}</span>
                <small>{option.description}</small>
              </Link>
            ))}
          </div>

          <p className="minimal-language-location">{SITE_CONFIG.location}</p>
        </section>
      </main>
    </>
  )
}
