/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/auth/:path*',
        destination: '/auth/:path*', // ensure it gets served/handled
      },
    ];
  },
};

export default nextConfig;
