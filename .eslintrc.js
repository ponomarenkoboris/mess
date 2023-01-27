module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    extends: [
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'plugin:jsx-a11y/recommended',
        'plugin:eslint-comments/recommended',
    ],
    rules: {
        'no-unused-vars': 0,
        '@typescript-eslint/no-unused-vars': 2,
        'react/prop-types': 2,
        'react/jsx-uses-react': 2,
        'react/react-in-jsx-scope': 0,
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'import/no-unresolved': 0,
        'react-hooks/exhaustive-deps': 0
    },
}