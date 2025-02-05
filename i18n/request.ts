import { getRequestConfig } from 'next-intl/server';
import { requestLocale } from './locales';

export async function getMessages(locale: string) {
  try {
    return (await import(`../messages/${locale}.json`)).default;
  } catch (error) {
    console.error(`Failed to load messages for locale ${locale}:`, error);
    return {};
  }
}

export default getRequestConfig(async () => {
  const locale = await requestLocale();
  return {
    locale,
    messages: await getMessages(locale),
    timeZone: 'Asia/Kolkata',
    defaultTranslationValues: {
      appName: 'Axora'
    }
  };
});
