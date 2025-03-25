import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import removeConsole from "vite-plugin-remove-console";
import optimizeImagePlugin from "vite-plugin-optimize-image";
import mkcert from "vite-plugin-mkcert";
import svgr from "vite-plugin-svgr";
import dotenv from 'dotenv';
dotenv.config();

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    removeConsole(),
    optimizeImagePlugin(),
    mkcert({
      certFileName: "./localhost.pem",
      keyFileName: "./localhost-key.pem",
    }),
    svgr(),
  ],
  define: {
    'import.meta.env.VITE_API_BASE_URL': JSON.stringify(process.env.VITE_API_BASE_URL),
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000/",
        changeOrigin: true,
        secure: false,
        ws: true,
      },
      "/vworld": {
        target: "https://api.vworld.kr",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/vworld/, ""),
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
      {
        find: "@assets",
        replacement: path.resolve(__dirname, "./src/assets"),
      },
    ],
  },
});
