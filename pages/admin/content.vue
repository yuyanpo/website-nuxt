<template>
  <div class="content-management">
    <h1>内容管理</h1>
    <p>这里是内容管理页面，您可以在此处管理网站的各种内容。</p>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin',
  title: '内容管理',
  middleware: ['admin-auth']
})
</script>

<style scoped>
.content-management {
  background-color: white;
  border-radius: 4px;
  padding: 24px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
}
</style>
