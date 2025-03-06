<template>
  <nav class="fixed w-full bg-white/80 backdrop-blur-sm shadow-sm z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex-shrink-0 flex items-center">
          <!-- Logo -->
          <NuxtLink to="/" class="text-2xl font-bold text-blue-600">优秀企业</NuxtLink>
        </div>
        <div class="hidden md:flex items-center space-x-8">
          <NuxtLink to="/" class="text-gray-700 hover:text-blue-600 transition-colors">首页</NuxtLink>
          <NuxtLink to="/services" class="text-gray-700 hover:text-blue-600 transition-colors">服务</NuxtLink>
          <NuxtLink to="/about" class="text-gray-700 hover:text-blue-600 transition-colors">关于我们</NuxtLink>
          <NuxtLink to="/team" class="text-gray-700 hover:text-blue-600 transition-colors">团队</NuxtLink>
          <NuxtLink to="/contact" class="text-gray-700 hover:text-blue-600 transition-colors">联系我们</NuxtLink>
        </div>
        <!-- 移动菜单按钮 -->
        <div class="md:hidden flex items-center">
          <button @click="isOpen = !isOpen" class="text-gray-700">
            <span v-if="!isOpen" class="i-carbon-menu text-2xl"></span>
            <span v-else class="i-carbon-close text-2xl"></span>
          </button>
        </div>
      </div>
    </div>
    
    <!-- 移动菜单 -->
    <div v-show="isOpen" class="md:hidden bg-white shadow-lg">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <NuxtLink to="/" class="block px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md">首页</NuxtLink>
        <NuxtLink to="/services" class="block px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md">服务</NuxtLink>
        <NuxtLink to="/about" class="block px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md">关于我们</NuxtLink>
        <NuxtLink to="/team" class="block px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md">团队</NuxtLink>
        <NuxtLink to="/contact" class="block px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md">联系我们</NuxtLink>
      </div>
    </div>
  </nav>
</template>

<script setup>
const isOpen = ref(false);
</script>
