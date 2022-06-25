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
    'prettier',
    'plugin:jsx-a11y/recommended'
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
    '@typescript-eslint',
    'react-hooks',
    'styled-components-varname',
    'import',
    'jsx-a11y'
  ],
  rules: {
    'no-use-before-define': 'off', // import React from 'react' のエラー回避
    '@typescript-eslint/no-use-before-define': ['error', { 'variables': false }], // styled-componentsの定義場所を.tsx下部に設定するため
    'camelCase': 'off',
    'import/no-duplicates': 'error',
    'space-before-function-paren': 'off',
    'react/react-in-jsx-scope': 'off',
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
    'styled-components-varname/varname': [
      2,
      {
        'tagStyle': { // tagStyle defines a naming convention that applies to things like styled.foo.
          'prefix': '_',
        },
        'extendedStyle': { // extendedStyle defines a naming convention that applies to things like styled(Foo).
          'prefix': '$',
        },
      },
    ],
  },
  settings: {
    react: {
      version: '17.0.2'
    },
    'jsx-a11y': {
      'components': {
        'BoardBase': 'div',
        'Circular': 'div',
        'CommandList': 'div',
        'ComponentList': 'div',
        'ComponentPreviewTabs': 'div',
        'DocumentList': 'div',
        'DragDrop': 'div',
        'FlippedCard': 'div',
        'Footer': 'div',
        'Header': 'div',
        'History': 'div',
        'InstructionsArea': 'div',
        'IssueCard': 'div',
        'IssueDialog': 'div',
        'ProfileBackCard': 'div',
        'ProfileFrontCard': 'div',
        'ProgressArea': 'div',
        'ProgressBar': 'div',
        'SkillTable': 'div',
        'SkillTables': 'div',
        'SliderContents': 'div',
        'Stepper': 'div',
      }
    }
  }
}
