import { NextResponse } from 'next/server'
import {
  LANGUAGE_COOKIE_NAME,
  getLanguageFromPath,
  getRequestLanguage,
  localizePath,
} from './src/lib/language'

const ONE_YEAR_IN_SECONDS = 60 * 60 * 24 * 365

function persistLanguagePreference(response, language) {
  response.cookies.set(LANGUAGE_COOKIE_NAME, language, {
    path: '/',
    maxAge: ONE_YEAR_IN_SECONDS,
    sameSite: 'lax',
  })
}

export function proxy(request) {
  const { pathname } = request.nextUrl
  const languageInPath = getLanguageFromPath(pathname)

  if (languageInPath) {
    const response = NextResponse.next()
    persistLanguagePreference(response, languageInPath)
    return response
  }

  const language = getRequestLanguage(request)
  const redirectUrl = request.nextUrl.clone()
  redirectUrl.pathname = localizePath(pathname, language)

  const response = NextResponse.redirect(redirectUrl)
  persistLanguagePreference(response, language)

  return response
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}
