<template>
  <div class="relative">
    <button 
      @click="isOpen = !isOpen" 
      class="flex items-center focus:outline-none"
      ref="menuButton"
    >
      <template v-if="authStore.isAuthenticated">
        <img 
          v-if="authStore.photoURL" 
          :src="authStore.photoURL" 
          :alt="authStore.displayName" 
          class="h-8 w-8 rounded-full object-cover"
        />
        <div 
          v-else 
          class="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center text-white font-semibold"
        >
          {{ authStore.displayName ? authStore.displayName.charAt(0).toUpperCase() : 'U' }}
        </div>
      </template>
      <Icon 
        v-else 
        name="heroicons:user-circle" 
        size="32" 
        class="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white" 
      />
    </button>
    
    <div 
      v-if="isOpen" 
      class="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50"
      ref="menuItems"
    >
      <template v-if="authStore.isAuthenticated">
        <div class="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
          <div class="font-medium text-gray-900 dark:text-white">{{ authStore.displayName }}</div>
          <div class="text-sm text-gray-500 dark:text-gray-400 truncate">{{ authStore.userEmail }}</div>
        </div>
        
        <NuxtLink 
          to="/account/profile" 
          class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          @click="isOpen = false"
        >
          Profile
        </NuxtLink>
        
        <NuxtLink 
          to="/account/orders" 
          class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          @click="isOpen = false"
        >
          Orders
        </NuxtLink>
        
        <NuxtLink 
          v-if="authStore.isAdmin" 
          to="/admin" 
          class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          @click="isOpen = false"
        >
          Admin Dashboard
        </NuxtLink>
        
        <button 
          @click="logout" 
          class="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          Sign Out
        </button>
      </template>
      
      <template v-else>
        <NuxtLink 
          to="/auth/login" 
          class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          @click="isOpen = false"
        >
          Sign In
        </NuxtLink>
        
        <NuxtLink 
          to="/auth/register" 
          class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          @click="isOpen = false"
        >
          Create Account
        </NuxtLink>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useFirebaseAuth } from '~/composables/useFirebaseAuth'

const isOpen = ref(false)
const menuButton = ref(null)
const menuItems = ref(null)

const authStore = useAuthStore()
const { signOut } = useFirebaseAuth()

const logout = async () => {
  await signOut()
  isOpen.value = false
}

// Close menu when clicking outside
const handleClickOutside = (event) => {
  if (
    isOpen.value && 
    menuButton.value && 
    menuItems.value && 
    !menuButton.value.contains(event.target) && 
    !menuItems.value.contains(event.target)
  ) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>