import { defineConfig } from "vite";

export default defineConfig({
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
