/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config')
const nextConfig = {
  i18n,
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
        port: '443',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.twimg.com',
        port: '443',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: "firebasestorage.googleapis.com",
      },
    ],
  },
  webpack: (config) => {
    config.resolve.fallback = {

      // if you miss it, all the other options in fallback, specified
      // by next.js will be dropped.
      ...config.resolve.fallback,  

      fs: false, // the solution
    };
    config.resolve.extensions.push(".ts", ".tsx");
    return config;
  }
};

module.exports = nextConfig;
