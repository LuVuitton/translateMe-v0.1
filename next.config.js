// /** @type {import('next').NextConfig} */
// const nextConfig = {}

// module.exports = nextConfig
const path = require('path')

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
  
  