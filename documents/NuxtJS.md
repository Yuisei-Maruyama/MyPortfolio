# Nuxt.js

## Auto Import

Nuxt.js 2.13からコンポーネントをインポートしなくても勝手に /components から探してきてくれる仕様になった！

https://nuxtjs.org/docs/configuration-glossary/configuration-components/  

この設定は、nuxt.config.js の components を true にするだけ！！  

```ts
components: true,
```

## Alias

下記を記述することで、 ./app/components 部分を ~ でエイリアスを定義できる。

```ts
alias: { components: resolve(__dirname, './app/components') },
```

## Style

$style を使用することで、スタイルを当てることができる。

```ts
<template>
  <target :class="$style.aaa" />
</template>

<style lang="scss" module>
.aaa {
  display: flex;
  color: 'black';
}
</style>
```
