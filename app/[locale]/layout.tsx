import { Inter } from 'next/font/google';
import { getMessages } from '@/i18n/request';
import { SpeedInsights } from "@vercel/speed-insights/next";
import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({ params }: LayoutProps) {
  const { locale } = await params;
  return {
    title: 'Axora - Guided Meditation',
    description: 'Start your mindfulness journey with guided meditation',
    metadataBase: new URL('http://localhost:3000'),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'en-US': '/en',
        'hi-IN': '/hi',
      },
    },
  };
}

// Client Component
import ClientLayout from './ClientLayout';

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;
  const messages = await getMessages(locale);

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <ClientLayout locale={locale} messages={messages}>
          {children}
        </ClientLayout>
        <SpeedInsights />
      </body>
    </html>
  );
}
