import type { NextConfig } from "next";

const basePath =
  process.env.NEXT_PUBLIC_SITE_BASE_PATH?.replace(/\/+$/, "") ?? "";

const nextConfig: NextConfig = {
  // Keep the site fully static so the same source can be exported for GitHub Pages.
  output: "export",
  trailingSlash: true,
  basePath,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
