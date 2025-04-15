/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    esmExternals: true,
    optimizePackageImports:["@chakra-ui/react","@othent/kms"],
  },
  env: {
    WALLETPATH: '/wallet.json',
    BACKENDURL: 'http://localhost',
    PORT: '5001',
  }
};

export default nextConfig;
