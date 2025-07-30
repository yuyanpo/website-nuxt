<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  title: '操作记录',
  middleware: ['admin-auth'],
})

const name = ref('操作记录')
</script>

<template>
  <div>
    <h1>{{ name }}</h1>
  </div>
</template>
