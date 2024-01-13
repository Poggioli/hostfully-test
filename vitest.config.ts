import { resolve } from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    setupFiles: ['setupTest.ts'],
    environment: 'happy-dom',
    alias: [
      {
        find: "@",
        replacement: resolve(__dirname, "./src")
      }
    ],
    coverage: {
      provider: "istanbul", // or 'v8'
      exclude: [
        "**/src/service/api.ts",
        "**/src/lib/utils.ts",
        "**/src/components/ui/**/*",
        ".eslintrc.cjs ",
        "tailwind.config.js",
      ],
    },
  },
});
