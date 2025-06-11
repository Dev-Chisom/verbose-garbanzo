<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">New Arrivals</h1>
    
    <div v-if="loading" class="flex justify-center py-12">
      <LoadingSpinner />
    </div>
    
    <div v-else-if="products.length === 0" class="text-center py-12">
      <p class="text-gray-500 dark:text-gray-400">No new products available.</p>
    </div>
    
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <ProductCard 
        v-for="product in products" 
        :key="product.id" 
        :product="product" 
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const loading = ref(true)
const products = ref([
  {
    id: '1',
    name: 'Wireless Earbuds',
    description: 'High-quality wireless earbuds with noise cancellation',
    price: 99.99,
    category: 'Electronics',
    images: ['https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg'],
    averageRating: 4.5
  },
  {
    id: '2',
    name: 'Premium T-Shirt',
    description: 'Comfortable cotton t-shirt for everyday wear',
    price: 29.99,
    category: 'Clothing',
    images: ['https://images.pexels.com/photos/5698851/pexels-photo-5698851.jpeg'],
    averageRating: 4.2
  }
])

onMounted(() => {
  // Simulate API call
  setTimeout(() => {
    loading.value = false
  }, 1000)
})

useHead({
  title: 'New Arrivals - ShopVue',
  meta: [
    { name: 'description', content: 'Check out our latest products and new arrivals' }
  ]
})
</script>