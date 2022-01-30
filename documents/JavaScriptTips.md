# JavaScript Tips

- 配列の重複を取り除く

```ts
const a = [1,2,3,3,2,2,5]

// 重複を削除したリスト
const b = a.filter(function (x, i, self) {
    return self.indexOf(x) === i;
})
console.log(b); // [ 1, 2, 3, 5 ]
```

- 配列の重複を取り出す

```ts
const a = [1,2,3,3,2,2,5]

// 重複のみをリスト
const c = a.filter(function (x, i, self) {
    return self.indexOf(x) !== self.lastIndexOf(x);
})
console.log(c); // [ 2, 3, 3, 2, 2 ]
```
