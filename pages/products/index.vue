<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex flex-col md:flex-row gap-8">
      <!-- Filters Sidebar -->
      <div class="w-full md:w-64 space-y-6">
        <div class="card p-4">
          <h2 class="font-semibold text-lg mb-4">Filters</h2>
          
          <!-- Categories -->
          <div class="mb-6">
            <h3 class="font-medium text-sm mb-2">Categories</h3>
            <div class="space-y-2">
              <label 
                v-for="category in categories" 
                :key="category.slug"
                class="flex items-center"
              >
                <input
                  type="checkbox"
                  :value="category.slug"
                  v-model="selectedCategories"
                  class="form-checkbox h-4 w-4 text-primary-600"
                />
                <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  {{ category.name }}
                </span>
              </label>
            </div>
          </div>
          
          <!-- Price Range -->
          <div class="mb-6">
            <h3 class="font-medium text-sm mb-2">Price Range</h3>
            <div class="flex items-center space-x-2">
              <input
                type="number"
                v-model="priceRange.min"
                placeholder="Min"
                class="form-input w-full text-sm"
                min="0"
              />
              <span class="text-gray-500">-</span>
              <input
                type="number"
                v-model="priceRange.max"
                placeholder="Max"
                class="form-input w-full text-sm"
                min="0"
              />
            </div>
          </div>
          
          <!-- Rating Filter -->
          <div class="mb-6">
            <h3 class="font-medium text-sm mb-2">Rating</h3>
            <div class="space-y-2">
              <label 
                v-for="rating in [4, 3, 2, 1]" 
                :key="rating"
                class="flex items-center"
              >
                <input
                  type="radio"
                  :value="rating"
                  v-model="selectedRating"
                  class="form-radio h-4 w-4 text-primary-600"
                />
                <span class="ml-2 flex items-center">
                  <Icon 
                    v-for="i in 5" 
                    :key="i"
                    :name="i <= rating ? 'heroicons:star-solid' : 'heroicons:star'"
                    class="w-4 h-4 text-yellow-400"
                  />
                  <span class="ml-1 text-sm text-gray-700 dark:text-gray-300">& up</span>
                </span>
              </label>
            </div>
          </div>
          
          <!-- Apply/Clear Filters -->
          <div class="flex space-x-2">
            <button 
              @click="applyFilters" 
              class="btn btn-primary flex-1"
            >
              Apply
            </button>
            <button 
              @click="clearFilters" 
              class="btn btn-outline flex-1"
            >
              Clear
            </button>
          </div>
        </div>
      </div>
      
      <!-- Products Grid -->
      <div class="flex-1">
        <!-- Sort and View Options -->
        <div class="flex flex-wrap items-center justify-between mb-6">
          <div class="flex items-center space-x-2 mb-4 md:mb-0">
            <label class="text-sm text-gray-700 dark:text-gray-300">Sort by:</label>
            <select 
              v-model="sortOption" 
              class="form-select text-sm"
              @change="applyFilters"
            >
              <option value="newest">Newest</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating">Rating</option>
            </select>
          </div>
          
          <p class="text-sm text-gray-500 dark:text-gray-400">
            Showing {{ products.length }} products
          </p>
        </div>
        
        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center py-12">
          <LoadingSpinner />
        </div>
        
        <!-- Error State -->
        <div v-else-if="error" class="text-center py-12">
          <p class="text-error-600 dark:text-error-400 text-xl mb-4">
            {{ error }}
          </p>
          <button @click="fetchProducts" class="btn btn-primary">
            Try Again
          </button>
        </div>
        
        <!-- Empty State -->
        <div v-else-if="products.length === 0" class="text-center py-12">
          <Icon name="heroicons:shopping-bag" size="48" class="mx-auto text-gray-400 mb-4" />
          <h2 class="text-xl font-medium text-gray-900 dark:text-white mb-2">
            No products found
          </h2>
          <p class="text-gray-500 dark:text-gray-400 mb-4">
            Try adjusting your filters or search criteria
          </p>
          <button @click="clearFilters" class="btn btn-primary">
            Clear Filters
          </button>
        </div>
        
        <!-- Products Grid -->
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <ProductCard 
            v-for="product in products" 
            :key="product.id" 
            :product="product" 
          />
        </div>
        
        <!-- Load More -->
        <div v-if="hasMore" class="text-center mt-8">
          <button 
            @click="loadMore" 
            class="btn btn-outline"
            :disabled="loading"
          >
            {{ loading ? 'Loading...' : 'Load More' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProducts } from '~/composables/useProducts'

const route = useRoute()
const router = useRouter()
const { products, loading, error, hasMore, fetchProducts } = useProducts()

// Filter states
const selectedCategories = ref([])
const priceRange = ref({ min: null, max: null })
const selectedRating = ref(null)
const sortOption = ref('newest')

// Categories data (in real app, fetch from API)
const categories = ref([
  { name: 'Electronics', slug: 'electronics' },
  { name: 'Clothing', slug: 'clothing' },
  { name: 'Home & Garden', slug: 'home-garden' },
  { name: 'Books', slug: 'books' },
  { name: 'Sports', slug: 'sports' },
  { name: 'Toys', slug: 'toys' }
])

// Initialize filters from URL params
const initFilters = () => {
  const { category, minPrice, maxPrice, rating, sort } = route.query
  
  if (category) {
    selectedCategories.value = Array.isArray(category) ? category : [category]
  }
  
  if (minPrice) priceRange.value.min = Number(minPrice)
  if (maxPrice) priceRange.value.max = Number(maxPrice)
  if (rating) selectedRating.value = Number(rating)
  if (sort) sortOption.value = sort.toString()
}

// Apply filters and update URL
const applyFilters = () => {
  const query = {
    ...(selectedCategories.value.length > 0 && { category: selectedCategories.value }),
    ...(priceRange.value.min && { minPrice: priceRange.value.min }),
    ...(priceRange.value.max && { maxPrice: priceRange.value.max }),
    ...(selectedRating.value && { rating: selectedRating.value }),
    ...(sortOption.value !== 'newest' && { sort: sortOption.value })
  }
  
  router.push({ query })
}

// Clear all filters
const clearFilters = () => {
  selectedCategories.value = []
  priceRange.value = { min: null, max: null }
  selectedRating.value = null
  sortOption.value = 'newest'
  router.push({ query: {} })
}

// Load more products
const loadMore = () => {
  if (!loading.value && hasMore.value) {
    fetchProducts({
      category: selectedCategories.value,
      minPrice: priceRange.value.min,
      maxPrice: priceRange.value.max,
      rating: selectedRating.value,
      sort: sortOption.value
    })
  }
}

// Watch route query changes
watch(() => route.query, () => {
  initFilters()
  fetchProducts({
    category: selectedCategories.value,
    minPrice: priceRange.value.min,
    maxPrice: priceRange.value.max,
    rating: selectedRating.value,
    sort: sortOption.value
  })
}, { immediate: true })

// Set page metadata
useHead({
  title: 'Shop Products - ShopVue',
  meta: [
    { name: 'description', content: 'Browse our collection of products' }
  ]
})
</script>