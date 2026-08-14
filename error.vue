<template>
  <div class="min-h-screen flex flex-col bg-[#FEFFFF] text-[#0A0A0A] font-sans">
    <AppNavbar />

    <!-- Konten Utama Error -->
    <main class="flex-1 flex flex-col items-center justify-center py-12 md:py-16 px-4 text-center">
      <div class="flex flex-col items-center max-w-[600px] mx-auto">
        <img
          src="/assets/illustrations/404-error.svg"
          alt="404 Error"
          class="w-[320px] h-auto object-contain mb-8 md:mb-4 select-none"
        />

        <h1
          class="text-[24px] md:text-[32px] font-semibold text-gray-900 mb-3 tracking-tight leading-tight"
        >
          Terjadi Kendala Pada Sistem Kami
        </h1>

        <p
          class="text-[14px] md:text-[16px] text-[#757575] leading-relaxed mb-10 max-w-[660px] mx-auto"
        >
          Kami tidak dapat menemukan halaman yang Anda cari. Pastikan alamat halaman sudah benar
          atau silakan kembali ke halaman utama.
        </p>

        <button
          type="button"
          @click="handleBackToHome"
          class="inline-flex items-center justify-center px-6 py-2.5 text-[15px] font-semibold text-[#F67011] bg-[#FFF7ED] border border-[#FCD5B6] rounded-xl hover:bg-[#FEEFD7] hover:border-[#FBC49B] transition-all duration-200 shadow-sm cursor-pointer"
        >
          Kembali ke Beranda
        </button>
      </div>
    </main>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppNavbar from '@/components/AppNavbar.vue';
import AppFooter from '@/components/AppFooter.vue';

defineProps({
  error: {
    type: Object,
    default: () => ({}),
  },
});

const handleBackToHome = () => {
  clearError({ redirect: '/' });
};
</script>
