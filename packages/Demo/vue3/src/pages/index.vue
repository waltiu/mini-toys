<!-- Component.vue -->
<script setup>
import useGlobalStore from "../Store/useGlobalStore";

const globalStore = useGlobalStore();
const { bears, count, increase, reSet, radomCount } = globalStore;
</script>

<template>
  <h3>Parent</h3>
  <div>
    bears ( {{ bears }} ):
    <button @click="() => increase(1)">增加</button>
    <button @click="() => reSet(10086)">重置为10086</button>
  </div>

  <div>
    count ( {{ count }} ): <button @click="() => radomCount()">随机</button>
  </div>
</template>
