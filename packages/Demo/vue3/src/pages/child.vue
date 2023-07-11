<!-- Component.vue -->
<script setup>
import useGlobalStore from "../Store/useGlobalStore";

const {reset,destroy}= useGlobalStore(state=>({
    reset:state.reset,
    destroy:state.destroy
}));
</script>

<template>
       <h3>Child </h3>
        <button @click="() => reset()">清空</button>
        <button @click="() => destroy()">销毁</button>
</template>
