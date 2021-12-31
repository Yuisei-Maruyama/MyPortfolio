# My Portfolio

## Portfolio URL

https://silly-goodall-7bfc72.netlify.app

## 目的

自己紹介と開発におけるタスク管理を兼ねる意図で作成。

## 要件定義

### 機能一覧

| 機能 | 備考 |
| --- | --- |
| GitHub Issue の新規作成機能  |   |
| GitHub Issue に付与されたラベルごとの管理機能 |  |
| スイッチでメインカラーを切り替えられる機能 |  |
|  |  |
|  |  |
|  |  |
|  |  |
|  |  |

### 使用技術・バージョン
| 技術 | 説明 |
| --- | --- |
| [react-app-rewired](https://www.npmjs.com/package/react-app-rewired) | webpack の設定を上書きしてエイリアス設定しているパスの解決を行う |
| [styled-components](https://styled-components.com/docs/basics) | JavaScriptでstyleを記述するCSS in JSのライブラリ |
| [vertical-timeline-component-react](https://stephane-monnot.github.io/react-vertical-timeline/#/) | タイムライムの表示 |
| eslint | コードの解析 |
| eslint-config-prettier | ESLint と Prettierを併用する |
| prettier | コードの整形 |
| @typescript-eslint/parser | ESLintをTypescriptで解析できるようにする |
| @typescript-eslint/eslint-plugin | ESLintでTypescriptのチェックを行う |
| husky | Gitコマンドフックに別のコマンドを呼び出せる |
| lint-staged | commitしたファイル(Stagingにあるファイル)にlintを実行する |
| [react-icons](https://react-icons.github.io/react-icons) | `Ant Design` や `Material Design`などを集めたアイコンの宝庫 |
| [dts-gen](https://github.com/microsoft/dts-gen) | ライブラリで型定義ファイルがない場合に `XXX.d.ts` を生成する |
| | |
| | |
| | |

### 動作環境

| デバイスの識別 | OS | 対応ブラウザ |
| --- | --- |--- |
| PC | macOS Mojave | Google chrome最新 |

## 基本設計

### サイトマップ

#### 画面名

| 画面名 | URI |
| --- | --- |
| ヘッダー | - |
| メイン画面 | / |
| タスク管理ボード画面 | /board |


