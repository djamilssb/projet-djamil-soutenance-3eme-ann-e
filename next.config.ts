import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "live.staticflickr.com"
      },
    ]
  }
};

export default nextConfig;
