<script setup lang='ts'>
/**
 * ! 注意：name 属性一点要定义
 * 这个是你最后引入插件的时候，使用的全局组件的名称
 */
  defineOptions({
    name: 'cusTable'
  })
  import { ref } from 'vue'
  import type { Ref } from 'vue'
  const msg:Ref<string> = ref('hello vue3 component')
</script>
<template>
  <div>{{ msg }}</div>
</template>
<style lang="less" scoped>
</style>
