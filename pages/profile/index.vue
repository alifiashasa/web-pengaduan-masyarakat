<template>
  <div
    class="p-4 sm:p-4 lg:p-4 bg-[#F3F4F6] min-h-screen lg:h-full w-full flex-1 flex flex-col justify-start lg:overflow-hidden"
  >
    <div class="flex flex-col lg:flex-row gap-4 items-start w-full lg:h-full lg:overflow-hidden">
      <!-- Sidebar Navigasi -->
      <div class="w-full lg:w-[308px] shrink-0 lg:h-full lg:overflow-hidden lg:rounded-[20px]">
        <ProfileSidebar />
      </div>

      <div class="flex-1 min-w-0 space-y-4">
        <nav
          class="w-full h-[80px] bg-white rounded-2xl border border-gray-100 px-16 shadow-sm flex items-center justify-between gap-[10px]"
        >
          <div class="flex items-center gap-2 text-sm">
            <NuxtLink to="/" class="text-[#757575] hover:text-gray-900 transition-colors"
              >Home</NuxtLink
            >
            <span class="text-gray-400">></span>
            <span class="font-semibold text-gray-900">Profil</span>
          </div>

          <div class="flex flex-wrap items-center gap-5 sm:gap-6 text-sm">
            <NuxtLink
              to="/#tentang"
              class="text-[#757575] hover:text-gray-900 transition-colors font-medium"
              >Tentang Kami</NuxtLink
            >
            <NuxtLink
              to="/faq"
              class="text-[#757575] hover:text-gray-900 transition-colors font-medium"
              >FAQ</NuxtLink
            >
            <NuxtLink
              to="/kontak"
              class="text-[#757575] hover:text-gray-900 transition-colors font-medium"
              >Kontak</NuxtLink
            >
            <NuxtLink
              to="/replication-request"
              class="font-medium text-[#0A0A0A] hover:text-[#F67011] transition-colors"
            >
              Replication Request
            </NuxtLink>
            <div class="flex items-center gap-2 pl-2">
              <img
                :src="user.avatarUrl"
                :alt="user.name"
                class="w-8 h-8 rounded-full object-cover border border-gray-200"
              />
              <span class="font-medium text-[#757575] text-xs sm:text-sm">{{ user.email }}</span>
            </div>
          </div>
        </nav>

        <div
          class="w-full bg-[#FEFFFF] rounded-[20px] border border-[#EDEDED] p-6 shadow-xs space-y-[20px]"
        >
          <div>
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center gap-2.5">
                <img
                  src="/assets/icons/icon-pict.svg"
                  alt="Profile Picture"
                  class="w-[21px] h-[21px] shrink-0"
                />
                <h3 class="text-base sm:text-lg font-medium text-gray-900">Profile Picture</h3>
              </div>

              <button
                type="button"
                class="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-[#F67011] transition-colors cursor-pointer"
                @click="showEditModal = true"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
                <span>Edit Profil</span>
              </button>
            </div>

            <div class="flex items-center gap-4 sm:gap-6">
              <img
                :src="user.avatarUrl"
                :alt="user.name"
                class="w-20 h-20 rounded-full object-cover shadow-sm border border-gray-100 shrink-0"
              />
              <div class="flex flex-wrap items-center gap-3">
                <input
                  ref="fileInput"
                  type="file"
                  accept="image/*"
                  class="hidden"
                  @change="handleImageUpload"
                />
                <button
                  type="button"
                  class="px-6 py-2.5 bg-[#F67011] hover:bg-[#e0620a] text-white text-base font-medium rounded-full shadow-xs transition-all cursor-pointer"
                  @click="triggerFileInput"
                >
                  Ubah Gambar
                </button>
                <button
                  type="button"
                  class="px-6 py-2.5 bg-white border border-[#EOEOEO] text-[#F67011] hover:bg-orange-50 text-base font-medium rounded-full transition-all cursor-pointer"
                  @click="removeAvatar"
                >
                  Hapus gambar
                </button>
              </div>
            </div>
          </div>

          <!-- Informasi Akun & Data Diri -->
          <div class="pt-2">
            <div class="flex items-center gap-2.5 mb-6">
              <img
                src="/assets/icons/icon-user.svg"
                alt="Informasi Personal"
                class="w-6 h-6 shrink-0"
              />
              <h3 class="text-base sm:text-lg font-medium text-gray-900">Informasi Personal</h3>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <span class="text-base font-regular text-[#757575] block mb-1">Nama Lengkap</span>
                <p class="text-xl font-semibold text-gray-900">Alexander Graham Bell</p>
              </div>

              <div>
                <span class="text-base font-regular text-[#757575] block mb-1">Email</span>
                <p class="text-xl font-semibold text-gray-900 break-all">{{ user.email }}</p>
              </div>

              <div>
                <span class="text-base font-regular text-[#757575] block mb-1">Nomor Telp.</span>
                <p class="text-xl font-semibold text-gray-900">{{ user.phone }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <EditProfileModal
    :isOpen="showEditModal"
    @close="showEditModal = false"
    @saved="handleProfileSaved"
  />
  <ToastNotification :show="toast.show" :message="toast.message" @close="toast.show = false" />
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import AppContainer from '@/components/AppContainer.vue';
import ProfileSidebar from '@/components/ProfileSidebar.vue';
import EditProfileModal from '@/components/modals/EditProfileModal.vue';
import ToastNotification from '@/components/ToastNotification.vue';
import { useAuth } from '@/composables/useAuth';

definePageMeta({ layout: 'profile' });

const { user, updateProfile } = useAuth();

const showEditModal = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);
const toast = reactive({ show: false, message: '' });

const triggerFileInput = () => {
  fileInput.value?.click();
};

const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        updateProfile({ avatarUrl: e.target.result as string });
        toast.message = 'Gambar profil berhasil diperbarui!';
        toast.show = true;
        setTimeout(() => (toast.show = false), 3000);
      }
    };
    reader.readAsDataURL(target.files[0]);
  }
};

const removeAvatar = () => {
  updateProfile({
    avatarUrl:
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
  });
  toast.message = 'Gambar profil berhasil dihapus.';
  toast.show = true;
  setTimeout(() => (toast.show = false), 3000);
};

const handleProfileSaved = () => {
  toast.message = 'Profil berhasil diperbarui!';
  toast.show = true;
  setTimeout(() => (toast.show = false), 3000);
};
</script>
