<template>
  <AppModal
    :isOpen="isOpen"
    customClass="max-w-[427px] h-auto min-h-[432px]"
    @close="$emit('close')"
  >
    <div class="p-5 h-full flex flex-col justify-between">
      <h2 class="text-2xl font-bold text-[#0A0A0A] mb-3">Ubah Profil</h2>

      <div v-if="errorMessage" class="mb-3 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
        {{ errorMessage }}
      </div>

      <form class="flex-1 flex flex-col justify-between gap-3" @submit.prevent="handleSubmit">
        <div class="space-y-1">
          <label class="block text-sm font-medium text-[#0A0A0A]">Nama Lengkap</label>
          <input
            v-model="form.name"
            type="text"
            class="w-full px-4 py-2.5 rounded-[12px] border border-[#EDEDED] text-base text-gray-900 focus:outline-none focus:border-[#F67011] transition-colors"
            placeholder="Masukkan nama lengkap"
            required
            :disabled="isSubmitting"
          />
        </div>

        <div class="space-y-1">
          <label class="block text-sm font-medium text-[#0A0A0A]">Email</label>
          <input
            v-model="form.email"
            type="email"
            class="w-full px-4 py-2.5 rounded-[12px] border border-[#EDEDED] text-base text-gray-500 bg-gray-100 cursor-not-allowed"
            disabled
          />
        </div>

        <div class="space-y-1">
          <label class="block text-sm font-medium text-[#0A0A0A]">Nomor Telp.</label>
          <input
            v-model="form.phone"
            type="tel"
            class="w-full px-4 py-2.5 rounded-[12px] border border-[#EDEDED] text-base text-gray-900 focus:outline-none focus:border-[#F67011] transition-colors"
            placeholder="081234567890"
            required
            :disabled="isSubmitting"
          />
        </div>

        <div class="flex flex-col gap-2 pt-1">
          <button
            type="submit"
            :disabled="isSubmitting"
            class="w-full py-3 bg-[#F67011] hover:bg-[#e0620a] disabled:opacity-50 text-white text-base font-medium rounded-[12px] transition-all cursor-pointer shadow-xs flex items-center justify-center gap-2"
          >
            <svg
              v-if="isSubmitting"
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
            <span>{{ isSubmitting ? 'Menyimpan...' : 'Simpan' }}</span>
          </button>
          <button
            type="button"
            :disabled="isSubmitting"
            class="w-full py-3 bg-white border border-[#EDEDED] text-[#0A0A0A] hover:bg-gray-50 text-base font-medium rounded-[12px] transition-all cursor-pointer"
            @click="$emit('close')"
          >
            Batalkan
          </button>
        </div>
      </form>
    </div>
  </AppModal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import AppModal from '../AppModal.vue';
import { useAuth } from '@/composables/useAuth';

const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits(['close', 'saved']);

const { user, updateUserProfile } = useAuth();

const form = ref({
  name: user.value.name,
  email: user.value.email,
  phone: user.value.phone,
});

const isSubmitting = ref(false);
const errorMessage = ref<string | null>(null);

watch(
  () => props.isOpen,
  (val) => {
    if (val) {
      errorMessage.value = null;
      form.value = {
        name: user.value.name,
        email: user.value.email,
        phone: user.value.phone,
      };
    }
  }
);

watch(
  () => user.value,
  (newUser) => {
    if (newUser) {
      form.value.name = newUser.name;
      form.value.email = newUser.email;
      form.value.phone = newUser.phone;
    }
  },
  { deep: true }
);

const handleSubmit = async () => {
  isSubmitting.value = true;
  errorMessage.value = null;

  try {
    const res = await updateUserProfile({
      name: form.value.name,
      phone: form.value.phone,
    });
    emit('saved', res?.message || 'Profil berhasil diperbarui.');
    emit('close');
  } catch (err: any) {
    errorMessage.value = err?.data?.message || err?.message || 'Gagal memperbarui profil.';
  } finally {
    isSubmitting.value = false;
  }
};
</script>
