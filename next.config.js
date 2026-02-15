/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // Optional: Change the output directory
  // distDir: 'dist',

  // Optional: Add basePath for subdirectory deployment
  // basePath: '/qr-generator',

  // Disable server-side features for static export
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

module.exports = nextConfig;
