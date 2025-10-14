import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   images: {
    unoptimized: true, // Add this for static exports
  }
};

export default nextConfig;
