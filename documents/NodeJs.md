# node.js

## path｜パス操作

### パス情報の取得

```ts
.
├── documentsA
│   ├── documentsB
│   │   └── text.txt
│   └── test.txt
├── documentsC
│   └── test.txt
└── path.js
```

下記のような形でパスが指すファイルの ディレクトリ 拡張子 などの情報を取得する。  

```ts
import path from 'path'

console.log('---- basename ----');
console.log(path.basename('./documentsA/test.txt'));

console.log('---- dirname ----');
console.log(path.dirname('./documentsA/test.txt'));

console.log('---- extname ----');
console.log(path.extname('./documentsA/test.txt'));

console.log('---- parse ----');
console.log(path.parse('./documentsA/test.txt'));
```

(実行結果)
```ts
---- basename ----
test.txt
---- dirname ----
./documentsA
---- extname ----
.txt
---- parse ----
{ 
    root: '',
    dir: './documentsA',
    base: 'test.txt',
    ext: '.txt',
    name: 'test' 
}
```

---

### パスの結合

```ts
import path from 'path'

console.log(path.relative('./documentsA', './documentsA/documentsB'));
console.log(path.relative('./documentsA/documentsB', './documentsC'));
console.log(path.relative('./documentsA', './documentsC'));
console.log(path.relative('./documentsA', '.'));
```

(実行結果)
```ts
documentsB
../../documentsC
../documentsC
..
```

## fs｜ファイル操作

### ファイル読み込み

ファイル読み込みには、 fsモジュールの`readFileSync`を使用する。  

下記のような状態であった場合に root 直下の `README.md` を読み込みたいとする。

```ts
├── tools
│   ├── duplicateReadme.ts <- このファイルでREADME.md を読み込みたい
│   ├── loadPackage.ts
│   ├── package.json
│   └── tsconfig.json
├── README.md
```

そのような場合、作業ディレクトリからのパスではなく、**fsはパスを作業ディレクトリ**  から辿る！！！  
上記の作業ディレクトリとは、 **nodeを実行したファイルがあるディレクトリ** のことを指す。

例えば、`MyPortfolio`  の階層で node を実行しようとする。

```ts
── MyPortfolio  <- ここで node を実行している
    ├── README.md
    ├── src
    ├── tools
    │   ├── duplicateReadme.ts
    │   ├── loadPackage.ts
    │   ├── package.json
    │   └── tsconfig.json
```

`readFileSync` のパスは下記のようになる。

(duplicateReadme.ts)
```ts
readFileSync('README.md', 'utf8')  // 正しく読み込める
readFileSync('。。・README.md', 'utf8')  // no such file or directory, open になる
```

---

### ファイルの存在確認

```ts
documents/
├── README.md
・・・
```

ファイルの存在確認には、fsモジュールの `statSync` を使用する。  

```ts
const stat = statSync('documents/README.md')
// 指定ファイルがディレクトリとして存在するか判定する
console.log(stat.isDirectory()) // true or false
// 指定ファイルがファイルとして存在するか判定する
console.log(stat.isFile()) // true or false
```

### ファイルの書き込み(新規作成 or 上書き)

ファイルの書き込み(新規作成 or 上書き)には、 `writeFileSync` を使用する。  

ファイルが存在しなければ **新規作成** して、存在する場合は **上書き** する。

```ts
const readme = readFileSync('README.md', 'utf8')
writeFileSync('documents/README.md', readme, 'utf8')
```

---

### ファイルの追記

ファイルの追記には、fsモジュールの `appendFileSync` を使用する。  

```ts
fs.appendFileSync('documents/README.md', '追記文', 'utf8')
```

---

### ファイル削除

ファイル削除には、 fsモジュールの `unlinkSync` を使用する。

```ts
fs.unlinkSync('documents/README.md')
```
