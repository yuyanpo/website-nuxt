<template>
  <div class="min-h-screen flex flex-col">
    <!-- 导航栏组件 -->
    <NavBar />

    <!-- 主要内容 -->
    <main class="flex-grow">
      <slot />
    </main>

    <!-- 页脚组件 -->
    <FooterSection />
  </div>
</template>

<script setup>
// 不需要任何额外的逻辑，因为所有功能都由组件实现
</script>

<style scoped>
.router-link-active {
  --at-apply: text-teal-600 font-medium;
}
</style>
