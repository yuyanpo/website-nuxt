export default defineNuxtRouteMiddleware((to) => {
  if (to.path === '/admin/login') return;

  const { loggedIn } = useUserSession()
  if (!loggedIn.value) {
    return navigateTo('/admin/login')
  }
})
