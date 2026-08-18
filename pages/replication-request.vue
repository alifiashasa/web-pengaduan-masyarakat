<template>
  <div class="bg-white min-h-screen">
    <div class="mx-auto w-full max-w-[1216px] px-4 sm:px-6 lg:px-0">
      <!-- Header -->
      <div class="pt-6 sm:pt-12 pb-4 sm:pb-6 text-center">
        <div class="inline-flex items-center justify-center mb-2 sm:mb-4">
          <svg
            class="w-8 h-8 sm:w-11 sm:h-11"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="none"
              stroke="#E75A0F"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M16.5 2v3m-9-3v3M12 2v3m1-1.5h-2c-3.3 0-4.95 0-5.975 1.025S4 7.2 4 10.5V15c0 3.3 0 4.95 1.025 5.975S7.7 22 11 22h2c3.3 0 4.95 0 5.975-1.025S20 18.3 20 15v-4.5c0-3.3 0-4.95-1.025-5.975S16.3 3.5 13 3.5M8 15h4m-4-4h8"
            />
          </svg>
        </div>

        <h1
          class="text-[22px] sm:text-[40px] font-semibold text-[#0A0A0A] leading-tight mb-2 sm:mb-3 font-urbanist"
        >
          Ajukan Replikasi Sistem
        </h1>

        <p
          class="text-[14px] sm:text-[20px] text-[#555555] leading-normal sm:leading-relaxed max-w-[600px] sm:max-w-none mx-auto"
        >
          Tertarik untuk mengimplementasikan platform Vide untuk kebutuhan wilayah atau organisasi
          Anda? Silakan lengkapi data Anda dan<br class="hidden sm:inline" />
          tim kami akan segera menghubungi Anda.
        </p>
      </div>

      <!-- Form + Mascot -->
      <div class="pb-12 sm:pb-16 mt-2 sm:mt-6">
        <div class="flex flex-col lg:flex-row gap-6 lg:gap-12 items-center lg:items-center">
          <!-- Mascot (Order 1 on mobile, Order 2 on desktop) -->
          <div
            class="order-1 lg:order-2 w-full lg:flex-1 flex items-center justify-center py-2 lg:py-0 self-center"
          >
            <div
              class="relative w-[220px] h-[220px] sm:w-[300px] sm:h-[300px] lg:w-[380px] lg:h-[380px] shrink-0 overflow-visible select-none lg:translate-x-[30px] mx-auto"
            >
              <!-- Lottie player -->
              <div
                ref="lottieContainer"
                class="lottie-mascot absolute inset-0 w-full h-full pointer-events-none"
                :class="isLottieReady && !hasLottieError ? 'opacity-100' : 'opacity-0'"
              ></div>

              <!-- Fallback -->
              <img
                v-if="hasLottieError"
                src="/assets/illustrations/fallback-mascot.svg"
                alt="Ilustrasi tidak tersedia"
                class="absolute inset-0 w-full h-full object-contain select-none"
                draggable="false"
                @error="hasImageError = true"
              />
            </div>
          </div>

          <!-- Form (Order 2 on mobile, Order 1 on desktop) -->
          <div class="order-2 lg:order-1 w-full lg:max-w-[664px] flex flex-col gap-3.5 sm:gap-5">
            <div class="flex flex-col gap-1.5">
              <label for="rep-nama" class="text-[13px] sm:text-[14px] font-medium text-[#0A0A0A]">
                Nama Lengkap
              </label>

              <input
                id="rep-nama"
                v-model="form.nama"
                type="text"
                placeholder="Masukkan nama lengkap Anda"
                class="w-full h-[44px] sm:h-[48px] px-3.5 sm:px-4 text-[14px] sm:text-[16px] text-[#0A0A0A] placeholder-[#ABABAB] border border-[#D4D4D4] rounded-[10px] bg-white focus:outline-none focus:border-[#E75A0F] focus:ring-1 focus:ring-[#E75A0F] transition-colors"
                :class="{ 'border-red-400': errors.nama }"
              />

              <p v-if="errors.nama" class="text-[12px] text-red-500">
                {{ errors.nama }}
              </p>
            </div>

            <div class="flex flex-col gap-1.5">
              <label for="rep-email" class="text-[13px] sm:text-[14px] font-medium text-[#0A0A0A]">
                Alamat Email
              </label>

              <input
                id="rep-email"
                v-model="form.email"
                type="email"
                placeholder="contoh@email.com"
                class="w-full h-[44px] sm:h-[48px] px-3.5 sm:px-4 text-[14px] sm:text-[16px] text-[#0A0A0A] placeholder-[#ABABAB] border border-[#D4D4D4] rounded-[10px] bg-white focus:outline-none focus:border-[#E75A0F] focus:ring-1 focus:ring-[#E75A0F] transition-colors"
                :class="{ 'border-red-400': errors.email }"
              />

              <p v-if="errors.email" class="text-[12px] text-red-500">
                {{ errors.email }}
              </p>
            </div>

            <div class="flex flex-col gap-1.5">
              <label for="rep-telp" class="text-[13px] sm:text-[14px] font-medium text-[#0A0A0A]">
                Nomor Telepon
              </label>

              <input
                id="rep-telp"
                v-model="form.telepon"
                type="tel"
                placeholder="08xx - xxxx - xxxx"
                class="w-full h-[44px] sm:h-[48px] px-3.5 sm:px-4 text-[14px] sm:text-[16px] text-[#0A0A0A] placeholder-[#ABABAB] border border-[#D4D4D4] rounded-[10px] bg-white focus:outline-none focus:border-[#E75A0F] focus:ring-1 focus:ring-[#E75A0F] transition-colors"
                :class="{ 'border-red-400': errors.telepon }"
              />

              <p v-if="errors.telepon" class="text-[12px] text-red-500">
                {{ errors.telepon }}
              </p>
            </div>

            <div class="flex flex-col gap-1.5">
              <label
                for="rep-organisasi"
                class="text-[13px] sm:text-[14px] font-medium text-[#0A0A0A]"
              >
                Organisasi / Instansi
              </label>

              <input
                id="rep-organisasi"
                v-model="form.organisasi"
                type="text"
                placeholder="Contoh: Dinas Kominfo Kota Surabaya"
                class="w-full h-[44px] sm:h-[48px] px-3.5 sm:px-4 text-[14px] sm:text-[16px] text-[#0A0A0A] placeholder-[#ABABAB] border border-[#D4D4D4] rounded-[10px] bg-white focus:outline-none focus:border-[#E75A0F] focus:ring-1 focus:ring-[#E75A0F] transition-colors"
                :class="{ 'border-red-400': errors.organisasi }"
              />

              <p v-if="errors.organisasi" class="text-[12px] text-red-500">
                {{ errors.organisasi }}
              </p>
            </div>

            <div class="flex flex-col gap-1.5">
              <label
                for="rep-wilayah"
                class="text-[13px] sm:text-[14px] font-medium text-[#0A0A0A]"
              >
                Wilayah / Daerah
              </label>

              <input
                id="rep-wilayah"
                v-model="form.wilayah"
                type="text"
                placeholder="Contoh: Surabaya, Jawa Timur"
                class="w-full h-[44px] sm:h-[48px] px-3.5 sm:px-4 text-[14px] sm:text-[16px] text-[#0A0A0A] placeholder-[#ABABAB] border border-[#D4D4D4] rounded-[10px] bg-white focus:outline-none focus:border-[#E75A0F] focus:ring-1 focus:ring-[#E75A0F] transition-colors"
                :class="{ 'border-red-400': errors.wilayah }"
              />

              <p v-if="errors.wilayah" class="text-[12px] text-red-500">
                {{ errors.wilayah }}
              </p>
            </div>

            <div class="flex flex-col gap-1.5">
              <label for="rep-pesan" class="text-[13px] sm:text-[14px] font-medium text-[#0A0A0A]">
                Pesan Pengajuan
              </label>

              <textarea
                id="rep-pesan"
                v-model="form.pesan"
                rows="5"
                placeholder="Tuliskan informasi atau pesan Anda di sini..."
                class="w-full px-3.5 sm:px-4 py-3 text-[14px] sm:text-[16px] text-[#0A0A0A] placeholder-[#ABABAB] border border-[#D4D4D4] rounded-[10px] bg-white focus:outline-none focus:border-[#E75A0F] focus:ring-1 focus:ring-[#E75A0F] transition-colors resize-none"
                :class="{ 'border-red-400': errors.pesan }"
              ></textarea>

              <p v-if="errors.pesan" class="text-[12px] text-red-500">
                {{ errors.pesan }}
              </p>
            </div>

            <!-- Agreement -->
            <div class="flex flex-col gap-1 mt-1">
              <label class="flex items-start gap-2.5 cursor-pointer">
                <div class="relative shrink-0 mt-[2px] sm:mt-[9.5px]">
                  <input id="rep-agree" v-model="form.agree" type="checkbox" class="sr-only" />

                  <div
                    class="w-[14px] h-[14px] rounded-[4px] border flex items-center justify-center transition-all"
                    :class="
                      form.agree ? 'bg-[#E75A0F] border-[#E75A0F]' : 'bg-white border-[#18171C]'
                    "
                    @click="form.agree = !form.agree"
                  >
                    <svg
                      v-if="form.agree"
                      class="w-2.5 h-2.5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="3.5"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>

                <span
                  class="text-[14px] text-[#0A0A0ACC] leading-snug sm:leading-relaxed"
                >
                  Saya memahami dan menyetujui

                  <button
                    type="button"
                    class="text-[#0A0A0ACC] hover:underline font-medium"
                    @click.stop="showTerms = true"
                  >
                    Syarat &amp; Ketentuan
                  </button>

                  serta kebijakan privasi yang berlaku mengenai replikasi platform Vide.
                </span>
              </label>

              <p v-if="errors.agree" class="text-[12px] text-red-500 ml-6">
                {{ errors.agree }}
              </p>
            </div>

            <button
              type="button"
              :disabled="replicationStore.loading"
              class="w-full h-[46px] sm:h-[48px] bg-[#F67011] hover:bg-[#d4500b] disabled:opacity-60 disabled:cursor-not-allowed text-white text-[15px] font-semibold rounded-[12px] transition-all flex items-center justify-center gap-2 cursor-pointer mt-1"
              @click="handleSubmit"
            >
              <svg
                v-if="replicationStore.loading"
                class="animate-spin w-4 h-4"
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
                />

                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>

              {{ replicationStore.loading ? 'Mengirim...' : 'Kirim' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <ToastNotification :show="toast.show" :message="toast.message" @close="toast.show = false" />

    <TermsModal :isOpen="showTerms" @close="showTerms = false" @accept="handleTermsAccept" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';
import TermsModal from '@/components/modals/TermsModal.vue';
import ToastNotification from '@/components/ToastNotification.vue';
import { useReplicationStore } from '@/stores/replication';
import { useAuthStore } from '@/stores/auth';

definePageMeta({ layout: 'default' });

const route = useRoute();
const replicationStore = useReplicationStore();
const authStore = useAuthStore();

const hasImageError = ref(route.query['mock-error'] === 'true');

// Lottie
const lottieContainer = ref<HTMLDivElement | null>(null);
const isLottieReady = ref(false);
const hasLottieError = ref(false);
let anim: any = null;

onMounted(async () => {
  if (authStore.user) {
    if (authStore.user.name) form.nama = authStore.user.name;
    if (authStore.user.email) form.email = authStore.user.email;
    if (authStore.user.phone) form.telepon = authStore.user.phone;
  }

  if (route.query['mock-error'] === 'true') {
    hasLottieError.value = true;
    hasImageError.value = true;
    return;
  }

  try {
    const lottie = (await import('lottie-web')).default;

    if (!lottieContainer.value) {
      hasLottieError.value = true;
      return;
    }

    anim = lottie.loadAnimation({
      container: lottieContainer.value,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '/assets/animations/load.json',
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid meet',
      },
    });

    anim.addEventListener('DOMLoaded', () => {
      if (!lottieContainer.value) return;

      const svg = lottieContainer.value.querySelector<SVGSVGElement>('svg');

      if (svg) {
        // Crop whitespace dari canvas 1080x1080 supaya maskot lebih besar
        svg.setAttribute('viewBox', '250 220 580 680');
        svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
        svg.style.width = '100%';
        svg.style.height = '100%';
        svg.style.overflow = 'visible';
      }

      anim?.resize();
      isLottieReady.value = true;
    });

    anim.addEventListener('data_failed', () => {
      isLottieReady.value = false;
      hasLottieError.value = true;
    });
  } catch (error) {
    console.error('Failed to initialize Lottie animation:', error);
    isLottieReady.value = false;
    hasLottieError.value = true;
  }
});

onBeforeUnmount(() => {
  if (anim) {
    anim.destroy();
    anim = null;
  }
});

useSeoMeta({
  title: 'Replication Request – Ajukan Replikasi Sistem Vide',
  description:
    'Tertarik mengimplementasikan platform Vide untuk wilayah atau organisasi Anda? Ajukan permohonan replikasi sistem di sini.',
});

// Form
const form = reactive({
  nama: '',
  email: '',
  telepon: '',
  organisasi: '',
  wilayah: '',
  pesan: '',
  agree: false,
});

const errors = reactive<Record<string, string>>({});
const toast = reactive({ show: false, message: '' });
const showTerms = ref(false);

const handleTermsAccept = () => {
  form.agree = true;
  showTerms.value = false;
};

const validate = (): boolean => {
  Object.keys(errors).forEach((key) => delete errors[key]);

  if (!form.nama.trim()) {
    errors.nama = 'Nama lengkap wajib diisi.';
  }

  if (!form.email.trim()) {
    errors.email = 'Alamat email wajib diisi.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Format email tidak valid.';
  }

  if (!form.organisasi.trim()) {
    errors.organisasi = 'Organisasi / Instansi wajib diisi.';
  }

  if (!form.wilayah.trim()) {
    errors.wilayah = 'Wilayah / Daerah wajib diisi.';
  }

  if (!form.pesan.trim()) {
    errors.pesan = 'Pesan pengajuan wajib diisi.';
  }

  if (!form.agree) {
    errors.agree = 'Anda harus menyetujui syarat & ketentuan.';
  }

  return Object.keys(errors).length === 0;
};

const handleSubmit = async () => {
  if (!validate()) return;

  replicationStore.resetState();

  const result = await replicationStore.submitReplicationRequest({
    name: form.nama,
    email: form.email,
    phone: form.telepon || undefined,
    organization: form.organisasi,
    region: form.wilayah,
    message: form.pesan,
    agree_terms: form.agree,
  });

  if (result && result.success) {
    toast.message = result.message || 'Pengajuan replikasi sistem berhasil dikirim.';
    toast.show = true;

    setTimeout(() => {
      toast.show = false;
    }, 3000);

    // Reset form
    Object.assign(form, {
      nama: authStore.user?.name || '',
      email: authStore.user?.email || '',
      telepon: authStore.user?.phone || '',
      organisasi: '',
      wilayah: '',
      pesan: '',
      agree: false,
    });
    Object.keys(errors).forEach((key) => delete errors[key]);
  } else {
    if (replicationStore.fieldErrors) {
      if (replicationStore.fieldErrors.name) errors.nama = replicationStore.fieldErrors.name[0];
      if (replicationStore.fieldErrors.email) errors.email = replicationStore.fieldErrors.email[0];
      if (replicationStore.fieldErrors.phone)
        errors.telepon = replicationStore.fieldErrors.phone[0];
      if (replicationStore.fieldErrors.organization)
        errors.organisasi = replicationStore.fieldErrors.organization[0];
      if (replicationStore.fieldErrors.region)
        errors.wilayah = replicationStore.fieldErrors.region[0];
      if (replicationStore.fieldErrors.message)
        errors.pesan = replicationStore.fieldErrors.message[0];
      if (replicationStore.fieldErrors.agree_terms)
        errors.agree = replicationStore.fieldErrors.agree_terms[0];
    }

    toast.message =
      replicationStore.error || 'Gagal mengirim permohonan replikasi. Silakan coba lagi.';
    toast.show = true;
    setTimeout(() => {
      toast.show = false;
    }, 4000);
  }
};
</script>

<style scoped>
.lottie-mascot {
  transform: scale(1.16);
  transform-origin: center center;
}

@media (min-width: 640px) {
  .lottie-mascot {
    transform: scale(1.2);
  }
}

@media (min-width: 1024px) {
  .lottie-mascot {
    transform: scale(1.24);
  }
}
</style>
