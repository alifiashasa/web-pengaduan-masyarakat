<template>
  <div class="bg-[#FEFFFF] min-h-screen">
    <!-- ========== MAIN CONTENT ========== -->
    <section class="py-[64px]">
      <div class="mx-auto w-full max-w-[1216px] px-4 sm:px-6 lg:px-0">
        <!-- Two-column grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-[64px] items-start">
          <!-- ===== LEFT COLUMN: Info ===== -->
          <div>
            <!-- Label "Kontak Kami" -->
            <div class="flex items-center gap-2 mb-4">
              <img src="/assets/icons/icon-set.svg" alt="" width="22" height="16" />
              <span class="text-[16px] font-semibold text-[#F67011]">Kontak Kami</span>
              <img src="/assets/icons/icon-set.svg" alt="" width="22" height="16" />
            </div>

            <!-- Heading -->
            <h1
              class="font-urbanist text-[36px] sm:text-[40px] font-semibold leading-[1.15] tracking-[-0.5px] text-[#0A0A0A] mb-4"
            >
              Suara Anda, Prioritas Kami
            </h1>

            <!-- Description -->
            <p class="text-[20px] leading-[1.7] text-[#0A0A0ACC] max-w-[500px] mb-8">
              Setiap saran dan pertanyaan Anda sangat berarti bagi pengembangan Vide. Mari
              berkolaborasi menciptakan platform laporan yang lebih baik.
            </p>

            <!-- Contact info cards -->
            <div class="flex flex-wrap gap-4">
              <!-- Phone -->
              <div
                class="w-[266px] h-[60px] flex items-center gap-3 border border-[#EDEDED] rounded-[14px] pl-2 pr-4"
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
                class="w-[266px] h-[60px] flex items-center gap-3 border border-[#EDEDED] rounded-[14px] pl-2 pr-4"
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
          <div class="rounded-[20px] pt-2 px-8 pb-8 bg-white">
            <form @submit.prevent="handleSubmit" class="flex flex-col gap-5">
              <!-- Nama Lengkap -->
              <div class="flex flex-col gap-1.5">
                <label class="text-[14px] font-medium text-[#0A0A0A]">Nama Lengkap</label>
                <input
                  v-model="form.name"
                  type="text"
                  placeholder="Masukkan nama lengkap Anda"
                  class="w-full h-[46px] px-4 text-[16px] text-[#0A0A0A] border border-[#E0E0E0] rounded-[10px] bg-white outline-none placeholder:text-[#ADADAD] focus:border-[#E75A0F] transition-colors"
                  required
                />
              </div>

              <!-- Alamat Email -->
              <div class="flex flex-col gap-1.5">
                <label class="text-[14px] font-medium text-[#0A0A0A]">Alamat Email</label>
                <input
                  v-model="form.email"
                  type="email"
                  placeholder="contoh@email.com"
                  class="w-full h-[46px] px-4 text-[16px] text-[#0A0A0A] border border-[#E0E0E0] rounded-[10px] bg-white outline-none placeholder:text-[#ADADAD] focus:border-[#E75A0F] transition-colors"
                  required
                />
              </div>

              <!-- Pesan Anda -->
              <div class="flex flex-col gap-1.5">
                <label class="text-[14px] font-medium text-[#0A0A0A]">Pesan Anda</label>
                <textarea
                  v-model="form.message"
                  placeholder="Tuliskan pertanyaan atau kendala Anda di sini..."
                  rows="6"
                  class="w-full px-4 py-3 text-[16px] text-[#0A0A0A] border border-[#E0E0E0] rounded-[10px] bg-white outline-none placeholder:text-[#ADADAD] focus:border-[#E75A0F] transition-colors resize-none"
                  required
                ></textarea>
              </div>

              <!-- Submit button -->
              <button
                type="submit"
                :disabled="isSubmitting"
                class="w-full h-[52px] rounded-[12px] bg-[#F67011] text-white text-[20px] font-semibold hover:bg-[#d4500b] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <span v-if="isSubmitting">Mengirim...</span>
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

useHead({
  title: 'Kontak | Vide',
  meta: [
    {
      name: 'description',
      content: 'Hubungi kami untuk saran, pertanyaan, atau kendala seputar platform Vide.',
    },
  ],
});

const form = reactive({
  name: '',
  email: '',
  message: '',
});

const isSubmitting = ref(false);
const toast = reactive({ show: false, message: '' });

const handleSubmit = async () => {
  isSubmitting.value = true;
  // Mock delay
  await new Promise((r) => setTimeout(r, 1000));
  form.name = '';
  form.email = '';
  form.message = '';

  toast.message = 'Pesan Anda berhasil dikirim. Terima kasih!';
  toast.show = true;
  setTimeout(() => {
    toast.show = false;
  }, 3000);

  isSubmitting.value = false;
};
</script>
