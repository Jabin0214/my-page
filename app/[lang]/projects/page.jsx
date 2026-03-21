import ProjectsContent from './projects-content'
import { getPortfolioContent } from '../../../src/content/portfolio-content'
import { createPageMetadata } from '../../../src/lib/metadata'
import { resolveLanguageParam, DEFAULT_LANGUAGE } from '../../../src/lib/language'

export async function generateMetadata({ params }) {
  const { lang } = await params
  const language = resolveLanguageParam(lang) || DEFAULT_LANGUAGE
  const content = getPortfolioContent(language)
  const title =
    content.navigation.links.find((link) => link.path === '/projects')?.label ||
    'Projects'

  return createPageMetadata({
    lang: language,
    title,
    description: content.projects.description,
    path: '/projects',
  })
}

export default function ProjectsPage() {
  return <ProjectsContent />
}
