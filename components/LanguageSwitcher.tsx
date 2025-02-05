'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();

  const switchLanguage = (newLocale: string) => {
    // Remove the current locale from the pathname
    const pathWithoutLocale = pathname.replace(`/${locale}`, '');
    
    // Navigate to the new locale path
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <select
        value={locale}
        onChange={(e) => switchLanguage(e.target.value)}
        className="bg-white/10 backdrop-blur-sm text-white border border-white/30 rounded-lg px-4 py-2
                 focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none cursor-pointer
                 hover:bg-white/20 transition-colors"
      >
        <option value="en">English</option>
        <option value="hi">हिंदी</option>
      </select>
    </div>
  );
}
