const path = require("path");

/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
      domains: ["www.boredpanda.com"],
    },
    reactStrictMode: false, // React Strict Mode is off
  };
  const withNextIntl = require('next-intl/plugin')();

  // module.exports = nextConfig;

  module.exports = withNextIntl({
    // Other Next.js configuration ...
    ...nextConfig,
    sassOptions: {
      includePaths: [path.join(__dirname, 'styles')],
    },
  });



// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// });

// const withNextIntl = require('next-intl/plugin')();

// let nextConfig = {
//   images: {
//     domains: ['www.boredpanda.com'],
//   },
//   reactStrictMode: false, // React Strict Mode is off
//   sassOptions: {
//     includePaths: [path.join(__dirname, 'styles')],
//   },
//   // Other Next.js configuration...
// };

// // Добавляем конфигурацию плагинов к объекту nextConfig
// if (process.env.ANALYZE === 'true') {
//   // Добавляем Bundle Analyzer плагин, если ANALYZE === 'true'
//   nextConfig = {
//     ...nextConfig,
//     ...withBundleAnalyzer,
//   };
// }

// // Добавляем конфигурацию для плагина Next Intl
// nextConfig = {
//   ...nextConfig,
//   ...withNextIntl,
// };

// module.exports = nextConfig;


