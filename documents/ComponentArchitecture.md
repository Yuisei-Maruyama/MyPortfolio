# Component Architecture

## UI コンポーネントの作成手順

- Functional Componentで実装する

- 各コンポーネントの関心ごとによってファイルを分割する

- Props を定義する

- DOM要素をマークアップする

### Functional Componentで実装する

Hooks の登場によりClass Component でなければならないケースがなくなったため、`Functional Component` で実装を行う。

### 各コンポーネントの関心ごとによってファイルを分割する

ロジックと見た目の管理を分離するためのルールを制定する。  

それぞれの関心ごとにファイルを分けてしまうことで保守性を高める狙いがある。  

例えば、

- `Uers (親)`           : ページで表示した時のスタイルを定義する
- `UserSelectBox (子)`  : ユーザ一覧を取得するロジックが記述されたコンポーネント
- `SelectBox (孫)`      : 最低限のプロパティが定義された汎用セレクトボックスコンポーネント

となる。


### Props を定義する

> Props の設計について

下記４点を意識しながら、コンポーネントを作成するようにしている。  

- 必要最低限の要素だけ含める

- 特定箇所でしか扱わないものは含めない

- HTML がデフォルトで持っている Props を担保する

- Props の要素が多くなる場合は、オブジェクトにして付与する

例として、下記のようなボタンを考えてみる！  

<div class="grid-block-center">
  <button class="grid-content">ボタン</button>  
</div>

ボタンから想定できるPropsの要素を挙げてみる。  

パッと想定するとこんな感じ！
```ts
type Props = {
  text: string; // ボタンのテキスト
  color: string; // ボタンのテキスト色
  width: number | string; // ボタンのサイズ
  bgColor: string; // ボタンの背景色
}
```

さらに拡張性を持たせようと考える！  
考えられる事としては、

- ボタンのテキストの前後にアイコンを配置できるようにする → Vue だと `slot`、React だと `children` を使用する
- ボタンを丸くする
- ボタンを白抜きにする

```ts
type Props = {
  text: string; // ボタンのテキスト
  color: string; // ボタンのテキスト色
  width: number | string; // ボタンのサイズ
  bgColor: string; // ボタンの背景色
  rounded?: boolean; // ボタンを丸くする       ← 追加
  outlined?: boolean; // ボタンを白抜きにする　  ← 追加
}
```

## DOM要素をマークアップする

> Vue

```ts
<script setup lang="ts">
type Props = {
  text: string;
  color: string;
  width: number | string;
  bgColor?: string;
  rounded?: boolean;
  outlined?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  text: 'ボタン',
  width: '150px',
  color: '#fff',
  bgColor: '#06d8d7'
});
</script>

<template>
  <button>
    <-- テキストの前に入れるアイコン用 --->
    <div v-if="$slots.prefix" class="prefix">
      <slot name="prefix" />
    </div>
    {{ text }}
    <-- テキストの後ろに入れるアイコン用 --->
    <div v-if="$slots.suffix" class="suffix">
      <slot name="suffix" />
    </div>
  </button>
</template>

<style lang="scss" scoped></style>
```

> React 

```ts
import { FC, ReactNode } from 'react'
type Props = {
  text: string;
  color: string;
  width: number | string;
  bgColor?: string;
  rounded?: boolean;
  outlined?: boolean;
  children?: ReactNode[]
}

const Button: FC<Props> = ({ 
    text, 
    color, 
    width, 
    bgColor = '#06d8d7',
    rounded, 
    outlined, 
    children, 
  }) => {
  return (
    <>
      <button color={color} width={width}>
        // テキストの前に入れるアイコン用
        { children && children[0] }
        { text }
        // テキストの後ろに入れるアイコン用
        { children && children[1] }
      </button>
    </>
  )
}

export default Button;
```







