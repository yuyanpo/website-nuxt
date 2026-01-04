<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  title: '系统设置',
  middleware: ['admin-auth'],
})

interface Settings {
  siteName: string
  siteKeywords: string
  siteDescription: string
  icpNumber: string
}

// 表单数据
const form = reactive<Settings>({
  siteName: '',
  siteKeywords: '',
  siteDescription: '',
  icpNumber: '',
})

// 状态
const saving = ref(false)
const saveSuccess = ref(false)
const saveError = ref('')

// 获取设置数据
const { data: settings, status, refresh } = await useFetch<Settings>('/api/admin/settings', {
  lazy: true,
})

// 监听数据变化，更新表单
watch(settings, (newSettings) => {
  if (newSettings) {
    form.siteName = newSettings.siteName || ''
    form.siteKeywords = newSettings.siteKeywords || ''
    form.siteDescription = newSettings.siteDescription || ''
    form.icpNumber = newSettings.icpNumber || ''
  }
}, { immediate: true })

// 保存设置
async function handleSave() {
  saving.value = true
  saveSuccess.value = false
  saveError.value = ''

  try {
    await $fetch('/api/admin/settings', {
      method: 'PUT',
      body: form,
    })
    saveSuccess.value = true
    await refresh()

    // 3秒后隐藏成功提示
    setTimeout(() => {
      saveSuccess.value = false
    }, 3000)
  }
  catch (error: any) {
    saveError.value = error.data?.statusMessage || '保存失败，请重试'
    setTimeout(() => {
      saveError.value = ''
    }, 5000)
  }
  finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- 页面标题 -->
    <div class="border border-gray-100 rounded-2xl bg-white p-6 shadow-sm">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="mb-2 text-2xl text-gray-900 font-bold">
            系统设置
          </h1>
          <p class="text-gray-600">
            配置网站的基本信息，包括网站名称、关键词、描述和备案信息
          </p>
        </div>
        <div class="h-12 w-12 flex items-center justify-center rounded-xl from-teal-500 to-teal-600 bg-gradient-to-r">
          <div class="i-carbon:settings text-2xl text-white" />
        </div>
      </div>
    </div>

    <!-- 加载状态 -->
    <div v-if="status === 'pending'" class="border border-gray-100 rounded-2xl bg-white p-12 shadow-sm">
      <div class="flex flex-col items-center justify-center">
        <div class="i-carbon:circle-dash mb-4 h-8 w-8 animate-spin text-teal-600" />
        <p class="text-gray-500">
          加载设置中...
        </p>
      </div>
    </div>

    <!-- 设置表单 -->
    <div v-else class="border border-gray-100 rounded-2xl bg-white p-6 shadow-sm">
      <h2 class="mb-6 text-lg text-gray-900 font-semibold">
        网站信息
      </h2>

      <form class="space-y-6" @submit.prevent="handleSave">
        <!-- 网站名称 -->
        <div>
          <label for="siteName" class="mb-2 block text-sm text-gray-700 font-medium">
            网站名称
          </label>
          <div class="relative">
            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <div class="i-carbon:application-web text-gray-400" />
            </div>
            <input
              id="siteName"
              v-model="form.siteName"
              type="text"
              class="w-full border border-gray-200 rounded-xl py-3 pl-10 pr-4 transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              placeholder="请输入网站名称"
            >
          </div>
          <p class="mt-1.5 text-xs text-gray-500">
            网站的标题，将显示在浏览器标签页和搜索结果中
          </p>
        </div>

        <!-- 网站关键词 -->
        <div>
          <label for="siteKeywords" class="mb-2 block text-sm text-gray-700 font-medium">
            网站关键词
          </label>
          <div class="relative">
            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <div class="i-carbon:tag text-gray-400" />
            </div>
            <input
              id="siteKeywords"
              v-model="form.siteKeywords"
              type="text"
              class="w-full border border-gray-200 rounded-xl py-3 pl-10 pr-4 transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              placeholder="请输入网站关键词，多个关键词用逗号分隔"
            >
          </div>
          <p class="mt-1.5 text-xs text-gray-500">
            用于 SEO 优化的关键词，多个关键词之间使用英文逗号分隔
          </p>
        </div>

        <!-- 网站描述 -->
        <div>
          <label for="siteDescription" class="mb-2 block text-sm text-gray-700 font-medium">
            网站描述
          </label>
          <div class="relative">
            <div class="pointer-events-none absolute left-0 top-3 flex items-start pl-3">
              <div class="i-carbon:document text-gray-400" />
            </div>
            <textarea
              id="siteDescription"
              v-model="form.siteDescription"
              rows="4"
              class="w-full resize-none border border-gray-200 rounded-xl py-3 pl-10 pr-4 transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              placeholder="请输入网站描述"
            />
          </div>
          <p class="mt-1.5 text-xs text-gray-500">
            网站的简短描述，将显示在搜索引擎结果中，建议 150 字以内
          </p>
        </div>

        <!-- ICP备案号 -->
        <div>
          <label for="icpNumber" class="mb-2 block text-sm text-gray-700 font-medium">
            ICP备案证书号
          </label>
          <div class="relative">
            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <div class="i-carbon:certificate text-gray-400" />
            </div>
            <input
              id="icpNumber"
              v-model="form.icpNumber"
              type="text"
              class="w-full border border-gray-200 rounded-xl py-3 pl-10 pr-4 transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              placeholder="请输入ICP备案证书号，如：京ICP备12345678号"
            >
          </div>
          <p class="mt-1.5 text-xs text-gray-500">
            网站的 ICP 备案号，将显示在网站底部
          </p>
        </div>

        <!-- 操作按钮区域 -->
        <div class="flex items-center justify-between border-t border-gray-100 pt-6">
          <div class="flex items-center gap-3">
            <!-- 成功提示 -->
            <Transition
              enter-active-class="transition-all duration-300 ease-out"
              enter-from-class="opacity-0 translate-x-2"
              enter-to-class="opacity-100 translate-x-0"
              leave-active-class="transition-all duration-200 ease-in"
              leave-from-class="opacity-100 translate-x-0"
              leave-to-class="opacity-0 translate-x-2"
            >
              <div v-if="saveSuccess" class="flex items-center gap-2 rounded-lg bg-green-50 px-4 py-2 text-green-700">
                <div class="i-carbon:checkmark-filled" />
                <span class="text-sm font-medium">设置保存成功</span>
              </div>
            </Transition>

            <!-- 错误提示 -->
            <Transition
              enter-active-class="transition-all duration-300 ease-out"
              enter-from-class="opacity-0 translate-x-2"
              enter-to-class="opacity-100 translate-x-0"
              leave-active-class="transition-all duration-200 ease-in"
              leave-from-class="opacity-100 translate-x-0"
              leave-to-class="opacity-0 translate-x-2"
            >
              <div v-if="saveError" class="flex items-center gap-2 rounded-lg bg-red-50 px-4 py-2 text-red-700">
                <div class="i-carbon:warning-filled" />
                <span class="text-sm font-medium">{{ saveError }}</span>
              </div>
            </Transition>
          </div>

          <button
            type="submit"
            class="flex items-center gap-2 rounded-xl bg-teal-600 px-6 py-2.5 text-white transition-all disabled:cursor-not-allowed hover:bg-teal-700 disabled:opacity-60"
            :disabled="saving"
          >
            <div v-if="saving" class="i-carbon:circle-dash h-4 w-4 animate-spin" />
            <div v-else class="i-carbon:save" />
            <span class="font-medium">{{ saving ? '保存中...' : '保存设置' }}</span>
          </button>
        </div>
      </form>
    </div>

    <!-- 使用说明 -->
    <div class="border border-gray-100 rounded-2xl bg-white p-6 shadow-sm">
      <h2 class="mb-4 text-lg text-gray-900 font-semibold">
        使用说明
      </h2>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div class="flex gap-3 rounded-xl bg-gray-50 p-4">
          <div class="h-8 w-8 flex flex-shrink-0 items-center justify-center rounded-lg bg-teal-100">
            <div class="i-carbon:information text-teal-600" />
          </div>
          <div>
            <h3 class="mb-1 text-sm text-gray-900 font-medium">
              网站名称
            </h3>
            <p class="text-xs text-gray-600">
              用于浏览器标签页标题和搜索引擎显示，建议简洁明了
            </p>
          </div>
        </div>

        <div class="flex gap-3 rounded-xl bg-gray-50 p-4">
          <div class="h-8 w-8 flex flex-shrink-0 items-center justify-center rounded-lg bg-teal-100">
            <div class="i-carbon:analytics text-teal-600" />
          </div>
          <div>
            <h3 class="mb-1 text-sm text-gray-900 font-medium">
              SEO 优化
            </h3>
            <p class="text-xs text-gray-600">
              关键词和描述将用于搜索引擎优化，有助于提升网站排名
            </p>
          </div>
        </div>

        <div class="flex gap-3 rounded-xl bg-gray-50 p-4">
          <div class="h-8 w-8 flex flex-shrink-0 items-center justify-center rounded-lg bg-teal-100">
            <div class="i-carbon:security text-teal-600" />
          </div>
          <div>
            <h3 class="mb-1 text-sm text-gray-900 font-medium">
              ICP 备案
            </h3>
            <p class="text-xs text-gray-600">
              根据国家法规，在中国大陆运营的网站需要在底部展示备案号
            </p>
          </div>
        </div>

        <div class="flex gap-3 rounded-xl bg-gray-50 p-4">
          <div class="h-8 w-8 flex flex-shrink-0 items-center justify-center rounded-lg bg-teal-100">
            <div class="i-carbon:time text-teal-600" />
          </div>
          <div>
            <h3 class="mb-1 text-sm text-gray-900 font-medium">
              实时生效
            </h3>
            <p class="text-xs text-gray-600">
              设置保存后将立即生效，无需重启服务
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
