import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import removeConsole from "vite-plugin-remove-console";
import optimizeImagePlugin from "vite-plugin-optimize-image";
import mkcert from "vite-plugin-mkcert";

// https://vite.dev/config/
export default defineConfig({
  // plugins: [react(), removeConsole(), optimizeImagePlugin(), mkcert({ certFileName: './localhost.pem', keyFileName: './localhost-key.pem'}) ],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080/",
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__dirname, "./src") },
      {
        find: "@components",
        replacement: path.resolve(__dirname, "./src/components"),
      },
      {
        find: "@pages",
        replacement: path.resolve(__dirname, "./src/pages"),
      },
      {
        find: "@utils",
        replacement: path.resolve(__dirname, "./src/utils"),
      },
      {
        find: "@consts",
        replacement: path.resolve(__dirname, "./src/consts"),
      },
    ],
  },
});
