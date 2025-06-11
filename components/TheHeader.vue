<template>
  <header class="bg-white dark:bg-gray-800 shadow sticky top-0 z-10">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center">
          <span class="text-2xl font-bold text-primary-600 dark:text-primary-400">ShopVue</span>
        </NuxtLink>
        
        <!-- Navigation -->
        <nav class="hidden md:flex space-x-8">
          <NuxtLink to="/" class="nav-link">Home</NuxtLink>
          <NuxtLink to="/products" class="nav-link">Shop</NuxtLink>
          <NuxtLink to="/about" class="nav-link">About</NuxtLink>
          <NuxtLink to="/contact" class="nav-link">Contact</NuxtLink>
        </nav>
        
        <!-- Right Menu -->
        <div class="flex items-center space-x-4">
          <!-- Theme Toggle -->
          <ThemeToggle />
          
          <!-- Search -->
          <button @click="openSearch" class="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
            <Icon name="heroicons:magnifying-glass" size="24" />
          </button>
          
          <!-- Wishlist -->
          <NuxtLink to="/wishlist" class="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
            <Icon name="heroicons:heart" size="24" />
          </NuxtLink>
          
          <!-- Cart -->
          <CartDropdown />
          
          <!-- User Menu -->
          <UserMenu />
          
          <!-- Mobile Menu Button -->
          <button 
            @click="mobileMenuOpen = !mobileMenuOpen" 
            class="md:hidden text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          >
            <Icon v-if="!mobileMenuOpen" name="heroicons:bars-3" size="24" />
            <Icon v-else name="heroicons:x-mark" size="24" />
          </button>
        </div>
      </div>
      
      <!-- Mobile Navigation -->
      <div v-if="mobileMenuOpen" class="md:hidden pt-2 pb-4 space-y-1">
        <NuxtLink to="/" class="mobile-nav-link">Home</NuxtLink>
        <NuxtLink to="/products" class="mobile-nav-link">Shop</NuxtLink>
        <NuxtLink to="/about" class="mobile-nav-link">About</NuxtLink>
        <NuxtLink to="/contact" class="mobile-nav-link">Contact</NuxtLink>
      </div>
    </div>
    
    <!-- Search Modal -->
    <SearchModal :is-open="searchOpen" @close="searchOpen = false" />
  </header>
</template>

<script setup>
import { ref } from 'vue'

const mobileMenuOpen = ref(false)
const searchOpen = ref(false)

const openSearch = () => {
  searchOpen.value = true
}
</script>

<style scoped>
.nav-link {
  @apply text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors;
}

.mobile-nav-link {
  @apply block px-3 py-2 text-base font-medium text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400;
}
</style>