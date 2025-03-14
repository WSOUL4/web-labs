import { defineConfig } from 'eslint-define-config';
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import typescriptEslintParser from '@typescript-eslint/parser';
import prettierPlugin from 'eslint-plugin-prettier';

export default defineConfig([
  {
    files: ['*.js', '*.jsx'], // Настройки для JavaScript и JSX
    languageOptions: {
      parser: typescriptEslintParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        jsx: true,
      },
    },
    rules: {
      'no-unused-vars': 'off',
      'prettier/prettier': 'error',
    },
  },
  {
    files: ['*.ts', '*.tsx'], // Настройки для TypeScript и TSX
    languageOptions: {
      parser: typescriptEslintParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        jsx: true,
      },
      plugins: {
        '@typescript-eslint': typescriptEslintPlugin,
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'error',
      'no-unused-vars': 'off',
    },
  },
  {
    files: ['*.js', '*.ts', '*.jsx', '*.tsx'], // Настройки для всех файлов
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'warn',
    },
  },
]);
