<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 translate-y-4 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 translate-y-4 scale-95"
    >
      <div
        v-if="show"
        class="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 max-w-md w-[90%] sm:w-auto min-w-[320px] sm:min-w-[380px] bg-[#E8F7EE] border border-[#D1FDD7] px-6 py-3.5 sm:px-7 sm:py-4 rounded-md shadow-lg shadow-emerald-900/5 flex items-center justify-between gap-6 font-geist"
        style="border-radius: 8px"
      >
        <!-- Success Message -->
        <p class="text-sm sm:text-base font-semibold text-[#0E9B77] leading-snug">
          {{ message }}
        </p>

        <!-- Close Button -->
        <button
          type="button"
          class="text-xs sm:text-sm font-medium text-[#0A0A0A] hover:text-emerald-800 transition-colors shrink-0 cursor-pointer"
          @click="$emit('close')"
        >
          Tutup
        </button>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{
  show: boolean;
  message: string;
}>();

defineEmits(['close']);
</script>
