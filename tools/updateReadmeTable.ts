import packageJson from '../package.json'
import { readFileSync, writeFile } from 'fs'

const { dependencies, devDependencies } = packageJson
const readme = readFileSync('README.md', 'utf-8')

const name: string[] = []
const version: string[] = []

const getDesc = (packageName: string) => {
  switch (packageName) {
    case 'react':
      return 'ユーザインタフェース構築のための JavaScript'
    case 'typescript':
      return 'JavaScript に対して、静的型付けとクラスベースオブジェクト指向を加えた言語'
    case 'react-router-dom':
      return 'ルーティングを定義できる'
    case 'react-app-rewired':
      return 'webpack の設定を上書きしてエイリアス設定しているパスの解決を行う'
    case 'react-beautiful-dnd':
      return 'ドロップ&ドラッグを実現できる'
    case 'react-csv':
      return 'React上で簡単にcsvエクスポート機能を実装できるライブラリ'
    case 'react-dom':
      return 'Javascript のオブジェクトでリアルDOMを仮想的に作り、変更箇所だけ差分検知し更新することを React で行えるようにする'
    case 'react-vertical-timeline-component':
      return 'タイムラインの表示'
    case '@use-it/interval':
      return 'setInterval を提供するカスタム React フック'
    case '@uiw/react-md-editor':
      return 'React で Markdown を表示できるようにする'
    case 'axios':
      return 'Promise ベースの HTTP Client '
    case 'uuid':
      return 'uuid を付与する'
    case 'web-vitals':
      return 'サイトの健全性を示す重要指標を計測できる'
    case '@material-ui/core':
      return 'CSSフレームワーク Material-UI を使用するパッケージ(旧) -> [@mui/material](https://www.npmjs.com/package/@mui/material) に変更された'
    case '@material-ui/icons':
      return 'CSSフレームワーク Material-UI のアイコンを使用するパッケージ(旧) -> [@mui/icons-material](https://www.npmjs.com/package/@mui/icons-material) に変更された'
    case 'ts-node':
      return 'typescript のファイルを単体で実行できるモジュール'
    case 'shelljs':
      return '移植可能な（Windows / Linux / OS X）の Unix シェルコマンドを Node.js API の上に実装できるモジュール'
    case 'styled-components':
      return 'React思想のコンポーネント単位での管理がスタイルにも可能になる'
    case 'sass':
      return 'Sass をコンパイルするためのモジュール'
    case 'sass-loader':
      return 'Sass を CSS へ変換するためのモジュール'
    case 'tslib':
      return 'コンパイル後の js ファイルが大きくなるのを防ぐ '
    case 'eslint':
      return 'コードの解析'
    case 'eslint-config-prettier':
      return 'ESLint と Prettier を併用する'
    case 'prettier':
      return 'コードの整形'
    case '@typescript-eslint/parser':
      return 'ESLint を Typescript で解析できるようにする'
    case '@typescript-eslint/eslint-plugin':
      return 'ESLint で Typescript のチェックを行う'
    case 'husky':
      return 'Git コマンドフックに指定したコマンドを呼び出せる'
    case 'lint-staged':
      return 'commit したファイル(ステージングにあるファイル)に lint を実行する '
    case 'react-icons':
      return '`Ant Design` や `Material Design`などを集めたアイコンの宝庫'
    case 'react-particle-effect-button':
      return 'particleアニメーションが付いたボタンを表現できる'
    case 'react-hot-keys':
      return 'キーイベントを取得して、そのイベントに対する処理を行える'
    case 'react-hook-form':
      return 'フォームの入力データを検証まで含めて、簡単に扱えるライブラリ'
    case 'react-scripts':
      return 'アプリケーションの初期表示時に JS の読み込み処理を行う'
    case 'polished':
      return 'JavaScript で rgba を使用できるようにする'
    case 'babel-plugin-styled-components':
      return 'styled-componentsで出力されるクラス属性にファイル名やdisplayNameを表示する'
    case 'eslint-config-standard':
      return 'JavaScript Standard Styleのルールをeslintに適用する'
    case 'eslint-plugin-import':
      return 'importの順番をルール化して自動で整列させる'
    case 'eslint-plugin-node':
      return 'Node.js の記述に対するルールを設定する'
    case 'eslint-plugin-promise':
      return '非同期処理に対するルールを設定する'
    case 'eslint-plugin-react':
      return 'React のルールを設定する'
    case 'eslint-plugin-react-hooks':
      return 'React Hooksのルールを設定する'
    case 'eslint-plugin-styled-components-varname':
      return 'styled-components の変数名の命名ルールを設定する'
    case 'eslint-plugin-jsx-a11y':
      return 'jsx(tsx) にアクセシビリティのルールを追加する'
    case 'highlight.js':
      return 'Webページ上に表示したプログラミングコードなどに色を付けるライブラリ'
    case 'marked':
      return 'markdownをhtmlに変換するライブラリ'
    case 'mermaid':
      return 'テキストとコードを使用して図と視覚化をマークダウンで実現できるライブラリ'
    default:
      break
  }
  if (packageName.startsWith('@emotion')) {
    return `CSS in JS を使用するためのパッケージ`
  }
  if (packageName.startsWith('@mui')) {
    return `CSSフレームワーク Material-UI を使用するためのパッケージ`
  }
  if (packageName.startsWith('@testing-library')) {
    return `React で Unit テストを行うためのパッケージ`
  }
  if (packageName.startsWith('@types')) {
    return `${packageName.split('@types/')[1]}の型定義ファイルのパッケージ`
  }
  return ''
}

Object.entries(dependencies).forEach(([key, value]) => {
  name.push(key)
  version.push(value)
})

Object.entries(devDependencies).forEach(([key, value]) => {
  name.push(key)
  version.push(value)
})

let tableBody = '| 技術 | version | 備考 |\n| ---- | ------- | ---- |\n'

for (let i = 0; i < name.length; i++) {
  tableBody = tableBody.concat(
    `| [${name[i]}](https://www.npmjs.com/package/${name[i]}) | ${version[i]} | ${getDesc(name[i])} |\n`
  )
}

tableBody = tableBody.concat('\n<!--rehype:style=color: black;-->\n')

writeFile(
  'README.md',
  readme.replace(readme.match(/### 使用技術・バージョン\n\n([\s\S]*)\n### 動作環境/)?.[1] || '', tableBody),
  (err) => {
    if (err) throw err
    console.log('正常に書き込みが完了しました')
  }
)
