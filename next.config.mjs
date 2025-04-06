/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.resolve.fallback = {
          ...config.resolve.fallback,
          canvas: false, // ignore canvas in browser
          fs: false,
          path: false,
        };
      }
      return config;
    },
  };
  
  module.exports = nextConfig;
  