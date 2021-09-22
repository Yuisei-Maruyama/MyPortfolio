# My Portfolio

## パッケージインストール

```bash
npm i -D @material-ui/icons @material-ui/core @types/react react-app-rewired @types/react-vertical-timeline-component eslint eslint-config-prettier prettier husky@4.3.8 lint-staged
npm i -S react-router-dom react-vertical-timeline-component react-icons @mui/material@next @emotion/react @emotion/styled
```

## 使用パッケージ
| パッケージ名 | 説明 |
| --- | --- |
| [react-app-rewired](https://www.npmjs.com/package/react-app-rewired) | webpack の設定を上書きしてエイリアス設定しているパスの解決を行う |
| [vertical-timeline-component-react](https://stephane-monnot.github.io/react-vertical-timeline/#/) | タイムライムの表示 |
| eslint | コードの解析 |
| eslint-config-prettier | ESLint と Prettierを併用する |
| prettier | コードの整形 |
| @typescript-eslint/parser | ESLintをTypescriptで解析できるようにする |
| @typescript-eslint/eslint-plugin | ESLintでTypescriptのチェックを行う |
| husky | Gitコマンドフックに別のコマンドを呼び出せる |
| lint-staged | commitしたファイル(Stagingにあるファイル)にlintを実行する |
| [react-icons](https://react-icons.github.io/react-icons) | `Ant Design` や `Material Design`などを集めたアイコンの宝庫 |
| | |
| | |
| | |
| | |

## tsx ファイルの作成方法

 1. 対象のディレクトリを作成し、`~.tsx`を作成する。

 2. 対象の`~.tsx`で`rafce`と入力し、入力補完を使う。

 3. エントリーポイントファイル(src/components.ts)に設定するファイルは下記のように`React.FC`をつける。

 ```ts
 const XXX:React.FC = () => {
  return (
    ...
  )
 }
 ```

 4. Propsは下記のような形で定義する。

 ```ts
  type Props = Record<string, string>

  const XXX: React.FC<Props> = (props: Props) => {
    return (
      <XXX title={props.title}>
      ...
    )
  }
 ```

## ESLint の設定方法

```
$ npm i eslint
$ npx eslint --init
```

## Husky の動作確認

下記のコマンドを実行した時に、`pre-commit`や`pre-rebase`が存在していることを確認する。

```
$ ls -la .git/hooks/ls -la .git/hooks/
```

なかったら、

```
$ npm uni husky
```
を実行し、  
[npm husky version list](https://www.npmjs.com/package/husky)から、一番ダウンロード数が多いものをダウンロードする。
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
