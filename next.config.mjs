/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'images.unsplash.com',
      'img.youtube.com',
      'i.ytimg.com',
      'avatars.githubusercontent.com',
      'api.dicebear.com'
    ],
  },
  webpack: (config, { dev, isServer }) => {
    // Increase chunk load timeout to 5 minutes to prevent ChunkLoadError timeouts on slow compile
    config.output.chunkLoadTimeout = 300000;
    return config;
  },
};

export default nextConfig;
