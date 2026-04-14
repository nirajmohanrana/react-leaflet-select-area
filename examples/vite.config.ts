import path from "path"
import mdx from "@mdx-js/rollup"
import babel from "@rolldown/plugin-babel"
import tailwindcss from "@tailwindcss/vite"
import react, { reactCompilerPreset } from "@vitejs/plugin-react"
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
    react(),
    babel({
      presets: [reactCompilerPreset()],
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
        manualChunks(id) {
          if (id.includes("react-syntax-highlighter")) {
            return "syntax"
          }

          if (
            id.includes(`${path.sep}leaflet${path.sep}`) ||
            id.includes(`${path.sep}react-leaflet${path.sep}`) ||
            id.includes("/leaflet/") ||
            id.includes("/react-leaflet/")
          ) {
            return "leaflet"
          }

          return undefined
        },
      },
    },
  },
})
