import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base is "/old-design/" — the previous site is archived at that subfolder;
// the redesign is served at the repo root. Hash routing survives the subfolder.
export default defineConfig({
  base: "/old-design/",
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
