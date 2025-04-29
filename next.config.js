const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",

  // Add this to help with caching issues
  generateBuildId: async () => {
    return `build-${Date.now()}`;
  },

  // Asset prefix handling
  assetPrefix:
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_FRONTEND_URL
      : "",

  publicRuntimeConfig: {
    assetPrefix:
      process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_FRONTEND_URL
        : "",
    frontendUrl: process.env.NEXT_PUBLIC_FRONTEND_URL,
    backendApi: process.env.NEXT_PUBLIC_BACKEND_API,
  },

  env: {
    PUBLIC_URL: "",
  },

  // Enable compression for better performance
  compress: true,

  // Image configuration
  images: {
    formats: ["image/avif", "image/webp"],
    disableStaticImages: true,
    unoptimized: true,
    domains: ["localhost"],
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  // SASS options
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },

  // Add future flag for consistent CSS behavior
  future: {
    strictPostcssConfiguration: true,
  },

  // Updated experimental options
  experimental: {
    optimizeCss: false, // Disable CSS optimization temporarily for debugging
    largePageDataBytes: 800 * 1024,
    optimizePackageImports: ["antd", "react-icons"],
  },

  webpack: (config, { dev, isServer }) => {
    // Add module aliases
    config.resolve.alias = {
      ...config.resolve.alias,
      styles: path.resolve(__dirname, "styles"),
      "/styles": path.resolve(__dirname, "styles"),
      "/assets": path.resolve(__dirname, "public/assets"),
      assets: path.resolve(__dirname, "public/assets"),
      "@": path.resolve(__dirname, "./src"),
      "@apis": path.resolve(__dirname, "./src/apis"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@common": path.resolve(__dirname, "./src/common"),
      "@data": path.resolve(__dirname, "./src/data"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@styles": path.resolve(__dirname, "./src/styles"),
      "@public": path.resolve(__dirname, "./public"),
      "@assets": path.resolve(__dirname, "./public/assets"),
      "@images": path.resolve(__dirname, "./public/assets/images"),
      "@css": path.resolve(__dirname, "./public/assets/css"),
      "@fonts": path.resolve(__dirname, "./public/assets/fonts"),
      "@videos": path.resolve(__dirname, "./public/assets/videos"),
    };

    // Add MD file loader
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader",
    });

    return config;
  },

  // Rewrites
  async rewrites() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/sitemap.xml",
      },
      {
        source: "/sitemap-index.xml",
        destination: "/sitemaps/sitemap-index.xml",
      },
      {
        source: "/sitemaps/:path*",
        destination: "/sitemaps/:path*",
      },
      {
        source: "/community/:memberId/:slug*",
        destination: "/community/[memberId]/[...slug]",
      },
      {
        source: "/joinus",
        destination: "/information/registration",
      },
    ];
  },

  // Redirects
  async redirects() {
    return [
      {
        source: "/blog/:id/e=:slug*",
        destination: "/blog/:id/:slug*",
        permanent: true,
      },
      {
        source: "/event/:id/e=:slug*",
        destination: "/events/:id/:slug*",
        permanent: true,
      },
      {
        source: "/event/:id/:slug*",
        destination: "/events/:id/:slug*",
        permanent: true,
      },
      {
        source: "/joinus",
        destination: "/information/registration",
        permanent: true,
      },
    ];
  },

  // Headers
  async headers() {
    return [
      {
        source: "/sitemaps/:path*",
        headers: [{ key: "Content-Type", value: "text/xml" }],
      },
      {
        source: "/sitemap-index.xml",
        headers: [{ key: "Content-Type", value: "text/xml" }],
      },
      {
        source: "/sitemap.xml",
        headers: [{ key: "Content-Type", value: "text/xml" }],
      },
    ];
  },
};

module.exports = nextConfig;
