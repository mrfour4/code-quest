import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // https://github.com/yjs/yjs/issues/438#issuecomment-2239984668
    serverExternalPackages: ["yjs"],
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "img.clerk.com",
            },
        ],
    },
};

export default nextConfig;
