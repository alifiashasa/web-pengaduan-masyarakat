<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-6">
    <p class="text-sm text-gray-500">Mengalihkan ke halaman autentikasi...</p>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'auth',
  middleware: [
    () => {
      return navigateTo('/auth/login', { replace: true });
    },
  ],
});

if (import.meta.client) {
  navigateTo('/auth/login', { replace: true });
}
</script>
