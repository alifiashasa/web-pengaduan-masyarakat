<template>
  <AppModal :isOpen="isOpen" title="Masuk Terlebih Dahulu" maxWidth="md" @close="$emit('close')">
    <div class="flex flex-col items-center text-center space-y-4 py-2">
      <div
        class="w-16 h-16 rounded-full bg-orange-100 text-brand-orange flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      </div>

      <p class="text-sm text-gray-600">
        Anda harus masuk ke akun masyarakat terlebih dahulu sebelum dapat membuat dan mengirimkan
        laporan pengaduan.
      </p>

      <div class="w-full flex flex-col sm:flex-row gap-3 pt-2">
        <NuxtLink to="/auth/login" class="w-full" @click="$emit('close')">
          <AppButton variant="primary" fullWidth size="md">MASUK SEKARANG</AppButton>
        </NuxtLink>
        <NuxtLink to="/auth/register" class="w-full" @click="$emit('close')">
          <AppButton variant="secondary" fullWidth size="md">BUAT AKUN</AppButton>
        </NuxtLink>
      </div>
    </div>
  </AppModal>
</template>

<script setup lang="ts">
import AppModal from '../AppModal.vue';
import AppButton from '../AppButton.vue';

defineProps<{
  isOpen: boolean;
}>();

defineEmits(['close']);
</script>
