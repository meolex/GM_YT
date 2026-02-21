import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      formats: ["cjs"],
      fileName: () => "index.js",
    },
    outDir: path.resolve(__dirname, "../client_packages"),
    emptyOutDir: false,
    sourcemap: false,
    minify: process.env.NODE_ENV === "production" ? "esbuild" : false,
    target: "es2015",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
