import { buildAlternateLanguageLinks, buildCanonicalUrl } from '../src/lib/metadata.js'
import { SUPPORTED_LANGUAGES } from '../src/lib/language.js'

export default function sitemap() {
  const lastModified = new Date()
  const localizedPaths = ['/', '/chat', '/projects', '/contact']

  return [
    {
      url: buildCanonicalUrl('/'),
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
      alternates: {
        languages: buildAlternateLanguageLinks('/'),
      },
    },
    ...localizedPaths.flatMap((path) =>
      SUPPORTED_LANGUAGES.map((language) => ({
        url: buildCanonicalUrl(path, language),
        lastModified,
        changeFrequency: path === '/' ? 'weekly' : 'monthly',
        priority: path === '/' ? 1 : 0.7,
        alternates: {
          languages: buildAlternateLanguageLinks(path),
        },
      }))
    ),
  ]
}
