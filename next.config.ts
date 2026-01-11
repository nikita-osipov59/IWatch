import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'avatars.mds.yandex.net' },
      { hostname: 'upload.wikimedia.org' },
      { hostname: 'image.tmdb.org' },
      { hostname: 'st.kp.yandex.net' },
      { hostname: 'image.openmoviedb.com' },
    ],
  },
};

export default nextConfig;
