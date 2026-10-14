/** @type {import('next').NextConfig} */
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || '').replace(/\/$/, '');
const nextConfig = {
  reactStrictMode: true,
  ...(basePath ? { basePath } : {}),
};
export default nextConfig;
