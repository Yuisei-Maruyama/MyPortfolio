# useMemo

## useMemo とは

useMemoはReact におけるパフォーマンスチューニングの仕組みで、  
関数の結果を保持するためのフックで、何回やっても結果が同じ場合の値などを保存(メモ化)し、  
メモ化したデータから値を再取得することができる。  

### useMemo の基本構文

下記のコードでは、親コンポーネントから渡ってくるpropsである `amount` に変更があった時のみ、useMemoの計算が行われる。

```ts
import React from 'react'

type Props = {
  amount: number
}

const UseMemoParent: React.FC<Props> = ({ amount }) => {
  const ids = useMemo(() => {
    const _ids = []
    // 重い処理
    for (let i = 0; i < amount; i++) {
      const id = 'hoge'
      _ids.push(id)
    }
    return _ids
    // depsにはコンポーネントの外で宣言されている変数や内部で利用されている変数を入れる
  }, [amount])

  return (
    <div>{ ids }</div>
  )
}
export default UseMemoParent
```
