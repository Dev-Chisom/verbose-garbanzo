<template>
  <footer class="bg-gray-100 dark:bg-gray-800 pt-12 pb-8">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Company Info -->
        <div>
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">ShopVue</h3>
          <p class="text-gray-600 dark:text-gray-300 mb-4">
            Premium shopping experience with quality products and exceptional service.
          </p>
          <div class="flex space-x-4">
            <a href="#" class="text-gray-500 hover:text-gray-900 dark:hover:text-white">
              <Icon name="mdi:facebook" size="24" />
            </a>
            <a href="#" class="text-gray-500 hover:text-gray-900 dark:hover:text-white">
              <Icon name="mdi:twitter" size="24" />
            </a>
            <a href="#" class="text-gray-500 hover:text-gray-900 dark:hover:text-white">
              <Icon name="mdi:instagram" size="24" />
            </a>
          </div>
        </div>
        
        <!-- Quick Links -->
        <div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h3>
          <ul class="space-y-2">
            <li><NuxtLink to="/" class="footer-link">Home</NuxtLink></li>
            <li><NuxtLink to="/products" class="footer-link">Shop</NuxtLink></li>
            <li><NuxtLink to="/about" class="footer-link">About Us</NuxtLink></li>
            <li><NuxtLink to="/contact" class="footer-link">Contact</NuxtLink></li>
          </ul>
        </div>
        
        <!-- Customer Service -->
        <div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Customer Service</h3>
          <ul class="space-y-2">
            <li><NuxtLink to="/faq" class="footer-link">FAQ</NuxtLink></li>
            <li><NuxtLink to="/shipping" class="footer-link">Shipping & Returns</NuxtLink></li>
            <li><NuxtLink to="/terms" class="footer-link">Terms & Conditions</NuxtLink></li>
            <li><NuxtLink to="/privacy" class="footer-link">Privacy Policy</NuxtLink></li>
          </ul>
        </div>
        
        <!-- Newsletter -->
        <div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Subscribe</h3>
          <p class="text-gray-600 dark:text-gray-300 mb-4">
            Subscribe to get special offers, free giveaways, and new products.
          </p>
          <form @submit.prevent="subscribeNewsletter" class="flex">
            <input 
              type="email" 
              v-model="email" 
              placeholder="Your email" 
              class="form-input rounded-r-none"
              required
            />
            <button type="submit" class="btn btn-primary rounded-l-none">
              <Icon name="heroicons:paper-airplane" size="18" />
            </button>
          </form>
        </div>
      </div>
      
      <div class="border-t border-gray-200 dark:border-gray-700 mt-10 pt-8">
        <p class="text-gray-500 dark:text-gray-400 text-center">
          &copy; {{ new Date().getFullYear() }} ShopVue. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')

const subscribeNewsletter = () => {
  // In a real app, you would send this to an API endpoint
  alert(`Thank you! ${email.value} has been subscribed to our newsletter.`)
  email.value = ''
}
</script>

<style scoped>
.footer-link {
  @apply text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors;
}
</style>