<script setup lang="ts">
const { settings, fetchSettings } = useSiteSettings()

// 获取网站设置
await fetchSettings()

// 动态设置页面标题模板
useHead({
  titleTemplate: (titleChunk) => {
    const siteName = settings.value.siteName || 'WEBSITE NUXT'
    return titleChunk ? `${titleChunk} - ${siteName}` : siteName
  },
})

// 动态设置 SEO 元数据
useSeoMeta({
  keywords: () => settings.value.siteKeywords,
  description: () => settings.value.siteDescription,
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
html,
body,
#__nuxt {
  height: 100vh;
  margin: 0;
  padding: 0;
}

html.dark {
  color-scheme: dark;
}
</style>
