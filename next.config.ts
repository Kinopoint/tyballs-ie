import type { NextConfig } from "next";

const isPagesBuild = process.env.STATIC_EXPORT === "true";

const nextConfig: NextConfig = {
  output: isPagesBuild ? "export" : "standalone",
  basePath: isPagesBuild ? "/tyballs-ie" : undefined,
  trailingSlash: isPagesBuild,
  images: { unoptimized: isPagesBuild },
  poweredByHeader: false,
  reactStrictMode: true,
  turbopack: { root: process.cwd() },
};

export default nextConfig;
