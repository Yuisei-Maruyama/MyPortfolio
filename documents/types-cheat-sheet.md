## 型情報備忘録

## 型定義チートシート

```ts
export class typeSampleModel {

    // プリミティブな型
    str: string;                                                                // 文字列
    num: number;                                                                // 数値
    bool: boolean;                                                              // 真偽値

    // なんでもOKの any型
    data: any;

    // 型指定を使う時に行う
    data: unknown;

    // オブジェクト型リテラル
    array: any[];                                                               // 配列
    strArray: string[];                                                         // 配列内に文字列
    numArray: number[];                                                         // 配列内に数値
    multiArray: string[][];                                                     // 多次元配列
    objectArray: {key: string}[];                                               // 配列内にオブジェクト

    object: {key: string};                                                      // オブジェクト
    arrayObject: {key: string[]};                                               // オブジェクト内に配列
    strKeyObject: { [s: string]: unknown } | Record<string, unknown>;           // 任意の文字列キーを許容したオブジェクト
    numKeyObject: { [n: number]: unknown[] } | Record<number, unknown[]>;       // 任意の数値キーを許容したオブジェクト

    constructor () {
        this.str = "A";
        this.num = 1138;
        this.boolean = true;
        this.object = { key: "A"};
        this.array = [ "A" ];
        this.strArray = [ "A", "B" ];
        this.numArray = [ 1, 2 ];
        this.multiArray = [ [ "A", "B" ], [ "C", "D" ] ];
        this.objectArray = [ { key: "A" }, { key: "B" } ];
        this.arrayObject = { key: ["A", "B", "C"] };
        this.strKeyObject = { "a": "A", "b": "B", "c": "C" };
        this.numKeyObject = { 1: ["a", "A"], 2: ["b", "B"] }
    }

    // 関数を示すFunction
    // 関数の戻り値がない場合に使うvoid
    var method: Function = (): void => {
        var a:number = 1;
    }
}
```

- 変数がプロパティを持っていることを明示的にしたい

```ts
this as unknown as { xxx: XXX }
```
