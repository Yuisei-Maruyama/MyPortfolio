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
| 特定コマンドによるアニメーション表示機能                  |
| https://github.com/Yuisei-Maruyama/MyPortfolio#%E4%BD%BF%E7%94%A8%E6%8A%80%E8%A1%93%E3%83%90%E3%83%BC%E3%82%B8%E3%83%A7%E3%83%B3 の自動更新機能                 |

<!--rehype:style=color: black;-->

(※使用パッケージに記載されているテーブルはコミット時に [updateReadmeTable.ts](https://github.com/Yuisei-Maruyama/MyPortfolio/blob/main/tools/updateReadmeTable.ts) によって自動更新されます。）

---

> GitHub Issue の Todo ラベル内容閲覧機能
>
> > GitHub Issue に付与された Todo ラベルの内容からタイトルと詳細内容が閲覧可能
> > Issue タイトルをクリックすることで該当 Issue に遷移可能

<!--rehype:style=color: white;-->

<img src="https://github.com/Yuisei-Maruyama/MyPortfolio/blob/update-readme/public/assets/ReadmeGifs/slider_vol.2.gif?raw=true" width="100%">

---

> GitHub Issue の新規作成

<!--rehype:style=color: white;-->

<img src="https://github.com/Yuisei-Maruyama/MyPortfolio/blob/update-readme/public/assets/ReadmeGifs/Add-Issue_vol.2.gif?raw=true" width="100%">

---

> 付与されたラベルごとの管理機能
>
> > ドラッグ＆ドロップにおけるラベルの修正

<!--rehype:style=color: white;-->

ex.) Todo -> Doing ラベルに変更

<img src="https://github.com/Yuisei-Maruyama/MyPortfolio/blob/update-readme/public/assets/ReadmeGifs/Update-Issue_vol.2.gif?raw=true" width="100%">

ex.) Doing -> Closed ラベルに変更

<img src="https://github.com/Yuisei-Maruyama/MyPortfolio/blob/update-readme/public/assets/ReadmeGifs/Closed-Issue_vol.2.gif?raw=true" width="100%">

---

> 特定コマンドによるアニメーション表示機能

<!--rehype:style=color: white;-->

VSCode でも親しみのある `「command + shift + p」` を押下することで、コマンドリストが表示されます。  
コマンド入力ボックスに下記のワードを入力することによって、指定したコンポーネントを表示することが可能になります。  
  
| コマンド名 | 説明 |
| ---- | ------- |
| all |  全てのコマンドを表示します。 |
| alert | ウィンドウ上部にアラートを表示します。 |
| matrix | ウィンドウ内にマトリックスでお馴染みのあのアニメーションが流れます。 |
<!--rehype:style=color: black;-->

ex.) matrix

<img src="https://user-images.githubusercontent.com/76277215/173228277-2f323b32-e22f-488b-869a-d9bd32977443.gif" width="100%">


> 「使用技術・バージョン」テーブルの自動更新機能

上記機能を実装した背景としては、3点あります。  

- 自分が使用しているパッケージが現在、どのような状態にあり、どんなことが話し合われているのかということについて、動向を追いやすくしたいと考えた点
- README.mdのテーブルの記述内容が増えると、コードの可読性が低下し、メンテナンスコストがかかってしまった点
- このスクリプトを自分のプロジェクトメンバーに展開することで組織力を高めていきたいと考えた点

---

**[上記の背景に対する補足]**

> 自分が使用しているパッケージが現在、どのような状態にあり、どんなことが話し合われているのかということについて、動向を追いやすくしたいと考えた点

上記に関しては、npm の各パッケージの詳細URLが  `https://www.npmjs.com/package/{パッケージ名}` になっているという規則性を見つけ出し、 マークダウンの「技術」カラムを npm の `link` にすることで、パッケージの更新状態の確認やGithubのページに遷移する為のアクションを減らすことが容易になりました。  


> README.mdのテーブルの記述内容が増えると、コードの可読性が低下し、メンテナンスコストがかかってしまった点

