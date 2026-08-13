<template>
  <div class="bg-white rounded-[20px] border border-[#EDEDED] p-5 sm:p-6 shadow-2xs hover:shadow-xs transition-shadow space-y-4">
    <!-- Header: Date & Status -->
    <div class="flex items-center justify-between gap-3">
      <div class="flex items-center gap-2 text-xs sm:text-sm text-[#757575] font-normal">
        <svg class="w-4 h-4 text-[#757575] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
        <span>{{ report.date }}</span>
      </div>
      <AppBadge :status="report.status" />
    </div>

    <!-- Description -->
    <p
      ref="descRef"
      :class="[
        'text-xs sm:text-sm text-gray-700 leading-relaxed font-normal',
        isExpanded ? '' : 'line-clamp-2'
      ]"
    >{{ report.description }}</p>

    <!-- Expand Toggle — hanya muncul jika deskripsi benar-benar overflow 2 baris -->
    <div v-if="isOverflowing" class="pt-0.5">
      <button
        type="button"
        class="text-[#F67011] text-xs sm:text-sm font-medium inline-flex items-center gap-1 hover:underline cursor-pointer focus:outline-none"
        @click="isExpanded = !isExpanded"
      >
        <span>{{ isExpanded ? 'Lebih Sedikit' : 'Lihat Selengkapnya' }}</span>
        <svg
          class="w-4 h-4 transition-transform duration-200"
          :class="{ 'rotate-180': isExpanded }"
          viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
    </div>

    <!-- File Box (PDF) — selalu tampil, tidak tergantung isExpanded -->
    <div
      v-if="report.files && report.files.length"
      class="bg-[#F8F9FA] border border-gray-100 rounded-xl p-2.5 px-3.5 flex items-center gap-3 w-fit max-w-[240px] shadow-2xs"
    >
      <div class="w-8 h-9 bg-[#E53935] rounded-md flex flex-col items-center justify-center shrink-0 shadow-2xs">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
        </svg>
      </div>
      <div class="flex flex-col text-left overflow-hidden">
        <span class="text-xs font-bold text-gray-800 truncate">{{ report.files[0].name }}</span>
        <span class="text-[10px] text-gray-400 leading-tight mt-0.5">{{ report.files[0].size }}</span>
      </div>
    </div>

    <!-- Image Thumbnails Gallery -->
    <div v-if="report.images && report.images.length > 0" class="flex items-center gap-2.5 pt-1 overflow-x-auto pb-1">
      <img
        v-for="(img, idx) in report.images"
        :key="idx"
        :src="img"
        alt="Foto Laporan"
        class="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-xl border border-gray-200/80 shadow-2xs shrink-0 cursor-pointer hover:opacity-90 transition-opacity"
        @click="$emit('view-detail', report)"
      />
    </div>

    <!-- Footer: Location & Cancel Action -->
    <div class="pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
      <div class="flex items-center gap-1.5 text-xs sm:text-sm text-[#757575] font-normal min-w-0">
        <svg class="w-4 h-4 shrink-0 text-[#757575]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
        <span class="truncate">{{ report.location || [report.province, report.city].filter(Boolean).join(', ') || 'Jl. Pemuda No.17, Kota Semarang' }}</span>
      </div>

      <button
        type="button"
        :class="[
          'px-5 py-2 border border-[#EOEOEO] text-xs sm:text-sm font-medium rounded-full transition-colors shrink-0 focus:outline-none',
          (report.status === 'dibatalkan' || report.status === 'ditolak' || report.status === 'selesai')
            ? 'text-[#757575] cursor-not-allowed bg-transparent'
            : 'text-[#FF5B4E] hover:bg-red-50 cursor-pointer'
        ]"
        :disabled="report.status === 'dibatalkan' || report.status === 'ditolak' || report.status === 'selesai'"
        @click="$emit('delete', report.id)"
      >
        Batalkan Laporan
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import AppBadge from './AppBadge.vue';
import type { ReportItem } from '@/composables/useReports';

const props = defineProps<{
  report: ReportItem;
}>();

defineEmits(['view-detail', 'delete']);

const isExpanded = ref(false);
const isOverflowing = ref(false);
const descRef = ref<HTMLParagraphElement | null>(null);

onMounted(async () => {
  await nextTick();
  detectOverflow();
});

/**
 * Deteksi apakah teks deskripsi benar-benar melebihi 2 baris secara aktual.
 * Ukur tinggi elemen saat line-clamp-2 aktif, lalu bandingkan dengan tinggi penuh
 * setelah clamp dilepas sementara. Ini satu-satunya cara yang akurat — bukan karakter.
 */
const detectOverflow = () => {
  const el = descRef.value;
  if (!el) return;

  // Ukur tinggi saat line-clamp-2 aktif
  const clampedHeight = el.clientHeight;

  // Lepas sementara clamp untuk mengukur tinggi penuh
  el.style.webkitLineClamp = 'unset';
  el.style.overflow = 'visible';
  el.style.display = 'block';
  const fullHeight = el.scrollHeight;

  // Kembalikan ke state semula (Tailwind class akan kembali aktif)
  el.style.webkitLineClamp = '';
  el.style.overflow = '';
  el.style.display = '';

  // Toleransi 4px untuk menghindari false positive akibat rounding pixel
  isOverflowing.value = fullHeight > clampedHeight + 4;
};
</script>
