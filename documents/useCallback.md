# useCallback

## useCallbackの文法

第一引数にコールバック関数、第二引数に deps(再描画の条件) を記述する。

```ts
useCallback(() => {}, [test])
```

## useCallback の基本構文  

下記のコードのように、**親コンポーネントで作成した関数を props として子コンポーネントに渡す場合**、  
depsに記述された変数がに変更がなければ第一引数のコールバック関数が保持される。  


```ts
import React from 'react'

type Props = {
  amount: number
}

const useCallbackParent: React.FC<Props> = ({ amount }) => {
  const [counter, setCounter] = useState<number>(0)

  const countUp = useCallback(() => {
    setCounter(prevState => prevState + amount)
  }, [setCounter, amount])

  return (
    <div>
      Counter: { counter }
      <UseCallbackChild onClick={countUp} />
    </div>
  )
}

export default useCallbackParent
```
