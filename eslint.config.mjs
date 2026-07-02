import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
    {
        ignores: ['dist/**', 'node_modules/**', 'logs/**']
    },
    {
        files: ['**/*.ts'],
        languageOptions: {
            parser: tsparser,
            parserOptions: {
                ecmaVersion: 2022,
                sourceType: 'module'
            }
        },
        plugins: {
            '@typescript-eslint': tseslint,
            prettier: prettierPlugin
        },
        rules: {
            ...tseslint.configs.recommended.rules,
            'no-console': 0,
            'no-async-promise-executor': 0,
            'prettier/prettier': 1,
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-unused-vars': [
                'warn',
                { ignoreRestSiblings: true }
            ]
        }
    },
    prettierConfig
];
