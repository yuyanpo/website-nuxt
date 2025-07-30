<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  title: '用户管理',
  middleware: ['admin-auth'],
})

const name = ref('用户管理')
</script>

<template>
  <div>
    <h1>{{ name }}</h1>
  </div>
</template>
