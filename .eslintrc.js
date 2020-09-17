module.exports = {
    plugins: ['@typescript-eslint', '@typescript-eslint/eslint-plugin', 'eslint-plugin-tsdoc', 'jest'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.production.json',
        tsconfigRootDir: __dirname,
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    extends: ['prettier/@typescript-eslint', 'plugin:jest/recommended', 'plugin:@typescript-eslint/recommended'],
    rules: {
        '@typescript-eslint/no-namespace': 'off',
        '@typescript-eslint/camelcase': 'off',
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        'jest/no-disabled-tests': 'warn',
        'jest/no-focused-tests': 'error',
        'jest/no-identical-title': 'error',
        'jest/prefer-to-have-length': 'warn',
        'jest/valid-expect': 'error',
    },
    env: {
        'jest/globals': true,
    },
};
