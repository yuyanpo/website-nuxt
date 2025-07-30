<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  title: '数据备份',
  middleware: ['admin-auth'],
})

const name = ref('数据备份')
</script>

<template>
  <div>
    <h1>{{ name }}</h1>
  </div>
</template>
