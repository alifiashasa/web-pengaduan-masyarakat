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
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
        @click.self="$emit('close')"
      >
        <Transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="opacity-0 scale-95 translate-y-2"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="opacity-100 scale-100 translate-y-0"
          leave-to-class="opacity-0 scale-95 translate-y-2"
        >
          <div
            v-if="isOpen"
            class="bg-[#FEFFFF] rounded-[16px] shadow-[0_4px_15px_rgba(16,24,40,0.12)] w-full max-w-[420px] h-[160px] p-5 flex flex-col gap-[6px]"
          >
            <!-- Title -->
            <h2 class="text-[24px] font-semibold text-[#0A0A0A] leading-snug">
              Tinggalkan Layanan
            </h2>

            <!-- Description -->
            <p class="text-[16px] text-[#0A0A0ACC] leading-snug">
              Apakah kamu yakin untuk keluar dari layanan kami?
            </p>

            <!-- Action Buttons -->
            <div class="flex items-center gap-3 mt-auto">
              <!-- Ya Button -->
              <button
                type="button"
                class="flex-1 h-[40px] bg-[#F67011] hover:bg-[#e0620a] active:scale-[0.97] text-white text-base font-medium rounded-[10px] transition-all duration-150 cursor-pointer shadow-sm"
                @click="$emit('confirm')"
              >
                Ya
              </button>

              <!-- Kembali Button -->
              <button
                type="button"
                class="flex-1 h-[40px] bg-white hover:bg-gray-50 active:scale-[0.97] text-[#0A0A0A] text-base font-medium rounded-[10px] border border-[#E0E0E0] transition-all duration-150 cursor-pointer"
                @click="$emit('close')"
              >
                Kembali
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{
  isOpen: boolean;
}>();

defineEmits(['close', 'confirm']);
</script>
