import process from 'node:process'
import { appDescription, appKeywords } from './constants'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@unocss/nuxt',
    '@nuxt/eslint',
    'nuxt-auth-utils',
  ],
  devtools: { enabled: true },
  app: {
    head: {
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' },
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'keywords', content: appKeywords },
        { name: 'description', content: appDescription },
      ],
    },
    // 配置默认布局
    // layoutTransition: { name: 'layout', mode: 'out-in' },
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  css: [
    '@unocss/reset/tailwind.css',
    '~/assets/css/transitions.css', // 添加过渡样式
  ],
  runtimeConfig: {
    session: {
      name: 'ncw-sess',
      password: process.env.NUXT_SESSION_PASSWORD || '',
    },
  },
  compatibilityDate: '2025-03-06',

  eslint: {
    config: {
      standalone: false,
      nuxt: {
        sortConfigKeys: true,
      },
    },
  },
})
