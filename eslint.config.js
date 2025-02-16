import js from "@eslint/js";
import node from "eslint-plugin-node";
import jest from "eslint-plugin-jest";

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        module: "readonly",
        require: "readonly",
        exports: "readonly",
        __dirname: "readonly",
      },
    },
    plugins: {
      node,
      jest,
    },
    rules: {
      "no-undef": "off", // Disables errors for missing globals
      "no-unused-vars": "warn", // Warnings instead of errors for unused variables
    },
  },
];
