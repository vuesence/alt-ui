import { resolve } from "node:path";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    vue(),
    dts({
      include: ["src/index.ts"],
      copyDtsFiles: false,
      exclude: ["src/**/*.vue"],
      tsconfigPath: resolve(__dirname, "tsconfig.json"),
      outDir: "dist",
    }),
  ],
  build: {
    target: ["esnext"],
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "AltUI",
      fileName: (format) => `index.${format === "es" ? "mjs" : "js"}`,
    },
    rollupOptions: {
      external: ["vue", "vue-router"],
      output: {
        globals: {
          vue: "Vue",
          "vue-router": "VueRouter",
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'styles.css';
          return assetInfo.name;
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
});
