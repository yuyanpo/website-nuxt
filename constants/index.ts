// @unocss-include

export const appName = 'WEBSITE NUXT'

// 用户角色常量
export const ROLE = {
  SUPER_ADMIN: 100, // 超级管理员
  ADMIN: 1, // 普通管理员
} as const

export type RoleType = typeof ROLE[keyof typeof ROLE]
export const appKeywords = '卓略互联,卓略,互联'
export const appDescription = '卓略互联是一家专注于互联网技术的公司，我们提供网站建设、微信小程序开发、APP开发等服务。'

interface AdminMenu {
  name?: string
  icon?: string
  path?: string
  separator?: boolean
}
export const adminMenus: AdminMenu[] = [
  { name: '管理系统首页', icon: 'i-carbon:home', path: '/admin' },
  { separator: true },
  { name: '自定义导航栏', icon: 'i-carbon:sysplex-distributor', path: '/admin/navigation' },
  { name: '单页面管理', icon: 'i-carbon:document-blank', path: '/admin/single' },
  { separator: true },
  { name: '商品管理', icon: 'i-carbon:shopping-cart', path: '/admin/product' },
  { name: '商品分类管理', icon: 'i-carbon:shopping-cart-plus', path: '/admin/product/category' },
  { separator: true },
  { name: '文章管理', icon: 'i-carbon:document', path: '/admin/article' },
  { name: '文章分类管理', icon: 'i-carbon:document-add', path: '/admin/article/category' },
  { separator: true },
  { name: '系统设置', icon: 'i-carbon:settings', path: '/admin/system' },
  { name: '广告轮播管理', icon: 'i-carbon:image-reference', path: '/admin/ad' },
  { name: '用户管理', icon: 'i-carbon:user-multiple', path: '/admin/user' },
  { name: '数据备份', icon: 'i-carbon:data-backup', path: '/admin/backup' },
  { name: '操作记录', icon: 'i-carbon:timer', path: '/admin/log' },
]
