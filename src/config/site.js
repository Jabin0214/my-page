export const SITE_CONFIG = {
  owner: 'Jabin',
  title: 'Jabin | Portfolio',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.jabinchen.com',
  description:
    "Jabin Chen's portfolio featuring full-stack projects, experience, and contact information.",
  contact: {
    email: 'jabinchen0214@outlook.com',
    github: 'https://github.com/Jabin0214',
    chat: 'https://cyber-jabin.vercel.app/',
    resumeFileName: 'resume.pdf',
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
