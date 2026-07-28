import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/masters',
  assetPrefix: '/masters',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
