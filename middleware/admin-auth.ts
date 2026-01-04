import { ROLE } from '~/constants'

// 需要超级管理员权限的路由
const superAdminOnlyRoutes = [
  '/admin/user',
  '/admin/system',
]

export default defineNuxtRouteMiddleware((to) => {
  // 登录页面不需要验证
  if (to.path === '/admin/login')
    return

  const { loggedIn, user } = useUserSession()

  // 未登录则跳转到登录页
  if (!loggedIn.value) {
    return navigateTo('/admin/login')
  }

  // 检查是否是需要超级管理员权限的路由
  const requiresSuperAdmin = superAdminOnlyRoutes.some(route =>
    to.path.startsWith(route),
  )

  if (requiresSuperAdmin && user.value?.role !== ROLE.SUPER_ADMIN) {
    // 普通管理员访问超级管理员路由时，重定向到首页并提示
    return navigateTo('/admin')
  }
})
