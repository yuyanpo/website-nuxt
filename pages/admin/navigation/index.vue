<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  title: '自定义导航栏',
  middleware: ['admin-auth'],
})

const name = ref('自定义导航栏')
</script>

<template>
  <div>
    <h1>{{ name }}</h1>
  </div>
</template>
