<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  title: '广告轮播管理',
  middleware: ['admin-auth'],
})

const name = ref('广告轮播管理')
</script>

<template>
  <div>
    <h1>{{ name }}</h1>
  </div>
</template>
