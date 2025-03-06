// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
  },
  modules: [
    '@unocss/nuxt',
  ],
  css: [
    '@unocss/reset/tailwind.css'
  ],
  compatibilityDate: '2025-03-06',
  devtools: { enabled: false },
})