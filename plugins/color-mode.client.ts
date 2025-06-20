export default defineNuxtPlugin(() => {
  // Prevent flash of unstyled content
  const colorMode = localStorage.getItem('color-mode')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  
  const isDark = colorMode ? colorMode === 'dark' : prefersDark
  
  // Apply theme immediately
  document.documentElement.classList.add(isDark ? 'dark' : 'light')
}) 