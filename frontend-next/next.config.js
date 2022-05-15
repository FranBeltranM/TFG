/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        // destination: 'https://api-tfg.franbeltran.es/:path*',
        destination: 'http://localhost:3000/:path*',
      },
    ]
  },
}

module.exports = nextConfig
