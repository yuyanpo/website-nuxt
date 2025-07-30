<script setup>
definePageMeta({
  layout: false,
  middleware: ['admin-auth'],
})

useHead({ title: '管理系统登录' })

const { fetch: refreshSession } = useUserSession()
const username = ref('admin')
const password = ref('admin1234')
const showPassword = ref(false)
const isLoading = ref(false)
const loginError = ref('')

async function handleLogin() {
  loginError.value = ''
  isLoading.value = true

  $fetch('/api/login', {
    method: 'POST',
    body: {
      username: username.value,
      password: password.value,
    },
  })
    .then(async () => {
    // Refresh the session on client-side and redirect to the home page
      await refreshSession()
      await navigateTo('/admin')
    })
    .catch((error) => {
      loginError.value = error.data?.message || '登录过程中发生错误，请重试'
    })
    .finally(() => {
      isLoading.value = false
    })
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center from-blue-50 to-indigo-100 bg-gradient-to-br p-4">
    <!-- 简洁的登录卡片 -->
    <div class="max-w-md w-full">
      <!-- Logo区域 -->
      <div class="mb-8 text-center">
        <div class="mb-4 h-16 w-16 inline-flex items-center justify-center rounded-2xl from-blue-600 to-indigo-600 bg-gradient-to-r">
          <div class="i-carbon:cube text-2xl text-white" />
        </div>
        <h1 class="mb-2 text-2xl text-gray-900 font-bold">
          管理系统
        </h1>
        <p class="text-gray-600">
          请登录您的账户
        </p>
      </div>

      <!-- 登录表单卡片 -->
      <div class="border border-gray-100 rounded-2xl bg-white p-8 shadow-xl">
        <!-- 错误提示 -->
        <div v-if="loginError" class="mb-6 flex items-center gap-3 border border-red-200 rounded-xl bg-red-50 p-4 text-sm text-red-700">
          <div class="i-carbon:warning text-red-500" />
          <span>{{ loginError }}</span>
        </div>

        <form class="space-y-6" @submit.prevent="handleLogin">
          <!-- 用户名输入 -->
          <div>
            <label for="username" class="mb-2 block text-sm text-gray-700 font-medium">用户名</label>
            <div class="relative">
              <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <div class="i-carbon:user text-gray-400" />
              </div>
              <input
                id="username"
                v-model="username"
                type="text"
                placeholder="请输入用户名"
                required
                autocomplete="username"
                class="w-full border border-gray-200 rounded-xl py-3 pl-10 pr-4 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              >
            </div>
          </div>

          <!-- 密码输入 -->
          <div>
            <label for="password" class="mb-2 block text-sm text-gray-700 font-medium">密码</label>
            <div class="relative">
              <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <div class="i-carbon:password text-gray-400" />
              </div>
              <input
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="请输入密码"
                required
                autocomplete="current-password"
                class="w-full border border-gray-200 rounded-xl py-3 pl-10 pr-12 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              >
              <button
                type="button"
                class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 transition-colors hover:text-gray-600"
                @click="showPassword = !showPassword"
              >
                <div v-if="showPassword" class="i-carbon:view-off" />
                <div v-else class="i-carbon:view" />
              </button>
            </div>
          </div>

          <!-- 记住我和忘记密码 -->
          <div class="flex items-center justify-between">
            <label class="flex items-center gap-2 text-sm text-gray-600">
              <input type="checkbox" class="h-4 w-4 border-gray-300 rounded text-blue-600 focus:ring-blue-500">
              <span>记住我</span>
            </label>
            <a href="#" class="text-sm text-blue-600 font-medium hover:text-blue-700">忘记密码？</a>
          </div>

          <!-- 登录按钮 -->
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full flex items-center justify-center gap-2 rounded-xl from-blue-600 to-indigo-600 bg-gradient-to-r px-4 py-3 text-white font-medium transition-all disabled:cursor-not-allowed hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <div v-if="isLoading" class="i-carbon:circle-dash animate-spin" />
            <div v-else class="i-carbon:login" />
            <span>{{ isLoading ? '登录中...' : '登录' }}</span>
          </button>
        </form>

        <!-- 分割线 -->
        <!-- <div class="relative my-6">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-200" />
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="bg-white px-2 text-gray-500">或</span>
          </div>
        </div> -->

        <!-- 社交登录 -->
        <!-- <div class="space-y-3">
          <button class="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-xl px-4 py-3 text-gray-700 transition-colors hover:bg-gray-50">
            <div class="i-carbon:logo-google text-red-500" />
            <span class="text-sm font-medium">使用 Google 登录</span>
          </button>
          <button class="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-xl px-4 py-3 text-gray-700 transition-colors hover:bg-gray-50">
            <div class="i-carbon:logo-microsoft text-blue-600" />
            <span class="text-sm font-medium">使用 Microsoft 登录</span>
          </button>
        </div> -->
      </div>

      <!-- 底部信息 -->
      <div class="mt-6 text-center text-sm text-gray-500">
        <p>© 2024 管理系统. 保留所有权利.</p>
      </div>
    </div>
  </div>
</template>
