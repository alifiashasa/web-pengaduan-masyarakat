import { useAuthStore } from '@/stores/auth';

export default defineNuxtPlugin(() => {
  const authStore = useAuthStore();
  // Restore token & user dari cookie saat app di-load (SSR & Client)
  authStore.initAuth();
});
