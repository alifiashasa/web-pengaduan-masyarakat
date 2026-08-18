<template>
  <header class="sticky top-0 z-40 border-b border-[#EDEDED] bg-white">
    <div
      class="mx-auto flex h-16 md:h-[80px] w-full max-w-[1216px] items-center justify-between px-4 sm:px-6 lg:px-0"
    >
      <!-- Bagian Kiri: Logo & Navigasi -->
      <div class="flex items-center gap-10">
        <NuxtLink to="/" class="flex items-center">
          <img
            src="/assets/icons/logo-web.svg"
            alt="Vide Logo"
            class="h-8 md:h-10 w-auto object-contain"
          />
        </NuxtLink>

        <nav class="hidden md:flex items-center gap-7">
          <NuxtLink
            to="/"
            :class="[
              'text-[16px] font-medium transition-colors',
              route.path === '/' ? 'text-[#E75A0F]' : 'text-[#757575] hover:text-[#0A0A0A]',
            ]"
          >
            Homepage
          </NuxtLink>
          <a
            href="#tentang"
            class="text-[15px] font-medium text-[#757575] hover:text-[#0A0A0A] transition-colors"
          >
            Tentang Kami
          </a>
          <NuxtLink
            to="/faq"
            :class="[
              'text-[15px] font-medium transition-colors',
              route.path === '/faq' ? 'text-[#E75A0F]' : 'text-[#757575] hover:text-[#0A0A0A]',
            ]"
          >
            FAQ
          </NuxtLink>
          <NuxtLink
            to="/kontak"
            :class="[
              'text-[15px] font-medium transition-colors',
              route.path === '/kontak' ? 'text-[#E75A0F]' : 'text-[#757575] hover:text-[#0A0A0A]',
            ]"
          >
            Kontak
          </NuxtLink>
        </nav>
      </div>

      <!-- Bagian Kanan: Status Login & Menu User -->
      <div class="hidden md:flex items-center gap-6">
        <template v-if="!isLoggedIn">
          <NuxtLink
            to="/replication-request"
            :class="[
              'text-[15px] font-medium transition-colors',
              route.path === '/replication-request'
                ? 'text-[#F67011] font-semibold'
                : 'text-[#0A0A0A] hover:text-[#E75A0F]',
            ]"
          >
            Replication Request
          </NuxtLink>
          <NuxtLink to="/auth/login">
            <button
              class="rounded-full bg-[#E75A0F] px-6 py-2.5 text-[15px] font-semibold text-white transition-colors hover:bg-[#d4500b]"
            >
              Masuk Sebagai Warga
            </button>
          </NuxtLink>
        </template>

        <template v-else>
          <NuxtLink
            to="/replication-request"
            :class="[
              'text-[15px] font-medium transition-colors',
              route.path === '/replication-request'
                ? 'text-[#F67011] font-semibold'
                : 'text-[#0A0A0A] hover:text-[#E75A0F]',
            ]"
          >
            Replication Request
          </NuxtLink>

          <div class="relative">
            <button
              type="button"
              class="flex items-center gap-3 p-1 rounded-xl hover:bg-gray-50 transition-colors focus:outline-none"
              @click="showProfileDropdown = !showProfileDropdown"
            >
              <img
                :src="user.avatarUrl"
                :alt="user.name"
                class="w-10 h-10 rounded-full object-cover border border-gray-200"
              />
              <span class="text-[16px] font-medium text-[#555555]">
                {{ user.email }}
              </span>
            </button>

            <div
              v-if="showProfileDropdown"
              class="fixed inset-0 z-40 cursor-default"
              @click="showProfileDropdown = false"
            />

            <div
              v-if="showProfileDropdown"
              class="absolute right-0 mt-4 w-[308px] bg-[#FEFFFF] rounded-[20px] shadow-[0_4px_15px_rgba(16,24,40,0.12)] border border-[#EDEDED] p-3 z-50 flex flex-col gap-2"
            >
              <NuxtLink
                to="/profile"
                :class="[
                  'flex items-center gap-3 px-3.5 py-2.5 rounded-[14px] text-[15px] font-medium transition-all',
                  route.path === '/profile'
                    ? 'bg-[#F67011] text-white'
                    : 'bg-transparent text-[#0A0A0A] hover:bg-[#EDEDED]',
                ]"
                @click="showProfileDropdown = false"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  class="w-5 h-5 shrink-0"
                >
                  <circle
                    cx="10.0003"
                    cy="10.0003"
                    r="8.33333"
                    stroke="currentColor"
                    stroke-width="1.5"
                  />
                  <path
                    d="M12.0792 7.91634C12.0792 9.06693 11.1452 9.99967 9.99294 9.99967C8.84071 9.99967 7.90664 9.06693 7.90664 7.91634C7.90664 6.76575 8.84071 5.83301 9.99294 5.83301C11.1452 5.83301 12.0792 6.76575 12.0792 7.91634Z"
                    fill="currentColor"
                  />
                  <path
                    d="M6.25 14.1663C8.19308 12.1312 11.786 12.0354 13.75 14.1663M12.0792 7.91634C12.0792 9.06693 11.1452 9.99967 9.99294 9.99967C8.84071 9.99967 7.90664 9.06693 7.90664 7.91634C7.90664 6.76575 8.84071 5.83301 9.99294 5.83301C11.1452 5.83301 12.0792 6.76575 12.0792 7.91634Z"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                </svg>
                <span>Profile</span>
              </NuxtLink>

              <NuxtLink
                to="/profile/riwayat"
                :class="[
                  'flex items-center gap-3 px-3.5 py-2.5 rounded-[14px] text-[15px] font-medium transition-all',
                  route.path === '/profile/riwayat'
                    ? 'bg-[#F67011] text-white'
                    : 'bg-transparent text-[#0A0A0A] hover:bg-[#EDEDED]',
                ]"
                @click="showProfileDropdown = false"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  class="w-5 h-5 shrink-0"
                >
                  <path
                    d="M10.2493 2.30293C10.5945 2.91106 10.3897 3.68866 9.79189 4.03977C9.19412 4.39087 8.42976 4.18251 8.08464 3.57438C7.73952 2.96626 7.94433 2.18865 8.5421 1.83755C9.13986 1.48645 9.90422 1.6948 10.2493 2.30293Z"
                    fill="currentColor"
                  />
                  <path
                    d="M8.84354 4.16706L8.40459 5.83366M10.2493 2.30293C10.5945 2.91106 10.3897 3.68866 9.79189 4.03977C9.19412 4.39087 8.42976 4.18251 8.08464 3.57438C7.73952 2.96626 7.94433 2.18865 8.5421 1.83755C9.13986 1.48645 9.90422 1.6948 10.2493 2.30293Z"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                  <path
                    d="M10.833 18.3317C10.0255 17.348 8.74967 15 7.08301 15C6.0078 15.0883 5.44611 16.1342 4.87323 16.9406M4.87323 16.9406C4.54279 16.6342 4.41843 16.1772 4.16972 15.2632L2.71653 9.92283C2.13168 7.77355 1.83925 6.69892 2.33564 5.85232C2.83202 5.00571 3.92337 4.71777 6.10606 4.14187L7.91634 3.66423M4.87323 16.9406C5.20367 17.2471 5.67439 17.3419 6.61584 17.5316L10.0674 18.2271C10.8032 18.3754 10.8098 18.3752 11.5352 18.1838L13.8933 17.5616C16.076 16.9857 17.1673 16.6978 17.6637 15.8511C18.1601 15.0045 17.8677 13.9299 17.2828 11.7806L15.8354 6.46146C15.2505 4.31218 14.9581 3.23755 14.0983 2.74876C13.3493 2.32293 12.4245 2.48663 10.7555 2.91667"
                    stroke="currentColor"
                    stroke-width="1.5"
                  />
                </svg>
                <span>Riwayat Pengaduan</span>
              </NuxtLink>

              <button
                type="button"
                class="flex items-center gap-3 px-3.5 py-2.5 rounded-[14px] text-[15px] font-medium text-[#0A0A0A] bg-transparent hover:bg-[#EDEDED] transition-all w-full text-left"
                @click="
                  showLogoutDialog = true;
                  showProfileDropdown = false;
                "
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  class="w-5 h-5 shrink-0"
                >
                  <path
                    d="M12.5 14.6875C12.4387 16.2308 11.1526 17.5412 9.4297 17.499C9.02887 17.4892 8.53344 17.3495 7.5426 17.07C5.15801 16.3974 3.08796 15.267 2.5913 12.7346C2.5 12.2691 2.5 11.7453 2.5 10.6977L2.5 9.30229C2.5 8.25468 2.5 7.73087 2.5913 7.26538C3.08796 4.73304 5.15801 3.60263 7.5426 2.93002C8.53345 2.65054 9.02887 2.5108 9.4297 2.50099C11.1526 2.45884 12.4387 3.76923 12.5 5.31251"
                    stroke="#E75A0F"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                  <path
                    d="M17.4997 10.0003H8.33301M17.4997 10.0003C17.4997 9.4168 15.8378 8.3266 15.4163 7.91699M17.4997 10.0003C17.4997 10.5838 15.8378 11.6741 15.4163 12.0837"
                    stroke="#E75A0F"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </template>
      </div>

      <!-- Tombol Hamburger Mobile -->
      <button
        type="button"
        class="md:hidden p-2 text-gray-700 hover:text-brand-orange focus:outline-none"
        @click="showMobileMenu = !showMobileMenu"
      >
        <svg
          v-if="!showMobileMenu"
          xmlns="http://www.w3.org/2000/svg"
          class="h-7 w-7"
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
          class="h-7 w-7"
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

    <!-- Drawer Navigasi Mobile -->
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
        class="md:hidden border-t border-gray-100 bg-white px-6 py-6 space-y-6 shadow-xl"
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
            :class="[
              'text-sm font-medium transition-colors',
              route.path === '/faq' ? 'text-[#E75A0F]' : 'text-gray-700 hover:text-[#E75A0F]',
            ]"
            @click="showMobileMenu = false"
          >
            FAQ
          </NuxtLink>
          <NuxtLink
            to="/kontak"
            :class="[
              'text-sm font-medium transition-colors',
              route.path === '/kontak' ? 'text-[#E75A0F]' : 'text-gray-700 hover:text-[#E75A0F]',
            ]"
            @click="showMobileMenu = false"
          >
            Kontak
          </NuxtLink>
          <NuxtLink
            to="/replication-request"
            :class="[
              'text-sm font-medium transition-colors',
              route.path === '/replication-request'
                ? 'text-[#F67011] font-semibold'
                : 'text-gray-700 hover:text-[#E75A0F]',
            ]"
            @click="showMobileMenu = false"
          >
            Replication Request
          </NuxtLink>
        </nav>

        <div class="border-t border-gray-100 pt-6">
          <template v-if="!isLoggedIn">
            <div class="flex flex-col gap-3">
              <NuxtLink to="/auth/login" @click="showMobileMenu = false">
                <button
                  class="w-full rounded-full bg-[#E75A0F] py-2.5 text-center text-sm font-semibold text-white"
                >
                  Masuk Sebagai Warga
                </button>
              </NuxtLink>
            </div>
          </template>

          <template v-else>
            <div class="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-xl">
              <img
                :src="user.avatarUrl"
                :alt="user.name"
                class="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p class="text-sm font-bold text-gray-900">{{ user.name }}</p>
                <p class="text-xs text-gray-500">{{ user.username }}</p>
              </div>
            </div>
            <div class="flex flex-col gap-2">
              <NuxtLink to="/profile" @click="showMobileMenu = false">
                <AppButton variant="secondary" fullWidth size="sm">Profile Saya</AppButton>
              </NuxtLink>
              <NuxtLink to="/profile/riwayat" @click="showMobileMenu = false">
                <AppButton variant="secondary" fullWidth size="sm">Riwayat Pengaduan</AppButton>
              </NuxtLink>
              <AppButton
                variant="danger"
                fullWidth
                size="sm"
                @click="
                  showLogoutDialog = true;
                  showMobileMenu = false;
                "
                >Keluar</AppButton
              >
            </div>
          </template>
        </div>
      </div>
    </Transition>
  </header>

  <!-- Dialog Konfirmasi Logout -->
  <LogoutConfirmModal
    :isOpen="showLogoutDialog"
    @close="showLogoutDialog = false"
    @confirm="handleLogout"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuth } from '@/composables/useAuth';
import LogoutConfirmModal from '@/components/modals/LogoutConfirmModal.vue';

const route = useRoute();
const router = useRouter();
const { isLoggedIn, user, logout } = useAuth();

const showMobileMenu = ref(false);
const showProfileDropdown = ref(false);
const showLogoutDialog = ref(false);

const handleLogout = async () => {
  showLogoutDialog.value = false;
  showProfileDropdown.value = false;
  showMobileMenu.value = false;
  await logout();
  router.push('/');
};
</script>
