<template>
  <AppModal :isOpen="isOpen" title="Hapus Pengaduan" maxWidth="md" @close="$emit('close')">
    <div class="flex flex-col items-center text-center space-y-4 py-2">
      <div class="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
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
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </div>

      <h4 class="text-base font-bold text-gray-900">Yakin Ingin Menghapus Laporan Ini?</h4>
      <p class="text-xs sm:text-sm text-gray-500">
        Tindakan ini tidak dapat dibatalkan. Laporan yang sudah dihapus akan hilang secara permanen
        dari sistem.
      </p>

      <div class="w-full flex flex-col sm:flex-row gap-3 pt-2">
        <AppButton variant="secondary" fullWidth size="md" @click="$emit('close')">BATAL</AppButton>
        <AppButton variant="danger" fullWidth size="md" @click="$emit('confirm')"
          >YA, HAPUS LAPORAN</AppButton
        >
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

defineEmits(['close', 'confirm']);
</script>
