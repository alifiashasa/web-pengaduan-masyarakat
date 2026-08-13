<template>
  <div class="bg-white min-h-screen">
    <div class="mx-auto w-full max-w-[1216px] px-4 sm:px-6 lg:px-0">

      <!-- ─── HERO / HEADER SECTION ─── -->
      <div class="pt-12 pb-6 text-center">
        <!-- Clipboard icon -->
        <div class="inline-flex items-center justify-center mb-4">
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill="none" stroke="#E75A0F" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16.5 2v3m-9-3v3M12 2v3m1-1.5h-2c-3.3 0-4.95 0-5.975 1.025S4 7.2 4 10.5V15c0 3.3 0 4.95 1.025 5.975S7.7 22 11 22h2c3.3 0 4.95 0 5.975-1.025S20 18.3 20 15v-4.5c0-3.3 0-4.95-1.025-5.975S16.3 3.5 13 3.5M8 15h4m-4-4h8" />
          </svg>
        </div>

        <!-- Heading -->
        <h1 class="text-[28px] sm:text-[40px] font-semibold text-[#0A0A0A] leading-tight mb-3 font-urbanist">
          Ajukan Replikasi Sistem
        </h1>

        <!-- Subtitle -->
        <p class="text-[14px] sm:text-[20px] text-[#555555] leading-relaxed max-w-none mx-auto">
          Tertarik untuk mengimplementasikan platform Vide untuk kebutuhan wilayah atau organisasi Anda? Silakan lengkapi data Anda dan<br class="hidden sm:inline" /> tim kami akan segera menghubungi Anda.
        </p>
      </div>

      <!-- ─── MAIN CONTENT: FORM + ILLUSTRATION ─── -->
      <div class="pb-16 mt-6">
        <div class="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">

          <!-- LEFT: Form -->
          <div class="w-full lg:max-w-[664px] flex flex-col gap-5">

            <!-- Nama Lengkap -->
            <div class="flex flex-col gap-1.5">
              <label for="rep-nama" class="text-[14px] font-medium text-[#0A0A0A]">Nama Lengkap</label>
              <input
                id="rep-nama"
                v-model="form.nama"
                type="text"
                placeholder="Masukkan nama lengkap Anda"
                class="w-full h-[48px] px-4 text-[16px] text-[#0A0A0A] placeholder-[#ABABAB] border border-[#D4D4D4] rounded-[10px] bg-white focus:outline-none focus:border-[#E75A0F] focus:ring-1 focus:ring-[#E75A0F] transition-colors"
                :class="{ 'border-red-400': errors.nama }"
              />
              <p v-if="errors.nama" class="text-[12px] text-red-500">{{ errors.nama }}</p>
            </div>

            <!-- Alamat Email -->
            <div class="flex flex-col gap-1.5">
              <label for="rep-email" class="text-[14px] font-medium text-[#0A0A0A]">Alamat Email</label>
              <input
                id="rep-email"
                v-model="form.email"
                type="email"
                placeholder="contoh@email.com"
                class="w-full h-[48px] px-4 text-[16px] text-[#0A0A0A] placeholder-[#ABABAB] border border-[#D4D4D4] rounded-[10px] bg-white focus:outline-none focus:border-[#E75A0F] focus:ring-1 focus:ring-[#E75A0F] transition-colors"
                :class="{ 'border-red-400': errors.email }"
              />
              <p v-if="errors.email" class="text-[12px] text-red-500">{{ errors.email }}</p>
            </div>

            <!-- Nomor Telepon -->
            <div class="flex flex-col gap-1.5">
              <label for="rep-telp" class="text-[14px] font-medium text-[#0A0A0A]">Nomor Telepon</label>
              <input
                id="rep-telp"
                v-model="form.telepon"
                type="tel"
                placeholder="08xx – xxxx –– xxxx"
                class="w-full h-[48px] px-4 text-[16px] text-[#0A0A0A] placeholder-[#ABABAB] border border-[#D4D4D4] rounded-[10px] bg-white focus:outline-none focus:border-[#E75A0F] focus:ring-1 focus:ring-[#E75A0F] transition-colors"
                :class="{ 'border-red-400': errors.telepon }"
              />
              <p v-if="errors.telepon" class="text-[12px] text-red-500">{{ errors.telepon }}</p>
            </div>

            <!-- Pesan Pengajuan -->
            <div class="flex flex-col gap-1.5">
              <label for="rep-pesan" class="text-[14px] font-medium text-[#0A0A0A]">Pesan Pengajuan</label>
              <textarea
                id="rep-pesan"
                v-model="form.pesan"
                rows="5"
                placeholder="Tuliskan informasi atau pesan Anda di sini..."
                class="w-full px-4 py-3 text-[16px] text-[#0A0A0A] placeholder-[#ABABAB] border border-[#D4D4D4] rounded-[10px] bg-white focus:outline-none focus:border-[#E75A0F] focus:ring-1 focus:ring-[#E75A0F] transition-colors resize-none"
                :class="{ 'border-red-400': errors.pesan }"
              ></textarea>
              <p v-if="errors.pesan" class="text-[12px] text-red-500">{{ errors.pesan }}</p>
            </div>

            <!-- Checkbox Agreement -->
            <div class="flex flex-col gap-1 mt-1">
              <label class="flex items-start gap-2.5 cursor-pointer">
                <div class="relative shrink-0 mt-[9.5px]">
                  <input
                    id="rep-agree"
                    type="checkbox"
                    v-model="form.agree"
                    class="sr-only"
                  />
                  <div
                    class="w-[14px] h-[14px] rounded-[4px] border flex items-center justify-center transition-all"
                    :class="form.agree ? 'bg-[#E75A0F] border-[#E75A0F]' : 'bg-white border-[#18171C]'"
                    @click="form.agree = !form.agree"
                  >
                    <svg v-if="form.agree" class="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3.5" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <span class="text-[12px] text-[#0A0A0ACC] leading-relaxed">
                  Saya memahami dan menyetujui
                  <button
                    type="button"
                    class="text-[#0A0A0ACC] hover:underline font-medium"
                    @click.stop="showTerms = true"
                  >Syarat &amp; Ketentuan</button>
                  serta kebijakan privasi yang berlaku mengenai replikasi platform Vide.
                </span>
              </label>
              <p v-if="errors.agree" class="text-[12px] text-red-500 ml-6">{{ errors.agree }}</p>
            </div>

            <!-- Kirim Button -->
            <button
              type="button"
              :disabled="isSubmitting"
              class="w-full h-[48px] bg-[#F67011] hover:bg-[#d4500b] disabled:opacity-60 disabled:cursor-not-allowed text-white text-[15px] font-semibold rounded-[12px] transition-all flex items-center justify-center gap-2 cursor-pointer"
              @click="handleSubmit"
            >
              <svg v-if="isSubmitting" class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
              {{ isSubmitting ? 'Mengirim...' : 'Kirim' }}
            </button>
          </div>

          <!-- RIGHT: Mascot Illustration -->
          <div class="w-full lg:w-[48%] flex items-center justify-center lg:justify-start pt-6 lg:pt-2 lg:pl-6">
            <img
              :src="hasImageError ? '/images/fallback-mascot.svg' : '/images/mascot-replication-request.svg'"
              alt="Maskot Replikasi Sistem"
              class="w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] lg:w-[512px] lg:h-[512px] object-contain select-none"
              draggable="false"
              @error="hasImageError = true"
            />
          </div>

        </div>
      </div>
    </div>

    <!-- Success Toast Notification -->
    <ToastNotification :show="toast.show" :message="toast.message" @close="toast.show = false" />

    <!-- ─── TERMS MODAL ─── -->
    <TermsModal :isOpen="showTerms" @close="showTerms = false" @accept="handleTermsAccept" />

  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRoute } from 'vue-router';
