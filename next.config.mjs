/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'personal-page-app-blob',
            port: '',
          },
          {
            protocol: 'https',
            hostname: 'vytla2dvxa8in1jn.public.blob.vercel-storage.com',
            port: '',
          },
        ],
      },
};

export default nextConfig;
