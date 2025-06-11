export default defineNuxtRouteMiddleware((to) => {
  // Only apply to routes that require admin role
  if (to.meta.requiresAdmin) {
    const authStore = useAuthStore()
    
    // Check if user is authenticated and has admin role
    if (!authStore.isAuthenticated || !authStore.isAdmin) {
      // Redirect to homepage or unauthorized page
      return navigateTo('/')
    }
  }
})