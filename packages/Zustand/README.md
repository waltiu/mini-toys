[![NPM version](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a80e9a259ff04e94942ef0d8063eff21~tplv-k3u1fbpfcp-zoom-1.image)](https://www.npmjs.com/package/toy-zustand)

```bash
npm install toy-zustand # or yarn add toy-zustand or pnpm add toy-zustand
```

vue3版demo：<https://codesandbox.io/p/sandbox/vue3-zustand-demo-m63cx9>

react版demo：<https://codesandbox.io/p/sandbox/react-zustand-demo-n83w33>

## toy-zustand支持哪些内容？

使用的用法和zustand是一模一样的，这里介绍下常用的使用方法，了解更多的话可以去zustand的官网。
<https://zustand-demo.pmnd.rs/>

```jsx

// vue
import { create } from 'zustand/vue'

// react
import { create } from 'zustand/react'

// 中间件immer
import { immer } from "toy-zustand/middleware/immer";

// shallow方法
import shallow from 'toy-zustand/shallow'

```

## 创建一个store

我们以vue3为例，创建一个全局store数据。只需要调用create方法，并设置初始化数据即可以，store存储的数据可以是基本数据类型（string number boolean null undefined）, 也可以是object 和 function。我们可以function通过set函数来合并我们的store。

```jsx
import create from "toy-zustand/vue";

const useGlobalStore = create((set, get) => ({
  bears: 10086,
  count: 100,
  increase: (by) => set((state) => ({ bears: (state.bears || 0) + by })),
  reset: () =>
    set({
      count: 0,
      bears: 0,
    }),
  radomCount: () => set(() => ({ count: Math.random() })),
}));

export default useGlobalStore;

```

## store数据的使用

我们可以使用数据在任何地方使用。比如react的当当初一个hooks使用，vue3中通过setUp直接将store暴露给组件。

```jsx
<!-- Component.vue -->
<script setup>
import useGlobalStore from "../Store/useGlobalStore";

const globalStore = useGlobalStore();
const { bears, count, increase, radomCount } = globalStore;
</script>

<template>
  <h3>Parent</h3>
  <div>
    bears ( {{ bears }} ):
    <button @click="() => increase(1)">增加</button>
  </div>
  <div>
    count ( {{ count }} ): <button @click="() => radomCount()">随机</button>
  </div>
</template>

```

```js
<!-- Component.react -->
import useGlobalStore from "../Store/useGlobalStore";

const Child = () => {
  const { reset, destroy } = useGlobalStore((state) => ({
    reset: state.reset,
    destroy: state.destroy,
  }));
  return (
    <div>
      <h3>Child</h3>
      <button onClick={() => reset()}>清空</button>
      <button onClick={() => destroy()}>销毁</button>
    </div>
  );
};

export default Child;


```

直接在js中使用

```js
import useGlobalStore from "../Store/useGlobalStore";

export const getGlobalStore=()=>{
  return useGlobalStore.getState()
}
```

### set的第二个参数，replace

初始话set可以传递第二个参数为boolean类型，为true的会就会替换整个store而不是默认的合并了！

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/58c23358212d4798afa3021415846564~tplv-k3u1fbpfcp-watermark.image?)

### 中间件

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/46fbff35cb1f4ba3a73d7dd8a498a550~tplv-k3u1fbpfcp-watermark.image?)

zustand提供很多的中间件，如persist，devtools等<br/>
大家想要了解的话，可以去这里看!<https://github.com/pmndrs/zustand/tree/main/src/middleware>

***

如果有好玩的库欢迎私聊我，一起学习讨论！
