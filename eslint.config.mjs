import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import pluginPlaywright from "eslint-plugin-playwright";

export default defineConfig([
  {
    files: ["tests/**/*.js", "pages/*.js", "helper/*.js", "fixtures/*.js", "utils/*.js"],
    plugins: { playwright: pluginPlaywright },
    extends: [js.configs.recommended],
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
      semi: ["error", "always"],
      quotes: ["warn", "double"],
    },
  },
  {
    files: ["tests/**/*.spec.js", "tests/**/*.test.js"],
    languageOptions: {
      globals: {
        test: "readonly",
        expect: "readonly",
      },
    },
    plugins: { playwright: pluginPlaywright },
    // add playwright test-specific rules if you want here
  },
]);
