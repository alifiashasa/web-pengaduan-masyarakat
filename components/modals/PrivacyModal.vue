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
              <div class="w-12 h-12 rounded-2xl bg-[#E75A0F] flex items-center justify-center shrink-0 text-white shadow-xs">
                <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>

              <!-- Title & Subtitle -->
              <div>
                <h3 class="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">Kebijakan Privasi</h3>
                <p class="text-xs sm:text-sm text-[#757575] font-normal mt-0.5">Terakhir Diperbarui: 23 Desember 2025</p>
              </div>
            </div>

            <!-- Scrollable Content Box -->
            <div class="bg-gray-50/80 border border-gray-100/80 rounded-2xl p-5 mb-6 max-h-[360px] sm:max-h-[400px] overflow-y-auto text-xs sm:text-sm text-[#0A0A0A] leading-relaxed space-y-4">
              <p>
                Privasi Anda sangat penting bagi kami. Kebijakan Privasi ini menjelaskan bagaimana Vide mengumpulkan, menggunakan, dan melindungi informasi pribadi yang Anda berikan saat menggunakan platform kami.
              </p>

              <div class="space-y-2">
                <h4 class="font-semibold text-gray-900 text-sm sm:text-base">1. Informasi yang Kami Kumpulkan</h4>
                <p>
                  Kami mengumpulkan informasi untuk memberikan layanan yang lebih baik kepada seluruh pengguna, yang meliputi:
                </p>
                <ul class="space-y-2 pl-1">
                  <li class="flex items-start gap-2">
                    <span class="text-gray-400 select-none">•</span>
                    <span><strong class="font-semibold text-gray-900">Informasi Profil:</strong> Nama lengkap, alamat email, dan nomor telepon yang Anda berikan saat mendaftar atau mengisi formulir.</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="text-gray-400 select-none">•</span>
                    <span><strong class="font-semibold text-gray-900">Konten Laporan:</strong> Data, foto, atau deskripsi yang Anda unggah sebagai bagian dari pengaduan atau aspirasi.</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="text-gray-400 select-none">•</span>
                    <span><strong class="font-semibold text-gray-900">Informasi Teknis:</strong> Alamat IP, jenis perangkat, dan catatan aktivitas (log) untuk keperluan keamanan sistem.</span>
                  </li>
                </ul>
              </div>

              <div class="space-y-2">
                <h4 class="font-semibold text-gray-900 text-sm sm:text-base">2. Penggunaan Informasi</h4>
                <p>
                  Informasi yang kami kumpulkan digunakan untuk:
                </p>
                <ul class="space-y-2 pl-1">
                  <li class="flex items-start gap-2">
                    <span class="text-gray-400 select-none">•</span>
                    <span><strong class="font-semibold text-gray-900">Verifikasi & Validasi:</strong> Memastikan laporan yang masuk adalah nyata dan bukan bot/hoaks.</span>
                  </li>
                </ul>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="grid grid-cols-2 gap-3 sm:gap-4 pt-1">
              <button
                type="button"
                class="w-full py-3 sm:py-3.5 px-4 rounded-2xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-800 font-medium text-sm sm:text-base transition-colors shadow-2xs cursor-pointer"
                @click="$emit('close')"
              >
                Tutup
              </button>
              <button
                type="button"
                class="w-full py-3 sm:py-3.5 px-4 rounded-2xl bg-[#E75A0F] hover:bg-[#D44F0B] text-white font-medium text-sm sm:text-base transition-all shadow-sm active:scale-98 cursor-pointer"
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
