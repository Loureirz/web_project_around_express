import js from "@eslint/js";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ["**/*.js"],
    rules: {
      ...js.configs.recommended.rules,
      semi: "error",
      "prefer-const": "error",
      "no-underscore-dangle": "off",
      "no-console":"off",
      "linebreak-style": "off"
    },
  },
];