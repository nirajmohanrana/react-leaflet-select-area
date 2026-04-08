import path from "path"
import mdx from "@mdx-js/rollup"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { TanStackRouterVite } from "@tanstack/router-plugin/vite"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite({
      target: "react",
      autoCodeSplitting: true,
    }),
    mdx(),
    react({
      babel: {
        plugins: ["babel-plugin-react-compiler"],
      },
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "react-leaflet-select-area": path.resolve(__dirname, "../src/index.ts"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          leaflet: ["leaflet", "react-leaflet"],
          syntax: [
            "react-syntax-highlighter",
            "react-syntax-highlighter/dist/esm/styles/prism",
          ],
        },
      },
    },
  },
})
