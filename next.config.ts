import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep the site fully static so the same source can be exported for GitHub Pages.
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
