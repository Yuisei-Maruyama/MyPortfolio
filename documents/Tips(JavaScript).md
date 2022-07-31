# Tips(JavaScript)

### 2つの配列から1つのオブジェクトを生成する

[reduce()](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) を使用する。

```ts
const array1 = ['name', 'job', 'year', 'hobby', 'location'];
const array2 = ['Yuisei Maruyama', 'Front-End Engineer', 3, 'programing', 'Tokyo'];

const obj = array2.reduce((accumulator, currentValue, index) => {
  accumulator[array1[index]] = currentValue;
  return accumulator;
}, {});

console.log(obj);
```

(出力結果)
```ts
{
  name: "Yuisei Maruyama",
  job: "Front-End Engineer",
  year: 3,
  hobby: "programing",
  location: "Tokyo",
}
```