module.exports = {
  env: {
    browser: true,
    es6: true,
  },

  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended', // Рекомендуемая конфигурация Prettier
    'prettier', // Деактивирует все правила, которые могут конфликтовать с Prettier
  ],
  plugins: ['@typescript-eslint', 'prettier'], // Добавляем плагин Prettier
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'prettier/prettier': 'error', // Ошибка при нарушении правил Prettier
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      linterOptions: {
        reportUnusedDisableDirectives: true,
      },
    },
  ],
};
