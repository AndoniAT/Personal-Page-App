/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'personal-page-app-blob',
            port: '',
          },
        ],
      },
};

export default nextConfig;
