/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
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
