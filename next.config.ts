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

const nextConfig: NextConfig = isProd
  ? { ...baseConfig, output: 'export', basePath: '/new-wexo', assetPrefix: '/new-wexo' }
  : baseConfig;

export default withNextIntl(nextConfig);
