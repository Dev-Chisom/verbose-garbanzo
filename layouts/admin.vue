<template>
  <div class="flex h-screen bg-gray-100 dark:bg-gray-900">
    <!-- Admin Sidebar -->
    <AdminSidebar :is-open="sidebarOpen" @toggle="sidebarOpen = !sidebarOpen" />
    
    <!-- Main Content -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <AdminHeader @toggle-sidebar="sidebarOpen = !sidebarOpen" />
      
      <main class="flex-1 overflow-y-auto p-5">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useRouter } from 'vue-router'

const sidebarOpen = ref(false)
const authStore = useAuthStore()
const router = useRouter()

// Prevent non-admin users from accessing admin routes
onMounted(() => {
  if (!authStore.isAdmin) {
    router.push('/')
  }
})
</script>