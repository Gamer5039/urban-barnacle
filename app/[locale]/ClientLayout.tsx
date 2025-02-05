'use client';

import { useEffect } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import useUserStore from '@/lib/store/userStore';

interface ClientLayoutProps {
  children: React.ReactNode;
  locale: string;
  messages: Record<string, Record<string, string>>;
}

export default function ClientLayout({ children, locale, messages }: ClientLayoutProps) {
  const hydrate = useUserStore(state => state.hydrate);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      hydrate();
    }
  }, [hydrate]);

  return (
    <NextIntlClientProvider 
      locale={locale}
      messages={messages}
      timeZone="Asia/Kolkata"
      defaultTranslationValues={{
        appName: 'Axora'
      }}
    >
      {children}
    </NextIntlClientProvider>
  );
}
