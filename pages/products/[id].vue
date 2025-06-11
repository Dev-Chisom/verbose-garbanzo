<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center py-12">
      <LoadingSpinner />
    </div>
    
    <!-- Error State -->
    <div v-else-if="error" class="text-center py-12">
      <p class="text-error-600 dark:text-error-400 text-xl mb-4">{{ error }}</p>
      <NuxtLink to="/products" class="btn btn-primary">
        Back to Products
      </NuxtLink>
    </div>
    
    <!-- Product Details -->
    <div v-else-if="product" class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Product Images -->
      <div class="space-y-4">
        <div class="aspect-w-1 aspect-h-1 w-full">
          <img 
            :src="product.images[selectedImage]" 
            :alt="product.name"
            class="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div class="grid grid-cols-4 gap-4">
          <button
            v-for="(image, index) in product.images"
            :key="index"
            @click="selectedImage = index"
            class="aspect-w-1 aspect-h-1 relative rounded-lg overflow-hidden"
            :class="{ 'ring-2 ring-primary-500': selectedImage === index }"
          >
            <img 
              :src="image" 
              :alt="`${product.name} - Image ${index + 1}`"
              class="w-full h-full object-cover"
            />
          </button>
        </div>
      </div>
      
      <!-- Product Info -->
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {{ product.name }}
        </h1>
        
        <div class="flex items-center mb-4">
          <div class="flex mr-2">
            <Icon 
              v-for="i in 5" 
              :key="i"
              :name="i <= Math.round(product.averageRating) ? 'heroicons:star-solid' : 'heroicons:star'"
              class="w-5 h-5 text-yellow-400"
            />
          </div>
          <span class="text-sm text-gray-500 dark:text-gray-400">
            ({{ product.averageRating.toFixed(1) }})
          </span>
        </div>
        
        <div class="mb-6">
          <span 
            v-if="product.salePrice && product.salePrice < product.price" 
            class="text-2xl font-bold text-primary-600 dark:text-primary-400 mr-2"
          >
            ${{ product.salePrice.toFixed(2) }}
          </span>
          <span 
            :class="{ 
              'text-2xl font-bold text-gray-900 dark:text-white': !product.salePrice || product.salePrice >= product.price,
              'text-lg text-gray-500 dark:text-gray-400 line-through': product.salePrice && product.salePrice < product.price
            }"
          >
            ${{ product.price.toFixed(2) }}
          </span>
        </div>
        
        <p class="text-gray-600 dark:text-gray-300 mb-6">
          {{ product.description }}
        </p>
        
        <div class="mb-6">
          <h3 class="text-sm font-medium text-gray-900 dark:text-white mb-2">Category</h3>
          <NuxtLink 
            :to="`/products?category=${product.category}`"
            class="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            {{ product.category }}
          </NuxtLink>
        </div>
        
        <div class="mb-6">
          <label for="quantity" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Quantity
          </label>
          <div class="flex items-center">
            <button 
              @click="quantity > 1 && quantity--"
              class="btn btn-outline p-2"
              :disabled="quantity <= 1"
            >
              <Icon name="heroicons:minus" size="20" />
            </button>
            <input
              id="quantity"
              v-model="quantity"
              type="number"
              min="1"
              :max="product.quantity"
              class="form-input mx-2 w-20 text-center"
            />
            <button 
              @click="quantity < product.quantity && quantity++"
              class="btn btn-outline p-2"
              :disabled="quantity >= product.quantity"
            >
              <Icon name="heroicons:plus" size="20" />
            </button>
          </div>
        </div>
        
        <div class="flex space-x-4">
          <button 
            @click="addToCart"
            class="btn btn-primary flex-1"
            :disabled="!product.inStock"
          >
            <Icon name="heroicons:shopping-cart" size="20" class="mr-2" />
            {{ product.inStock ? 'Add to Cart' : 'Out of Stock' }}
          </button>
          
          <button 
            @click="toggleWishlist"
            class="btn btn-outline p-3"
            :class="{ 'text-red-500': isInWishlist }"
          >
            <Icon 
              :name="isInWishlist ? 'heroicons:heart-solid' : 'heroicons:heart'" 
              size="24"
            />
          </button>
        </div>
        
        <!-- Product Details Tabs -->
        <div class="mt-12">
          <div class="border-b border-gray-200 dark:border-gray-700">
            <nav class="flex space-x-8">
              <button
                v-for="tab in tabs"
                :key="tab.id"
                @click="activeTab = tab.id"
                class="py-4 px-1 border-b-2 font-medium text-sm"
                :class="[
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                ]"
              >
                {{ tab.name }}
              </button>
            </nav>
          </div>
          
          <div class="py-6">
            <!-- Description Tab -->
            <div v-if="activeTab === 'description'" class="prose dark:prose-invert">
              <p>{{ product.description }}</p>
            </div>
            
            <!-- Specifications Tab -->
            <div v-if="activeTab === 'specifications'" class="space-y-4">
              <div v-for="(spec, index) in specifications" :key="index" class="grid grid-cols-2 gap-4">
                <div class="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {{ spec.name }}
                </div>
                <div class="text-sm text-gray-900 dark:text-white">
                  {{ spec.value }}
                </div>
              </div>
            </div>
            
            <!-- Reviews Tab -->
            <div v-if="activeTab === 'reviews'" class="space-y-8">
              <!-- Review Stats -->
              <div class="flex items-center space-x-4">
                <div class="flex-1">
                  <div class="flex items-center">
                    <span class="text-3xl font-bold text-gray-900 dark:text-white mr-2">
                      {{ product.averageRating.toFixed(1) }}
                    </span>
                    <div class="flex">
                      <Icon 
                        v-for="i in 5" 
                        :key="i"
                        :name="i <= Math.round(product.averageRating) ? 'heroicons:star-solid' : 'heroicons:star'"
                        class="w-5 h-5 text-yellow-400"
                      />
                    </div>
                  </div>
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    Based on {{ product.ratings.length }} reviews
                  </p>
                </div>
                
                <button 
                  v-if="authStore.isAuthenticated"
                  @click="showReviewForm = true"
                  class="btn btn-primary"
                >
                  Write a Review
                </button>
                <NuxtLink 
                  v-else 
                  to="/auth/login" 
                  class="btn btn-primary"
                >
                  Login to Review
                </NuxtLink>
              </div>
              
              <!-- Review Form -->
              <form v-if="showReviewForm" @submit.prevent="submitReview" class="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <div class="mb-4">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Rating
                  </label>
                  <div class="flex space-x-2">
                    <button
                      v-for="i in 5"
                      :key="i"
                      type="button"
                      @click="newReview.rating = i"
                      class="focus:outline-none"
                    >
                      <Icon 
                        :name="i <= newReview.rating ? 'heroicons:star-solid' : 'heroicons:star'"
                        class="w-6 h-6 text-yellow-400"
                      />
                    </button>
                  </div>
                </div>
                
                <div class="mb-4">
                  <label for="review-comment" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Review
                  </label>
                  <textarea
                    id="review-comment"
                    v-model="newReview.comment"
                    rows="4"
                    class="form-input"
                    required
                  ></textarea>
                </div>
                
                <div class="flex justify-end space-x-2">
                  <button 
                    type="button"
                    @click="showReviewForm = false"
                    class="btn btn-outline"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    class="btn btn-primary"
                    :disabled="reviewLoading"
                  >
                    {{ reviewLoading ? 'Submitting...' : 'Submit Review' }}
                  </button>
                </div>
              </form>
              
              <!-- Reviews List -->
              <div class="space-y-6">
                <div 
                  v-for="review in product.ratings" 
                  :key="review.id"
                  class="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0"
                >
                  <div class="flex items-center mb-2">
                    <div class="flex mr-2">
                      <Icon 
                        v-for="i in 5" 
                        :key="i"
                        :name="i <= review.rating ? 'heroicons:star-solid' : 'heroicons:star'"
                        class="w-4 h-4 text-yellow-400"
                      />
                    </div>
                    <span class="font-medium text-gray-900 dark:text-white">
                      {{ review.userName }}
                    </span>
                  </div>
                  <p class="text-gray-600 dark:text-gray-300">
                    {{ review.comment }}
                  </p>
                  <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {{ new Date(review.createdAt).toLocaleDateString() }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '~/stores/auth'
import { useWishlistStore } from '~/stores/wishlist'
import { useCartStore } from '~/stores/cart'
import { useProducts } from '~/composables/useProducts'

const route = useRoute()
const authStore = useAuthStore()
const wishlistStore = useWishlistStore()
const cartStore = useCartStore()

const { getProduct } = useProducts()

const loading = ref(false)
const error = ref(null)
const product = ref(null)
const selectedImage = ref(0)
const quantity = ref(1)
const activeTab = ref('description')
const showReviewForm = ref(false)
const reviewLoading = ref(false)

const newReview = ref({
  rating: 5,
  comment: ''
})

const tabs = [
  { id: 'description', name: 'Description' },
  { id: 'specifications', name: 'Specifications' },
  { id: 'reviews', name: 'Reviews' }
]

const specifications = computed(() => {
  if (!product.value) return []
  
  return [
    { name: 'Category', value: product.value.category },
    { name: 'Stock', value: product.value.inStock ? `${product.value.quantity} units` : 'Out of stock' },
    { name: 'SKU', value: product.value.id }
  ]
})

const isInWishlist = computed(() => {
  return product.value ? wishlistStore.isInWishlist(product.value.id) : false
})

const fetchProduct = async () => {
  loading.value = true
  error.value = null
  
  try {
    const result = await getProduct(route.params.id)
    if (result) {
      product.value = result
    } else {
      error.value = 'Product not found'
    }
  } catch (err) {
    console.error('Error fetching product:', err)
    error.value = 'Failed to load product'
  } finally {
    loading.value = false
  }
}

const addToCart = () => {
  if (!product.value) return
  
  cartStore.addToCart({
    id: Date.now().toString(),
    productId: product.value.id,
    name: product.value.name,
    price: product.value.salePrice || product.value.price,
    quantity: quantity.value,
    image: product.value.images[0]
  })
}

const toggleWishlist = () => {
  if (!product.value) return
  
  if (isInWishlist.value) {
    wishlistStore.removeFromWishlist(product.value.id)
  } else {
    wishlistStore.addToWishlist(product.value)
  }
}

const submitReview = async () => {
  if (!product.value || !authStore.isAuthenticated) return
  
  reviewLoading.value = true
  
  try {
    // Add review logic here
    showReviewForm.value = false
    newReview.value = { rating: 5, comment: '' }
  } catch (err) {
    console.error('Error submitting review:', err)
  } finally {
    reviewLoading.value = false
  }
}

onMounted(() => {
  fetchProduct()
})

// Set page metadata
useHead(() => ({
  title: product.value ? `${product.value.name} - ShopVue` : 'Product - ShopVue',
  meta: [
    { 
      name: 'description', 
      content: product.value ? product.value.description : 'Product details'
    }
  ]
}))
</script>