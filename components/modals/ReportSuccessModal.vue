<template>
  <AppModal :isOpen="isOpen" title="Laporan Berhasil Dikirim" maxWidth="md" @close="$emit('close')">
    <div class="flex flex-col items-center text-center space-y-4 py-3">
      <div class="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h4 class="text-base font-bold text-gray-900">Laporan Anda Telah Terkirim!</h4>

      <p class="text-xs sm:text-sm text-gray-600">
        Terima kasih atas partisipasi Anda. Laporan pengaduan telah diteruskan ke tim verifikator dan akan segera ditindaklanjuti.
      </p>

      <div class="w-full flex flex-col sm:flex-row gap-3 pt-2">
        <NuxtLink to="/profile/riwayat" class="w-full" @click="$emit('close')">
          <AppButton variant="primary" fullWidth size="md">LIHAT RIWAYAT</AppButton>
        </NuxtLink>
        <AppButton variant="ghost" fullWidth size="md" @click="$emit('close')">Kembali ke Beranda</AppButton>
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
