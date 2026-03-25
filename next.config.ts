import type { NextConfig } from "next";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.dicebear.com",
      },
    ],
  },
  cacheComponents: true,
  experimental: {
    prefetchInlining: true,
  } as NextConfig["experimental"] & {
    prefetchInlining?: boolean;
  },
} satisfies NextConfig;

export default nextConfig;
