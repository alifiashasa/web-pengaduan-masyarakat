<template>
  <span
    :class="[
      'h-[30px] inline-flex items-center justify-center px-3.5 rounded-full text-sm font-medium shadow-2xs whitespace-nowrap',
      statusConfig.classes
    ]"
  >
    {{ statusConfig.label }}
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';

type StatusType = 'terkirim' | 'pending' | 'proses' | 'diproses' | 'ditangani' | 'selesai' | 'dibatalkan' | 'ditolak';

const props = defineProps<{
  status: StatusType;
}>();

const statusConfig = computed(() => {
  switch (props.status) {
    case 'terkirim':
    case 'pending':
      return {
        label: 'Terkirim',
        classes: 'bg-[#F67011] text-white',
      };
    case 'diproses':
    case 'proses':
      return {
        label: 'Diproses',
        classes: 'bg-[#298FF4] text-white',
      };
    case 'ditangani':
      return {
        label: 'Ditangani',
        classes: 'bg-[#14B97F] text-white',
      };
    case 'selesai':
      return {
        label: 'Selesai',
        classes: 'bg-[#18171C] text-white',
      };
    case 'dibatalkan':
    case 'ditolak':
      return {
        label: 'Dibatalkan',
        classes: 'bg-[#F5F5F5] text-[#757575]',
      };
    default:
      return {
        label: 'Terkirim',
        classes: 'bg-[#F67011] text-white',
      };
  }
});
</script>
