import { createSharedPathnamesNavigation } from 'next-intl/navigation';

export const locales = ['en', 'hi'] as const;
export const defaultLocale = 'en' as const;

export type Locale = (typeof locales)[number];

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales });

export async function requestLocale() {
  return defaultLocale;
}
