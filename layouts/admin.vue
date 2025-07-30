<script setup>
const route = useRoute()
const { user, clear: clearSession } = useUserSession()

// 获取当前路由名称
const currentRoute = computed(() => {
  if (route.path === '/admin')
    return '控制台'
  if (route.path === '/admin/content')
    return '内容管理'
  if (route.path.includes('/admin/news')) {
    if (route.path === '/admin/news')
      return '新闻管理'
    if (route.path.includes('/admin/news/edit'))
      return '编辑新闻'
    if (route.path.includes('/admin/news/create'))
      return '创建新闻'
    if (route.path.includes('/admin/news/view'))
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
    <div class="w-64 flex flex-col border-r border-gray-200 bg-white">
      <!-- Logo区域 -->
      <div class="border-b border-gray-200 p-6">
        <div class="flex items-center gap-3">
          <div class="h-10 w-10 flex items-center justify-center rounded-xl from-blue-600 to-indigo-600 bg-gradient-to-r">
            <div class="i-carbon:cube text-xl text-white" />
          </div>
          <h2 class="text-xl text-gray-900 font-bold">
            管理系统
          </h2>
        </div>
      </div>

      <!-- 导航菜单 -->
      <nav class="flex-1 p-4">
        <ul class="space-y-2">
          <li>
            <NuxtLink
              to="/admin"
              class="group flex items-center gap-3 rounded-xl px-4 py-3 text-gray-700 transition-colors hover:bg-gray-100"
              active-class="bg-blue-50 text-blue-700 border-r-2 border-blue-600"
            >
              <div class="i-carbon:dashboard text-lg group-hover:text-blue-600" />
              <span class="font-medium">控制台</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/admin/news"
              class="group flex items-center gap-3 rounded-xl px-4 py-3 text-gray-700 transition-colors hover:bg-gray-100"
              active-class="bg-blue-50 text-blue-700 border-r-2 border-blue-600"
            >
              <div class="i-carbon:document-multiple-02 text-lg group-hover:text-blue-600" />
              <span class="font-medium">新闻管理</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/admin/content"
              class="group flex items-center gap-3 rounded-xl px-4 py-3 text-gray-700 transition-colors hover:bg-gray-100"
              active-class="bg-blue-50 text-blue-700 border-r-2 border-blue-600"
            >
              <div class="i-carbon:document text-lg group-hover:text-blue-600" />
              <span class="font-medium">内容管理</span>
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <!-- 用户信息 -->
      <div class="border-t border-gray-200 p-4">
        <div class="flex items-center gap-3 rounded-xl bg-gray-50 p-3">
          <div class="h-10 w-10 flex items-center justify-center rounded-full from-gray-400 to-gray-500 bg-gradient-to-r">
            <div class="i-carbon:user-avatar text-white" />
          </div>
          <div class="min-w-0 flex-1">
            <p class="truncate text-sm text-gray-900 font-medium">
              {{ user?.name || '管理员' }}
            </p>
            <p class="text-xs text-gray-500">
              系统管理员
            </p>
          </div>
          <button
            class="rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
            title="退出登录"
            @click="handleLogout"
          >
            <div class="i-carbon:logout" />
          </button>
        </div>
      </div>
    </div>

    <!-- 主内容区域 -->
    <div class="flex flex-1 flex-col">
      <!-- 顶部导航 -->
      <header class="border-b border-gray-200 bg-white px-6 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="i-carbon:location text-gray-400" />
            <h1 class="text-lg text-gray-900 font-semibold">
              {{ currentRoute }}
            </h1>
          </div>
          <div class="flex items-center gap-3">
            <button class="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600" title="设置">
              <div class="i-carbon:settings" />
            </button>
            <button class="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600" title="通知">
              <div class="i-carbon:notification" />
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
