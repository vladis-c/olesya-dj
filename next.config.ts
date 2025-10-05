import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL('https://images.ctfassets.net/**'),
      new URL('https://assets.ctfassets.net/**'),
    ],
  },
};

export default nextConfig;