以前のプロジェクトでも、マークダウンのテーブルで多くの情報を扱う時に、手作業でのメンテナンスにとても苦戦した経験がありました。  
その経験を踏まえて、技術的に解決したいと考え、スクリプトで自動的にテーブルを生成することでマークダウンを編集する事なく、メンテナンスを行う方法を実現しました。  

> このスクリプトを自分のプロジェクトメンバーに展開することで組織力を高めていきたいと考えた点

このスクリプトをプロジェクトのメンバーに展開することで、メンバー各々が作成しているプロダクトや自分達のプロジェクトで使われている技術における動向や理解を深め、組織においての総合力を少しでも底上げする要因になれば嬉しいと考えました。

---

### 使用技術・バージョン

| 技術 | version | 備考 |
| ---- | ------- | ---- |
| [@emotion/react](https://www.npmjs.com/package/@emotion/react) | ^11.4.1 | CSS in JS を使用するためのパッケージ |
| [@emotion/styled](https://www.npmjs.com/package/@emotion/styled) | ^11.3.0 | CSS in JS を使用するためのパッケージ |
| [@mui/icons-material](https://www.npmjs.com/package/@mui/icons-material) | ^5.2.1 | CSSフレームワーク Material-UI を使用するためのパッケージ |
| [@mui/lab](https://www.npmjs.com/package/@mui/lab) | ^5.0.0-alpha.63 | CSSフレームワーク Material-UI を使用するためのパッケージ |
| [@mui/material](https://www.npmjs.com/package/@mui/material) | ^5.0.0-rc.1 | CSSフレームワーク Material-UI を使用するためのパッケージ |
| [@testing-library/jest-dom](https://www.npmjs.com/package/@testing-library/jest-dom) | ^5.11.4 | React で Unit テストを行うためのパッケージ |
| [@testing-library/react](https://www.npmjs.com/package/@testing-library/react) | ^11.1.0 | React で Unit テストを行うためのパッケージ |
| [@testing-library/user-event](https://www.npmjs.com/package/@testing-library/user-event) | ^12.1.10 | React で Unit テストを行うためのパッケージ |
| [@types/jest](https://www.npmjs.com/package/@types/jest) | ^26.0.15 | jestの型定義ファイルのパッケージ |
| [@types/node](https://www.npmjs.com/package/@types/node) | ^12.0.0 | nodeの型定義ファイルのパッケージ |
| [@types/react-dom](https://www.npmjs.com/package/@types/react-dom) | ^17.0.0 | react-domの型定義ファイルのパッケージ |
| [@types/styled-components](https://www.npmjs.com/package/@types/styled-components) | ^5.1.25 | styled-componentsの型定義ファイルのパッケージ |
| [@uiw/react-md-editor](https://www.npmjs.com/package/@uiw/react-md-editor) | ^3.9.1 | React で Markdown を表示できるようにする |
| [@use-it/interval](https://www.npmjs.com/package/@use-it/interval) | ^1.0.0 | setInterval を提供するカスタム React フック |
| [react](https://www.npmjs.com/package/react) | ^17.0.2 | ユーザインタフェース構築のための JavaScript |
| [react-beautiful-dnd](https://www.npmjs.com/package/react-beautiful-dnd) | ^13.1.0 | ドロップ&ドラッグを実現できる |
| [react-dom](https://www.npmjs.com/package/react-dom) | ^17.0.2 | Javascript のオブジェクトでリアルDOMを仮想的に作り、変更箇所だけ差分検知し更新することを React で行えるようにする |
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
| [uuid](https://www.npmjs.com/package/uuid) | ^8.3.2 | uuid を付与する |
| [web-vitals](https://www.npmjs.com/package/web-vitals) | ^1.0.1 | サイトの健全性を示す重要指標を計測できる |
| [@material-ui/core](https://www.npmjs.com/package/@material-ui/core) | ^4.12.3 | CSSフレームワーク Material-UI を使用するパッケージ(旧) -> [@mui/material](https://www.npmjs.com/package/@mui/material) に変更された |
| [@material-ui/icons](https://www.npmjs.com/package/@material-ui/icons) | ^4.11.2 | CSSフレームワーク Material-UI のアイコンを使用するパッケージ(旧) -> [@mui/icons-material](https://www.npmjs.com/package/@mui/icons-material) に変更された |
| [@types/react](https://www.npmjs.com/package/@types/react) | ^17.0.19 | reactの型定義ファイルのパッケージ |
| [@types/react-beautiful-dnd](https://www.npmjs.com/package/@types/react-beautiful-dnd) | ^13.1.2 | react-beautiful-dndの型定義ファイルのパッケージ |
| [@types/react-router-dom](https://www.npmjs.com/package/@types/react-router-dom) | ^5.1.8 | react-router-domの型定義ファイルのパッケージ |
| [@types/react-vertical-timeline-component](https://www.npmjs.com/package/@types/react-vertical-timeline-component) | ^3.0.1 | react-vertical-timeline-componentの型定義ファイルのパッケージ |
| [@types/uuid](https://www.npmjs.com/package/@types/uuid) | ^8.3.3 | uuidの型定義ファイルのパッケージ |
| [@typescript-eslint/eslint-plugin](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin) | ^4.31.1 | ESLint で Typescript のチェックを行う |
| [@typescript-eslint/parser](https://www.npmjs.com/package/@typescript-eslint/parser) | ^4.31.1 | ESLint を Typescript で解析できるようにする |
| [axios](https://www.npmjs.com/package/axios) | ^0.24.0 | Promise ベースの HTTP Client  |
| [babel-plugin-styled-components](https://www.npmjs.com/package/babel-plugin-styled-components) | ^2.0.7 | styled-componentsで出力されるクラス属性にファイル名やdisplayNameを表示する |
| [eslint](https://www.npmjs.com/package/eslint) | ^7.32.0 | コードの解析 |
| [eslint-config-prettier](https://www.npmjs.com/package/eslint-config-prettier) | ^8.3.0 | ESLint と Prettier を併用する |
| [eslint-config-standard](https://www.npmjs.com/package/eslint-config-standard) | ^16.0.3 | JavaScript Standard Styleのルールをeslintに適用する |
| [eslint-plugin-import](https://www.npmjs.com/package/eslint-plugin-import) | ^2.24.2 | importの順番をルール化して自動で整列させる |
| [eslint-plugin-jsx-a11y](https://www.npmjs.com/package/eslint-plugin-jsx-a11y) | ^6.6.0 | jsx(tsx) にアクセシビリティのルールを追加する |
| [eslint-plugin-node](https://www.npmjs.com/package/eslint-plugin-node) | ^11.1.0 | Node.js の記述に対するルールを設定する |
| [eslint-plugin-promise](https://www.npmjs.com/package/eslint-plugin-promise) | ^5.1.0 | 非同期処理に対するルールを設定する |
| [eslint-plugin-react](https://www.npmjs.com/package/eslint-plugin-react) | ^7.25.2 | React のルールを設定する |
| [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks) | ^4.3.0 | React Hooksのルールを設定する |
| [eslint-plugin-styled-components-varname](https://www.npmjs.com/package/eslint-plugin-styled-components-varname) | ^1.0.1 | styled-components の変数名の命名ルールを設定する |
| [husky](https://www.npmjs.com/package/husky) | ^7.0.0 | Git コマンドフックに指定したコマンドを呼び出せる |
| [lint-staged](https://www.npmjs.com/package/lint-staged) | ^11.1.2 | commit したファイル(ステージングにあるファイル)に lint を実行する  |
| [polished](https://www.npmjs.com/package/polished) | ^4.1.3 | JavaScript で rgba を使用できるようにする |
| [prettier](https://www.npmjs.com/package/prettier) | ^2.4.1 | コードの整形 |
| [react-app-rewired](https://www.npmjs.com/package/react-app-rewired) | ^2.1.8 | webpack の設定を上書きしてエイリアス設定しているパスの解決を行う |
| [ts-node](https://www.npmjs.com/package/ts-node) | ^10.5.0 | typescript のファイルを単体で実行できるモジュール |

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
