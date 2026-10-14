import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    unoptimized: true, // Remove this once you have real images
  },
  // Tools stay deployed as their own Vercel projects; these paths proxy them
  // so they live at ginnymones.com/tools/<name>
  async rewrites() {
    return [
      {
        source: "/tools/mega-cp-calculator/:path*",
        destination: "https://mega-cp-calculator.vercel.app/:path*",
      },
      // These two apps are built with a matching basePath, so the prefix is kept.
      // The bare path gets its own rule: a trailing slash makes the app redirect back to this URL in a loop.
      {
        source: "/tools/quiz-randomizer",
        destination: "https://quiz-randomizer-demo.vercel.app/tools/quiz-randomizer",
      },
      {
        source: "/tools/resume-lab",
        destination: "https://resume-style-tool.vercel.app/tools/resume-lab",
      },
      {
        source: "/tools/quiz-randomizer/:path*",
        destination: "https://quiz-randomizer-demo.vercel.app/tools/quiz-randomizer/:path*",
      },
      {
        source: "/tools/resume-lab/:path*",
        destination: "https://resume-style-tool.vercel.app/tools/resume-lab/:path*",
      },
    ];
  },
  async redirects() {
    return [
      // Case studies renamed or replaced in V2: keep old links working
      { source: "/works/anim-motion-graphics", destination: "/works/anim-joiiio", permanent: true },
      { source: "/works/dev-figma-to-email-builder", destination: "/works/dev-email-design-system", permanent: true },
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
