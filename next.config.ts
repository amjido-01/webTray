import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://webtray-api.onrender.com/api/v1/:path*",
      },
    ];
  },
};

export default nextConfig;
