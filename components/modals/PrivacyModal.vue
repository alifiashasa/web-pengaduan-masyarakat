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
                class="w-12 h-12 rounded-2xl bg-[#E75A0F] flex items-center justify-center shrink-0 text-white shadow-xs"
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
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>

              <!-- Title & Subtitle -->
              <div>
                <h3 class="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                  {{ legalStore.privacyData?.title || 'Kebijakan Privasi' }}
                </h3>
                <p class="text-xs sm:text-sm text-[#757575] font-normal mt-0.5">
                  <span v-if="legalStore.privacyData?.updated_at">
                    Terakhir Diperbarui: {{ legalStore.privacyData.updated_at }}
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
              <div v-if="legalStore.loadingPrivacy" class="flex flex-col items-center justify-center py-10 gap-3">
                <svg class="animate-spin h-7 w-7 text-[#E75A0F]" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p class="text-xs text-gray-500 font-medium">Memuat Kebijakan Privasi...</p>
              </div>

              <!-- Error State -->
              <div v-else-if="legalStore.errorPrivacy" class="text-center py-8">
                <p class="text-sm text-red-500 mb-3">{{ legalStore.errorPrivacy }}</p>
                <button
                  type="button"
                  class="px-4 py-1.5 bg-gray-200 hover:bg-gray-300 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                  @click="legalStore.fetchPrivacy()"
                >
                  Coba Lagi
                </button>
              </div>

              <!-- Dynamic Content from API -->
              <div v-else-if="legalStore.privacyData?.content" class="whitespace-pre-line text-[#0A0A0A]">
                {{ legalStore.privacyData.content }}
              </div>

              <!-- Fallback Content if no API data yet -->
              <div v-else class="space-y-4">
                <p>
                  Privasi Anda sangat penting bagi kami. Kebijakan Privasi ini menjelaskan bagaimana
                  Vide mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda.
                </p>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="grid grid-cols-2 gap-3 sm:gap-4 pt-1">
              <button
                type="button"
                class="w-full py-3 sm:py-3.5 px-4 rounded-2xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-800 font-medium text-sm sm:text-base transition-colors shadow-2xs cursor-pointer"
                @click="$emit('close')"
              >
                Tutup
              </button>
              <button
                type="button"
                class="w-full py-3 sm:py-3.5 px-4 rounded-2xl bg-[#E75A0F] hover:bg-[#D44F0B] text-white font-medium text-sm sm:text-base transition-all shadow-sm active:scale-98 cursor-pointer"
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

const loadPrivacyIfNeeded = () => {
  if (!legalStore.privacyData && !legalStore.loadingPrivacy) {
    legalStore.fetchPrivacy();
  }
};

onMounted(() => {
  if (props.isOpen) {
    loadPrivacyIfNeeded();
  }
});

watch(
  () => props.isOpen,
  (newVal) => {
    if (newVal) {
      loadPrivacyIfNeeded();
    }
  }
);

const handleAccept = () => {
  emit('accept');
  emit('close');
};
</script>
