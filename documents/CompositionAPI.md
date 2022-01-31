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


## 双方向バインディング

当然のことながら子コンポーネントの中で props の中身を直接変更しようとすると下記のように怒られる。  

```ts
Avoid mutating a prop directly since the value will be overwritten
whenever the parent component re-renders.
```

### v-bind と v-input を使用するパターン

- Parent.vue

```ts
<template>
  <div>
    <!-- 上と下 どちらの書き方でもよい -->
    <Child :count="num" @my-event="num = $event" />
    <Child :count="num" @my-event="newVal => num = newVal" />

    <!-- setup 内で作った関数を渡して、その中で更新するのもあり -->
    <Child :count="num" @my-event="handleEvent" />
  </div>
</template>

<script>
import { ref } from '@vue/composition-api'
import Child from './child.vue'

export default {
  components: { Child },
  setup () {
    const num = ref(0)

    // イベントハンドラ内で num の値を更新
    const handleEvent = (newVal) => {
      num.value = newVal
    }

    return { num, handleEvent }
  }
}
</script>
```

- Child.vue

```ts
export default {
  props: {
    count: Number
  },
  setup (props, { emit }) {
    // ボタンのイベントハンドラ
    const handleClick = () => {
      emit('my-event', props.count + 1)
    }

    return { handleClick }
  }
}

```

### v-model を使用するパターン

- Parent.vue

```ts
<Child v-model="num" />
```

- Child.vue

```ts
export default {
  props: {
    value: Number
  },
  setup (props, { emit }) {
    // ボタンのイベントハンドラ
    const handleClick = () => {
      emit('input', props.value + 1)
    }

    return { handleClick }
  }
}

```

### アンチパターン

props で値を渡す時、渡した値が
**プリミティブでない値（配列やオブジェクトなど）** の場合は、子コンポーネントから直接中身を変更できてしまう。

- Parent.vue

```ts
<template>
  <div>
    <Child :obj="obj" :arr="test2" :date="test3" />
  </div>
</template>

<script>
import { ref } from '@vue/composition-api'
import Child from './child.vue'

export default {
  components: { Child },
  setup () {
    const obj = ref({
      num: 0
    })
    const arr = ref([ { test: 'test' } ])
    const date = ref(new Date())

    return { obj, arr, date }
  }
}
</script>
```

- Child.vue

```ts
export default {
  props: {
    obj: Object,
    arr: Array,
    date: Date
  },
  setup (props) {
    // ボタンのイベントハンドラ
    const handleClick = () => {
      props.obj.num += 1 // 親コンポーネントの obj.num に反映される
      props.arr.push({ test2: 'test2' })  // 親コンポーネントの arr の要素が増加する
      props.arr[0].test === 'change'  // 配列内の値を変更することもできる
      props.date.setDate(Math.random()) // 日付が変わる
    }

    return { handleClick }
  }
}
```

上記はどこで値を変更しているのか分からなくなり、  
propsを子コンポーネントで変更してはならないという Vueの構造に対する破壊的変更になりえるので、親でハンドリングするように心がける！！  


