import { Inter } from 'next/font/google';
import { getMessages } from '@/i18n/request';
import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

type LayoutProps = {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params }: LayoutProps) {
  return {
    title: 'Axora - Guided Meditation',
    description: 'Start your mindfulness journey with guided meditation',
    metadataBase: new URL('http://localhost:3000'),
    alternates: {
      canonical: `/${params.locale}`,
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
  const messages = await getMessages(params.locale);

  return (
    <html lang={params.locale}>
      <body className={inter.className}>
        <ClientLayout locale={params.locale} messages={messages}>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
