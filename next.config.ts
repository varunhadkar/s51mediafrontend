import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',  // Allow ALL external domains (easiest)
      },
    ],
  },
};

export default nextConfig;
