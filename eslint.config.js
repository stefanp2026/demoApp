// @ts-check
import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
    globalIgnores(['dist/']),
    js.configs.recommended,
    tseslint.configs.recommended,
    {
        languageOptions: {
            globals: globals.browser,
        },
        rules: {
            'no-var': 'error',
            // == null is allowed on purpose: it checks for null and undefined at once
            eqeqeq: ['error', 'always', { null: 'ignore' }],
            'prefer-const': 'error',
            'prefer-template': 'error',
            'object-shorthand': ['error', 'always'],
            'prefer-arrow-callback': 'error',
            'prefer-rest-params': 'error',
            '@typescript-eslint/no-non-null-assertion': 'error',
        },
    },
    {
        files: ['vite.config.ts', 'eslint.config.js'],
        languageOptions: {
            globals: globals.node,
        },
    },
]);
