<template>
  <div class="bg-[#FEFFFF] min-h-screen">
    <!-- ========== MAIN CONTENT ========== -->
    <section class="py-6 sm:py-10 lg:py-[64px]">
      <div class="mx-auto w-full max-w-[1216px] px-4 sm:px-6 lg:px-0">
        <!-- Two-column grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-[64px] items-start">
          <!-- ===== LEFT COLUMN: Info ===== -->
          <div>
            <!-- Label "Kontak Kami" -->
            <div class="flex items-center gap-2 mb-3 lg:mb-4">
              <img src="/assets/icons/icon-set.svg" alt="" width="22" height="16" />
              <span class="text-[14px] sm:text-[16px] font-semibold text-[#F67011]"
                >Kontak Kami</span
              >
              <img src="/assets/icons/icon-set.svg" alt="" width="22" height="16" />
            </div>

            <!-- Heading -->
            <h1
              class="font-urbanist text-[28px] sm:text-[36px] lg:text-[40px] font-semibold leading-[1.15] tracking-[-0.5px] text-[#0A0A0A] mb-3 lg:mb-4"
            >
              Suara Anda, Prioritas Kami
            </h1>

            <!-- Description -->
            <p
              class="text-[14px] sm:text-[18px] lg:text-[20px] leading-relaxed lg:leading-[1.7] text-[#0A0A0ACC] max-w-[500px] mb-6 lg:mb-8"
            >
              Setiap saran dan pertanyaan Anda sangat berarti bagi pengembangan Vide. Mari
              berkolaborasi menciptakan platform laporan yang lebih baik.
            </p>

            <!-- Contact info cards -->
            <div class="flex flex-col sm:flex-row lg:flex-wrap gap-3 sm:gap-4 w-full">
              <!-- Phone -->
              <div
                class="w-full sm:w-1/2 lg:w-[266px] h-[60px] flex items-center gap-3 border border-[#EDEDED] rounded-[14px] pl-3 pr-4 bg-white"
              >
                <div
                  class="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-[8px] bg-[#F67011]"
                >
                  <img
                    src="/assets/icons/icon-telephone.svg"
                    alt="Telepon"
                    width="20"
                    height="20"
                  />
                </div>
                <div>
                  <p class="text-[14px] font-semibold text-[#0A0A0A] leading-[1.4]">
                    Nomor Telepon
                  </p>
                  <p class="text-[14px] text-[#757575] mt-0.5">08XX-XXXX-XXXX</p>
                </div>
              </div>

              <!-- Email -->
              <div
                class="w-full sm:w-1/2 lg:w-[266px] h-[60px] flex items-center gap-3 border border-[#EDEDED] rounded-[14px] pl-3 pr-4 bg-white"
              >
                <div
                  class="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-[8px] bg-[#F67011]"
                >
                  <img src="/assets/icons/icon-email.svg" alt="Email" width="20" height="20" />
                </div>
                <div>
                  <p class="text-[14px] font-semibold text-[#0A0A0A] leading-[1.4]">Email</p>
                  <p class="text-[14px] text-[#757575] mt-0.5">hellovide@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          <!-- ===== RIGHT COLUMN: Form ===== -->
          <div class="w-full rounded-[20px] p-0 lg:px-8 lg:pb-8 lg:pt-2 bg-transparent lg:bg-white">
            <!-- Global Error Alert -->
            <div
              v-if="error && !fieldErrors"
              class="mb-4 p-3.5 bg-red-50 border border-red-200 text-red-700 rounded-[12px] text-[14px]"
            >
              {{ error }}
            </div>

            <form @submit.prevent="handleSubmit" class="flex flex-col gap-4 lg:gap-5">
              <!-- Nama Lengkap -->
              <div class="flex flex-col gap-1.5">
                <label class="text-[14px] font-semibold lg:font-medium text-[#0A0A0A]">
                  Nama Lengkap <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="form.name"
                  type="text"
                  placeholder="Masukkan nama lengkap Anda"
                  class="w-full h-[46px] px-4 text-[14px] lg:text-[16px] text-[#0A0A0A] border rounded-[12px] lg:rounded-[10px] bg-white outline-none placeholder:text-[#ADADAD] focus:border-[#E75A0F] transition-colors"
                  :class="fieldErrors?.name ? 'border-red-500' : 'border-[#E0E0E0]'"
                  required
                />
                <p v-if="fieldErrors?.name" class="text-xs text-red-500 mt-1">
                  {{ fieldErrors.name.join(', ') }}
                </p>
              </div>

              <!-- Alamat Email -->
              <div class="flex flex-col gap-1.5">
                <label class="text-[14px] font-semibold lg:font-medium text-[#0A0A0A]">
                  Alamat Email <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="form.email"
                  type="email"
                  placeholder="contoh@email.com"
                  class="w-full h-[46px] px-4 text-[14px] lg:text-[16px] text-[#0A0A0A] border rounded-[12px] lg:rounded-[10px] bg-white outline-none placeholder:text-[#ADADAD] focus:border-[#E75A0F] transition-colors"
                  :class="fieldErrors?.email ? 'border-red-500' : 'border-[#E0E0E0]'"
                  required
                />
                <p v-if="fieldErrors?.email" class="text-xs text-red-500 mt-1">
                  {{ fieldErrors.email.join(', ') }}
                </p>
              </div>

              <!-- Nomor Telepon -->
              <div class="flex flex-col gap-1.5">
                <label class="text-[14px] font-semibold lg:font-medium text-[#0A0A0A]">
                  Nomor Telepon <span class="text-[#757575] font-normal text-xs">(Opsional)</span>
                </label>
                <input
                  v-model="form.phone"
                  type="tel"
                  placeholder="081234567890"
                  class="w-full h-[46px] px-4 text-[14px] lg:text-[16px] text-[#0A0A0A] border rounded-[12px] lg:rounded-[10px] bg-white outline-none placeholder:text-[#ADADAD] focus:border-[#E75A0F] transition-colors"
                  :class="fieldErrors?.phone ? 'border-red-500' : 'border-[#E0E0E0]'"
                />
                <p v-if="fieldErrors?.phone" class="text-xs text-red-500 mt-1">
                  {{ fieldErrors.phone.join(', ') }}
                </p>
              </div>

              <!-- Subjek -->
              <div class="flex flex-col gap-1.5">
                <label class="text-[14px] font-semibold lg:font-medium text-[#0A0A0A]">
                  Subjek <span class="text-[#757575] font-normal text-xs">(Opsional)</span>
                </label>
                <input
                  v-model="form.subject"
                  type="text"
                  placeholder="Pertanyaan tentang layanan"
                  class="w-full h-[46px] px-4 text-[14px] lg:text-[16px] text-[#0A0A0A] border rounded-[12px] lg:rounded-[10px] bg-white outline-none placeholder:text-[#ADADAD] focus:border-[#E75A0F] transition-colors"
                  :class="fieldErrors?.subject ? 'border-red-500' : 'border-[#E0E0E0]'"
                />
                <p v-if="fieldErrors?.subject" class="text-xs text-red-500 mt-1">
                  {{ fieldErrors.subject.join(', ') }}
                </p>
              </div>

              <!-- Pesan Anda -->
              <div class="flex flex-col gap-1.5">
                <label class="text-[14px] font-semibold lg:font-medium text-[#0A0A0A]">
                  Pesan Anda <span class="text-red-500">*</span>
                </label>
                <textarea
                  v-model="form.message"
                  placeholder="Tuliskan pertanyaan atau kendala Anda di sini.."
                  rows="5"
                  class="w-full px-4 py-3 text-[14px] lg:text-[16px] text-[#0A0A0A] border rounded-[12px] lg:rounded-[10px] bg-white outline-none placeholder:text-[#ADADAD] focus:border-[#E75A0F] transition-colors resize-none"
                  :class="fieldErrors?.message ? 'border-red-500' : 'border-[#E0E0E0]'"
                  required
                ></textarea>
                <p v-if="fieldErrors?.message" class="text-xs text-red-500 mt-1">
                  {{ fieldErrors.message.join(', ') }}
                </p>
              </div>

              <!-- Submit button -->
              <button
                type="submit"
                :disabled="loading"
                class="w-full h-[48px] lg:h-[52px] rounded-[12px] bg-[#F67011] text-white text-[16px] lg:text-[20px] font-semibold hover:bg-[#d4500b] transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <span v-if="loading" class="flex items-center gap-2">
                  <svg
                    class="animate-spin h-5 w-5 text-white"
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
                  Mengirim...
                </span>
                <span v-else>Kirim</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>

    <!-- Success Toast Notification -->
    <ToastNotification :show="toast.show" :message="toast.message" @close="toast.show = false" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import ToastNotification from '@/components/ToastNotification.vue';
import { useContact } from '@/composables/useContact';

useHead({
  title: 'Kontak | Vide',
  meta: [
    {
      name: 'description',
      content: 'Hubungi kami untuk saran, pertanyaan, atau kendala seputar platform Vide.',
    },
  ],
});

const { loading, error, fieldErrors, sendContactMessage } = useContact();

const form = reactive({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
});

const toast = reactive({ show: false, message: '' });

let toastTimer: ReturnType<typeof setTimeout> | null = null;

const handleSubmit = async () => {
  const res = await sendContactMessage({
    name: form.name,
    email: form.email,
    phone: form.phone,
    subject: form.subject,
    message: form.message,
  });

  if (res?.success) {
    // Reset form fields
    form.name = '';
    form.email = '';
    form.phone = '';
    form.subject = '';
    form.message = '';

    toast.message = res.message || 'Pesan Anda berhasil dikirim. Terima kasih!';
    toast.show = true;

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.show = false;
    }, 4000);
  }
};
</script>
