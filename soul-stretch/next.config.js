/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Local images in /public/* do not need remotePatterns.
    // These are kept for any future Google Drive image URLs from the sheet.
    remotePatterns: [
      { protocol: 'https', hostname: 'drive.google.com' },
      { protocol: 'https', hostname: '**.googleusercontent.com' },
    ],
  },
}
module.exports = nextConfig
