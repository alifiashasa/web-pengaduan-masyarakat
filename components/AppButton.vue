<template>
  <button
    :type="type || 'button'"
    :disabled="disabled || loading"
    :class="[
      'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer',
      variantClasses,
      sizeClasses,
      fullWidth ? 'w-full' : '',
      roundedClasses,
    ]"
    @click="$emit('click', $event)"
  >
    <svg
      v-if="loading"
      class="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
    <slot name="icon-left" />
    <span><slot /></span>
    <slot name="icon-right" />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    type?: 'button' | 'submit' | 'reset';
    variant?: 'primary' | 'secondary' | 'dark' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
    disabled?: boolean;
    loading?: boolean;
    rounded?: 'normal' | 'full' | 'lg' | 'xl';
  }>(),
  {
    type: 'button',
    variant: 'primary',
    size: 'md',
    fullWidth: false,
    disabled: false,
    loading: false,
    rounded: 'lg',
  }
);

defineEmits(['click']);

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'primary':
      return 'bg-brand-orange text-white hover:bg-brand-orange-hover focus:ring-brand-orange/50 shadow-sm';
    case 'secondary':
      return 'bg-white text-gray-800 border border-gray-300 hover:bg-gray-50 focus:ring-gray-300 shadow-sm';
    case 'dark':
      return 'bg-brand-dark text-white hover:bg-black focus:ring-brand-dark/50';
    case 'ghost':
      return 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-200';
    case 'danger':
      return 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500';
    default:
      return 'bg-brand-orange text-white hover:bg-brand-orange-hover focus:ring-brand-orange/50';
  }
});

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'px-3 py-1.5 text-xs font-semibold gap-1.5';
    case 'lg':
      return 'px-6 py-3.5 text-base font-bold gap-2.5';
    case 'md':
    default:
      return 'px-4 py-2.5 text-sm font-semibold gap-2';
  }
});

const roundedClasses = computed(() => {
  switch (props.rounded) {
    case 'full':
      return 'rounded-full';
    case 'xl':
      return 'rounded-xl';
    case 'normal':
      return 'rounded';
    case 'lg':
    default:
      return 'rounded-lg';
  }
});
</script>
