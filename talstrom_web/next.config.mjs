/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, {isServer}) => {
    config.module.rules.push({test: /\.node$/, use: 'raw-loader'});

    if(!isServer) config.externals.push('canvas');
    return config;
  },
  reactStrictMode: false,
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  publicRuntimeConfig: {
    apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  },
};

export default nextConfig;
