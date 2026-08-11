<template>
  <div class="w-full lg:w-[308px] h-auto lg:h-[960px] bg-[#FEFFFF] rounded-[20px] border border-[#EDEDED] p-6 shadow-xs flex flex-col items-center text-center justify-start shrink-0">
    <div class="w-full flex flex-col items-center text-center">
      <!-- Hermes Paris Logo -->
      <div class="mb-10 flex items-center justify-center pt-2">
        <img
          src="/images/herms_logo.svg.svg"
          alt="HERMÈS PARIS"
          class="h-[32px] w-[55px] filter brightness-0"
        />
      </div>

      <!-- User Avatar -->
      <div class="relative mb-3">
        <img
          :src="user.avatarUrl"
          :alt="user.name"
          class="w-16 h-16 rounded-full object-cover shadow-xs border border-gray-100"
        />
      </div>

      <!-- User Info -->
      <h3 class="text-xl sm:text-lg font-semibold text-gray-900 mb-8">{{ user.name }}</h3>

      <!-- Sidebar Nav Links -->
      <nav class="w-full flex flex-col gap-2 text-left">
        <NuxtLink
          to="/profile"
          :class="[
            'flex items-center gap-3 px-4 py-3 rounded-[12px] text-sm font-regular transition-all',
            currentRoute === '/profile'
              ? 'bg-[#F67011] text-white shadow-xs'
              : 'text-gray-700 hover:bg-gray-50'
          ]"
        >
          <img
            src="/images/icon-user-circle.svg"
            alt="Profile"
            :class="['w-5 h-5 shrink-0 transition-all', currentRoute === '/profile' ? 'brightness-0 invert' : '']"
          />
          <span>Profile</span>
        </NuxtLink>

        <NuxtLink
          to="/profile/riwayat"
          :class="[
            'flex items-center gap-3 px-4 py-3 rounded-[12px] text-sm font-regular transition-all',
            currentRoute === '/profile/riwayat'
              ? 'bg-[#F67011] text-white shadow-xs'
              : 'text-gray-700 hover:bg-gray-50'
          ]"
        >
          <img
            src="/images/icon-sticky-note.svg"
            alt="Riwayat Pengaduan"
            :class="['w-5 h-5 shrink-0 transition-all', currentRoute === '/profile/riwayat' ? '' : 'brightness-0 opacity-70']"
          />
          <span>Riwayat Pengaduan</span>
        </NuxtLink>

        <button
          type="button"
          class="flex items-center gap-3 px-4 py-3 rounded-[12px] text-sm font-regular text-[#F67011] hover:bg-orange-50 transition-all w-full text-left cursor-pointer"
          @click="handleLogout"
        >
          <img
            src="/images/icon-logout.svg"
            alt="Logout"
            class="w-5 h-5 shrink-0"
          />
          <span>Logout</span>
        </button>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuth } from '@/composables/useAuth';

const route = useRoute();
const router = useRouter();
const { user, logout } = useAuth();

const currentRoute = computed(() => route.path);

const handleLogout = () => {
  logout();
  router.push('/');
};
</script>
