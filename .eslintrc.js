module.exports = {
  root: true, // 親ディレクトリの設定ファイルを読み込まないように設定
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:react/recommended',
    'standard',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    'react',
    '@typescript-eslint'
  ],
  rules: {
    'no-use-before-define': 'off', // import React from 'react' のエラー回避
    '@typescript-eslint/no-use-before-define': ['error'],
    'camelCase': 'off',
    'space-before-function-paren': 'off',
    'react/react-in-jsx-scope': 'off'
  },
  settings: {
    react: {
      version: '17.0.2'
    }
  }
}
