<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Sign In</h1>
        <p class="mt-2 text-gray-600 dark:text-gray-400">
          Welcome back! Please sign in to your account.
        </p>
      </div>
      
      <div v-if="error" class="bg-error-100 border border-error-200 text-error-800 px-4 py-3 rounded relative" role="alert">
        <span class="block sm:inline">{{ error }}</span>
      </div>
      
      <form class="mt-8 space-y-6" @submit.prevent="login">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input
              id="email-address"
              v-model="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white dark:bg-gray-700 rounded-t-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10"
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
              autocomplete="current-password"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white dark:bg-gray-700 rounded-b-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10"
              placeholder="Password"
            />
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember-me"
              v-model="rememberMe"
              name="remember-me"
              type="checkbox"
              class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded"
            />
            <label for="remember-me" class="ml-2 block text-sm text-gray-900 dark:text-gray-300">
              Remember me
            </label>
          </div>

          <div class="text-sm">
            <NuxtLink to="/auth/forgot-password" class="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400">
              Forgot your password?
            </NuxtLink>
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            :disabled="loading"
          >
            <span v-if="loading" class="absolute left-0 inset-y-0 flex items-center pl-3">
              <LoadingSpinner class="h-5 w-5 text-primary-300" />
            </span>
            <span v-else class="absolute left-0 inset-y-0 flex items-center pl-3">
              <Icon name="heroicons:lock-closed" class="h-5 w-5 text-primary-400" />
            </span>
            {{ loading ? 'Signing in...' : 'Sign in' }}
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
          Don't have an account?
          <NuxtLink to="/auth/register" class="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400">
            Sign up
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useFirebaseAuth } from '~/composables/useFirebaseAuth'

const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const error = ref('')
const router = useRouter()
const route = useRoute()

const { login: firebaseLogin, loginWithGoogle: firebaseLoginWithGoogle, loading } = useFirebaseAuth()

const login = async () => {
  error.value = ''
  
  try {
    const result = await firebaseLogin(email.value, password.value)
    
    if (result.success) {
      // Redirect to the original requested page or homepage
      const redirectPath = route.query.redirect?.toString() || '/'
      router.push(redirectPath)
    } else {
      error.value = result.error || 'Failed to sign in. Please try again.'
    }
  } catch (err) {
    console.error('Login error:', err)
    error.value = 'An unexpected error occurred. Please try again.'
  }
}

const loginWithGoogle = async () => {
  error.value = ''
  
  try {
    const result = await firebaseLoginWithGoogle()
    
    if (result.success) {
      // Redirect to the original requested page or homepage
      const redirectPath = route.query.redirect?.toString() || '/'
      router.push(redirectPath)
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
  title: 'Sign In - ShopVue',
  meta: [
    { name: 'description', content: 'Sign in to your ShopVue account' }
  ]
})
</script>