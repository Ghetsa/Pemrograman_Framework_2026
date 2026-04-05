/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", // Google
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com", // GitHub
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "static.nike.com", // Nike (Product)
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;