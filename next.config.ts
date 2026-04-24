import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const isProd = process.env.NODE_ENV === 'production';

const baseConfig: NextConfig = {
  images: {
    loader: 'custom',
    loaderFile: './src/lib/imageLoader.ts',
  },
  trailingSlash: true,
};

const nextConfig: NextConfig = {
  ...baseConfig,
  output: 'standalone',
};

export default withNextIntl(nextConfig);
