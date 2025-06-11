<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Create Account</h1>
        <p class="mt-2 text-gray-600 dark:text-gray-400">
          Join ShopVue to start shopping with us!
        </p>
      </div>
      
      <div v-if="error" class="bg-error-100 border border-error-200 text-error-800 px-4 py-3 rounded relative" role="alert">
        <span class="block sm:inline">{{ error }}</span>
      </div>
      
      <form class="mt-8 space-y-6" @submit.prevent="register">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="name" class="sr-only">Full Name</label>
            <input
              id="name"
              v-model="name"
              name="name"
              type="text"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white dark:bg-gray-700 rounded-t-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10"
              placeholder="Full Name"
            />
          </div>
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input
              id="email-address"
              v-model="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white dark:bg-gray-700 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10"
              placeholder="Email address"
            />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              id="password"
              v-model="password"
              name="password"
              type="password"
              autocomplete="new-password"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white dark:bg-gray-700 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10"
              placeholder="Password (minimum 6 characters)"
              minlength="6"
            />
          </div>
          <div>
            <label for="confirm-password" class="sr-only">Confirm Password</label>
            <input
              id="confirm-password"
              v-model="confirmPassword"
              name="confirm-password"
              type="password"
              autocomplete="new-password"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white dark:bg-gray-700 rounded-b-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10"
              placeholder="Confirm Password"
              minlength="6"
            />
          </div>
        </div>

        <div class="flex items-center">
          <input
            id="terms"
            v-model="acceptTerms"
            name="terms"
            type="checkbox"
            required
            class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded"
          />
          <label for="terms" class="ml-2 block text-sm text-gray-900 dark:text-gray-300">
            I agree to the 
            <NuxtLink to="/terms" class="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400">
              Terms of Service
            </NuxtLink>
            and
            <NuxtLink to="/privacy" class="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400">
              Privacy Policy
            </NuxtLink>
          </label>
        </div>

        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            :disabled="loading || !isFormValid"
          >
            <span v-if="loading" class="absolute left-0 inset-y-0 flex items-center pl-3">
              <LoadingSpinner class="h-5 w-5 text-primary-300" />
            </span>
            <span v-else class="absolute left-0 inset-y-0 flex items-center pl-3">
              <Icon name="heroicons:user-plus" class="h-5 w-5 text-primary-400" />
            </span>
            {{ loading ? 'Creating account...' : 'Create account' }}
          </button>
        </div>
        
        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400">
                Or continue with
              </span>
            </div>
          </div>

          <div class="mt-6">
            <button
              type="button"
              @click="loginWithGoogle"
              class="w-full flex items-center justify-center px-4 py-3 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
              :disabled="loading"
            >
              <Icon name="mdi:google" class="h-5 w-5 mr-2" />
              Google
            </button>
          </div>
        </div>
      </form>
      
      <div class="text-center mt-4">
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Already have an account?
          <NuxtLink to="/auth/login" class="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400">
            Sign in
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useFirebaseAuth } from '~/composables/useFirebaseAuth'

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const acceptTerms = ref(false)
const error = ref('')
const router = useRouter()

const { register: firebaseRegister, loginWithGoogle: firebaseLoginWithGoogle, loading } = useFirebaseAuth()

const isFormValid = computed(() => {
  return (
    name.value.trim() !== '' &&
    email.value.trim() !== '' &&
    password.value.length >= 6 &&
    password.value === confirmPassword.value &&
    acceptTerms.value
  )
})

const register = async () => {
  if (!isFormValid.value) {
    if (password.value !== confirmPassword.value) {
      error.value = 'Passwords do not match'
    } else if (password.value.length < 6) {
      error.value = 'Password must be at least 6 characters long'
    }
    return
  }
  
  error.value = ''
  
  try {
    const result = await firebaseRegister(email.value, password.value, name.value)
    
    if (result.success) {
      router.push('/')
    } else {
      error.value = result.error || 'Failed to create account. Please try again.'
    }
  } catch (err) {
    console.error('Registration error:', err)
    error.value = 'An unexpected error occurred. Please try again.'
  }
}

const loginWithGoogle = async () => {
  if (!acceptTerms.value) {
    error.value = 'You must accept the Terms of Service and Privacy Policy'
    return
  }
  
  error.value = ''
  
  try {
    const result = await firebaseLoginWithGoogle()
    
    if (result.success) {
      router.push('/')
    } else {
      error.value = result.error || 'Failed to sign in with Google. Please try again.'
    }
  } catch (err) {
    console.error('Google login error:', err)
    error.value = 'An unexpected error occurred. Please try again.'
  }
}

// Set page metadata
useHead({
  title: 'Create Account - ShopVue',
  meta: [
    { name: 'description', content: 'Create a new account on ShopVue' }
  ]
})
</script>