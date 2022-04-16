/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-04-08 22:30:42
 * @LastEditTime: 2022-04-16 21:40:22
 */
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
  },
  plugins: [
    'react',
  ],
  overrides: [
    {
      files: [ '*.ts' ],
      extends: 'eslint-config-egg/typescript',
      parser: '@typescript-eslint/parser',
      plugins: [
        '@typescript-eslint/eslint-plugin',
      ],
    },
  ],
  rules: {
    'react/jsx-uses-react': 2,
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
