import createNextIntlPlugin from 'next-intl/plugin';
import { defaultLocale } from './i18n/config';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  redirects: async () => {
    return [
      {
        source: '/',
        destination: `/${defaultLocale}`,
        permanent: false,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
