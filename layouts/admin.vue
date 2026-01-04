<script setup>
import { adminMenus, appName } from '~/constants'

const route = useRoute()
const { user, clear: clearSession } = useUserSession()

// 获取当前路由名称
const currentRoute = computed(() => {
  if (route.path === '/admin')
    return '控制台'
  if (route.path === '/admin/content')
    return '内容管理'
  if (route.path.includes('/admin/article')) {
    if (route.path === '/admin/article')
      return '新闻管理'
    if (route.path.includes('/admin/article/edit'))
      return '编辑新闻'
    if (route.path.includes('/admin/article/create'))
      return '创建新闻'
    if (route.path.includes('/admin/article/view'))
      return '新闻详情'
    return '新闻管理'
  }
  return '管理系统'
})

// 退出登录
async function handleLogout() {
  if (import.meta.client) {
    await clearSession()
    await navigateTo('/admin/login')
  }
}
</script>

<template>
  <div class="min-h-screen flex bg-gray-50">
    <!-- 侧边栏 -->
    <div class="fixed h-screen w-64 flex flex-col border-r border-gray-200 bg-white">
      <!-- Logo区域 -->
      <div class="border-b border-gray-200 p-3">
        <div class="flex items-center gap-3">
          <div class="h-10 w-10 flex items-center justify-center rounded-xl from-blue-600 to-indigo-600 bg-gradient-to-r">
            <div class="i-carbon:palm-tree text-xl text-white" />
          </div>
          <h2 class="text-base text-gray-900 font-bold uppercase">
            {{ appName }}
          </h2>
        </div>
      </div>

      <!-- 导航菜单 -->
      <nav class="no-scrollbar flex-1 overflow-y-auto bg-[#f5f5f5] p-2">
        <!-- 导航菜单 -->
        <ul class="space-y-2">
          <li v-for="item, index in adminMenus" :key="index">
            <div v-if="item.separator" class="h-px w-full bg-gray-200" />
            <NuxtLink
              v-else
              :to="item.path"
              class="group flex items-center gap-2 rounded-md bg-transparent p-2 text-sm text-gray-700 transition-colors hover:bg-[#eaeaea] hover:op-80"
              active-class="!bg-[#eaeaea]"
            >
              <div :class="item.icon" />
              <span class="">{{ item.name }}</span>
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <!-- 用户信息 -->
      <div class="select-none border-t border-gray-200 bg-[#f5f5f5] px-4 py-3 text-center text-xs text-gray-300">
        <span>&copy; 2025 {{ appName }}</span>
      </div>
    </div>

    <!-- 主内容区域 -->
    <div class="ml-64 flex flex-1 flex-col">
      <!-- 顶部导航 -->
      <header class="h-[65px] flex items-center border-b border-gray-200 bg-white px-5">
        <div class="w-full flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="i-carbon:location text-gray-400" />
            <h1 class="text-lg text-gray-900 font-semibold">
              {{ currentRoute }}
            </h1>
          </div>
          <div class="flex items-center gap-1">
            <p class="truncate text-sm text-gray-400">
              欢迎，{{ user?.nickname || '管理员' }}
            </p>
            <button
              class="rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
              title="退出登录"
              @click="handleLogout"
            >
              <div class="i-carbon:logout" />
            </button>
          </div>
        </div>
      </header>

      <!-- 页面内容 -->
      <main class="flex-1 p-6">
        <slot />
      </main>
    </div>
  </div>
</template>
