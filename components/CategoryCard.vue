<template>
  <NuxtLink 
    :to="`/products?category=${category.slug}`" 
    class="group relative block h-64 overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl"
  >
    <img 
      :src="category.image" 
      :alt="category.name" 
      class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
    />
    <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
      <div class="p-4 w-full">
        <h3 class="text-white text-xl font-semibold mb-1">{{ category.name }}</h3>
        <div class="flex items-center text-white/80 transition-transform duration-300 transform translate-x-0 group-hover:translate-x-2">
          <span class="text-sm">Shop Now</span>
          <Icon name="heroicons:arrow-right" size="16" class="ml-1" />
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
defineProps({
  category: {
    type: Object,
    required: true
  }
})
</script>