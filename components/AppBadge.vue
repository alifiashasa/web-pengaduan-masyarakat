<template>
  <span
    :class="[
      'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border',
      statusConfig.classes
    ]"
  >
    <span :class="['w-1.5 h-1.5 rounded-full', statusConfig.dot]"></span>
    {{ statusConfig.label }}
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';

type StatusType = 'pending' | 'proses' | 'selesai' | 'ditolak';

const props = defineProps<{
  status: StatusType;
}>();

const statusConfig = computed(() => {
  switch (props.status) {
    case 'pending':
      return {
        label: 'Menunggu Verifikasi',
        classes: 'bg-amber-50 text-amber-700 border-amber-200',
        dot: 'bg-amber-500',
      };
    case 'proses':
      return {
        label: 'Dalam Proses',
        classes: 'bg-blue-50 text-blue-700 border-blue-200',
        dot: 'bg-blue-500',
      };
    case 'selesai':
      return {
        label: 'Selesai',
        classes: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        dot: 'bg-emerald-500',
      };
    case 'ditolak':
      return {
        label: 'Ditolak',
        classes: 'bg-red-50 text-red-700 border-red-200',
        dot: 'bg-red-500',
      };
    default:
      return {
        label: 'Menunggu',
        classes: 'bg-gray-50 text-gray-700 border-gray-200',
        dot: 'bg-gray-400',
      };
  }
});
</script>
