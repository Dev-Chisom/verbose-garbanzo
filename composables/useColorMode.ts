import { ref, watch } from 'vue'
import { usePreferredDark } from '@vueuse/core'

const isDark = ref(false)
const prefersDark = usePreferredDark()

export function useColorMode() {
  const initColorMode = () => {
    if (process.client) {
      // Check for stored preference
      const storedMode = localStorage.getItem('color-mode')
      
      if (storedMode) {
        isDark.value = storedMode === 'dark'
      } else {
        // Otherwise use system preference
        isDark.value = prefersDark.value
      }
      
      // Apply dark class to html element
      updateColorMode()
    }
  }
  
  const toggleColorMode = () => {
    isDark.value = !isDark.value
    if (process.client) {
      localStorage.setItem('color-mode', isDark.value ? 'dark' : 'light')
      updateColorMode()
    }
  }
  
  const updateColorMode = () => {
    if (process.client) {
      // Remove both classes first to ensure clean state
      document.documentElement.classList.remove('light', 'dark')
      // Add appropriate class
      document.documentElement.classList.add(isDark.value ? 'dark' : 'light')
    }
  }
  
  // Watch for system preference changes
  watch(prefersDark, (newValue) => {
    if (process.client && !localStorage.getItem('color-mode')) {
      isDark.value = newValue
      updateColorMode()
    }
  })
  
  return {
    isDark,
    toggleColorMode,
    initColorMode
  }
}