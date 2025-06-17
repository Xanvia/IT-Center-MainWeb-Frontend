/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["10.40.2.147", "lh3.googleusercontent.com"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "10.40.2.147",
        port: "5100",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
