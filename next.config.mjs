/**
 * Next.js configuration.
 *
 * `allowedDevOrigins` is development-only: Next.js refuses cross-origin requests
 * to its development resources (client chunks, HMR) unless the requesting origin
 * is listed. The Base44 preview serves this app from `3000-<public host suffix>`,
 * so without this entry the preview loads server-rendered HTML but never
 * hydrates and never hot-reloads.
 *
 * The allowance is built from environment values at runtime and stays empty
 * unless `BASE44_PREVIEW_MODE` is exactly "1". Any other environment (local
 * development, CI, production) therefore keeps the Next.js defaults.
 *
 * @type {import('next').NextConfig}
 */
const previewOrigins = [];

if (process.env.BASE44_PREVIEW_MODE === "1") {
  if (process.env.BASE44_PUBLIC_HOST_SUFFIX) {
    previewOrigins.push(`3000-${process.env.BASE44_PUBLIC_HOST_SUFFIX}`);
  }
  if (process.env.BASE44_SANDBOX_HOST_DOMAIN) {
    previewOrigins.push(`3000-${process.env.BASE44_SANDBOX_HOST_DOMAIN}`);
  }
}

const nextConfig = {
  allowedDevOrigins: previewOrigins,
};

export default nextConfig;
