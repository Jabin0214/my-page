import Projects from '../../src/views/Projects'
import { createPageMetadata } from '../../src/lib/metadata'

export const metadata = createPageMetadata({
  title: 'Projects',
  description: 'Selected full-stack, AI, and product projects by Jabin Chen.',
  path: '/projects',
})

export default function ProjectsPage() {
  return <Projects />
}
