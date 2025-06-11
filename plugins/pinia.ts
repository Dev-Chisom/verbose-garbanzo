import { defineNuxtPlugin } from '#app'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import type { Pinia } from 'pinia'

export default defineNuxtPlugin((nuxtApp) => {
  const pinia = nuxtApp.$pinia as Pinia
  
  // Only use the persistence plugin on the client side
  if (process.client) {
    pinia.use(piniaPluginPersistedstate)
  }
}) 