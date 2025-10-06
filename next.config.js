/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Handle canvas for PDF.js
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        canvas: false,
        fs: false,
      };
    }

    // Ignore .node files
    config.module.rules.push({
      test: /\.node$/,
      use: 'ignore-loader'
    });

    // External canvas
    config.externals = config.externals || [];
    config.externals.push({
      canvas: 'canvas',
    });

    return config;
  },
  // Updated property name for Next.js 15
  serverExternalPackages: ['canvas'],
  images: {
    domains: [
      "img.freepik.com",
      // add more domains here if needed
    ],
  },
};

module.exports = nextConfig;
