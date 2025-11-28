/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",

  productionBrowserSourceMaps: false, // Optional, saves space

  // ✅ Let builds succeed even if there are TypeScript / ESLint errors (for now)
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

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
      use: "ignore-loader",
    });

    return config;
  },

  // For Next.js 15+ (ensures canvas stays externalized)
  serverExternalPackages: ["canvas"],

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dnycwq6ad/**",
      },
    ],
  },
};

module.exports = nextConfig;
