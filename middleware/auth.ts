export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()
  
  // If route requires authentication and user is not authenticated
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return navigateTo({
      path: '/auth/login',
      query: { redirect: to.fullPath }
    })
  }
  
  // If route requires admin role and user is not admin
  if (to.meta.requiresAdmin && !authStore.isAdmin) {
    return navigateTo('/')
  }
})