# Overload について

## Overload とは？

オーバーロードとは一つの関数に対して、複数の関数のシグネチャーを定義すること。  
これにより、異なるパラメータでの関数の呼び方を複数持つことができる。  

### なぜ Overload が必要なのか？

下記のようなをコードがあったとする。  

```ts
type Overload = number | string

const overload = (arg1: Overload, arg2: Overload): Overload => {
  if (typeof arg1 === 'string' || typeof arg1 === 'string') {
    return arg1.toString() + arg2.toString()
  }
  return arg1 + arg2
}
```

上記コードであった場合に下記のような問題が起きる。

```ts
const result = overload('Hello', 'TypeScript')
result.split(' ') // .split() 部分がエラーとなる。
```

上記エラーの原因は、`overload()`の返り値は `Overload` 型であるので、  
TypeScriptは、string または number が返ってくることしか分からず、  
`overload('Hello', 'TypeScript')`の場合において string型が返却される事を保証できないのである。  

上記を解決する為に、型キャストして対応することはできる。  

```ts
const result = overload('Hello', 'TypeScript') as string
result.split(' ') // TypeScriptは、string が返ってくることを理解できる為、エラーにならない。
```

上記は最適ではない！  
なぜなら、 `overload('Hello', 'TypeScript')`　のように文字列を渡した際には、常にstring型が返却されるのはコードを見れば明確である。  
しかし、TypeScriptはそこまで詳しくコードを解析できないので、型キャストで明示する記述が必要になってしまう。

このような場合に有用なのが、 `Overload` である。


オーバーロード関数は、関数シグネチャと実装の2つの部分に分けて記述する。


```ts
// TypeScriptにおける関数シグネチャ部分
// 下記のtypeには、考えうるパターンを定義することができる
type Overload = {
  (arg1: string, arg2: string): string; // 引数が両方とも string型であれば、string型 を返す -> JSにコンパイルされると、消える
  (arg1: number, arg2: number): number; // 引数が両方とも number型であれば、number型 を返す -> JSにコンパイルされると、消える
  (arg1: number, arg2: string): string; // 第1引数が number型, 第1引数が string型 であれば、string型を返す -> JSにコンパイルされると、消える
  (arg1: string, arg2: string): string; // 第1引数が string型, 第1引数が string型 であれば、string型 を返す -> JSにコンパイルされると、消える
}

// TypeScriptにおける関数の実装部分
const overload = (arg1: Overload, arg2: Overload): Overload => {
  if (typeof arg1 === 'string' || typeof arg1 === 'string') {
    return arg1.toString() + arg2.toString()
  }
  return arg1 + arg2
}

const result = overload('Hello', 'TypeScript') // TypeScript が string型を返すことを推論できる。
result.split(' ') // エラーにならない。
```

上記のコードは TypeScript から JavaScript にコンパイルすると、関数シグネチャ部分と型注釈が消され、次のようなコードになる。  

```ts
const overload = (arg1, arg2) => {
  if (typeof arg1 === 'string' || typeof arg1 === 'string') {
    return arg1.toString() + arg2.toString()
  }
  return arg1 + arg2
}

const result = overload('Hello', 'TypeScript')
result.split(' ')
```

このように関数がどのような引数を受け取った時に、どのような型を返却するのかを明確に表現することができる！！  