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
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs"
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
            class="w-full max-w-[500px] rounded-[20px] bg-[#FEFFFF] p-6 shadow-[0_4px_15px_rgba(16,24,40,0.12)]"
          >
            <!-- Title -->
            <h3 class="text-[20px] font-bold text-[#0A0A0A] sm:text-[22px] leading-snug">
              Laporan Anda Dipertanggung Jawabkan
            </h3>

            <!-- Checkboxes -->
            <div class="mt-5 space-y-3.5">
              <label class="flex items-start gap-3 cursor-pointer select-none">
                <div class="relative flex items-center mt-0.5 shrink-0">
                  <input v-model="rulesAccepted" type="checkbox" class="sr-only" />
                  <div
                    class="flex h-5 w-5 items-center justify-center rounded-[5px] border-[1.5px] transition-all"
                    :class="
                      rulesAccepted ? 'bg-[#E75A0F] border-[#E75A0F]' : 'bg-white border-[#18171C]'
                    "
                  >
                    <svg
                      v-if="rulesAccepted"
                      viewBox="0 0 24 24"
                      class="h-3.5 w-3.5 text-white"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="3"
                    >
                      <path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </div>
                </div>
                <span class="text-[14px] text-[#0A0A0A] leading-snug">
                  Saya memenuhi
                  <button
                    type="button"
                    class="font-medium text-[#0066FF] hover:underline inline-block"
                    @click.stop="openTerms"
                  >
                    peraturan
                  </button>
                  yang berlaku
                </span>
              </label>

              <label class="flex items-start gap-3 cursor-pointer select-none">
                <div class="relative flex items-center mt-0.5 shrink-0">
                  <input v-model="responsibilityAccepted" type="checkbox" class="sr-only" />
                  <div
                    class="flex h-5 w-5 items-center justify-center rounded-[5px] border-[1.5px] transition-all"
                    :class="
                      responsibilityAccepted
                        ? 'bg-[#E75A0F] border-[#E75A0F]'
                        : 'bg-white border-[#18171C]'
                    "
                  >
                    <svg
                      v-if="responsibilityAccepted"
                      viewBox="0 0 24 24"
                      class="h-3.5 w-3.5 text-white"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="3"
                    >
                      <path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </div>
                </div>
                <span class="text-[14px] text-[#0A0A0A] leading-snug">
                  Laporan ini menjadi 100% tanggung jawab saya
                </span>
              </label>
            </div>

            <!-- Action Button -->
            <button
              type="button"
              :disabled="!canSubmit"
              class="mt-6 w-full rounded-[14px] bg-[#E75A0F] py-3.5 text-[15px] font-semibold text-white transition-all hover:bg-[#d64e05] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#E75A0F]"
              @click="handleConfirm"
            >
              Lanjutkan Laporan
            </button>
          </div>
        </Transition>
      </div>
    </Transition>

    <TermsModal :isOpen="showTermsModal" @close="showTermsModal = false" />
  </Teleport>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import TermsModal from './TermsModal.vue';

const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits(['close', 'confirm']);

const rulesAccepted = ref(false);
const responsibilityAccepted = ref(false);
const showTermsModal = ref(false);

const canSubmit = computed(() => rulesAccepted.value && responsibilityAccepted.value);

watch(
  () => props.isOpen,
  (newVal) => {
    if (!newVal) {
      rulesAccepted.value = false;
      responsibilityAccepted.value = false;
    }
  }
);

const openTerms = () => {
  showTermsModal.value = true;
};

const handleConfirm = () => {
  if (canSubmit.value) {
    emit('confirm');
  }
};
</script>
