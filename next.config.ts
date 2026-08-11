import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const isPagesBuild = process.env.STATIC_EXPORT === "true";

const nextConfig: NextConfig = {
  output: isPagesBuild ? "export" : "standalone",
  basePath: isPagesBuild ? "/tyballs-ie" : undefined,
  trailingSlash: isPagesBuild,
  images: {
    unoptimized: isPagesBuild,
    localPatterns: [
      { pathname: "/cms-api/media/file/**" },
      { pathname: "/images/**" },
      { pathname: "/brand/**" },
      { pathname: "/icons/**" },
      { pathname: "/tyballs-ie/images/**" },
      { pathname: "/tyballs-ie/brand/**" },
      { pathname: "/tyballs-ie/icons/**" },
    ],
  },
  poweredByHeader: false,
  reactStrictMode: true,
  turbopack: {
    root: process.cwd(),
    resolveAlias: isPagesBuild ? { "@/cms/frontend": "./cms/frontend.static.ts" } : undefined,
  },
};

export default isPagesBuild ? nextConfig : withPayload(nextConfig);
