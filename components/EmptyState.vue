<template>
  <div
    :class="[
      'flex flex-col items-center justify-center text-center',
      plain ? '' : 'p-8 sm:p-12 bg-white rounded-2xl border border-gray-100 shadow-xs'
    ]"
  >
    <div
      v-if="!plain"
      class="w-20 h-20 sm:w-24 sm:h-24 mb-4 rounded-full bg-orange-50 flex items-center justify-center text-brand-orange"
    >
      <slot name="icon">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 sm:h-12 sm:w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </slot>
    </div>
    <div v-else-if="$slots.icon" class="mb-2 select-none">
      <slot name="icon" />
    </div>
    
    <h3
      :class="[
        'font-semibold text-gray-900',
        plain ? 'text-[24px] md:text-[32px] mb-3 tracking-tight leading-tight' : 'text-base sm:text-lg mb-1'
      ]"
    >
      {{ title }}
    </h3>
    <p
      :class="[
        plain ? 'text-[14px] md:text-[16px] text-[#757575] leading-relaxed mb-10 max-w-[840px] mx-auto' : 'text-xs sm:text-sm text-gray-500 max-w-sm mb-6'
      ]"
    >
      {{ description }}
    </p>
    
    <slot name="action" />
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string;
    description?: string;
    plain?: boolean;
  }>(),
  {
    title: 'Belum Ada Data',
    description: 'Data pengaduan tidak ditemukan atau belum pernah dibuat.',
    plain: false,
  }
);
</script>
