# Provide / Inject

## 概要

Vue.jsの基本であるデータバインディングは、親から子に v-bind と props を使ってバケツリレーを行う。  

しかし、深くネストされたいくつかのコンポーネントがあった場合、  
バケツリレーの多重構造になってしまい、メンテナンス性が保てなくなってしまう可能性がある。

そこで、provide と inject のペアを利用することでコンポーネント階層の深さに関係なく、  
親コンポーネントはそのすべての子階層へ依存関係を提供するプロバイダとして機能することができる。  

> React Hooks の useContext と同じような振る舞いをする！！

![provide/inject](https://v3.ja.vuejs.org/images/components_provide.png)
