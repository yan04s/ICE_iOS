/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        // If you want to use: https://icetech.my/auth/action?...
        source: '/auth/action',
        destination: '/auth/action.html'
      },
      {
        // Also catch any query parameters / sub‑paths (optional)
        source: '/auth/action/:path*',
        destination: '/auth/action.html'
      }
    ];
  },
  // If you're using static export (no server‑side rendering)
  output: 'export',
  // You might also want this if you are using static files
  // trailingSlash: false,
};

export default nextConfig;
