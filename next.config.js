/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // Disable server-side rendering to prevent hydration errors
    runtime: 'nodejs'
  }
}

module.exports = nextConfig