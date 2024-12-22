/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                port: '',
                pathname: '/dwens2ze5/**',
            },
        ],
        // Remove legacy image props
        formats: ['image/avif', 'image/webp'],
    },
};

export default nextConfig;
