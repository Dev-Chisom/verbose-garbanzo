<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">My Wishlist</h1>
    
    <div v-if="wishlistStore.loading" class="flex justify-center py-12">
      <LoadingSpinner />
    </div>
    
    <div v-else-if="wishlistStore.items.length === 0" class="text-center py-12">
      <Icon name="heroicons:heart" size="48" class="mx-auto text-gray-400 mb-4" />
      <h2 class="text-xl font-medium text-gray-900 dark:text-white mb-2">Your wishlist is empty</h2>
      <p class="text-gray-500 dark:text-gray-400 mb-4">
        Browse our products and add your favorites to the wishlist
      </p>
      <NuxtLink to="/products" class="btn btn-primary">
        Browse Products
      </NuxtLink>
    </div>
    
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <ProductCard 
        v-for="item in wishlistStore.items" 
        :key="item.id" 
        :product="item.product" 
      />
    </div>
  </div>
</template>

<script setup>
import { useWishlistStore } from '~/stores/wishlist'

const wishlistStore = useWishlistStore()

useHead({
  title: 'My Wishlist - ShopVue',
  meta: [
    { name: 'description', content: 'View and manage your wishlist items' }
  ]
})
</script>