<template>
  <div class="flex flex-col min-h-screen">
    <TheHeader />
    <main class="flex-grow container mx-auto px-4 py-8">
      <slot />
    </main>
    <TheFooter />
  </div>
</template>

<script setup>
// Default layout with header/footer
</script>