import Link from 'next/link'
import { Globe } from 'lucide-react'
import { SITE_CONFIG } from '../src/config/site'
import { buildAlternateLanguageLinks } from '../src/lib/metadata'

export const metadata = {
  title: 'Jabin Chen',
  description:
    'Choose English or Chinese to view Jabin Chen’s portfolio, projects, experience, and contact details.',
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
    description: 'Projects, experience, and contact details.',
  },
  {
    href: '/zh',
    label: '中文',
    description: '项目、经历和联系方式。',
  },
]

export default function Page() {
  return (
    <main className="page-shell flex min-h-screen items-center py-10">
      <section className="surface-card-strong w-full px-6 py-8 md:px-10 md:py-10">
        <span className="eyebrow">
          <Globe className="h-4 w-4" />
          Choose Language
        </span>
        <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight md:text-6xl">
          Jabin Chen
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-[#526072]">
          Pick your preferred language to view the portfolio.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {languageOptions.map((option) => (
            <Link
              key={option.href}
              href={option.href}
              className="surface-subtle block px-5 py-5 hover:bg-white"
            >
              <p className="text-2xl font-semibold text-[#101828]">{option.label}</p>
              <p className="mt-2 text-sm leading-7 text-[#526072]">{option.description}</p>
            </Link>
          ))}
        </div>

        <p className="mt-8 text-sm leading-7 text-[#526072]">
          {SITE_CONFIG.location}
        </p>
      </section>
    </main>
  )
}
