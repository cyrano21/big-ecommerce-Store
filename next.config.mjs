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
    async rewrites() {
        return [
            {
                source: '/api/f072e5ca-1a6a-4312-81dd-23034de5f8cf/sizes',
                destination: 'https://big-ecommerce-admin.vercel.app/api/f072e5ca-1a6a-4312-81dd-23034de5f8cf/sizes'
            },
            {
                source: '/api/f072e5ca-1a6a-4312-81dd-23034de5f8cf/colors',
                destination: 'https://big-ecommerce-admin.vercel.app/api/f072e5ca-1a6a-4312-81dd-23034de5f8cf/colors'
            },
            {
                source: '/api/f072e5ca-1a6a-4312-81dd-23034de5f8cf/categories',
                destination: 'https://big-ecommerce-admin.vercel.app/api/f072e5ca-1a6a-4312-81dd-23034de5f8cf/categories'
            },
            {
                source: '/api/f072e5ca-1a6a-4312-81dd-23034de5f8cf/:path*',
                destination: 'https://big-ecommerce-admin.vercel.app/api/f072e5ca-1a6a-4312-81dd-23034de5f8cf/:path*'
            }
        ];
    },
    // Explicitly set revalidation for static assets
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'x-next-revalidate',
                        value: '0', // Disable revalidation for all paths
                    },
                ],
            },
        ];
    },
    // Disable revalidation for static assets
    staticPageGenerationTimeout: 60,
    experimental: {
        staticPageGenerationTimeout: 60,
    }
};

export default nextConfig;
