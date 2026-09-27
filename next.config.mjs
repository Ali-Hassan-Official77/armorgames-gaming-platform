/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.freetogame.com" },
      { protocol: "https", hostname: "freetogame.com" },
      { protocol: "https", hostname: "**.freetogame.com" },
    ],
  },
};
export default nextConfig;
