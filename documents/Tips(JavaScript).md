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

---

## オブジェクトのコピーについて

JavaScript のオブジェクトのコピーは**参照渡し**である。  

```ts
const user = { name: "Maruyama" };
const userCopy = user; // userCopyに代入
userCopy.name = "Yuisei"; // userCopyのnameプロパティを書き換える
console.log(user) // ← ここに注目！！！！
```

上記の結果は、`userCopy`に変更を加えているのに、  

```ts
{ name: 'Yuisei' }
```
のように`user`の値も変化してしまう。  
同じメモリ上の場所を参照しているため、コピー元のオブジェクトのプロパティの値も一緒に変わってしまう。  
オブジェクトをコピーしたい場面は沢山あるのに、これでは思い掛けないバグを生む可能性がある。  

上記の問題の対応方法を後述する。  
### Object.assign を使用する場合

```ts
const user = { name: "Maruyama" };
const userCopy = Object.assign({}, user);
userCopy.name = "Yuisei"; // userCopyのnameプロパティを書き換える
console.log(user);
```

上記の結果は、

```ts
{ name: 'Maruyama' }
```

コピー元のuserのプロパティに影響が出ていない事がわかる!!  

### スプレッド構文を使用する場合
```ts
const user = { name: "Maruyama" };
const userCopy = { ...user };
userCopy.name = "Yuisei"; // userCopyのnameプロパティを書き換える
console.log(user);
```

上記の結果も

```ts
{ name: 'Maruyama' }
```

となる。  

`Object.assign`やスプレッド構文は、**シャローコピー(浅いコピー)** という。  

しかし、これらは完璧にコピーできないケースが存在する。  

```ts
let user = {
  name: "Maruyama",
  area: {
    pref: "東京",
    city: "八王子",
  },
  updateDay: new Date("2022-08-31T12:00:00+09:00"),
  favoriteColor: ["red", "blue", "green"],
};

// スプレッド構文でシャローコピー!!
const userCopy = { ...user };

// userCopyのareaプロパティを書き換える
userCopy.name = "Yuisei";
userCopy.area.pref = "大分"; // ネストしたオブジェクト
userCopy.area.city = "大分"; // ネストしたオブジェクト
userCopy.updateDay.setMonth(user.updateDay.getMonth() + 3); // Dateオブジェクト
userCopy.favoriteColor.push("yellow"); // 配列

console.log(user)
```

上記の`user`の結果は、  

```ts
{
  name: 'Maruyama',
  area: { pref: '大分', city: '大分' },  // 変わってしまう!!
  updateDay: 2022-12-01T03:00:00.000Z,  // 変わってしまう!!
  favoriteColor: [ 'red', 'blue', 'green', 'yellow' ]  // 変わってしまう!!
}
```

のように

- ネストしたオブジェクト
- Date オブジェクト
- Array(配列)

の部分はコピー元の変数に影響が出てしまう。  

上記の問題に対する対処法は、`JSON.parse(JSON.stringify())`を使用する事である。  

### JSON.parse(JSON.stringify())を使用する方法

- JSON.stringify()  
  オブジェクトを JSON 文字列に変換する

- JSON.parse()  
  JSON 文字列をオブジェクトに変換する

`JSON.parse(JSON.stringify())`で一度文字列に変換したオブジェクトを再度、元のオブジェクトに変換することで、  
コピー元のオブジェクトに影響を与えないようにする。  

```ts
let user = {
  name: "Maruyama",
  area: {
    pref: "東京",
    city: "八王子",
  },
  updateDay: new Date("2022-08-31T12:00:00+09:00"),
  favoriteColor: ["red", "blue", "green"],
};

const userCopy = JSON.parse(JSON.stringify(user));

// userCopyのareaプロパティを書き換える
userCopy.name = "Yuisei";
userCopy.area.pref = "大分"; // ネストしたオブジェクト
userCopy.area.city = "大分"; // ネストしたオブジェクト
userCopy.updateDay.setMonth(user.updateDay.getMonth() + 3); // Dateオブジェクト
userCopy.favoriteColor.push("yellow"); // 配列

console.log(user)
```

しかしながら、上記コードは`Dateオブジェクト`のコピーでエラーが発生する。  

```ts
userCopy.updateDay.setMonth(user.updateDay.getMonth() + 3); // Dateオブジェクト
                   ^
TypeError: userCopy.updateDay.setMonth is not a function
    at Object.
```

Date オブジェクトは`JSON.stringify`で変換した時に文字列扱いになってしまうため、`setMonth` 関数で日付を変えようとすると「Date オブジェクトではない」というエラーが発生する。  

そこで、元の値を変更せずにオブジェクトをディープコピーしたいときは、`structuredClone()`を活用する！！！  
**※ node v17.9.0 以上が必要！！**  

### structuredClone() を使用する場合

```ts
let user = {
  name: "Maruyama",
  area: {
    pref: "東京",
    city: "八王子",
  },
  updateDay: new Date("2022-08-31T12:00:00+09:00"),
  favoriteColor: ["red", "blue", "green"],
};

const userCopy = structuredClone(user);

// userCopyのareaプロパティを書き換える
userCopy.name = "Yuisei";
userCopy.area.pref = "大分"; // ネストしたオブジェクト
userCopy.area.city = "大分"; // ネストしたオブジェクト
userCopy.updateDay.setMonth(user.updateDay.getMonth() + 3); // Dateオブジェクト
userCopy.favoriteColor.push("yellow"); // 配列

console.log(user)
```

上記の結果は、

```ts
{
  name: 'Maruyama',
  area: { pref: '東京', city: '八王子' },
  updateDay: 2022-08-31T03:00:00.000Z,
  favoriteColor: [ 'red', 'blue', 'green' ]
}
```

となり、ディープコピーできている事がわかる！！！

このような場合は [lodash](https://www.npmjs.com/package/lodash) を使うことでも解決できる。  

  


