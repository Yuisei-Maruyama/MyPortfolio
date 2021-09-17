# My Portfolio

## パッケージインストール

```bash
npm i -D @material-ui/icons @material-ui/core @types/react react-app-rewired
npm i -S react-router-dom
```

## 使用パッケージ

- react-app-rewired : webpack の設定を上書きしてエイリアス設定しているパスの解決を行うライブラリ

## react-app-rewired の導入理由

### 目的
`create-react-app` で作成したプロジェクトにおいて、`tsconfig.json` の `paths`オプションに指定したエイリアスを使うこと。

### 問題

`tsconfig.json`は `react-scripts` が実行されたタイミングで自動的に `tsconfig.json` の内容を書き換えてしまうことで、記述した`paths`が消えてしまう。

```json
"scripts": {
    "start": "react-scripts start",
```

### 方針
1. extends を使って別ファイルから paths のオプションを読み込ませる
2. webpack の設定を上書きしてパスの解決を行う

### 検証

> 1. extends を使って別ファイルから paths のオプションを読み込ませる

`tsconfig.paths.json`を作成し、`compilerOptions`の設定を書く。  

```json
{
  "compilerOptions": {
    ...
    baseUrl": ".",
    "paths": {
      "@/*": [
        "src/*"
      ]
    },
  }
}
```
tsconfig.json に tsconfig.paths.json を読み込ませる。

```json
{
  "extends": "./tsconfig.paths.json",
  ...
}
```

でエイリアスを使用できるようになったと思ったが、  
エイリアスのパス部分がそのまま @/XXX と出力されており、正しいパスに解釈されていなかった。

> 2. webpack の設定を上書きしてパスの解決を行う

`tsconfig` の `compilerOptions.paths` オプションで TypeScript のパスのエイリアスの設定はできるが、バンドルする際のパスの解決は行わない。  

create-react-app で作ったアプリは webpack でバンドルされているので、webpack の設定を上書きしてエイリアス設定しているパスの解決をする必要がある。

下記を実行し、`config-overrides.js` を作成する。
```
$ npm i -D react-app-rewired
```

(config-overrides.js)
```js
const path = require('path')

module.exports = (config) => {
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.alias,
      '@': path.resolve(__dirname, './src')
    }
  }
  return config
}

```

`npm-scripts` を `react-scripts` から `react-app-rewired` を変更して設定の上書きを読み込むように変更する。
