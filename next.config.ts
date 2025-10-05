import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL('https://images.ctfassets.net/**'),
      new URL('https://assets.ctfassets.net/**'),
      new URL('https://img.youtube.com/**'),
    ],
  },
  allowedDevOrigins: ['192.168.50.28'],
};

export default nextConfig;
