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

| 技術                                                                                              | version | 説明                                                                                                |
| ------------------------------------------------------------------------------------------------- | ------- | --------------------------------------------------------------------------------------------------- |
| react                                                                                             | 17.0.2  | ユーザインタフェース構築のための JavaScript ライブラリ                                              |
| typescript                                                                                        | 4.1.2   | JavaScript に対して、静的型付けとクラスベースオブジェクト指向を加えた言語                           |
| [react-router-dom](https://github.com/remix-run/react-router#readme)                              | 5.2.0   | ルーティングを定義するためのライブラリ                                                              |
| [react-app-rewired](https://www.npmjs.com/package/react-app-rewired)                              | 2.1.8   | webpack の設定を上書きしてエイリアス設定しているパスの解決を行う                                    |
| [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd)                           | 13.1.0  | ドロップ&ドラッグを実現できるライブラリ                                                             |
| [react-vertical-timeline-component](https://stephane-monnot.github.io/react-vertical-timeline/#/) | 3.5.2   | タイムライムの表示                                                                                  |
| [@use-it/interval](https://www.npmjs.com/package/@use-it/interval)                                | 1.0.0   | setInterval を提供するカスタム React フック                                                         |
| [@uiw/react-md-editor](https://uiwjs.github.io/react-markdown-preview)                            | 3.9.1   | React で Markdown を表示できるようにするライブラリ                                                  |
| axios                                                                                             | 0.24.0  | Promise ベースの HTTP Client ライブラリ                                                             |
| uuid                                                                                              | 8.3.2   | uuid を付与する                                                                                     |
| ts-node                                                                                           | 10.5.0  | typescript のファイルを単体で実行できるモジュール                                                   |
| shelljs                                                                                           | 0.8.5   | 移植可能な（Windows / Linux / OS X）の Unix シェルコマンドを Node.js API の上に実装できるモジュール |
| sass                                                                                              | 1.45.1  | Sass をコンパイルするためのモジュール                                                               |
| sass-loader                                                                                       | 12.4.0  | Sass を CSS へ変換するためのモジュール                                                              |
| tslib                                                                                             | 2.3.1   | コンパイル後の js ファイルが大きくなるのを防ぐ                                                      |
| eslint                                                                                            | 7.32.0  | コードの解析                                                                                        |
| eslint-config-prettier                                                                            | 8.3.0   | ESLint と Prettier を併用する                                                                       |
| prettier                                                                                          | 2.4.1   | コードの整形                                                                                        |
| @typescript-eslint/parser                                                                         | 4.31.1  | ESLint を Typescript で解析できるようにする                                                         |
| @typescript-eslint/eslint-plugin                                                                  | 4.31.1  | ESLint で Typescript のチェックを行う                                                               |
| husky                                                                                             | 4.3.8   | Git コマンドフックに別のコマンドを呼び出せる                                                        |
| lint-staged                                                                                       | 11.1.2  | commit したファイル(Staging にあるファイル)に lint を実行する                                       |
| [react-icons](https://react-icons.github.io/react-icons)                                          | 4.2.0   | `Ant Design` や `Material Design`などを集めたアイコンの宝庫                                         |
| [react-hot-keys](https://www.npmjs.com/package/react-hot-keys)                                    | 2.7.2   | キーイベントを取得して、そのイベントに対する処理を行えるライブラリ                                                                                                 |
| [dts-gen](https://github.com/microsoft/dts-gen)                                                   | 0.6.0   | ライブラリで型定義ファイルがない場合に `XXX.d.ts` を生成する                                        |
|                                                                                                   |         |                                                                                                     |
|                                                                                                   |         |                                                                                                     |

<!--rehype:style=color: black;-->

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
