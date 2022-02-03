# Vue.js Tips

## clickイベントを二つ持たせる方法

```ts
v-on:click="click_1(); click_2()"
@click="click_1(); click_2()"
```

## $listener

$listener は 孫コンポーネントのイベント発火を親コンポーネントに伝達するためのプロキシである。

※ Vue 3 だと、$attrs も $listener に踏襲された。

(Parent.vue)
```ts
<template>
  <div>
    <Child
      @parentMethod="updateMessage"
    ></Child>
    <!-- 'Hello World!'が表示されます -->
    <p>{{ message }}</p>
  </div>
</template>
 
<script>
  import Child from './Child'
 
  export default {
    data () {
      return {
        message: ''
      }
    },
    components: {
      Child
    },
    methods: {
      updateMessage (message) {
        this.message = message
      }
    }
  }
</script>

```

(Child.vue)
```ts
<template>
  <GrandChild
    @childMethod="$listeners['parentMethod']"
  ></GrandChild>
</template>
 
<script>
  import GrandChild from './GrandChild'
   
  export default {
    components: {
      GrandChild
    }
  }
</script>
```

(GrandChild.vue)

```ts
<template>
  <div></div>
</template>
 
<script>
  export default {
    data () {
      return {
        message: 'Hello World!'
      }
    },
    mounted () {
      this.$emit('childMethod', this.message)
    }
  }
</script>

```

## slot の受け渡し

固定名称・固定数のスロットではなく、親が持つ全部のテンプレートを孫に渡したい場合、  
親 -> 子 -> 孫へとスロット経由でテンプレートを渡すには、下記のようにする！

```ts
<slot v-for="(_, name) of $slots" :name="name" :slot="name"></slot>
<template v-for="(_, name) of $scopedSlots" :slot="name" slot-scope="slotData">
  <slot :name="name" v-bind="slotData"></slot>
</template>
```

## Scoped Slots

Scoped Slot を利用すると子コンポーネント側が持つデータプロパティを親コンポーネントでも使用できるようになる。  

(Parent.vue)

親コンポーネント側ではv-slot:defaultを利用してデータを受け取る。

```ts
<template>
  <Child v-slot:default="slotProps">
    {{ slotProps.user.firstName }}
  </Child>
</template>

<script>
import Child from './components/Child.vue'
export default {
 name: 'app',
 components: {
  Child,
 }
}
</script>

```

(Child.vue)

子コンポーネントではslotタグの中で、v-bindを行い、データプロパティ user をバインドする。

```ts
<template>
  <span>
    <slot v-bind:user="user">{{ user.lastName }}</slot>
  </span>
</template>

<script>
export default {
  data() {
    return{
      user:{
        firstName: 'John',
        lastName: 'Doe',
        age: '25',
        gender: '男性',
      },
    }
  }
}
</script>

```

[表示結果]  

```ts
John
```

親コンポーネントの v-slot:default="slotProps" の slotProps には、子コンポーネントでバインドされたデータプロパティが全て入ってくる。  

```ts
<template>
  <Child v-slot:default="slotProps">
    {{ slotProps }}
  </Child>
</template>
```

下記の例であれば、

```ts
{
  'user':{
    'firstName': 'John',
    'lastName': 'Doe',
    'age': '25',
    'gender': '男性',
  }
}
```

が入ってくる。

### 簡略化された記法

分割代入を利用して以下のように記述することも可能!!!

```ts
<template>
  <user v-slot:default="{ user }">
    <p>{{ user.firstName }} {{ user.lastName }}</p>
    <p>{{ user.age}}/{{ user.sex}}</p>
  </user>
</template>
```

### 複数のデータプロパティを受け取りたい場合

(Parent.vue)

```ts
<template>
  <Child v-slot="slotProps" >
    {{ slotProps }}
  </Child>
</template>
```

(Child.vue)

```ts
<template>
  <span>
    <slot v-bind:user="user" v-bind:message="message">
    {{ user.lastName }}
    </slot>
  </span>
</template>

<script>
export default {
  data() {
    return{
      user:{
        firstName: 'John',
        lastName: 'Doe',
        age: '25',
        gender: '男性',
      },
      message:'Hello Scoped Slot',
    }
  }
}
</script>
```

[表示結果]

```ts
{
  'user':{
      'firstName': 'John',
      'lastName': 'Doe',
      'age': '25',
      'gender': '男性',
    },
    'message':'Hello Scoped Slot'
}
```
