# propsの扱い方について

## Propsへ関数を渡す際の注意点

- OK

```ts
<tag onClick={aaa} />
or
<tag onClick={() => aaa()}>
```

- NG

```ts
<tag onClick={aaa()} />
```

### 理由

NGの場合であると、propsを渡す時に関数を実行する事になる。  
そしてpropsを渡す時はコンポーネントをレンダリングする時なので、レンダリングする度に関数が実行されて無限レンダリングを引き起こす。  
なので、コールバック関数または関数自体を渡すようにしなければいけない！

## propsで要素を受け取って表示したいとき

- propsの型にReact.ReactNodeを使う!

`React.ReactNode`は  
```ts
ReactElement | number | string | boolean | undefined | null
```
と定義されていて、  
`React.ReactElement`はタグで囲んだDOM要素を表す。

```ts
interface Props {
  Element1: React.ReactNode;
  Element2: React.ReactNode;
}

const Example1:React.FC<Props> = ({Element1, Element2}) => (
  <div>
    <div>{Element1}</div>
    <div>{Element2}</div>
  </div>
)

const Main:React.FC = () => (
  <Example1 Element1={<p>left</p>} Element2={'right'} />
)
```

## タグ名をpropsで受け取って動的に変更したいとき

- propsの型にReact.ElementTypeを使う!

`React.ElementType`は
```ts
'span'や'div'などHTMLタグの文字列 | React.ComponentClass | React.FC
```
と定義されている。

```ts
interface Props {
  tag?: React.ElementType;
}

const Example: React.FC<Props> = ({tag: Tag = 'div', children}) => (
  <Tag>{children}</Tag>
)

const Dummy: React.FC = () => (
  <p>dummy</p>
)

const Main: React.FC = () => (
  <>
    <Example>div</Example> {/* <div>div</div> */}
    <Example tag={'p'}>p</Example> {/* <p>p</p> */}
    <Example tag={Dummy}></Example> {/* <Dummy></Dummy> => <p>dummy</p> */}
  </>
)
```
