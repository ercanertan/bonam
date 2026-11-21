import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: `next build` writes plain HTML/CSS/JS to `out/`
  // (deployed on Laravel Cloud as a static website).
  output: "export",
  // `/passes` → `/passes/index.html`, which any static host serves correctly.
  trailingSlash: true,
  images: {
    // No image server in a static export; photos are pre-compressed WebP.
    unoptimized: true,
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
