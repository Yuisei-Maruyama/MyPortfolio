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
    case 'react-vertical-timeline-component':
      return 'タイムラインの表示'
    case '@use-it/interval':
      return 'setInterval を提供するカスタム React フック'
    case '@uiw/react-md-editor':
      return 'React で Markdown を表示できるようにする'
    case 'axios':
      return 'Promise ベースの HTTP Client '
    case 'uuid':
      return 'uuid を付与する '
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
    case 'react-scripts':
      return 'アプリケーションの初期表示時に JS の読み込み処理を行う'
    case 'polished':
      return 'JavaScript で rgba を使用できるようにする'
    case '':
      return ''
    default:
      break
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

writeFile(
  'README.md',
  readme.replace(
    readme.match(/### 使用技術・バージョン\n\n([\s\S]*)\n### 動作環境/)?.[1] || '',
    tableBody
  ),
  (err) => {
    if (err) throw err
    console.log('正常に書き込みが完了しました')
  }
)
