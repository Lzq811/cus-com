<script setup lang="ts">
import {onMounted} from 'vue'
// @ts-ignore
import data from 'york-npm-demo'
onMounted(() => {
  console.log('22222222', data)
})
</script>

<template>
  <div>
    <h1>hello world</h1>
    <el-button type="primary">Primary</el-button>
    <cusTable />
  </div>
</template>

<style scoped>

</style>
