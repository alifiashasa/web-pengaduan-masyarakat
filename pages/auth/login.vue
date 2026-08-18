<template>
  <div class="w-full min-h-screen bg-white overflow-x-hidden flex flex-col lg:grid lg:grid-cols-2">
    <!-- Mobile Header Navbar (Only visible on mobile/tablet < lg) -->
    <header class="lg:hidden sticky top-0 z-40 w-full border-b border-[#EDEDED] bg-white">
      <div class="flex h-14 w-full items-center justify-between px-4">
        <!-- Logo Vide di kiri -->
        <NuxtLink to="/" class="flex items-center">
          <img src="/assets/icons/logo-web.svg" alt="Vide Logo" class="h-7 w-auto object-contain" />
        </NuxtLink>

        <!-- Hamburger Button di kanan -->
        <button
          type="button"
          class="p-2 text-gray-700 hover:text-[#E75A0F] focus:outline-none"
          @click="showMobileMenu = !showMobileMenu"
        >
          <svg
            v-if="!showMobileMenu"
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <!-- Mobile Navigation Drawer -->
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-4"
      >
        <div
          v-if="showMobileMenu"
          class="border-t border-gray-100 bg-white px-6 py-6 space-y-6 shadow-xl"
        >
          <nav class="flex flex-col gap-4">
            <NuxtLink
              to="/"
              class="text-sm font-medium text-[#E75A0F]"
              @click="showMobileMenu = false"
            >
              Homepage
            </NuxtLink>
            <a
              href="#tentang"
              class="text-sm font-medium text-gray-700 hover:text-[#E75A0F]"
              @click="showMobileMenu = false"
            >
              Tentang Kami
            </a>
            <NuxtLink
              to="/faq"
              class="text-sm font-medium text-gray-700 hover:text-[#E75A0F]"
              @click="showMobileMenu = false"
            >
              FAQ
            </NuxtLink>
            <NuxtLink
              to="/kontak"
              class="text-sm font-medium text-gray-700 hover:text-[#E75A0F]"
              @click="showMobileMenu = false"
            >
              Kontak
            </NuxtLink>
            <NuxtLink
              to="/replication-request"
              class="text-sm font-medium text-gray-700 hover:text-[#E75A0F]"
              @click="showMobileMenu = false"
            >
              Replication Request
            </NuxtLink>
          </nav>
        </div>
      </Transition>
    </header>

    <!-- Left Hero Banner (Desktop Only lg+) -->
    <div
      class="hidden lg:flex relative bg-black flex-col justify-end p-8 sm:p-12 lg:p-16 overflow-hidden h-full min-h-screen"
    >
      <!-- Background Image -->
      <img
        src="/img/background/bg-auth.webp"
        alt="Background Auth"
        class="absolute inset-0 w-full h-full object-cover"
      />
      <!-- Figma Color Overlay: #0A0A0A 32% -->
      <div class="absolute inset-0 bg-[#0A0A0A]/40 pointer-events-none"></div>

      <!-- Left Overlay Content -->
      <div class="relative z-10 space-y-5 text-white max-w-lg font-geist">
        <!-- Logo per Figma design -->
        <NuxtLink to="/" class="inline-flex items-center mb-1">
          <img src="/assets/icons/herms_logo.svg.svg" alt="Hermes Logo" class="h-8 sm:h-9 w-auto" />
        </NuxtLink>

        <!-- Quote -->
        <p class="text-lg sm:text-xl font-semibold leading-snug text-white font-geist">
          Bumi menyediakan cukup untuk memenuhi kebutuhan setiap orang, tetapi tidak untuk
          keserakahan setiap orang.
        </p>

        <!-- Author -->
        <p class="text-lg sm:text-xl font-semibold text-white tracking-wide font-geist">
          — Mahatma Gandhi
        </p>
      </div>
    </div>

    <!-- Right Form / Google Auth Section -->
    <div
      class="relative bg-white flex-1 min-h-[calc(100vh-56px)] lg:min-h-screen flex flex-col justify-center items-center p-2.5 sm:p-12 lg:p-16 overflow-y-auto h-full"
    >
      <!-- Subtle Grid Line Background Pattern -->
      <div
        class="absolute inset-0 pointer-events-none opacity-40 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:36px_36px] sm:bg-[size:48px_48px]"
      ></div>

      <!-- Auth Card Content -->
      <div
        class="relative z-10 w-full max-w-full sm:max-w-3xl flex flex-col items-center text-center my-auto font-geist px-2 sm:px-0"
      >
        <!-- Tag Badge -->
        <div class="mb-2 sm:mb-4">
          <span
            class="inline-flex items-center px-3.5 py-1 rounded-full text-[14px] font-medium bg-[#FFF7ED] text-[#E75A0F]"
          >
            Selamat Datang!
          </span>
        </div>

        <!-- Main Title -->
        <h1
          class="font-urbanist text-[24px] sm:text-3xl lg:text-[40px] font-bold sm:font-semibold text-gray-900 tracking-tight mb-2 sm:mb-3"
        >
          Buat Akun Masyarakat
        </h1>

        <!-- Subtitle Description -->
        <p
          class="font-geist text-[16px] sm:text-[18px] lg:text-[20px] text-[#555555] sm:text-[#0A0A0A] leading-snug sm:leading-relaxed mb-4 sm:mb-16 w-full max-w-[360px] min-[320px]:max-w-[390px] sm:max-w-3xl mx-auto tracking-tight"
        >
          Daftar sebagai masyarakat yuk, biar kamu bisa ikut melaporkan kejadian dan kamu langsung
          jadi bagian dari perubahan positif di sekitar kita!
        </p>

        <!-- Form / Action Section -->
        <div class="w-full space-y-4 sm:space-y-6 flex flex-col items-center">
          <!-- Agreement Checkbox -->
          <label
            class="flex items-start gap-2.5 sm:gap-3 text-left text-[14px] sm:text-[16px] text-gray-700 w-full max-w-full sm:max-w-[750px] pl-1 sm:pl-12 cursor-pointer select-none mx-auto"
          >
            <input
              type="checkbox"
              v-model="agreed"
              class="mt-0.5 sm:mt-1.5 checkbox border-[#0A0A0A] checked:border-[#E75A0F] rounded w-4 h-4 sm:w-5 sm:h-5 shrink-0 cursor-pointer [--chkbg:#E75A0F] [--chkfg:white]"
            />
            <span class="leading-snug tracking-[-0.035em] sm:tracking-normal">
              Saya telah membaca dan menyetujui
              <button
                type="button"
                class="font-bold text-gray-900 hover:text-[#E75A0F]"
                @click.stop="showTermsModal = true"
              >
                Syarat dan Ketentuan</button
              >, serta
              <br class="hidden sm:block" />
              <button
                type="button"
                class="font-bold text-gray-900 hover:text-[#E75A0F]"
                @click.stop="showPrivacyModal = true"
              >
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
              'w-full max-w-[280px] min-[320px]:max-w-[305px] sm:max-w-xs font-geist py-3 sm:py-3.5 px-4 sm:px-6 rounded-full font-medium text-[14px] sm:text-base flex items-center justify-center gap-2.5 sm:gap-3 transition-all cursor-pointer shadow-sm mx-auto',
              agreed
                ? 'bg-[#E75A0F] hover:bg-[#D44F0B] text-white active:scale-98 shadow-md shadow-orange-500/20'
                : 'bg-[#E75A0F]/70 text-white/90 cursor-not-allowed',
            ]"
            @click="handleGoogleLogin"
          >
            <!-- Google SVG Logo -->
            <svg class="w-5 h-5 sm:w-6 sm:h-6 shrink-0" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
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
import { ref, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import { signInWithPopup } from 'firebase/auth';
import TermsModal from '@/components/modals/TermsModal.vue';
import PrivacyModal from '@/components/modals/PrivacyModal.vue';
import ToastNotification from '@/components/ToastNotification.vue';
import { useAuth } from '@/composables/useAuth';

definePageMeta({
  layout: 'auth',
});

const router = useRouter();
const { authStore } = useAuth();

const agreed = ref(false);
const showMobileMenu = ref(false);
const showTermsModal = ref(false);
const showPrivacyModal = ref(false);
const toast = reactive({ show: false, message: '' });

// Alias loading dari store
const loading = computed(() => authStore.loading);

/**
 * Dipanggil saat tombol login Google diklik.
 * Menjalankan popup Firebase Google Sign-In dan mengirimkan user ke backend.
 */
const handleGoogleLogin = async () => {
  if (!agreed.value) return;

  try {
    const { $firebaseAuth, $firebaseGoogleProvider } = useNuxtApp() as any;

    if (!$firebaseAuth || !$firebaseGoogleProvider) {
      toast.message = 'Firebase SDK belum dikonfigurasi. Harap isi environment variables di .env.';
      toast.show = true;
      return;
    }

    // Trigger Firebase Google Sign-In Popup
    const result = await signInWithPopup($firebaseAuth, $firebaseGoogleProvider);
    const firebaseUser = result.user;

    if (!firebaseUser || !firebaseUser.email) {
      toast.message = 'Gagal mendapatkan data user dari Google.';
      toast.show = true;
      return;
    }

    // Panggil backend via store
    await authStore.handleGoogleAuth({
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      displayName: firebaseUser.displayName ?? '',
      phoneNumber: firebaseUser.phoneNumber ?? '',
      photoURL: firebaseUser.photoURL ?? '',
    });

    toast.message = 'Kamu sudah berhasil Masuk!';
    toast.show = true;

    setTimeout(() => {
      router.push('/');
    }, 1200);
  } catch (err: any) {
    console.error('Login error:', err);
    if (err.code === 'auth/popup-closed-by-user') {
      toast.message = 'Login dibatalkan karena popup ditutup.';
    } else if (err.code === 'auth/configuration-not-found') {
      toast.message = 'Konfigurasi Firebase tidak ditemukan di project.';
    } else {
      toast.message = err.message || authStore.error || 'Login gagal. Silakan coba lagi.';
    }
    toast.show = true;
  }
};
</script>
