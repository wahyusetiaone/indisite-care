/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: '/auth-api/:path*',
        // destination: 'http://192.168.0.15:8080/api/:path*', // Proxy ke backend
        destination: 'http://localhost:8080/api/:path*', // Proxy ke backend
      },
      {
        source: '/core-api/:path*',
        destination: 'http://localhost:8080/api/v1/:path*', // Proxy ke backend
        // destination: 'http://192.168.0.15:8080/api/v1/:path*', // Proxy ke backend
      },
      {
        source: '/medical-api/:path*',
        destination: 'http://medical-record-master-41yebw.laravel.cloud/api/:path*', // Proxy ke backend
        // destination: 'http://192.168.0.15:8000/api/:path*', // Proxy ke backend
      },
    ];
  },
};

module.exports = nextConfig;
