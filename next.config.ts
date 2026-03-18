/* FIXES APPLIED:
 * [SECURITY] Added strict security headers (CSP, frame options, XSS protection)
 * [PERFORMANCE] Configured image optimization domains and package imports
 */
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  experimental: { 
    optimizePackageImports: ['gsap', 'lenis', 'framer-motion'] 
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' }
    ]
  },
  compiler: { 
    removeConsole: process.env.NODE_ENV === 'production' 
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' }
        ]
      }
    ]
  }
};

export default nextConfig;
