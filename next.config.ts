import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ hostname: 'avatars.mds.yandex.net' }],
  },
};

export default nextConfig;
