module.exports = {
  extends: 'eslint-config-egg/typescript',
  env: {
    browser: true,
  },
  plugins: [
    '@typescript-eslint/eslint-plugin',
    'react',
  ],
  rules: {
    '@typescript-eslint/ban-ts-comment': 'off',
    'react/jsx-uses-react': 2,
    'react/jsx-uses-vars': 'error',
    'generator-star-spacing': 'off',
    'babel/generator-star-spacing': 'off',
    'arrow-parens': [ 'warn', 'always' ],
    'no-empty': [ 'error', { allowEmptyCatch: true }],
    'prefer-promise-reject-errors': 'off',
    'jsdoc/check-tag-names': [
      'warn',
      {
        definedTags: [
          'description.zh-CN',
        ],
      },
    ],
  },
};
