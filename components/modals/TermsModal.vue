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
        class="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
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
            class="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden p-6 sm:p-7 flex flex-col font-geist"
          >
            <!-- Header Section -->
            <div class="flex items-center gap-4 mb-5">
              <!-- Icon Box -->
              <div class="w-12 h-12 rounded-xl bg-[#E75A0F] flex items-center justify-center shrink-0 text-white shadow-xs">
                <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <line x1="10" y1="9" x2="8" y2="9" />
                </svg>
              </div>

              <!-- Title & Subtitle -->
              <div>
                <h3 class="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">Syarat & Ketentuan</h3>
                <p class="text-xs sm:text-sm text-[#757575] font-regular mt-0.5">Terakhir Diperbarui: 23 Desember 2025</p>
              </div>
            </div>

            <!-- Scrollable Content Box -->
            <div class="bg-gray-50/80 border border-gray-100/80 rounded-2xl p-5 mb-6 max-h-[360px] sm:max-h-[400px] overflow-y-auto text-xs sm:text-sm text-[#OAOAOA] leading-relaxed space-y-4">
              <p>
                Selamat datang di Vide. Dengan mengakses dan menggunakan platform ini, Anda dianggap telah membaca, memahami, dan menyetujui untuk terikat oleh Syarat dan Ketentuan berikut. Jika Anda tidak menyetujui bagian apa pun dari ketentuan ini, mohon untuk tidak melanjutkan penggunaan layanan kami.
              </p>

              <div class="space-y-2">
                <h4 class="font-semibold text-gray-900 text-sm sm:text-base">1. Ketentuan Umum</h4>
                <ul class="space-y-1.5 pl-2">
                  <li class="flex items-start gap-2">
                    <span class="text-gray-400 select-none">•</span>
                    <span>Vide adalah platform penyampaian aspirasi dan laporan masyarakat yang bertujuan untuk meningkatkan transparansi dan kualitas layanan publik.</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="text-gray-400 select-none">•</span>
                    <span>Layanan ini tersedia untuk masyarakat umum dengan batasan wilayah yang telah ditentukan oleh pengelola.</span>
                  </li>
                </ul>
              </div>

              <div class="space-y-2">
                <h4 class="font-semibold text-gray-900 text-sm sm:text-base">2. Penggunaan Layanan (Laporan & Aspirasi)</h4>
                <ul class="space-y-1.5 pl-2">
                  <li class="flex items-start gap-2">
                    <span class="text-gray-400 select-none">•</span>
                    <span>Pengguna wajib memberikan informasi yang benar, akurat, dan dapat dipertanggungjawabkan dalam setiap laporan atau aspirasi yang dikirimkan.</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="text-gray-400 select-none">•</span>
                    <span>Dilarang keras mengirimkan konten yang mengandung unsur SARA, pornografi, ujaran kebencian, fitnah, atau informasi palsu</span>
                  </li>
                </ul>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="grid grid-cols-2 gap-3 sm:gap-4 pt-1">
              <button
                type="button"
                class="w-full py-3 sm:py-3.5 px-4 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-800 font-medium text-sm sm:text-base transition-colors shadow-2xs cursor-pointer"
                @click="$emit('close')"
              >
                Tutup
              </button>
              <button
                type="button"
                class="w-full py-3 sm:py-3.5 px-4 rounded-xl bg-[#E75A0F] hover:bg-[#D44F0B] text-white font-medium text-sm sm:text-base transition-all shadow-sm active:scale-98 cursor-pointer"
                @click="handleAccept"
              >
                Saya Mengerti
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

const emit = defineEmits(['close', 'accept']);

const handleAccept = () => {
  emit('accept');
  emit('close');
};
</script>
