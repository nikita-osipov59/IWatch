import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ hostname: 'avatars.mds.yandex.net' }, { hostname: 'upload.wikimedia.org' }],
  },
};

export default nextConfig;
