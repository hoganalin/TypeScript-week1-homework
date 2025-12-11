
import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    target: 'esnext',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
      output: {
        dir: resolve(__dirname, 'dist'),
      },
    },
  }
});

