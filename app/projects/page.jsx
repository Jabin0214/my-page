import Projects from '../../src/views/Projects'

export const metadata = {
  title: 'Projects',
  description: 'Selected full-stack, AI, and product projects by Jabin Chen.',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.jabinchen.com'}/projects`,
  },
}

export default function ProjectsPage() {
  return <Projects />
}
