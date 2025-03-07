<template>
  <footer class="bg-gray-800 text-white py-12">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-4 gap-8">
        <!-- 公司信息 -->
        <div>
          <div class="mb-4">
            <Logo dark />
          </div>
          <p class="text-gray-400 mb-4">
            专注于提供创新科技解决方案，赋能企业数字化转型。
          </p>
        </div>
        
        <!-- 快速链接 -->
        <div>
          <h3 class="font-bold text-lg mb-4">快速链接</h3>
          <ul class="space-y-2">
            <li><NuxtLink to="/" class="text-gray-400 hover:text-teal-400">首页</NuxtLink></li>
            <li><NuxtLink to="/about" class="text-gray-400 hover:text-teal-400">关于我们</NuxtLink></li>
            <li><NuxtLink to="/services" class="text-gray-400 hover:text-teal-400">服务内容</NuxtLink></li>
            <li><NuxtLink to="/cases" class="text-gray-400 hover:text-teal-400">案例展示</NuxtLink></li>
            <li><NuxtLink to="/contact" class="text-gray-400 hover:text-teal-400">联系我们</NuxtLink></li>
          </ul>
        </div>
        
        <!-- 联系方式 -->
        <div>
          <h3 class="font-bold text-lg mb-4">联系我们</h3>
          <ul class="space-y-2">
            <li class="flex items-center gap-2">
              <div class="i-carbon-location text-teal-400"></div>
              <span class="text-gray-400">上海市浦东新区张江高科技园区</span>
            </li>
            <li class="flex items-center gap-2">
              <div class="i-carbon-email text-teal-400"></div>
              <span class="text-gray-400">contact@example.com</span>
            </li>
            <li class="flex items-center gap-2">
              <div class="i-carbon-phone text-teal-400"></div>
              <span class="text-gray-400">021-12345678</span>
            </li>
          </ul>
        </div>
        
        <!-- 社交媒体 -->
        <div>
          <h3 class="font-bold text-lg mb-4">关注我们</h3>
          <div class="flex gap-4">
            <a href="#" class="text-teal-400 hover:text-teal-300 text-2xl">
              <div class="i-carbon-logo-wechat"></div>
            </a>
            <a href="#" class="text-teal-400 hover:text-teal-300 text-2xl">
              <div class="i-carbon-logo-weibo"></div>
            </a>
            <a href="#" class="text-teal-400 hover:text-teal-300 text-2xl">
              <div class="i-carbon-logo-linkedin"></div>
            </a>
          </div>
        </div>
      </div>
      
      <!-- 版权信息 -->
      <div class="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
        <p>© {{ new Date().getFullYear() }} 公司名称. 保留所有权利.</p>
      </div>
    </div>
  </footer>
</template>
<script setup>
// 可以添加组件特有的逻辑
const currentYear = new Date().getFullYear()
</script>
