<template>
  <div class="min-h-screen flex flex-col bg-[#FEFFFF] text-gray-900 font-sans">
    <AppNavbar />
    <main class="flex-1 flex flex-col">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppNavbar from '@/components/AppNavbar.vue';
import AppFooter from '@/components/AppFooter.vue';
</script>
