const path = require("path");
const { use } = require("react");

/** @type {import('next').NextConfig} */

const nextConfig = {
  // images: {
  //   domains: [""],
  // },
  reactStrictMode: false,
  swcMinify: true,
};
const withNextIntl = require("next-intl/plugin")();

module.exports = withNextIntl({
  ...nextConfig,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            icon: true,
          },
        },
      ],
    });
    return config;
  },
});
