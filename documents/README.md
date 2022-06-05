# My Portfolio

## Portfolio URL

https://yuisei-maruyama.work/

## 目的

自己紹介と開発におけるタスク管理を兼ねる意図で作成。

### 開発におけるタスク管理画面の作成経緯

下記の 2 点の経緯からタスク管理画面の作成を行った。

- 当初、タスクの管理として `GitHub Projects` のかんばん機能を利用していたが、
  Issue に付与されたラベルごとの管理がしづらいことや対象となる`Issue`を編集やコメント記入する際のアクションが多かった点

- Issue の管理を行う為に毎回、`GitHub`のページに移動しなければいけないのは億劫であると感じた点

## 要件定義

### 機能一覧

| 機能                                          |
| --------------------------------------------- |
| GitHub Issue の Todo ラベル内容閲覧機能       |
| GitHub Issue の新規作成機能                   |
| GitHub Issue に付与されたラベルごとの管理機能 |
| コンポーネントのプレビュー機能                |
| ドキュメントのプレビュー機能                  |

<!--rehype:style=color: black;-->

---

> GitHub Issue の Todo ラベル内容閲覧機能
>
> > GitHub Issue に付与された Todo ラベルの内容からタイトルと詳細内容が閲覧可能
> > Issue タイトルをクリックすることで該当 Issue に遷移可能

<!--rehype:style=color: white;-->

<img src="https://github.com/Yuisei-Maruyama/MyPortfolio/blob/main/public/assets/ReadmeGifs/slider.gif?raw=true" width="100%">

---

> GitHub Issue の新規作成

<!--rehype:style=color: white;-->

<img src="https://github.com/Yuisei-Maruyama/MyPortfolio/blob/main/public/assets/ReadmeGifs/Add-Issue.gif?raw=true" width="100%">

---

> 付与されたラベルごとの管理機能
>
> > ドラッグ＆ドロップにおけるラベルの修正

<!--rehype:style=color: white;-->

ex.) Todo -> Doing ラベルに変更

<img src="https://github.com/Yuisei-Maruyama/MyPortfolio/blob/main/public/assets/ReadmeGifs/Update-Issue.gif?raw=true" width="100%">

ex.) Doing -> Closed ラベルに変更

<img src="https://github.com/Yuisei-Maruyama/MyPortfolio/blob/main/public/assets/ReadmeGifs/Closed-Issue.gif?raw=true" width="100%">

---

### 使用技術・バージョン

