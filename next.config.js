/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // <--- Add this line

  productionBrowserSourceMaps: false, // <--- Optional, saves space

  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Prevent bundling server-only modules on client
      config.resolve.fallback = {
        ...config.resolve.fallback,
        canvas: false,
        fs: false,
      };
    }

    // Ignore native .node files
    config.module.rules.push({
      test: /\.node$/,
      use: 'ignore-loader',
    });

    return config;
  },

  // For Next.js 15+ (ensures canvas stays externalized)
  serverExternalPackages: ["canvas"],

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.freepik.com",
      },
    ],
  },
};

module.exports = nextConfig;
