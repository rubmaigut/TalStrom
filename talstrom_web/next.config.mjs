/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  publicRuntimeConfig: {
    apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  },
};

export default nextConfig;
