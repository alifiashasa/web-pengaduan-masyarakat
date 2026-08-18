<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
        @click.self="$emit('close')"
      >
        <Transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
        >
          <div
            v-if="isOpen"
            class="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden p-6 sm:p-7 flex flex-col font-geist"
          >
            <!-- Header Section -->
            <div class="flex items-center gap-4 mb-5">
              <!-- Icon Box -->
              <div
                class="w-12 h-12 rounded-xl bg-[#E75A0F] flex items-center justify-center shrink-0 text-white shadow-xs"
              >
                <svg
                  class="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <line x1="10" y1="9" x2="8" y2="9" />
                </svg>
              </div>

              <!-- Title & Subtitle -->
              <div>
                <h3 class="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                  {{ legalStore.termsData?.title || 'Syarat & Ketentuan' }}
                </h3>
                <p class="text-xs sm:text-sm text-[#757575] font-regular mt-0.5">
                  <span v-if="legalStore.termsData?.updated_at">
                    Terakhir Diperbarui: {{ legalStore.termsData.updated_at }}
                  </span>
                  <span v-else>Terakhir Diperbarui: 13 Januari 2026</span>
                </p>
              </div>
            </div>

            <!-- Scrollable Content Box -->
            <div
              class="bg-gray-50/80 border border-gray-100/80 rounded-2xl p-5 mb-6 max-h-[360px] sm:max-h-[400px] overflow-y-auto text-xs sm:text-sm text-[#0A0A0A] leading-relaxed"
            >
              <!-- Loading State -->
              <div v-if="legalStore.loadingTerms" class="flex flex-col items-center justify-center py-10 gap-3">
                <svg class="animate-spin h-7 w-7 text-[#E75A0F]" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p class="text-xs text-gray-500 font-medium">Memuat Syarat & Ketentuan...</p>
              </div>

              <!-- Error State -->
              <div v-else-if="legalStore.errorTerms" class="text-center py-8">
                <p class="text-sm text-red-500 mb-3">{{ legalStore.errorTerms }}</p>
                <button
                  type="button"
                  class="px-4 py-1.5 bg-gray-200 hover:bg-gray-300 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                  @click="legalStore.fetchTerms()"
                >
                  Coba Lagi
                </button>
              </div>

              <!-- Dynamic Content from API -->
              <div v-else-if="legalStore.termsData?.content" class="whitespace-pre-line text-[#0A0A0A]">
                {{ legalStore.termsData.content }}
              </div>

              <!-- Fallback Content if no API data yet -->
              <div v-else class="space-y-4">
                <p>
                  Selamat datang di Vide. Dengan mengakses dan menggunakan platform ini, Anda dianggap
                  telah membaca, memahami, dan menyetujui untuk terikat oleh Syarat dan Ketentuan
                  berikut.
                </p>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="grid grid-cols-2 gap-3 sm:gap-4 pt-1">
              <button
                type="button"
                class="w-full py-3 sm:py-3.5 px-4 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-800 font-medium text-sm sm:text-base transition-colors shadow-2xs cursor-pointer"
                @click="$emit('close')"
              >
                Tutup
              </button>
              <button
                type="button"
                class="w-full py-3 sm:py-3.5 px-4 rounded-xl bg-[#E75A0F] hover:bg-[#D44F0B] text-white font-medium text-sm sm:text-base transition-all shadow-sm active:scale-98 cursor-pointer"
                @click="handleAccept"
              >
                Saya Mengerti
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { watch, onMounted } from 'vue';
import { useLegalStore } from '@/stores/legal';

const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits(['close', 'accept']);
const legalStore = useLegalStore();

const loadTermsIfNeeded = () => {
  if (!legalStore.termsData && !legalStore.loadingTerms) {
    legalStore.fetchTerms();
  }
};

onMounted(() => {
  if (props.isOpen) {
    loadTermsIfNeeded();
  }
});

watch(
  () => props.isOpen,
  (newVal) => {
    if (newVal) {
      loadTermsIfNeeded();
    }
  }
);

const handleAccept = () => {
  emit('accept');
  emit('close');
};
</script>
