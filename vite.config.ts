import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  build: {
    outDir: "dist/client",
    emptyOutDir: true,
    rollupOptions: {
      // TanStack Start uses server-side Node APIs for SSR.
      // This project is built for browser output only on Netlify,
      // so we avoid bundling SSR-only modules.
      external: ["node:async_hooks"],
    },
  },
});

