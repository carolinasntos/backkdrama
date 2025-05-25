// eslint.config.js
import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module"
    },
    linterOptions: {
      exclude: ["node_modules/", "dist/", "tests/"]
    },
    rules: {
      semi: ["warn", "always"],
      quotes: ["warn", "double"],
      "no-unused-vars": "warn",
      "no-undef": "error"
    }
  }
];