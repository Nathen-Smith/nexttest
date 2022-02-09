/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};
const isProd = process.env.NODE_ENV === "production";

module.exports = {
  assetPrefix: isProd ? "https://github.com/Nathen-Smith/nexttest" : "",
  nextConfig,
};
