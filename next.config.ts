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
  // Send the old Vercel address and the bare domain to the canonical www site.
  // Only these exact hosts match, so Vercel preview URLs keep working.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "s51mediafrontend.vercel.app" }],
        destination: "https://www.s51media.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "s51media.com" }],
        destination: "https://www.s51media.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
