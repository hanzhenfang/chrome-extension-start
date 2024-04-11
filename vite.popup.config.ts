import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import Unocss from "unocss/vite"

import { CRX_OUTDIR } from "./globalConfig"

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
    port: 4400,
    open: "/",
  },
  build: {
    outDir: CRX_OUTDIR,
  },
})
