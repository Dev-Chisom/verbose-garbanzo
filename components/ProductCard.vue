<template>
  <div 
    class="card group overflow-hidden transition-all duration-300 hover:shadow-lg"
    @mouseenter="showActions = true"
    @mouseleave="showActions = false"
  >
    <div class="relative overflow-hidden h-64">
      <!-- Product Image -->
      <NuxtLink :to="`/products/${product.id}`">
        <img 
          :src="product.images[0]" 
          :alt="product.name" 
          class="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
        />
      </NuxtLink>
      
      <!-- Quick Action Buttons -->
      <div 
        class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 transition-opacity duration-300"
        :class="{ 'opacity-100': showActions }"
      >
        <div class="flex space-x-2">
          <button 
            @click="addToCart"
            class="btn bg-white text-gray-900 hover:bg-gray-100 p-2 rounded-full"
            title="Add to Cart"
          >
            <Icon name="heroicons:shopping-cart" size="20" />
          </button>
          <button 
            @click="toggleWishlist"
            class="btn bg-white text-gray-900 hover:bg-gray-100 p-2 rounded-full"
            title="Add to Wishlist"
          >
            <Icon 
              :name="isInWishlist ? 'heroicons:heart-solid' : 'heroicons:heart'" 
              size="20" 
              :class="isInWishlist ? 'text-red-500' : ''"
            />
          </button>
          <NuxtLink 
            :to="`/products/${product.id}`"
            class="btn bg-white text-gray-900 hover:bg-gray-100 p-2 rounded-full"
            title="View Details"
          >
            <Icon name="heroicons:eye" size="20" />
          </NuxtLink>
        </div>
      </div>
      
      <!-- Sale Badge (if applicable) -->
      <div 
        v-if="product.salePrice && product.salePrice < product.price"
        class="absolute top-2 left-2 bg-accent-500 text-white py-1 px-2 rounded-md text-xs font-semibold"
      >
        SALE
      </div>
    </div>
    
    <div class="p-4">
      <!-- Category -->
      <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">{{ product.category }}</div>
      
      <!-- Product Title -->
      <h3 class="font-medium text-gray-900 dark:text-white mb-2">
        <NuxtLink :to="`/products/${product.id}`" class="hover:text-primary-600 dark:hover:text-primary-400">
          {{ product.name }}
        </NuxtLink>
      </h3>
      
      <!-- Rating -->
      <div class="flex items-center mb-2">
        <div class="flex mr-1">
          <Icon 
            v-for="i in 5" 
            :key="i" 
            :name="i <= Math.round(product.averageRating) ? 'heroicons:star-solid' : 'heroicons:star'" 
            class="w-4 h-4 text-yellow-400"
          />
        </div>
        <span class="text-sm text-gray-500 dark:text-gray-400">
          ({{ product.averageRating.toFixed(1) }})
        </span>
      </div>
      
      <!-- Price -->
      <div class="flex items-center">
        <span 
          v-if="product.salePrice && product.salePrice < product.price" 
          class="text-lg font-bold text-primary-600 dark:text-primary-400 mr-2"
        >
          ${{ product.salePrice.toFixed(2) }}
        </span>
        <span 
          :class="{ 
            'text-lg font-bold text-gray-900 dark:text-white': !product.salePrice || product.salePrice >= product.price,
            'text-sm text-gray-500 dark:text-gray-400 line-through': product.salePrice && product.salePrice < product.price
          }"
        >
          ${{ product.price.toFixed(2) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useWishlistStore } from '~/stores/wishlist'
import { useCartStore } from '~/stores/cart'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const showActions = ref(false)
const wishlistStore = useWishlistStore()
const cartStore = useCartStore()

const isInWishlist = computed(() => {
  return wishlistStore.isInWishlist(props.product.id)
})

const toggleWishlist = () => {
  if (isInWishlist.value) {
    wishlistStore.removeFromWishlist(props.product.id)
  } else {
    wishlistStore.addToWishlist(props.product)
  }
}

const addToCart = () => {
  cartStore.addToCart({
    id: Date.now().toString(), // temp id for cart item
    productId: props.product.id,
    name: props.product.name,
    price: props.product.salePrice || props.product.price,
    quantity: 1,
    image: props.product.images[0]
  })
}
</script>