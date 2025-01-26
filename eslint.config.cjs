module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended', // Ensures Prettier formatting is respected
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'import', 'unused-imports', 'simple-import-sort'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    '@typescript-eslint/no-unused-vars': 'off', // Handled by unused-imports plugin
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-types': [
      'error',
      {
        extendDefaults: true,
        types: {
          Function: false,
          Object: false,
        },
      },
    ],
    'react-hooks/exhaustive-deps': 'off', // Consider enabling if needed for your project
    // Import sorting and unused imports
    'simple-import-sort/imports': 'off',
    'simple-import-sort/exports': 'off',
    'unused-imports/no-unused-imports': 'off',
    'unused-imports/no-unused-vars': 'off',
    // Optional: Disable some import rules that may conflict with sorting
    'import/no-unresolved': 'off',
    'import/order': 'off',
    'import/no-named-as-default-member': 'off',
    'import/default': 'off',
    '@typescript-eslint/no-duplicate-enum-values': 'off',
    'react-refresh/only-export-components': 'off',
    'import/no-named-as-default': 'off',
    'no-unsafe-optional-chaining': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'react/jsx-key': 'off', // Disable the unique "key" prop warning
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {
        project: './tsconfig.json',
      },
    },
  },
}
