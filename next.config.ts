import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    unoptimized: true, // Remove this once you have real images
  },
  async redirects() {
    return [
      // The About page was dropped; send old links to the intro on the homepage
      { source: "/about", destination: "/#intro", permanent: true },
      // The old Vercel address redirects to the real domain, keeping the path and query string
      {
        source: "/:path*",
        has: [{ type: "host", value: "inginnyus.vercel.app" }],
        destination: "https://ginnymones.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
