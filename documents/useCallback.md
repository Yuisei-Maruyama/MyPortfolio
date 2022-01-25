# useCallback

## useCallback の基本構文  

下記のコードのように、親で作成した関数を子コンポーネントに渡す時に関数を useCallback で不変値化しておくことでパフォーマンスを上げることができる。  
depsの中の値が変化することで関数の再生成が行われる。  
内部で使用されている値を確認した上で、depsに登録しないと予期せぬ挙動になるので注意が必要！！

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
