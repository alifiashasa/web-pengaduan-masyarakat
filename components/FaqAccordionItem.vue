<template>
  <div>
    <!-- Divider on top -->
    <div v-if="!first" class="border-t border-[#EDEDED]" />

    <!-- Question row -->
    <button
      type="button"
      class="flex w-full items-center justify-between gap-4 py-5 text-left focus:outline-none"
      :aria-expanded="isOpen"
      @click="toggle"
    >
      <span class="text-[15px] font-medium leading-[1.5] text-[#0A0A0A]">
        {{ question }}
      </span>

      <!-- Chevron icon -->
      <span
        class="flex h-6 w-6 shrink-0 items-center justify-center text-[#0A0A0A] transition-transform duration-200"
        :class="isOpen ? 'rotate-180' : 'rotate-0'"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 7.5L10 12.5L15 7.5"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
    </button>

    <!-- Answer panel -->
    <div v-if="isOpen" class="pb-5">
      <p class="text-[13px] leading-[1.75] text-[#555555]">
        {{ answer }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  first?: boolean;
  question: string;
  answer: string;
  defaultOpen?: boolean;
}>();

const isOpen = ref(props.defaultOpen ?? false);

const toggle = () => {
  isOpen.value = !isOpen.value;
};
</script>
