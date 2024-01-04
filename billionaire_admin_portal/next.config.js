/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");
const nextConfig = {
  reactStrictMode: true,
  i18n,
  images: {
    domains: [
      "sysgenbucket.s3.amazonaws.com",
      "127.0.0.1",
      "localhost",
      "via.placeholder.com",
      "res.cloudinary.com",
      "s3.amazonaws.com",
      "18.141.64.26",
      "picsum.photos",
      "pickbazar-sail.test",
      "pickbazarlaravel.s3.ap-southeast-1.amazonaws.com",
      "lh3.googleusercontent.com",
    ],
  },
}

module.exports = nextConfig
