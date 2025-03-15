import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { ESLint } from 'eslint';

const eslint = new ESLint({
    overrideConfig: {
        extends: [
            js.configs.recommended,
            'plugin:@typescript-eslint/recommended',
            'plugin:react/recommended',
            'plugin:react-hooks/recommended',
        ],
        parser: '@typescript-eslint/parser',
        parserOptions: {
            ecmaVersion: 2020,
            sourceType: 'module',
        },
        globals: {
            ...globals.browser,
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ],
        },
        linterOptions: {
            reportUnusedDisableDirectives: true, // Переместите сюда
        },
    },
});
