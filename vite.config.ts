import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    globalSetup: "./vitest.global-setup.ts",
    // you might want to disable it, if you don't have tests that rely on CSS
    // since parsing CSS is slow
    css: false,
    coverage: {
      provider: "istanbul",
      exclude: [
        "node_modules/",
        "src/setupTests.ts",
        "src/__generated__",
        "src/config/",
        "**/mockData.ts",
      ],
      // you can include other reporters, but 'json-summary' is required, json is recommended
      reporter: ["text", "json-summary", "json"],
    },
  },
});
