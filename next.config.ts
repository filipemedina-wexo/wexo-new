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
};

export default withNextIntl(nextConfig);
