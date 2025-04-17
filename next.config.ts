import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {

    domains: ["approved-level-hobbies-efforts.trycloudflare.com","192.168.4.3"],
      remotePatterns: [
      {
        protocol: 'http',
        hostname: '192.168.4.3',
       
      },
    ],
  },
};

export default nextConfig;
