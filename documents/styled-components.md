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