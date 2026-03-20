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
  title: 'Jabin Chen | Full Stack Developer Portfolio',
  siteUrl: normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),
  description:
    "Jabin Chen is a full stack developer in Auckland building React, Next.js, .NET, AI, and cloud-powered products. Explore projects, experience, and contact details.",
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
  contact: {
    email: 'jabinchen0214@outlook.com',
    github: 'https://github.com/Jabin0214',
    chat: '/chat',
    resumeFileName: 'resume.pdf',
    ogImage: '/og-image.jpg',
  },
}
