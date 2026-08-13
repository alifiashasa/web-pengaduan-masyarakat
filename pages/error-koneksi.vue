<template>
  <!-- Main Content -->
  <div class="flex-1 flex flex-col items-center justify-center py-12 md:py-16 px-4 text-center">
    <div class="flex flex-col items-center max-w-[600px] mx-auto">
      <EmptyState
        plain
        title="Koneksi Tidak Tersedia"
        description="Saat ini kami belum dapat menghubungkan Anda ke layanan Vide. Pastikan koneksi internet Anda stabil, lalu silakan coba kembali."
      >
        <template #icon>
          <img
            src="/images/connection-error.svg"
            alt="Koneksi Tidak Tersedia"
            class="w-[320px] h-[320px] object-contain mb-8 md:mb-1 select-none"
          />
        </template>
        <template #action>
          <NuxtLink
            to="/"
            class="inline-flex items-center justify-center px-6 py-2.5 text-[15px] font-semibold text-[#F67011] bg-[#FFF7ED] border border-[#FCD5B6] rounded-xl hover:bg-[#FEEFD7] hover:border-[#FBC49B] transition-all duration-200 shadow-sm cursor-pointer"
          >
            Kembali ke Beranda
          </NuxtLink>
        </template>
      </EmptyState>
    </div>
  </div>
</template>

<script setup lang="ts">
import EmptyState from '@/components/EmptyState.vue';

// SEO Meta details
useHead({
  title: 'Koneksi Tidak Tersedia - Vide',
  meta: [
    {
      name: 'description',
      content: 'Saat ini kami belum dapat menghubungkan Anda ke layanan Vide. Pastikan koneksi internet Anda stabil, lalu silakan coba kembali.'
    }
  ]
});
</script>
