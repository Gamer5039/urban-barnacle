import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n/locales';

/**
 * Creating middleware for locale handling
 */
export default createMiddleware({
  // A list of all locales that are supported
  locales: locales,
 
  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale: defaultLocale,
  localePrefix: 'always'
});

/**
 * Configuration for the middleware
 */
export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
