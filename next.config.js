/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/QR_gen",
  assetPrefix: "/QR_gen",
  images: {
    unoptimized: true,
  },
  // Disable server-side features for static export
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

module.exports = nextConfig;
