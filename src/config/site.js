export const SITE_CONFIG = {
  owner: 'Jabin Chen',
  title: 'Jabin Chen | Full Stack Developer Portfolio',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.jabinchen.com',
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
    chat: 'https://cyber-jabin.vercel.app/',
    resumeFileName: 'resume.pdf',
    ogImage: '/favicon.png',
  },
}

export const ROUTE_META = {
  '/': {
    title: 'Jabin | Portfolio',
  },
  '/projects': {
    title: 'Jabin | Projects',
  },
  '/contact': {
    title: 'Jabin | Contact',
  },
}
