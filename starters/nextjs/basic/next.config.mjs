/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/__/auth/:path*',
        destination: '/__/auth/:path*', // ensure it gets served/handled
      },
    ];
  },
};

export default nextConfig;
