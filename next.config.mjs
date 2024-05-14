/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: ['utfs.io'], // before NextJS 14

    // after NextJS 14
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
        port: '',
      },
    ],
  },
}

export default nextConfig
