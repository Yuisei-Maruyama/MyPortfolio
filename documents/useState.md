# useState 

## useStateとは？

Functionalコンポーネント(関数コンポーネント)内で状態管理を行うことができるもの。  
React Hooksが登場するまでは、Reduxを使用しない限り、 Classコンポーネントでのみ状態管理が可能であった。  
状態管理とは、コンポーネントの中で値を保持したり、更新したりすることができる機能のことである。  

## useStateの設定

1. useStateをimportする。  

```ts
import React, { useState } from 'react'
```

2. コンポーネント内で状態管理を行いたい変数をuseStateを使って宣言する。
> 下記の記述例の場合は count が状態管理を行う為の変数で setCountメソッドを使ってcountの値を変更することができる
> useState()の引数に初期値を設定する

```ts
const [count, setCount] = useState(0)
```

3. 値を更新する。

> 関数内で上記で定義した第二変数(setCount)を実行することで値の更新が可能  

```ts
<button onClick={() => setCount(count + 1)}>+</button>
```

## useStateを利用した値の更新は非同期で行われる  

例えば、下記のような state を更新する関数があったとする。  

```ts
const increment = () => {
  setCount(count + 1);
  console.log(count);
}
```

上記の関数内で、count は +1 されるが、**即座に更新されるわけではない**ので、  
`console.log`では`0`が最初に表示された後、`1`が表示される結果となる。  

原理としては、 count が setCount で再描写が行われた後に count が更新される。  

## 上記の問題を解決するには？

### prevStateを利用する！！

prevStateとは、以前の状態 にアクセス・参照して 値を変更する変数である。  
特に変数名の指定はなく、prevCountとか自分で命名してOK  

```ts
const increment = () => {
  setCount(prevCount + 1);
  console.log(prevCount);
}
```

とすれば、想像通りの挙動になる。
