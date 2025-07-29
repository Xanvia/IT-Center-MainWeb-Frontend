/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Enable experimental features for better error reporting
  experimental: {
    // Better error overlay in development
    optimizePackageImports: ["@nextui-org/react"],
  },
  // Logging configuration
  logging: {
    fetches: {
      fullUrl: process.env.NODE_ENV === "development",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "10.40.2.147",
        port: "5100",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "5100", // Production port
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001", // Local development port
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "backend",
        pathname: "/**",
      },
    ],
  },
  // Custom webpack configuration for better error handling
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      // Better source maps in development
      config.devtool = "eval-source-map";
    }
    return config;
  },
  // Environment variable validation
  env: {
    CUSTOM_BUILD_TIME: new Date().toISOString(),
  },
};

export default nextConfig;
