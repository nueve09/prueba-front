/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      new URL("https://testingbot.com/free-online-tools/random-avatar/**"),
    ],
  },
};

export default nextConfig;
