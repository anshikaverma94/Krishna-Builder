import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static brochure site: Cache Components (enabled by the scaffold) is switched
  // off because nothing here is fetched at request time.
  images: {
    formats: ["image/avif", "image/webp"],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
