import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["sharp"],
  experimental: {
    // Cross-route view transitions. Falls back gracefully where the
    // browser doesn't support the View Transitions API.
    viewTransition: true,
  },
};

export default withPayload(nextConfig);
