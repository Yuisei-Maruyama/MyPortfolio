# React.js の基礎

## Children について

React における `children` は、親Componentのタグの間に入れられた要素を表示するというものである。  
Vue でいうところの `<slot>` と同じような感じで使う。

```ts
import * as React from 'react'
 
interface ChildProps {
  children: React.ReactElement;
}

const Child: React.FC<ChildProps> = (props: ChildProps) => {
  const { children } = props
  return (
    <div>{ children }</div>
  )
}

const Parent: React.FC = () => (
  <Child>
    aaaaaaaaa
  </Child>
)

export default Parent
```

結果として、下記のように解釈される。  

```ts
const Parent: React.FC = () => (
  <div>
    aaaaaaaaa
  </div>
)
```
