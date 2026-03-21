export const DEFAULT_LANGUAGE = 'en'
export const SUPPORTED_LANGUAGES = ['en', 'zh']
export const LANGUAGE_COOKIE_NAME = 'lang'
const ONE_YEAR_IN_SECONDS = 60 * 60 * 24 * 365

function normalizePathname(pathname = '/') {
  if (typeof pathname !== 'string' || pathname.trim() === '') {
    return '/'
  }

  const withLeadingSlash = pathname.startsWith('/') ? pathname : `/${pathname}`
  const trimmedPath = withLeadingSlash.replace(/\/+$/, '')

  return trimmedPath === '' ? '/' : trimmedPath
}

export function isSupportedLanguage(language) {
  return SUPPORTED_LANGUAGES.includes(String(language || '').toLowerCase())
}

export function resolveLanguageParam(language) {
  const normalized = String(language || '').toLowerCase()
  return isSupportedLanguage(normalized) ? normalized : null
}

export function normalizeLanguage(language) {
  if (typeof language !== 'string') {
    return DEFAULT_LANGUAGE
  }

  return language.toLowerCase().startsWith('zh') ? 'zh' : 'en'
}

export function getLanguageFromPath(pathname) {
  const [firstSegment] = normalizePathname(pathname).split('/').filter(Boolean)
  return resolveLanguageParam(firstSegment)
}

export function getPathWithoutLanguage(pathname) {
  const normalizedPathname = normalizePathname(pathname)
  const segments = normalizedPathname.split('/').filter(Boolean)

  if (segments.length === 0) {
    return '/'
  }

  if (isSupportedLanguage(segments[0])) {
    segments.shift()
  }

  return segments.length === 0 ? '/' : `/${segments.join('/')}`
}

export function localizePath(pathname = '/', language = DEFAULT_LANGUAGE) {
  const normalizedLanguage = normalizeLanguage(language)
  const basePath = getPathWithoutLanguage(pathname)

  return basePath === '/' ? `/${normalizedLanguage}` : `/${normalizedLanguage}${basePath}`
}

export function detectLanguageFromAcceptLanguage(headerValue) {
  if (typeof headerValue !== 'string' || headerValue.trim() === '') {
    return DEFAULT_LANGUAGE
  }

  const rankedLanguages = headerValue
    .split(',')
    .map((entry) => {
      const [tag = '', qualityEntry = 'q=1'] = entry.trim().split(';')
      const qualityValue = Number.parseFloat(qualityEntry.replace(/^q=/, ''))

      return {
        tag: tag.trim(),
        quality: Number.isFinite(qualityValue) ? qualityValue : 1,
      }
    })
    .filter((entry) => entry.tag !== '')
    .sort((left, right) => right.quality - left.quality)

  for (const entry of rankedLanguages) {
    const normalizedLanguage = normalizeLanguage(entry.tag)

    if (isSupportedLanguage(normalizedLanguage)) {
      return normalizedLanguage
    }
  }

  return DEFAULT_LANGUAGE
}

export function getRequestLanguage(request) {
  const cookieLanguage = request.cookies?.get(LANGUAGE_COOKIE_NAME)?.value

  if (cookieLanguage) {
    return normalizeLanguage(cookieLanguage)
  }

  return detectLanguageFromAcceptLanguage(request.headers.get('accept-language'))
}

export function persistLanguage(language) {
  if (typeof document === 'undefined') {
    return
  }

  const normalizedLanguage = normalizeLanguage(language)
  document.cookie = `${LANGUAGE_COOKIE_NAME}=${normalizedLanguage}; Path=/; Max-Age=${ONE_YEAR_IN_SECONDS}; SameSite=Lax`
  document.documentElement.lang = normalizedLanguage
}
