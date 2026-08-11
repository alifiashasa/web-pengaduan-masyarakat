<template>
  <div class="min-h-screen flex flex-col bg-neutral-50 text-gray-900 font-sans">
    <AppNavbar v-if="!isProfilePage" />
    <main class="flex-1 flex flex-col">
      <slot />
    </main>
    <AppFooter v-if="!isProfilePage" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import AppNavbar from '@/components/AppNavbar.vue';
import AppFooter from '@/components/AppFooter.vue';

const route = useRoute();
const isProfilePage = computed(() => route.path.startsWith('/profile'));
</script>
