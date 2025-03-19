<script setup>
definePageMeta({
  layout: false,
  middleware: ['admin-auth'],
})

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
      console.error('Login error:', error)
    })
    .finally(() => {
      isLoading.value = false
    })
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="relative min-w-[400px] rounded-lg bg-white p-8 shadow-lg">
      <div class="mb-4 text-center">
        <h1 class="text-2xl text-teal-500">
          Management System
        </h1>
      </div>

      <div v-if="loginError" class="absolute right--4 top--4 mb-6 rounded bg-rose-100 px-2 py-1 text-rose-500">
        {{ loginError }}
      </div>

      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label for="username" class="mb-1 block select-none text-gray-400">email</label>
          <div class="flex items-center border border-gray-200 rounded px-2 transition focus-within:border-teal-500 focus-within:shadow-[0_0_0_2px_rgba(20,184,166,0.2)]">
            <div class="i-carbon:user h-16px w-16px op-50" />
            <input
              id="username"
              v-model="username"
              class="flex-1 border-none p-2 text-sm outline-none"
              type="text"
              placeholder="请输入用户名"
              required
            >
          </div>
        </div>

        <div class="mb-4">
          <label for="password" class="mb-1 block select-none text-gray-400">password</label>
          <div class="flex items-center border border-gray-200 rounded px-2 transition focus-within:border-teal-500 focus-within:shadow-[0_0_0_2px_rgba(20,184,166,0.2)]">
            <div class="i-carbon:password h-16px w-16px op-50" />
            <input
              id="password"
              v-model="password"
              class="flex-1 border-none p-2 text-sm outline-none"
              :type="showPassword ? 'text' : 'password'"
              placeholder="请输入密码"
              required
            >
            <div
              class="password-toggle"
              @click="showPassword = !showPassword"
            >
              <div v-if="showPassword" class="i-carbon:view-off h-16px w-16px cursor-pointer op-50" />
              <div v-else class="i-carbon:view h-16px w-16px cursor-pointer op-50" />
            </div>
          </div>
        </div>

        <button
          type="submit"
          class="disabled:bg-teal-160 w-full flex cursor-pointer items-center justify-center rounded-md border-none bg-teal-500 p-2 text-white transition disabled:cursor-not-allowed [&:not(:disabled)]:hover:bg-teal-400"
          :disabled="isLoading"
        >
          <div v-if="isLoading" class="i-carbon:circle-dash mr-2 h-20px w-20px animate-spin" />
          {{ isLoading ? 'Logging in...' : 'Login' }}
        </button>
      </form>
    </div>
  </div>
</template>
