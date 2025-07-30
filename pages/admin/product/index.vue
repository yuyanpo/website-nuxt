<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  title: '商品管理',
  middleware: ['admin-auth'],
})

const name = ref('商品管理')
</script>

<template>
  <div>
    <h1>{{ name }}</h1>
  </div>
</template>
