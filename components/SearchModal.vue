<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="close" class="relative z-50">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-50" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel class="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
              <div class="relative">
                <div class="flex items-center border-b border-gray-300 dark:border-gray-700 pb-4">
                  <Icon name="heroicons:magnifying-glass" size="24" class="text-gray-400 mr-3" />
                  <input
                    ref="searchInput"
                    v-model="query"
                    type="text"
                    placeholder="Search for products..."
                    class="flex-1 bg-transparent border-none outline-none text-gray-900 dark:text-white placeholder-gray-500 text-lg"
                    @keyup.enter="performSearch"
                  />
                  <button @click="close" class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                    <Icon name="heroicons:x-mark" size="24" />
                  </button>
                </div>
                
                <div v-if="loading" class="flex justify-center py-12">
                  <LoadingSpinner />
                </div>
                
                <div v-else-if="query && results.length > 0" class="py-4 max-h-80 overflow-y-auto">
                  <h3 class="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    {{ results.length }} results found
                  </h3>
                  
                  <div class="space-y-3">
                    <div 
                      v-for="product in results" 
                      :key="product.id"
                      class="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                      @click="goToProduct(product.id)"
                    >
                      <img 
                        :src="product.images[0]" 
                        :alt="product.name" 
                        class="h-16 w-16 object-cover rounded"
                      />
                      <div class="ml-3">
                        <h4 class="font-medium text-gray-900 dark:text-white">{{ product.name }}</h4>
                        <p class="text-sm text-gray-500 dark:text-gray-400">${{ product.price.toFixed(2) }}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div v-else-if="query && !loading" class="py-12 text-center">
                  <p class="text-gray-500 dark:text-gray-400">No products found matching "{{ query }}"</p>
                </div>
                
                <div v-else class="py-8">
                  <h3 class="text-gray-500 dark:text-gray-400 text-center mb-4">Popular Categories</h3>
                  <div class="flex flex-wrap justify-center gap-2">
                    <NuxtLink 
                      v-for="category in popularCategories" 
                      :key="category.slug"
                      :to="`/products?category=${category.slug}`"
                      class="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-800 dark:text-gray-200 text-sm hover:bg-gray-200 dark:hover:bg-gray-600"
                      @click="close"
                    >
                      {{ category.name }}
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel
} from '@headlessui/vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])

const query = ref('')
const loading = ref(false)
const results = ref([])
const searchInput = ref(null)
const router = useRouter()

// Sample data - in real app, fetch from Firebase
const products = ref([
  {
    id: '1',
    name: 'Wireless Earbuds',
    description: 'High-quality wireless earbuds with noise cancellation',
    price: 99.99,
    category: 'Electronics',
    images: ['https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg']
  },
  {
    id: '2',
    name: 'Premium T-Shirt',
    description: 'Comfortable cotton t-shirt for everyday wear',
    price: 29.99,
    category: 'Clothing',
    images: ['https://images.pexels.com/photos/5698851/pexels-photo-5698851.jpeg']
  },
  {
    id: '3',
    name: 'Smart Watch',
    description: 'Track your fitness and stay connected',
    price: 199.99,
    category: 'Electronics',
    images: ['https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg']
  },
  {
    id: '4',
    name: 'Bluetooth Speaker',
    description: 'Portable speaker with amazing sound quality',
    price: 79.99,
    category: 'Electronics',
    images: ['https://images.pexels.com/photos/1279107/pexels-photo-1279107.jpeg']
  }
])

const popularCategories = ref([
  { name: 'Electronics', slug: 'electronics' },
  { name: 'Clothing', slug: 'clothing' },
  { name: 'Home & Garden', slug: 'home-garden' },
  { name: 'Toys', slug: 'toys' },
  { name: 'Sports', slug: 'sports' },
  { name: 'Books', slug: 'books' }
])

watch(() => props.isOpen, (value) => {
  if (value) {
    nextTick(() => {
      if (searchInput.value) {
        searchInput.value.focus()
      }
    })
  } else {
    // Clear search when closing
    query.value = ''
    results.value = []
  }
})

watch(query, (value) => {
  if (value) {
    performSearch()
  } else {
    results.value = []
  }
})

const performSearch = () => {
  if (!query.value.trim()) {
    results.value = []
    return
  }
  
  loading.value = true
  
  // Simulate API call delay
  setTimeout(() => {
    const searchQuery = query.value.toLowerCase()
    results.value = products.value.filter(product => 
      product.name.toLowerCase().includes(searchQuery) || 
      product.description.toLowerCase().includes(searchQuery)
    )
    loading.value = false
  }, 500)
}

const goToProduct = (productId) => {
  router.push(`/products/${productId}`)
  close()
}

const close = () => {
  emit('close')
}
</script>