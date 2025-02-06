import { Inter } from 'next/font/google';
import { getMessages } from '@/i18n/request';
import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

interface PageParams {
  locale: string;
}

interface PageProps {
  params: Promise<PageParams>;
  children: React.ReactNode;
}

export async function generateMetadata({ params }: PageProps) {
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

export default async function LocaleLayout({ children, params }: PageProps) {
  const { locale } = await params;
  const messages = await getMessages(locale);

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <ClientLayout locale={locale} messages={messages}>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
