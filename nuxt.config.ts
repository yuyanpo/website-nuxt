// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-03-06',
  devtools: { enabled: true },
  modules: ['@unocss/nuxt', 'nuxt-auth-utils'],
  css: [
    '@unocss/reset/tailwind.css',
    '~/assets/css/transitions.css', // 添加过渡样式
  ],
  app: {
    head: {
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' },
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'keywords', content: 'Nuxt.js, Vue.js, JavaScript, TypeScript, SEO' },
        { name: 'description', content: 'Nuxt.js project' },
      ],
    },
    // 配置默认布局
    // layoutTransition: { name: 'layout', mode: 'out-in' },
    pageTransition: { name: 'page', mode: 'out-in' },
  },
})