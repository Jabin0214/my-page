/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.jabinchen.com',
          },
        ],
        destination: 'https://jabinchen.com/:path*',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
