/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: "static.coinstats.app",
      },
      { hostname: "cryptologos.cc" },
    ],
  },
};

module.exports = nextConfig;
