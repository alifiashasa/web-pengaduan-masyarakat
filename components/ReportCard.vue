<template>
  <div class="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 shadow-card hover:shadow-md transition-shadow">
    <!-- Header: Date & Status -->
    <div class="flex flex-wrap items-center justify-between gap-3 mb-3">
      <div class="flex items-center gap-2 text-xs text-gray-500">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span>{{ report.date }}</span>
      </div>
      <AppBadge :status="report.status" />
    </div>

    <!-- Title & Location -->
    <h3 class="text-base sm:text-lg font-bold text-gray-900 mb-1">
      {{ report.title || 'Laporan Pengaduan' }}
    </h3>
    
    <div class="flex items-center gap-2 text-xs text-gray-500 mb-3">
      <span v-if="report.category" class="font-medium text-brand-orange bg-brand-orange-light px-2.5 py-0.5 rounded-md">
        {{ report.category }}
      </span>
      <span v-if="report.category">•</span>
      <span>{{ report.location || [report.province, report.city].filter(Boolean).join(', ') || 'Lokasi tidak ditentukan' }}</span>
    </div>

    <!-- Description -->
    <p class="text-xs sm:text-sm text-gray-600 line-clamp-2 leading-relaxed mb-4">
      {{ report.description }}
    </p>

    <!-- Attachments preview -->
    <div v-if="report.images && report.images.length > 0" class="flex gap-2 mb-4 overflow-x-auto pb-1">
      <template v-for="(img, idx) in report.images" :key="idx">
        <div
          v-if="img.startsWith('data:application/pdf') || img.toLowerCase().includes('.pdf')"
          class="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-gray-700 flex-shrink-0 h-16 sm:h-20"
        >
          <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100 text-red-600 font-bold text-[10px]">
            PDF
          </div>
          <span class="font-medium text-gray-600 text-xs">Dokumen PDF</span>
        </div>
        <img
          v-else
          :src="img"
          alt="Foto Laporan"
          class="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl border border-gray-100 flex-shrink-0"
        />
      </template>
    </div>

    <!-- Footer Actions -->
    <div class="flex items-center justify-between pt-4 border-t border-gray-100">
      <button
        type="button"
        class="text-xs font-semibold text-red-600 hover:text-red-700 flex items-center gap-1.5 transition-colors focus:outline-none"
        @click="$emit('delete', report.id)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
        Hapus
      </button>

      <AppButton variant="secondary" size="sm" @click="$emit('view-detail', report)">
        Detail Laporan
      </AppButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppBadge from './AppBadge.vue';
import AppButton from './AppButton.vue';
import type { ReportItem } from '@/composables/useReports';

defineProps<{
  report: ReportItem;
}>();

defineEmits(['view-detail', 'delete']);
</script>