import TermsModal from '@/components/modals/TermsModal.vue';
import ToastNotification from '@/components/ToastNotification.vue';

definePageMeta({ layout: 'default' });

const route = useRoute();
const hasImageError = ref(route.query['mock-error'] === 'true');

useSeoMeta({
  title: 'Replication Request – Ajukan Replikasi Sistem Vide',
  description: 'Tertarik mengimplementasikan platform Vide untuk wilayah atau organisasi Anda? Ajukan permohonan replikasi sistem di sini.',
});

// Form state
const form = reactive({
  nama: '',
  email: '',
  telepon: '',
  pesan: '',
  agree: false,
});

const errors = reactive<Record<string, string>>({});
const isSubmitting = ref(false);
const toast = reactive({ show: false, message: '' });
const showTerms = ref(false);

const handleTermsAccept = () => {
  form.agree = true;
  showTerms.value = false;
};

const validate = (): boolean => {
  Object.keys(errors).forEach((k) => delete errors[k]);

  if (!form.nama.trim()) errors.nama = 'Nama lengkap wajib diisi.';
  if (!form.email.trim()) {
    errors.email = 'Alamat email wajib diisi.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Format email tidak valid.';
  }
  if (!form.telepon.trim()) errors.telepon = 'Nomor telepon wajib diisi.';
  if (!form.pesan.trim()) errors.pesan = 'Pesan pengajuan wajib diisi.';
  if (!form.agree) errors.agree = 'Anda harus menyetujui syarat & ketentuan.';

  return Object.keys(errors).length === 0;
};

const handleSubmit = async () => {
  if (!validate()) return;

  isSubmitting.value = true;
  await new Promise((r) => setTimeout(r, 1400));
  isSubmitting.value = false;
  
  toast.message = 'Permohonan berhasil dikirim!';
  toast.show = true;
  setTimeout(() => {
    toast.show = false;
  }, 3000);

  // Reset form
  Object.assign(form, { nama: '', email: '', telepon: '', pesan: '', agree: false });
  Object.keys(errors).forEach((k) => delete errors[k]);
};
</script>
