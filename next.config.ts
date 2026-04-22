import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,
  reactStrictMode: true,
  poweredByHeader: false,

  // Allow next/image to optimise Supabase-hosted blog banners.
  // Vercel's image optimiser will fetch, resize, convert to WebP/AVIF,
  // and cache at the edge — way better than serving the raw image.
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "xbhewtoryhtguvlmodfi.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
