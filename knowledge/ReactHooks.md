## useEffectの使い方

API やデータベースから非同期でデータを取得する時に用いられる。

`useEffect`は第二引数に配列を渡す事が可能で、第二引数には副作用(レンダリングによって引き起こされる処理)の対象を指定することが可能である。

```ts
// 毎回実行される

useEffect(() => {
  console.log('target is', target)
})

// 初回レンダリング後のみ実行される

useEffect(() => {
  console.log('target is', target)
}, [])

// targetが変更される度に実行される

useEffect(() => {
  console.log('target is', target)
}, [target])

// targetまたはtarget2が変更される度に実行される

useEffect(() => {
  console.log('target is', target)
}, [target, target2])

```

### クリーンアップ関数を使用する

再レンダリングされる前に呼び出される関数で、外部データベースを購読する際に使用される。

```ts

const [open, setOpen] = useState(false)

useEffect(() => {
  console.log('', open)
  if (open) {
    console.log('データベース購読開始')
  }
  return () => { // クリーンアップ関数
    console.log('データベース購読解除')
  }
})
```
