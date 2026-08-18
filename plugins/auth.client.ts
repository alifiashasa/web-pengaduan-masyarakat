import { useAuthStore } from '@/stores/auth';

export default defineNuxtPlugin(() => {
  const authStore = useAuthStore();
  // Restore token dari cookie saat pertama kali app di-load di client
  authStore.initAuth();
});
