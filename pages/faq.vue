<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-3xl mx-auto">
      <h1 class="text-3xl font-bold mb-8">Frequently Asked Questions</h1>
      
      <div class="space-y-6">
        <div v-for="(category, index) in faqCategories" :key="index">
          <h2 class="text-xl font-semibold mb-4">{{ category.title }}</h2>
          
          <div class="space-y-4">
            <div 
              v-for="(item, itemIndex) in category.items" 
              :key="itemIndex"
              class="card"
            >
              <button
                class="w-full text-left px-6 py-4 flex items-center justify-between"
                @click="item.isOpen = !item.isOpen"
              >
                <span class="font-medium">{{ item.question }}</span>
                <Icon
                  :name="item.isOpen ? 'heroicons:chevron-up' : 'heroicons:chevron-down'"
                  size="20"
                  class="text-gray-500"
                />
              </button>
              
              <div 
                v-show="item.isOpen"
                class="px-6 pb-4 prose dark:prose-invert"
              >
                <p>{{ item.answer }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="mt-12 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <h2 class="text-xl font-semibold mb-4">Still Have Questions?</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-4">
          Can't find the answer you're looking for? Please chat to our friendly team.
        </p>
        <NuxtLink to="/contact" class="btn btn-primary">
          Contact Us
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const faqCategories = ref([
  {
    title: 'Shopping & Orders',
    items: [
      {
        question: 'How do I place an order?',
        answer: 'Browse our products, add items to your cart, and proceed to checkout. You can pay using various payment methods including credit cards and PayPal.',
        isOpen: false
      },
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay.',
        isOpen: false
      },
      {
        question: 'How can I track my order?',
        answer: 'Once your order ships, you\'ll receive a tracking number via email. You can also track your order in your account dashboard.',
        isOpen: false
      }
    ]
  },
  {
    title: 'Shipping & Delivery',
    items: [
      {
        question: 'How long does shipping take?',
        answer: 'Standard shipping takes 3-5 business days. Express shipping is available for 1-2 business days delivery.',
        isOpen: false
      },
      {
        question: 'Do you ship internationally?',
        answer: 'Yes, we ship to most countries worldwide. International shipping typically takes 7-14 business days.',
        isOpen: false
      },
      {
        question: 'Is shipping free?',
        answer: 'We offer free standard shipping on orders over $50 within the continental United States.',
        isOpen: false
      }
    ]
  },
  {
    title: 'Returns & Refunds',
    items: [
      {
        question: 'What is your return policy?',
        answer: 'We accept returns within 30 days of purchase. Items must be unused and in original packaging.',
        isOpen: false
      },
      {
        question: 'How do I initiate a return?',
        answer: 'Log into your account, go to your orders, and select "Return Item". Follow the instructions to print your return label.',
        isOpen: false
      },
      {
        question: 'How long do refunds take?',
        answer: 'Refunds are processed within 3-5 business days after we receive your return.',
        isOpen: false
      }
    ]
  }
])

useHead({
  title: 'FAQ - ShopVue',
  meta: [
    { name: 'description', content: 'Find answers to frequently asked questions about shopping with ShopVue' }
  ]
})
</script>