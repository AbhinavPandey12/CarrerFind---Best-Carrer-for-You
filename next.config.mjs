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
};

export default nextConfig;
