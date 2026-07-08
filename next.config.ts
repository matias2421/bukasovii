import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // Las fotos de platos pueden pesar varios MB (límite propio: 5 MB + margen multipart)
      bodySizeLimit: "6mb",
    },
  },
};

export default nextConfig;
