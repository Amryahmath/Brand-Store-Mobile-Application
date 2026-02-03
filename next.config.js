/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Skip TypeScript errors during build (for deployment)
    ignoreBuildErrors: true,
  },
  eslint: {
    // Skip ESLint errors during build (for deployment)
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['images.unsplash.com', 'upload.wikimedia.org'],
  },
}

module.exports = nextConfig
