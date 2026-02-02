import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'ikigaifruits.com',
      'cdn.shopify.com',
      'firebasestorage.googleapis.com',
    ],
    unoptimized: true,
  },
};

export default nextConfig;
