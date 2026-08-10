import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const isProd = process.env.NODE_ENV === 'production';

const baseConfig: NextConfig = {
  trailingSlash: true,
};

const nextConfig: NextConfig = {
  ...baseConfig,
  output: 'standalone',
  // The host redirects `/_next/image` to a trailing-slash URL, which makes
  // Next's image optimizer return 400. Static assets in /public can be served
  // directly and remain cacheable by the host.
  images: {
    unoptimized: true,
  },
};

export default withNextIntl(nextConfig);
