import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel handles this automatically, standalone is for self-hosted
  // output: "standalone",
  
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
};

export default nextConfig;
