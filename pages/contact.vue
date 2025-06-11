<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-3xl mx-auto">
      <h1 class="text-3xl font-bold mb-8">Contact Us</h1>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div>
          <h2 class="text-xl font-semibold mb-4">Get in Touch</h2>
          <p class="text-gray-600 dark:text-gray-300 mb-6">
            Have a question or feedback? We'd love to hear from you. Fill out the form
            and we'll get back to you as soon as possible.
          </p>
          
          <div class="space-y-4">
            <div class="flex items-center">
              <Icon name="heroicons:envelope" size="24" class="text-primary-600 mr-3" />
              <div>
                <h3 class="font-medium">Email</h3>
                <p class="text-gray-600 dark:text-gray-300">support@shopvue.com</p>
              </div>
            </div>
            
            <div class="flex items-center">
              <Icon name="heroicons:phone" size="24" class="text-primary-600 mr-3" />
              <div>
                <h3 class="font-medium">Phone</h3>
                <p class="text-gray-600 dark:text-gray-300">1-800-SHOPVUE</p>
              </div>
            </div>
            
            <div class="flex items-center">
              <Icon name="heroicons:map-pin" size="24" class="text-primary-600 mr-3" />
              <div>
                <h3 class="font-medium">Address</h3>
                <p class="text-gray-600 dark:text-gray-300">
                  123 Commerce St<br>
                  New York, NY 10001
                </p>
              </div>
            </div>
            
            <div class="flex items-center">
              <Icon name="heroicons:clock" size="24" class="text-primary-600 mr-3" />
              <div>
                <h3 class="font-medium">Business Hours</h3>
                <p class="text-gray-600 dark:text-gray-300">
                  Monday - Friday: 9am - 5pm EST
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="card p-6">
          <form @submit.prevent="submitForm">
            <div class="space-y-4">
              <div>
                <label for="name" class="form-label">Name</label>
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  class="form-input"
                  required
                />
              </div>
              
              <div>
                <label for="email" class="form-label">Email</label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  class="form-input"
                  required
                />
              </div>
              
              <div>
                <label for="subject" class="form-label">Subject</label>
                <input
                  id="subject"
                  v-model="form.subject"
                  type="text"
                  class="form-input"
                  required
                />
              </div>
              
              <div>
                <label for="message" class="form-label">Message</label>
                <textarea
                  id="message"
                  v-model="form.message"
                  rows="5"
                  class="form-input"
                  required
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                class="btn btn-primary w-full"
                :disabled="loading"
              >
                <template v-if="loading">
                  <LoadingSpinner class="w-5 h-5 mr-2" />
                  Sending...
                </template>
                <template v-else>
                  Send Message
                </template>
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <!-- Map -->
      <div class="rounded-lg overflow-hidden h-64 bg-gray-200 dark:bg-gray-700">
        <img 
          src="https://images.pexels.com/photos/2422461/pexels-photo-2422461.jpeg"
          alt="Location Map"
          class="w-full h-full object-cover"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const loading = ref(false)
const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const submitForm = async () => {
  loading.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Reset form
    form.name = ''
    form.email = ''
    form.subject = ''
    form.message = ''
    
    // Show success message
    alert('Thank you for your message. We will get back to you soon!')
  } catch (error) {
    console.error('Error sending message:', error)
    alert('Failed to send message. Please try again.')
  } finally {
    loading.value = false
  }
}

useHead({
  title: 'Contact Us - ShopVue',
  meta: [
    { name: 'description', content: 'Get in touch with ShopVue. We\'re here to help!' }
  ]
})
</script>