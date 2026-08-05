import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/blog/chatgpt-device-change-wrong-login-history-empty",
        destination: "/blog/chatgpt-history-missing-device-change",
        permanent: true,
      },
      {
        source: "/blog/chatgpt-account-migration-3-checkpoints",
        destination: "/blog/chatgpt-account-migration",
        permanent: true,
      },
      {
        source: "/posts/:slug",
        destination: "/blog/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