| 技術 | version | 備考 |
| ---- | ------- | ---- |
| [@emotion/react](https://www.npmjs.com/package/@emotion/react) | ^11.4.1 |  |
| [@emotion/styled](https://www.npmjs.com/package/@emotion/styled) | ^11.3.0 |  |
| [@mui/icons-material](https://www.npmjs.com/package/@mui/icons-material) | ^5.2.1 |  |
| [@mui/lab](https://www.npmjs.com/package/@mui/lab) | ^5.0.0-alpha.63 |  |
| [@mui/material](https://www.npmjs.com/package/@mui/material) | ^5.0.0-rc.1 |  |
| [@testing-library/jest-dom](https://www.npmjs.com/package/@testing-library/jest-dom) | ^5.11.4 |  |
| [@testing-library/react](https://www.npmjs.com/package/@testing-library/react) | ^11.1.0 |  |
| [@testing-library/user-event](https://www.npmjs.com/package/@testing-library/user-event) | ^12.1.10 |  |
| [@types/jest](https://www.npmjs.com/package/@types/jest) | ^26.0.15 |  |
| [@types/node](https://www.npmjs.com/package/@types/node) | ^12.0.0 |  |
| [@types/react-dom](https://www.npmjs.com/package/@types/react-dom) | ^17.0.0 |  |
| [@types/styled-components](https://www.npmjs.com/package/@types/styled-components) | ^5.1.25 |  |
| [@uiw/react-md-editor](https://www.npmjs.com/package/@uiw/react-md-editor) | ^3.9.1 | React で Markdown を表示できるようにする |
| [@use-it/interval](https://www.npmjs.com/package/@use-it/interval) | ^1.0.0 | setInterval を提供するカスタム React フック |
| [react](https://www.npmjs.com/package/react) | ^17.0.2 | ユーザインタフェース構築のための JavaScript |
| [react-beautiful-dnd](https://www.npmjs.com/package/react-beautiful-dnd) | ^13.1.0 | ドロップ&ドラッグを実現できる |
| [react-dom](https://www.npmjs.com/package/react-dom) | ^17.0.2 |  |
| [react-hot-keys](https://www.npmjs.com/package/react-hot-keys) | ^2.7.2 | キーイベントを取得して、そのイベントに対する処理を行える |
| [react-icons](https://www.npmjs.com/package/react-icons) | ^4.2.0 | `Ant Design` や `Material Design`などを集めたアイコンの宝庫 |
| [react-particle-effect-button](https://www.npmjs.com/package/react-particle-effect-button) | ^1.0.1 | particleアニメーションが付いたボタンを表現できる |
| [react-router-dom](https://www.npmjs.com/package/react-router-dom) | ^5.2.0 | ルーティングを定義できる |
| [react-scripts](https://www.npmjs.com/package/react-scripts) | ^5.0.1 | アプリケーションの初期表示時に JS の読み込み処理を行う |
| [react-vertical-timeline-component](https://www.npmjs.com/package/react-vertical-timeline-component) | ^3.5.2 | タイムラインの表示 |
| [sass](https://www.npmjs.com/package/sass) | ^1.45.1 | Sass をコンパイルするためのモジュール |
| [sass-loader](https://www.npmjs.com/package/sass-loader) | ^12.4.0 | Sass を CSS へ変換するためのモジュール |
| [shelljs](https://www.npmjs.com/package/shelljs) | ^0.8.5 | 移植可能な（Windows / Linux / OS X）の Unix シェルコマンドを Node.js API の上に実装できるモジュール |
| [styled-components](https://www.npmjs.com/package/styled-components) | ^5.3.5 | React思想のコンポーネント単位での管理がスタイルにも可能になる |
| [tslib](https://www.npmjs.com/package/tslib) | ^2.3.1 | コンパイル後の js ファイルが大きくなるのを防ぐ  |
| [typescript](https://www.npmjs.com/package/typescript) | ^4.1.2 | JavaScript に対して、静的型付けとクラスベースオブジェクト指向を加えた言語 |
| [uuid](https://www.npmjs.com/package/uuid) | ^8.3.2 | uuid を付与する  |
| [web-vitals](https://www.npmjs.com/package/web-vitals) | ^1.0.1 |  |
| [@material-ui/core](https://www.npmjs.com/package/@material-ui/core) | ^4.12.3 |  |
| [@material-ui/icons](https://www.npmjs.com/package/@material-ui/icons) | ^4.11.2 |  |
| [@types/react](https://www.npmjs.com/package/@types/react) | ^17.0.19 |  |
| [@types/react-beautiful-dnd](https://www.npmjs.com/package/@types/react-beautiful-dnd) | ^13.1.2 |  |
| [@types/react-router-dom](https://www.npmjs.com/package/@types/react-router-dom) | ^5.1.8 |  |
| [@types/react-vertical-timeline-component](https://www.npmjs.com/package/@types/react-vertical-timeline-component) | ^3.0.1 |  |
| [@types/uuid](https://www.npmjs.com/package/@types/uuid) | ^8.3.3 |  |
| [@typescript-eslint/eslint-plugin](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin) | ^4.31.1 | ESLint で Typescript のチェックを行う |
| [@typescript-eslint/parser](https://www.npmjs.com/package/@typescript-eslint/parser) | ^4.31.1 | ESLint を Typescript で解析できるようにする |
| [axios](https://www.npmjs.com/package/axios) | ^0.24.0 | Promise ベースの HTTP Client  |
| [babel-plugin-styled-components](https://www.npmjs.com/package/babel-plugin-styled-components) | ^2.0.7 |  |
| [eslint](https://www.npmjs.com/package/eslint) | ^7.32.0 | コードの解析 |
| [eslint-config-prettier](https://www.npmjs.com/package/eslint-config-prettier) | ^8.3.0 | ESLint と Prettier を併用する |
| [eslint-config-standard](https://www.npmjs.com/package/eslint-config-standard) | ^16.0.3 |  |
| [eslint-plugin-import](https://www.npmjs.com/package/eslint-plugin-import) | ^2.24.2 |  |
| [eslint-plugin-node](https://www.npmjs.com/package/eslint-plugin-node) | ^11.1.0 |  |
| [eslint-plugin-promise](https://www.npmjs.com/package/eslint-plugin-promise) | ^5.1.0 |  |
| [eslint-plugin-react](https://www.npmjs.com/package/eslint-plugin-react) | ^7.25.2 |  |
| [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks) | ^4.3.0 |  |
| [eslint-plugin-styled-components-varname](https://www.npmjs.com/package/eslint-plugin-styled-components-varname) | ^1.0.1 |  |
| [husky](https://www.npmjs.com/package/husky) | ^7.0.0 | Git コマンドフックに指定したコマンドを呼び出せる |
| [lint-staged](https://www.npmjs.com/package/lint-staged) | ^11.1.2 | commit したファイル(ステージングにあるファイル)に lint を実行する  |
| [polished](https://www.npmjs.com/package/polished) | ^4.1.3 | JavaScript で rgba を使用できるようにする |
| [prettier](https://www.npmjs.com/package/prettier) | ^2.4.1 | コードの整形 |
| [react-app-rewired](https://www.npmjs.com/package/react-app-rewired) | ^2.1.8 | webpack の設定を上書きしてエイリアス設定しているパスの解決を行う |
| [ts-node](https://www.npmjs.com/package/ts-node) | ^10.5.0 | typescript のファイルを単体で実行できるモジュール |

### 動作環境

| デバイスの識別 | OS             | 対応ブラウザ       |
| -------------- | -------------- | ------------------ |
| PC             | macOS Monterey | Google chrome 最新 |

<!--rehype:style=color: black;-->

## 基本設計

### サイトマップ

#### 画面名

| 画面名                           | URI                |
| -------------------------------- | ------------------ |
| ヘッダー                         | -                  |
| メイン画面                       | /                  |
| タスク管理ボード画面             | /board             |
| コンポーネントプレビュー画面     | /components        |
| 対象のコンポーネントのプレビュー | /components/:label |
| ドキュメントプレビュー画面       | /documents         |
| 対象のドキュメントのプレビュー   | /documents/:label  |
| フッダー                         | -                  |

<!--rehype:style=color: black;-->
