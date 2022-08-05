# Component Architecture

## UI コンポーネントの作成手順

- <p class="fw-bold cyber-color">Functional Componentで実装する</p>

- <p class="fw-bold cyber-color">各コンポーネントの関心ごとによってファイルを分割する</p>

- <p class="fw-bold cyber-color">Props を定義する</p>

- <p class="fw-bold cyber-color">DOM要素をマークアップする</p>

### Functional Componentで実装する

Hooks の登場によりClass Component でなければならないケースがなくなったため、`Functional Component` で実装を行う。

### 各コンポーネントの関心ごとによってファイルを分割する

まずコンポーネントとしての在り方と考える上で [単一責任の原則 (single responsibility principle)](https://ja.reactjs.org/docs/thinking-in-react.html#step-1-break-the-ui-into-a-component-hierarchy) という考え方がある。  

この単一責任の原則とは、  
<p class="fw-bold cyber-color">「ひとつのコンポーネントは理想的にはひとつのことだけをするべきだ」</p>
という考え方である。  

上記の原則に従って、ロジックと見た目の管理を分離するためのルールを制定する。  

例えば、

- `Uers (親)`           : ページで表示した時のスタイルを定義する
- `UserSelectBox (子)`  : ユーザ一覧を取得するロジックが記述されたコンポーネント
- `SelectBox (孫)`      : 最低限のプロパティが定義された汎用セレクトボックスコンポーネント

となる。  

上記のように、それぞれの関心ごとにファイルを分けてしまうことで保守性を高める狙いがある。  

### Props を定義する

> Props の設計について

下記3点を意識しながら、コンポーネントを作成するようにしている。  

- <p class="fw-bold cyber-color">必要最低限の要素だけ含める</p>

  必要最低限の要素だけ含めるようにすることで、保守・運用のしやすいコンポーネントを実現する。  
  Props を最小の構成にして責務を明確にしておくことで、汎用的にコンポーネントを扱いやすくなり、  
  変更時にも影響を最小限に抑えることができる。

- <p class="fw-bold cyber-color">特定箇所でしか扱わないものは含めない</p>

  特定のページやコンポーネントでしか扱わない Props を極力含めないようにすることで、Props の肥大化や保守性の低下を防ぐ。  
  特定ページでしか使わない Props がある場合は、別コンポーネントとして切り出す方向で細分化を検討する。

- <p class="fw-bold cyber-color">Props の要素が多くなる場合は、オブジェクトにして付与する</p>

  Props の定義には、厳密なルールが存在していないため、Props に定義できる数は無制限であるが、  
  数が多いと親コンポーネントから Props を渡す際にコードが冗長化してしまい、コード量と可読性を低下させる要因になってしまう。  
  この課題を解決するためにオブジェクト化させておくことで改善できる。  

  ```ts
  const info = { name: 'Maruyama', job: 'Front-End' }
  <MyComponent {...info} />
  // ↑は下記と同義
  <MyComponent name={info.name} job={info.job} />
  ```

例として、下記のようなボタンを考えてみる！  

<div class="grid-block-center">
  <button class="grid-content cyber-btn">Button</button>  
</div>

ボタンから想定できるPropsの要素を挙げてみる。  

パッと想定するとこんな感じ！
```ts
type Props = {
  text: string; // ボタンのテキスト
  color: string; // ボタンのテキスト色
  width: number | string; // ボタンのサイズ
  bgColor: string; // ボタンの背景色
  borderColor: string; // ボタンのボーダー色
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
  borderColor?: string; // ボタンのボーダー色
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
  bgColor: '#0e3333',
  borderColor: '#06d8d7'
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
    bgColor = '#0e3333',
    borderColor = '#06d8d7',
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







