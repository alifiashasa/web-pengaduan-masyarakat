<template>
  <div class="w-full flex flex-col gap-1.5">
    <label v-if="label" :for="id" class="text-xs sm:text-sm font-medium text-gray-700">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>

    <div class="relative w-full">
      <select
        :id="id"
        :value="modelValue"
        :disabled="disabled"
        :required="required"
        :class="[
          'w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white text-gray-900 appearance-none transition-colors focus:outline-none focus:ring-2 focus:ring-brand-orange/20 disabled:bg-gray-100 disabled:text-gray-400 cursor-pointer pr-10',
          error
            ? 'border-red-500 focus:border-red-500'
            : 'border-gray-300 focus:border-brand-orange',
        ]"
        @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
      >
        <option value="" disabled selected hidden>{{ placeholder }}</option>
        <option v-for="(item, idx) in formattedOptions" :key="idx" :value="item.value">
          {{ item.label }}
        </option>
      </select>

      <!-- Custom Arrow Icon -->
      <div class="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>

    <p v-if="error" class="text-xs text-red-500">{{ error }}</p>
    <p v-else-if="hint" class="text-xs text-gray-500">{{ hint }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface OptionItem {
  label: string;
  value: string | number;
}

const props = withDefaults(
  defineProps<{
    modelValue: string | number;
    options: Array<string | OptionItem>;
    id?: string;
    label?: string;
    placeholder?: string;
    error?: string;
    hint?: string;
    required?: boolean;
    disabled?: boolean;
  }>(),
  {
    id: () => `select-${Math.random().toString(36).substr(2, 9)}`,
    placeholder: 'Pilih...',
    required: false,
    disabled: false,
  }
);

defineEmits(['update:modelValue']);

const formattedOptions = computed(() => {
  return props.options.map((opt) => {
    if (typeof opt === 'string') {
      return { label: opt, value: opt };
    }
    return opt;
  });
});
</script>
