import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin"; // проверьте, установлена ли эта библиотека
import tsparser from "@typescript-eslint/parser"; // проверьте, установлена ли эта библиотека

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      globals: globals.browser,
      parser: tsparser, // Парсер для TypeScript
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "prettier"
    ],
  },
  {
    plugins: [
      "@typescript-eslint"
    ],
  },

  {
    rules: {
     "@typescript-eslint/no-unused-vars": ["error"],
      "no-unused-vars": "warn",
      "semi":["error", "always"],
      "@typescript-eslint/explicit-function-return-type": "off",
      "prettier/prettier": "error"
    },
  },
];
