<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  title: '系统设置',
  middleware: ['admin-auth'],
})

const name = ref('系统设置')
</script>

<template>
  <div>
    <h1>{{ name }}</h1>
  </div>
</template>
