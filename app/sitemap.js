import { buildAlternateLanguageLinks, buildCanonicalUrl } from '../src/lib/metadata'

export default function sitemap() {
  const lastModified = new Date()

  return [
    '',
    '/chat',
    '/projects',
    '/contact',
  ].flatMap((path) =>
    ['en', 'zh'].map((language) => ({
      url: buildCanonicalUrl(path, language),
      lastModified,
      changeFrequency: path === '' ? 'weekly' : 'monthly',
      priority: path === '' ? 1 : 0.7,
      alternates: {
        languages: buildAlternateLanguageLinks(path),
      },
    }))
  )
}
