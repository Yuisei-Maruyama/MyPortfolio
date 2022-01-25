# Reactにおけるパフォーマンスチューニングについて

React におけるパフォーマンスチューニングは大きく分けて3種類ある。  

- コンポーネントのメモ化 (React.memo)
- 変数のメモ化 (useMemo)
- 関数のメモ化 (useCallback)

※ 取り敢えずメモ化はNGで、実際に計測しながらメモ化をすべきなのか検討する!!

## Reactのレンダリングの仕組みについて

Reactでは下記の場合、レンダリングが発生する。

- 対象のコンポーネントの state が変更されたとき
- 対象のコンポーネントの親コンポーネントの state が変更されたとき

## Reactにおけるパフォーマンス計測方法

- **performance.now()** を使用して、コンポーネントを表示するのにかかった時間を計測する

```ts
import React from 'react';

const Measure: React.FC = () => {
  const startTime = performance.now()

  for (let i=0; i < 10000; i++) {
    // 16桁の文字列を乱数生成
    const S="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    const N=16
    Array.from(Array(N)).map(()=>S[Math.floor(Math.random()*S.length)]).join('')
  }

  const endTime = performance.now()

  return (
    <div>Measure Time: {`${endTime - startTime} milliseconds`}</div>
  );
};

export default Measure
```

## React.memo

`React.memo` とは Reactにおけるパフォーマンスチューニングの方法の一つである。  

親コンポーネントのstateが変化しても、**親から子コンポーネントに渡される `props` に変化がなければ**、再レンダリングしない。  

### React.memoの基本構文

> React.memo() でラップする

```ts
import React from 'react'

type Props {
  test: number
}

const MemoChild: React.FC<Props> = React.memo((props: Props) => {

const { test } = props

  // 何らかの重い処理
  return (
    <div>Memo Component: { test }</div>
  )
})

export default MemoChild
```

### deep equal の比較が必要な場合

`props` で渡される値がオブジェクトや配列であった場合、`props` で渡されたオブジェクトや配列の中身を比較して変更を検知する必要がある。  

```ts
import React from 'react'

tyep Obj = {
  deepValue: string
}

type Props {
  test: number
  obj: Obj
}

const DeepEqualMemoChild: React.FC<Props> = React.memo(props => {
  const { test, obj } = props
  // 何らかの重い処理

  return (
    <div>Deep Equal Memo Component: { test }</div>
  )

}, (prevProps: Props, nextProps: Props) => {
  const prevDeepValue = prevProps.obj.deepValue
  const nextDeepValue = nextProps.obj.deepValue
  // trueだと、レンダリングしない
  // falseだと、レンダリングする
  return (prevDeepValue === nextDeepValue)
})

export default DeepEqualMemoChild
```

メモ化する際は下記を考慮して考える。

- コンポーネントの再レンダリングに時間がかかる

- Propsが変わらない

- 何度も再レンダリングされる

- パフォーマンスに大きく影響を与えている
