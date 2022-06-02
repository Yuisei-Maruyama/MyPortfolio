# styled-components

## styled-components とは？

`styled-components` とは CSS in JSのライブラリの一つであり、本ライブラリを使用することでコンポーネント単位での管理がスタイルにおいても可能になる。
よって、従来はJSとCSSで分けられていたものが全てReactのコンポーネント内で完結することができ、ファイルの横断をしなくて済むようになる。

また、`styled-components` は Github で`36.7k`のStarを誇るスタイリングライブラリーである。(2022/06/02 現在)

## styled-componentsを使うメリット

1. パフォーマンスの向上
2. ミスに明瞭化
3. 保守性の高さ

### 1. パフォーマンスの向上

上記で述べた通り、`styled-components` は CSS in JS のライブラリであるため、スタイルを全てReactのコンポーネント内で完結することができる。
それによって、レンダリングされたコンポーネントだけのスタイルを取りこむことで使用していないスタイルをインポートする必要がなくなるため、パフォーマンスの向上に繋がるといえる。

### 2. ミスに明瞭化

もし、css-moduleを使用していた場合、個々に当てたいUI要素に対してクラス名を作成し、設定する必要があった。

```html
<section class="wrapper">
  <h1 class="title">
    My Portfolio
  </h1>
</section>
```

```css
/*wrapperが正しい*/
.wrap {
    padding: 4em;
    background: papayawhip;
}

.title {
    font-size: 1.5em;
    text-align: center;
    color: palevioletred;
}
```

`styled-components` ではクラス名を作る必要が無くなる代わりにコンポーネントを作る必要があるが、コンポーネント名が間違っているとエラーとして指摘してくれるため事前にミスに気がつく事ができる。

```ts
import styled from "styled-components"

export default function Home() {
  const Title = styled.h1`
    font-size: 1.5em;
    text-align: center;
    color: palevioletred;
  `;

  // Wrapperに変更する旨のエラーを指摘してくれる
  const Wrap= styled.section`
    padding: 4em;
    background: papayawhip;
  `;

  return (
    <Wrapper>
      <Title>
        Hello World!
      </Title>
    </Wrapper>
  );
}
```

### 3. 保守性の高さ

css-moduleを使用していた場合であると、適応されているスタイルを見つけるのに色んなファイルをたどる必要があるが、
`styled-components` はスタイリングがコンポーネントに関連付けられるため、変更が容易になる。

## styled-comnponents で引数を使う

propsに引数が渡されるのでテンプレートリテラルでその属性を使うだけ!!!

```tsx
import styled from "styled-components"

export default function Home() {
  //タイトル
  const Title = styled.h1`
    font-size: 1.5em;
    text-align: center;

    //引数に色が渡されれば設定
    color: ${props => props.color ? props.color : "#000"};
  `;

  //ラッパー
  const Wrapper= styled.section`
    padding: 4em;
    background: papayawhip;
  `;

  return (
    <Wrapper>
      <Title color="red">Hello!</Title>     {/*赤*/}
      <Title color="#4169e1">World</Title>  {/*青*/}
      <Title>styled-components</Title>      {/*ピンク*/}
    </Wrapper>
  );
}
```

## スタイルの拡張

styledメソッドの引数にコンポーネントを渡してテンプレートリテラルに上書きするスタイルを追記するだけ!!!

```tsx
import styled from "styled-components"

export default function Home() {
  //ベースとなるタイトル
  const Title = styled.h1`
    font-size: 1.5em;
    text-align: center;
    color: palevioletred;
  `;

  //ラッパー
  const Wrapper= styled.section`
    padding: 4em;
    background: papayawhip;
  `;

  //青色タイトル
  const BlueTitle = styled(Title)`
    color: blue;
    font-weight: bold;                 //太字
  `;

  //赤色タイトル
  const RedTitle = styled(Title)`
    color: red;
    text-decoration: underline;         //下線
  `;

  return (
    <Wrapper>
      <Title>Hello!</Title>                       {/*ピンク*/}
      <BlueTitle>World</BlueTitle>                {/*青*/}
      <RedTitle>styled-components</RedTitle>      {/*赤*/}
    </Wrapper>
  );
}
```

## `styled-components` を使用する時の命名について

簡単なprefix をつけて見やすくしようという方針である。
styled.div のような通常のスタイルと、 styled(FooComponent) のような既存コンポーネントにCSSをオーバーライドするタイプのものを区別して  命名する(別々の prefix ( `_` と `$` を接頭字に付与する)ことで変数名を見るだけで、どのような意味合いを持つ変数か見分けやすくなる。

上記のメリットとしては下記3点が挙げられる。

1. jsx上で、通常のスタイルと、拡張スタイルの見分けやすい
2. 命名にかけるコストが減る
3. 命名が短くなる

- 良いとされる命名

```ts
const _TitleDiv = styled.div`
  height: 32px;
`

const $FooComponent = styled(FooComponent)`
  display: flex;
`
```

- 駄目な命名

```ts
const StyledTitleDiv = styled.div`
  height: 32px;
`

const StyledFooComponent = styled(FooComponent)`
  display: flex;
`
```

以下の例だと $Desc が Desc コンポーネントを拡張スタイルしたものだとひと目でわかる！！

```tsx
const App = () => {
  return (
    <_RootDiv>
      <_Title>foo title</_Title>
      <$Desc>
        <div>bar content</div>
      </$Desc>
    </_RootDiv>
  )
}
```

## UIフレームワークのコンポーネントっぽくする

良く見るスタイルを親コンポーネントから子コンポーネントに渡して、適用する方法！！

(親コンポーネント)
```tsx
import React from 'react'
import { ProgressBar } from './ProgressBar'

const Parent: React.FC<Props> = () => {
<ProgressBar style={{ marginTop: '30px', borderRadius: '15px' }} />
}

export default Parent

```

(子コンポーネント)
```tsx
import React from 'react'
import styled from '@emotion/styled'

type Props = {
  style: Record<string, string | number>
}

const ProgressBar: React.FC<Props> = ({ style }) => {
  const _Progress = styled.div`
    width: 75%;
    height: 50px;
    margin: 0 auto;
    border: 1px solid #06d8d7;
    background-color: '#fff';
  `

  const $PropsProgress = styled(_Progress)`
    ${style}
  `

  return (
    <div>
      <$PropsProgress />
    </div>
  )
}

export default ProgressBar
```

## 便利プラグイン

- [vscode-styled-components](https://marketplace.visualstudio.com/items?itemName=styled-components.vscode-styled-components) : VS Code で styled-components を扱うときの snippets
- [eslint-plugin-styled-components-varname](https://github.com/macinjoke/eslint-plugin-styled-components-varname) : styled-componentsのコード検証ツール

