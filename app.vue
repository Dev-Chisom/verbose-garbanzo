<template>
  <div class="min-h-screen flex flex-col">
    <NuxtLayout>
      <NuxtLoadingIndicator color="#2563EB" />
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
import { useFirebaseAuth } from '~/composables/useFirebaseAuth'
import { useColorMode } from '~/composables/useColorMode'

// Initialize authentication
const { initializeAuth } = useFirebaseAuth()
initializeAuth()

// Initialize color mode
const { initColorMode } = useColorMode()
initColorMode()
</script>