import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {

    domains: ["subscribers-received-lyrics-mens.trycloudflare.com"],
      remotePatterns: [
      {
        protocol: 'http',
        hostname: '192.168.4.3',
       
      },
    ],
  },
};

export default nextConfig;
