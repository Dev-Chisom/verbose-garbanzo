<template>
  <div class="relative">
    <button
      @click="isOpen = !isOpen"
      class="flex items-center space-x-1 text-gray-700 hover:text-gray-900"
    >
      <span class="sr-only">Cart</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
      <span v-if="cartCount > 0" class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
        {{ cartCount }}
      </span>
    </button>

    <div
      v-if="isOpen"
      class="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg z-50"
    >
      <div class="p-4">
        <h3 class="text-lg font-semibold mb-4">Shopping Cart</h3>
        
        <div v-if="cartItems.length === 0" class="text-center py-4">
          <p class="text-gray-500">Your cart is empty</p>
        </div>
        
        <div v-else>
          <div class="space-y-4">
            <div v-for="item in cartItems" :key="item.id" class="flex items-center space-x-4">
              <img
                :src="item.image"
                :alt="item.name"
                class="w-16 h-16 object-cover rounded"
              />
              <div class="flex-1">
                <h4 class="text-sm font-medium">{{ item.name }}</h4>
                <p class="text-sm text-gray-500">Quantity: {{ item.quantity }}</p>
                <p class="text-sm font-medium">${{ (item.price * item.quantity).toFixed(2) }}</p>
              </div>
              <button
                @click="removeFromCart(item.id)"
                class="text-red-500 hover:text-red-700"
              >
                <span class="sr-only">Remove</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </div>
          
          <div class="mt-4 pt-4 border-t">
            <div class="flex justify-between mb-2">
              <span class="font-medium">Subtotal:</span>
              <span class="font-medium">${{ cartTotal.toFixed(2) }}</span>
            </div>
            <button
              @click="goToCheckout"
              class="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useCartStore } from '~/stores/cart'
import { useRouter } from 'vue-router'

const router = useRouter()
const isOpen = ref(false)
const cartStore = useCartStore()

// Initialize cart on client-side
onMounted(async () => {
  await cartStore.loadCart()
})

const cartItems = computed(() => cartStore.items || [])
const cartCount = computed(() => cartStore.cartCount || 0)
const cartTotal = computed(() => cartStore.cartTotal || 0)

const removeFromCart = async (itemId: string) => {
  await cartStore.removeFromCart(itemId)
}

const goToCheckout = () => {
  isOpen.value = false
  router.push('/checkout')
}
</script>