import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
    },
    ignores: ["node_modules/", "dist/", "tests/"],
    rules: {
      semi: ["warn", "always"],
      quotes: ["warn", "double"],
    },
  },
];