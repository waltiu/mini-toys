import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: [
        path.resolve(__dirname, "lib/react.js"),
        path.resolve(__dirname, "lib/vue.js"),
        path.resolve(__dirname, "lib/shallow.js"),
        path.resolve(__dirname, "lib/middleware/immer.js"),
      ],
      name: "toy-zustand",
    },
    rollupOptions: {
      external: ["react", "react-dom", "vue", "@vueuse/core"],
      output: {
        assetFileNames: `xzTemplateMsg.[ext]`,
        globals: {
          react: "react",
          "react-dom": "react-dom",
        },
      },
      plugins: [],
    },
  },
  plugins: [react()],
});
