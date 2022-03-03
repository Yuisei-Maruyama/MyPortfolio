# node.js

## fsモジュールの`readFileSync`を使用したファイル読み込みについて

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
const readme = readFileSync('README.md', 'utf8')  // 正しく読み込める
const readme = readFileSync('。。・README.md', 'utf8')  // no such file or directory, open になる
```
