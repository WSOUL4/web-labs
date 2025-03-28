import { defineConfig } from 'eslint-define-config';
import parser from '@typescript-eslint/parser';
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginTypescript from '@typescript-eslint/eslint-plugin';

export default defineConfig([
  {
    languageOptions: {
      parser, // Используем парсер TypeScript
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        jsx: true,
      },
      globals: {
        // Определите глобальные переменные здесь
      },
    },
    settings: {
      react: {
        version: 'detect', // Автоматическое определение версии React
      },
    },
    plugins: {
      react: eslintPluginReact, // Подключаем плагин React как объект
      '@typescript-eslint': eslintPluginTypescript, // Подключаем плагин TypeScript как объект
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
  {
    files: ['*.ts', '*.tsx'],
    rules: {
      // Здесь можно указать специфичные для TypeScript правила
    },
  },
]);
