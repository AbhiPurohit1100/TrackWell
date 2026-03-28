module.exports = {
  root: true,
  extends: ['expo', 'plugin:react-hooks/recommended', 'plugin:react-native/all'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    'react-native/no-inline-styles': 'off'
  }
};
