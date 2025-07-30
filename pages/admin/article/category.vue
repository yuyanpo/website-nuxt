<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: ['admin-auth'],
})

const name = ref('文章分类管理')
</script>

<template>
  <div>
    <h1>{{ name }}</h1>
  </div>
</template>
