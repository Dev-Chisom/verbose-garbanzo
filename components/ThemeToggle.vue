<template>
  <button
    @click="toggleColorMode"
    class="rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
  >
    <Icon
      v-if="isDark"
      name="heroicons:sun"
      size="24"
      class="text-gray-300 hover:text-white transition-colors"
    />
    <Icon
      v-else
      name="heroicons:moon"
      size="24"
      class="text-gray-600 hover:text-gray-900 transition-colors"
    />
  </button>
</template>

<script setup>
import { useColorMode } from '~/composables/useColorMode'

const { isDark, toggleColorMode } = useColorMode()
</script>