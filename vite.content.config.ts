import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import Unocss from "unocss/vite"

import { CRX_CONTENT_OUTDIR } from "./globalConfig"

import { resolve } from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [Unocss({}), vue()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  server: {
    host: "0.0.0.0",
    open: "/",
  },
  build: {
    outDir: CRX_CONTENT_OUTDIR,
    lib: {
      entry: [resolve(__dirname, "src/content/index.ts")],
      formats: ["cjs"],
      fileName: () => {
        return "content.js"
      },
    },
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          return "content.css"
        },
      },
    },
  },
})
