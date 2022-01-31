# CompositionAPI

## emit: 子から親にイベントを発生させる

Composition API の setup 関数の第2引数に **context** というオブジェクトがある。  
context には、 attrs, slot, emit が格納されている。  

**context.emit(eventName) を実行することで、カスタムイベントを発生させることができる!!**
### イベントの引数が「1つ」のパターン


- Parent.vue

> @イベント名="関数名($event)" とすると、イベントハンドラには emit の第 2 引数のみ（下記の場合は 'test'）を受け取ることが可能！！

```ts
<template>
  <div>
    <Child @childEvent="handleEvent($event)" />
  </div>
</template>

<script lang="ts">
import Child from './child.vue'

export default {
  components: { Child },
  setup () {
    const handleEvent = (v) => {
      console.log(v)
    }

    return { handleEvent }
  }
}
</script>
```

- Child.vue


```ts
<template>
  <div>
    <button @click="handleClick">Click me!</button>
  </div>
</template>

<script>
export default {
  // setup (_, { emit }) でもOK
  setup (_, context) {
    const handleClick = () => {
      // イベント名: childEvent
      // パラメータ: 'test'
      context.emit('childEvent', 'test')
    }

    return { handleClick }
  }
}
</script>
```

### イベントの引数が 「複数」 のパターン

引数 args にオブジェクトとして入ってくる！！

- Parent.vue

```ts
export default {
  components: { Child },
  setup () {
    const handleEvent = (...args) => {
      alert(args) // -> 'test', 123, false
    }

    return { handleEvent }
  }
}
```

- Child.vue

```ts
<template>
  <div>
    <button @click="handleClick">Click me!</button>
  </div>
</template>

<script>
export default {
  // setup (_, { emit }) でもOK
  setup (_, context) {
    const handleClick = () => {
      // イベント名: childEvent
      // パラメータ: 'test'
      context.emit('childEvent', 'test', 123, false)
    }

    return { handleClick }
  }
}
</script>
```
