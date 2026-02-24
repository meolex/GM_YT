import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      formats: ["cjs"],
      fileName: () => "index.js",
    },
    outDir: path.resolve(__dirname, "../packages/server"),
    emptyOutDir: false,
    sourcemap: true,
    minify: process.env.NODE_ENV === "production" ? "esbuild" : false,
    target: "es2015",

    rollupOptions: {
      external: (id) => {
        if (id.startsWith("node:")) return true;

        const nodeBuiltins = [
          "path",
          "fs",
          "util",
          "os",
          "events",
          "http",
          "https",
          "zlib",
          "stream",
          "crypto",
          "url",
          "net",
          "tls",
          "dns",
          "child_process",
          "cluster",
          "worker_threads",
          "v8",
          "vm",
          "readline",
          "repl",
          "assert",
          "buffer",
          "querystring",
          "string_decoder",
          "timers",
          "punycode",
          "domain",
          "constants",
          "module",
          "process",
          "sys",
        ];

        if (nodeBuiltins.includes(id)) return true;
        if (id === "pg-native") return true;

        return false;
      },
    },
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
