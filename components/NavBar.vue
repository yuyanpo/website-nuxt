<template>
  <header class="bg-white shadow-sm sticky top-0 z-10">
    <nav class="container mx-auto px-4 py-4 flex justify-between items-center">
      <NuxtLink to="/">
        <Logo />
      </NuxtLink>
      
      <!-- 导航链接 -->
      <div class="flex items-center gap-8">
        <NuxtLink to="/" class="text-gray-700 hover:text-teal-600 transition-colors">首页</NuxtLink>
        <NuxtLink to="/about" class="text-gray-700 hover:text-teal-600 transition-colors">关于我们</NuxtLink>
        <NuxtLink to="/services" class="text-gray-700 hover:text-teal-600 transition-colors">服务内容</NuxtLink>
        <NuxtLink to="/cases" class="text-gray-700 hover:text-teal-600 transition-colors">案例展示</NuxtLink>
        <NuxtLink to="/contact" class="text-gray-700 hover:text-teal-600 transition-colors">联系我们</NuxtLink>
        <NuxtLink to="/admin" class="text-gray-700 hover:text-teal-600 transition-colors">管理</NuxtLink>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.router-link-active {
  --at-apply: text-teal-600 font-medium;
}
</style>
