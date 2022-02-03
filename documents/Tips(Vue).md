# Vue.js Tips

## clickイベントを二つ持たせる方法

```ts
v-on:click="click_1(); click_2()"
@click="click_1(); click_2()"
```

## $listener

$listener は 孫コンポーネントのイベント発火を親コンポーネントに伝達するためのプロキシである。

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
