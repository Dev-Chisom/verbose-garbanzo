<template>
  <div>
    <!-- Hero Section -->
    <section class="relative bg-gray-100 dark:bg-gray-800 py-16 md:py-24">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div class="order-2 md:order-1">
            <h1 class="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              Discover Premium Quality Products
            </h1>
            <p class="text-xl mb-8 text-gray-600 dark:text-gray-300">
              Shop the latest trends with confidence. Free shipping on orders over $50.
            </p>
            <div class="flex flex-wrap gap-4">
              <NuxtLink to="/products" class="btn btn-primary px-6 py-3 text-base">
                Shop Now
              </NuxtLink>
              <NuxtLink to="/collections/new" class="btn btn-outline px-6 py-3 text-base">
                New Arrivals
              </NuxtLink>
            </div>
          </div>
          <div class="order-1 md:order-2">
            <img 
              src="https://images.pexels.com/photos/5650026/pexels-photo-5650026.jpeg" 
              alt="ShopVue Featured Products" 
              class="w-full h-auto rounded-lg shadow-xl object-cover"
            />
          </div>
        </div>
      </div>
    </section>
    
    <!-- Featured Categories -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white">
          Shop by Category
        </h2>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <CategoryCard 
            v-for="category in categories" 
            :key="category.id" 
            :category="category" 
          />
        </div>
      </div>
    </section>
    
    <!-- Featured Products -->
    <section class="py-16 bg-gray-50 dark:bg-gray-900">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white">
            Featured Products
          </h2>
          <NuxtLink to="/products" class="text-primary-600 dark:text-primary-400 hover:underline">
            View All
          </NuxtLink>
        </div>
        <div v-if="loading" class="flex justify-center py-12">
          <LoadingSpinner />
        </div>
        <div v-else-if="featuredProducts.length === 0" class="text-center py-12">
          <p class="text-gray-500 dark:text-gray-400">No featured products found.</p>
        </div>
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <ProductCard 
            v-for="product in featuredProducts" 
            :key="product.id" 
            :product="product" 
          />
        </div>
      </div>
    </section>
    
    <!-- Testimonials -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white">
          What Our Customers Say
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="(testimonial, index) in testimonials" :key="index" class="card p-6">
            <div class="flex items-center mb-4">
              <img 
                :src="testimonial.avatar" 
                :alt="testimonial.name" 
                class="w-12 h-12 rounded-full object-cover"
              />
              <div class="ml-4">
                <h4 class="font-medium text-gray-900 dark:text-white">{{ testimonial.name }}</h4>
                <div class="flex">
                  <Icon
                    v-for="i in 5"
                    :key="i"
                    :name="i <= testimonial.rating ? 'heroicons:star-solid' : 'heroicons:star'"
                    class="w-4 h-4 text-yellow-400"
                  />
                </div>
              </div>
            </div>
            <p class="text-gray-600 dark:text-gray-300">{{ testimonial.text }}</p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Newsletter -->
    <section class="py-16 bg-primary-600 text-white">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
        <p class="text-primary-100 mb-8 max-w-2xl mx-auto">
          Stay updated with our latest products and offers. Subscribe to our newsletter and get
          10% off your first order.
        </p>
        <form @submit.prevent="subscribeNewsletter" class="max-w-md mx-auto flex">
          <input
            type="email"
            v-model="email"
            placeholder="Your email address"
            class="form-input rounded-r-none flex-1 border-white"
            required
          />
          <button type="submit" class="btn bg-white text-primary-600 hover:bg-gray-100 rounded-l-none px-6">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Sample data (would be fetched from Firebase in a real app)
const loading = ref(false)
const email = ref('')

const categories = ref([
  { id: 1, name: 'Electronics', image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg', slug: 'electronics' },
  { id: 2, name: 'Clothing', image: 'https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg', slug: 'clothing' },
  { id: 3, name: 'Home & Garden', image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg', slug: 'home-garden' },
  { id: 4, name: 'Toys', image: 'https://images.pexels.com/photos/163036/mario-luigi-figures-funny-163036.jpeg', slug: 'toys' }
])

const featuredProducts = ref([
  {
    id: '1',
    name: 'Wireless Earbuds',
    description: 'High-quality wireless earbuds with noise cancellation',
    price: 99.99,
    category: 'Electronics',
    images: ['https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg'],
    featured: true,
    inStock: true,
    quantity: 100,
    averageRating: 4.5
  },
  {
    id: '2',
    name: 'Premium T-Shirt',
    description: 'Comfortable cotton t-shirt for everyday wear',
    price: 29.99,
    category: 'Clothing',
    images: ['https://images.pexels.com/photos/5698851/pexels-photo-5698851.jpeg'],
    featured: true,
    inStock: true,
    quantity: 200,
    averageRating: 4.2
  },
  {
    id: '3',
    name: 'Smart Watch',
    description: 'Track your fitness and stay connected',
    price: 199.99,
    category: 'Electronics',
    images: ['https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg'],
    featured: true,
    inStock: true,
    quantity: 50,
    averageRating: 4.7
  },
  {
    id: '4',
    name: 'Bluetooth Speaker',
    description: 'Portable speaker with amazing sound quality',
    price: 79.99,
    category: 'Electronics',
    images: ['https://images.pexels.com/photos/1279107/pexels-photo-1279107.jpeg'],
    featured: true,
    inStock: true,
    quantity: 75,
    averageRating: 4.1
  }
])

const testimonials = ref([
  {
    name: 'Sarah Johnson',
    avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg',
    rating: 5,
    text: 'Absolutely love the products! Fast shipping and excellent customer service. Will definitely shop here again.'
  },
  {
    name: 'Michael Chen',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
    rating: 4,
    text: 'Great quality products at reasonable prices. The website is easy to navigate and checkout was seamless.'
  },
  {
    name: 'Emma Williams',
    avatar: 'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg',
    rating: 5,
    text: 'I\'ve ordered multiple times and have never been disappointed. The customer support team is amazing!'
  }
])

const subscribeNewsletter = () => {
  // In a real app, this would send to Firebase
  alert(`Thank you! ${email.value} has been subscribed to our newsletter.`)
  email.value = ''
}
</script>