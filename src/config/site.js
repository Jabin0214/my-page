import { DEFAULT_LANGUAGE, normalizeLanguage } from '../lib/language.js'

const DEFAULT_SITE_URL = 'https://jabinchen.com'

function normalizeSiteUrl(siteUrl) {
  try {
    const url = new URL(siteUrl || DEFAULT_SITE_URL)

    if (url.hostname === 'www.jabinchen.com') {
      url.hostname = 'jabinchen.com'
    }

    return url.toString().replace(/\/$/, '')
  } catch {
    return DEFAULT_SITE_URL
  }
}

export const SITE_CONFIG = {
  owner: 'Jabin Chen',
  alternateNames: ['JabinChen', 'Jabin Chen Developer', 'Jabin Chen Portfolio'],
  siteUrl: normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),
  jobTitle: 'Full Stack Developer',
  location: 'Auckland, New Zealand',
  keywords: [
    'Jabin Chen',
    'JabinChen',
    'Jabin Chen portfolio',
    'Full Stack Developer',
    'React Developer',
    'Next.js Developer',
    'Software Engineer Auckland',
    'AI Developer',
  ],
  social: {
    github: 'https://github.com/Jabin0214',
  },
  profileUrls: [
    DEFAULT_SITE_URL,
    'https://github.com/Jabin0214',
  ],
  contact: {
    email: 'jabinchen0214@outlook.com',
    github: 'https://github.com/Jabin0214',
    chat: '/chat',
    resumeFileName: 'resume.pdf',
    ogImage: '/og-image.jpg',
  },
  locales: {
    en: {
      title: 'Jabin Chen | Official Portfolio & Full Stack Developer',
      description:
        'Official website of Jabin Chen, a full stack developer in Auckland building React, Next.js, .NET, AI, and cloud-powered products.',
      footerTagline: 'Built with Next.js, a personal point of view, and a lot less chaos.',
      openGraphLocale: 'en_NZ',
      jobTitle: 'Full Stack Developer',
      keywords: [
        'Jabin Chen',
        'Jabin Chen portfolio',
        'Full Stack Developer',
        'AI Developer',
      ],
    },
    zh: {
      title: 'Jabin Chen | 官方作品集与全栈开发工程师',
      description:
        'Jabin Chen 官方网站。Jabin Chen 是一名位于奥克兰的全栈开发工程师，专注于 React、Next.js、.NET、AI 与云端产品。',
      footerTagline: '用 Next.js 搭建，也带着一点个人视角，少一点模板味。',
      openGraphLocale: 'zh_CN',
      jobTitle: '全栈开发工程师',
      keywords: [
        'Jabin Chen',
        'Jabin Chen 作品集',
        '全栈开发工程师',
        'AI 开发',
      ],
    },
  },
}

SITE_CONFIG.title = SITE_CONFIG.locales.en.title
SITE_CONFIG.description = SITE_CONFIG.locales.en.description

export function getSiteLocaleConfig(language = DEFAULT_LANGUAGE) {
  return SITE_CONFIG.locales[normalizeLanguage(language)]
}
