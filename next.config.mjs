/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Tree-shake framer-motion named exports — reduces shared bundle
    optimizePackageImports: ["framer-motion"],
  },
};

export default nextConfig;
