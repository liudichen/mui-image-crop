module.exports = {
  extends: 'eslint-config-egg',
  parser: '@babel/eslint-parser',
  env: {
    browser: true,
  },
  parserOptions: {
    sourceType: 'module',
    requireConfigFile: false,
    ecmaFeatures: {
      jsx: true,
    },
    babelOptions: {
      presets: [
        '@babel/preset-react',
      ],
    },
    ecmaFeature: {
      jsx: true,
    },
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/jsx-uses-vars': 'error',
    'generator-star-spacing': 'off',
    'babel/generator-star-spacing': 'off',
    'no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '(^_)|(^props$)|(^e$)',
      },
    ],
    'arrow-parens': [ 'warn', 'always' ],
    'no-empty': [ 'error', { allowEmptyCatch: true }],
    'prefer-promise-reject-errors': 'off',
  },
};