<template>
  <div class="w-full min-h-screen h-screen bg-white overflow-hidden grid grid-cols-1 lg:grid-cols-2">
    <!-- Left Hero Banner (Full Height) -->
    <div class="relative bg-black flex flex-col justify-end p-8 sm:p-12 lg:p-16 overflow-hidden h-full min-h-[40vh] lg:min-h-screen">
      <!-- Background Image -->
      <img
        src="/images/bg-auth.webp"
        alt="Background Auth"
        class="absolute inset-0 w-full h-full object-cover"
      />
      <!-- Figma Color Overlay: #0A0A0A 32% -->
      <div class="absolute inset-0 bg-[#0A0A0A]/40 pointer-events-none"></div>

      <!-- Left Overlay Content -->
      <div class="relative z-10 space-y-5 text-white max-w-lg font-geist">
        <!-- Logo per Figma design -->
        <NuxtLink to="/" class="inline-flex items-center mb-1">
          <img
            src="/images/herms_logo.svg.svg"
            alt="Hermes Logo"
            class="h-8 sm:h-9 w-auto"
          />
        </NuxtLink>

        <!-- Quote -->
        <p class="text-lg sm:text-xl font-semibold leading-snug text-white font-geist">
          Bumi menyediakan cukup untuk memenuhi kebutuhan setiap orang, tetapi tidak untuk keserakahan setiap orang.
        </p>

        <!-- Author -->
        <p class="text-lg sm:text-xl font-semibold text-white tracking-wide font-geist">
          — Mahatma Gandhi
        </p>
      </div>
    </div>

    <!-- Right Form / Google Auth Section (Full Height) -->
    <div class="relative bg-white flex flex-col justify-center items-center p-6 sm:p-12 lg:p-16 overflow-y-auto h-full min-h-[60vh] lg:min-h-screen">
      <!-- Subtle Grid Line Background Pattern -->
      <div class="absolute inset-0 pointer-events-none opacity-40 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:48px_48px]"></div>

      <!-- Auth Card Content -->
      <div class="relative z-10 w-full max-w-3xl flex flex-col items-center text-center my-auto font-geist">
        <!-- Tag Badge -->
        <div class="mb-4">
          <span class="inline-flex items-center px-3.5 py-1 rounded-full text-s font-medium bg-[#FFF7ED] text-[#E75A0F]">
            Selamat Datang!
          </span>
        </div>

        <!-- Main Title -->
        <h1 class="font-urbanist text-2xl sm:text-3xl lg:text-[40px] font-semibold text-gray-900 tracking-tight mb-3">
          Buat Akun Masyarakat
        </h1>

        <!-- Subtitle Description -->
        <p class="font-geist text-[20px] text-[#0A0A0A] leading-relaxed mb-16 max-w-3xl">
          Daftar sebagai masyarakat yuk, biar kamu bisa ikut melaporkan kejadian dan kamu langsung jadi bagian dari perubahan positif di sekitar kita!
        </p>

        <!-- Form / Action Section -->
        <div class="w-full space-y-6 flex flex-col items-center">
          <!-- Agreement Checkbox -->
          <label class="flex items-start gap-3 text-left text-[16px] text-gray-700 w-full max-w-[750px] pl-6 sm:pl-12 cursor-pointer select-none">
            <input
              type="checkbox"
              v-model="agreed"
              class="mt-1.5 checkbox border-[#0A0A0A] checked:border-[#E75A0F] rounded-md w-5 h-5 shrink-0 cursor-pointer [--chkbg:#E75A0F] [--chkfg:white]"
            />
            <span class="leading-snug">
              Saya telah membaca dan menyetujui
              <button type="button" class="font-bold text-gray-900 hover:text-[#E75A0F]" @click.stop="showTermsModal = true">
                Syarat dan Ketentuan
              </button>,
              serta
              <br class="hidden sm:block" />
              <button type="button" class="font-bold text-gray-900 hover:text-[#E75A0F]" @click.stop="showPrivacyModal = true">
                Kebijakan Privasi
              </button>
              yang berlaku.
            </span>
          </label>

          <!-- Google Login Button -->
          <button
            type="button"
            :disabled="!agreed || loading"
            :class="[
              'w-full max-w-xs font-geist py-3.5 px-6 rounded-full font-medium text-xs sm:text-base flex items-center justify-center gap-3 transition-all cursor-pointer shadow-sm',
              agreed
                ? 'bg-[#E75A0F] hover:bg-[#D44F0B] text-white active:scale-98 shadow-md shadow-orange-500/20'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed opacity-70'
            ]"
            @click="handleGoogleLogin"
          >
            <!-- Google SVG Logo -->
            <svg class="w-6 h-6 sm:w-6 sm:h-6 shrink-0" viewBox="0 0 24 24">
              <path :fill="agreed ? 'currentColor' : '#9E9E9E'" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path :fill="agreed ? 'currentColor' : '#9E9E9E'" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path :fill="agreed ? 'currentColor' : '#9E9E9E'" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path :fill="agreed ? 'currentColor' : '#9E9E9E'" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span v-if="!loading">Masuk Menggunakan Google</span>
            <span v-else>Memproses...</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Modals & Toasts -->
    <TermsModal :isOpen="showTermsModal" @close="showTermsModal = false" @accept="agreed = true" />
    <PrivacyModal :isOpen="showPrivacyModal" @close="showPrivacyModal = false" />
    <ToastNotification :show="toast.show" :message="toast.message" @close="toast.show = false" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import TermsModal from '@/components/modals/TermsModal.vue';
import PrivacyModal from '@/components/modals/PrivacyModal.vue';
import ToastNotification from '@/components/ToastNotification.vue';
import { useAuth } from '@/composables/useAuth';

definePageMeta({
  layout: 'auth',
});

const router = useRouter();
const { login } = useAuth();

const agreed = ref(false);
const loading = ref(false);
const showTermsModal = ref(false);
const showPrivacyModal = ref(false);
const toast = reactive({ show: false, message: '' });

const handleGoogleLogin = () => {
  if (!agreed.value) return;

  loading.value = true;
  setTimeout(() => {
    login();
    loading.value = false;
    toast.message = 'Kamu sudah berhasil Masuk!';
    toast.show = true;

    setTimeout(() => {
      router.push('/');
    }, 1200);
  }, 600);
};
</script>


