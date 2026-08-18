<template>
  <span
    :class="[
      'h-[30px] inline-flex items-center justify-center px-3.5 rounded-full text-sm font-medium shadow-2xs whitespace-nowrap',
      statusConfig.classes,
    ]"
  >
    {{ statusConfig.label }}
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';

type StatusType =
  | 'terkirim'
  | 'pending'
  | 'in_review'
  | 'proses'
  | 'diproses'
  | 'in_progress'
  | 'ditangani'
  | 'selesai'
  | 'resolved'
  | 'dibatalkan'
  | 'cancelled'
  | 'ditolak'
  | string;

const props = defineProps<{
  status: StatusType;
  statusLabel?: string;
}>();

const statusConfig = computed(() => {
  const customLabel = props.statusLabel;
  const s = String(props.status).toLowerCase();

  if (s === 'terkirim' || s === 'pending') {
    return {
      label: customLabel || 'Terkirim',
      classes: 'bg-[#F67011] text-white',
    };
  }
  if (s === 'in_review' || s === 'review') {
    return {
      label: customLabel || 'Dalam Review',
      classes: 'bg-[#F59E0B] text-white',
    };
  }
  if (s === 'diproses' || s === 'proses' || s === 'in_progress') {
    return {
      label: customLabel || 'Sedang Diproses',
      classes: 'bg-[#298FF4] text-white',
    };
  }
  if (s === 'ditangani') {
    return {
      label: customLabel || 'Ditangani',
      classes: 'bg-[#14B97F] text-white',
    };
  }
  if (s === 'selesai' || s === 'resolved') {
    return {
      label: customLabel || 'Selesai',
      classes: 'bg-[#18171C] text-white',
    };
  }
  if (s === 'dibatalkan' || s === 'cancelled' || s === 'ditolak') {
    return {
      label: customLabel || 'Dibatalkan',
      classes: 'bg-[#F5F5F5] text-[#757575]',
    };
  }

  return {
    label: customLabel || props.status || 'Terkirim',
    classes: 'bg-[#F67011] text-white',
  };
});
</script>
