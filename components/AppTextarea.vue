<template>
  <div class="w-full flex flex-col gap-1.5">
    <label v-if="label" :for="id" class="text-xs sm:text-sm font-medium text-gray-700">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    
    <textarea
      :id="id"
      :value="modelValue"
      :placeholder="placeholder"
      :rows="rows"
      :disabled="disabled"
      :required="required"
      :class="[
        'w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-orange/20 resize-y disabled:bg-gray-100 disabled:text-gray-400',
        error ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-brand-orange',
      ]"
      @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
    ></textarea>

    <p v-if="error" class="text-xs text-red-500">{{ error }}</p>
    <p v-else-if="hint" class="text-xs text-gray-500">{{ hint }}</p>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    modelValue: string;
    id?: string;
    label?: string;
    placeholder?: string;
    rows?: number;
    error?: string;
    hint?: string;
    required?: boolean;
    disabled?: boolean;
  }>(),
  {
    id: () => `textarea-${Math.random().toString(36).substr(2, 9)}`,
    placeholder: '',
    rows: 4,
    required: false,
    disabled: false,
  }
);

defineEmits(['update:modelValue']);
</script>
