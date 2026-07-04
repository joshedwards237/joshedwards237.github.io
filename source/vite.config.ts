import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base is "/" so all asset URLs are root-relative (the repo root is the
// deployable artifact for both GitHub Pages and Hostinger).
export default defineConfig({
  base: "/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      // Naming the HTML input "main" (plus dot-separated file name patterns)
      // reproduces the original output names: assets/main.<hash>.js,
      // assets/main.<hash>.css and assets/josh.<hash>.jpg.
      input: {
        main: path.resolve(__dirname, "index.html"),
      },
      output: {
        entryFileNames: "assets/[name].[hash].js",
        chunkFileNames: "assets/[name].[hash].js",
        assetFileNames: "assets/[name].[hash][extname]",
      },
    },
  },
});
