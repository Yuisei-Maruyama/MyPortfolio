# CompositionAPI

## props: 親からのデータを受け取る方法

- Parent.vue

```ts
<template>
  <div>
    <Child :title="title" :sub="subTitle" />
  </div>
</template>

<script>
import { ref } from '@vue/composition-api'
import Child from './child.vue'

export default {
  components: { Child },
  setup () {
    const title = ref('Title')
    const subTitle = ref('SubTitle')

    return { title, subTitle }
  }
}
</script>
```

- Child.vue
```ts
<template>
  <div>
    <h1>{{ title }}</h1>
    <h2>{{ sub }}</h2>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'タイトル',
      required: true
    },
    sub: {
      type: String
    }
  }
}
</script>
```

## setup 関数で props を使う

Composition API の setup 関数では、ひとつめの引数で props を取得できる！！  

- Child.vue 

```ts
<template>
  <div>
    <h1>{{ changeTitle }}</h1>
    <h2>{{ sub }}</h2>
  </div>
</template>

<script>
import { computed } from '@vue/composition-api'

export default {
  props: {
    title: {
      type: String,
      default: 'タイトル',
      required: true
    },
    sub: {
      type: String
    }
  },
  setup (props) {
    const changeTitle = computed(() => props.title + 'props')

    return { changeTitle }
  }
}
</script>

```

### computed で getter, setter を使うパターン

```ts
<template>
  <v-text-field v-model="editValue" />
</template>

<script>
  import { computed, defineComponent } from 'vue'

  export default defineComponent({
  props: {
    targetValue: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const editValue = computed({
      get: () => props.targetValue,
      set: (newValue: string) => emit('handle-change-value', newValue),
    })
  }
  })
</script>

```

## アンチパターン

**※ 引数を分割代入で取得してしまうと、リアクティブではなくなってしまう**  

```ts
  setup ({ title }) {
    // 親コンポーネントで値が変わっても、子コンポーネントは初期値のまま変わらない
    const changeTitle = computed(() => title + 'props')
```
