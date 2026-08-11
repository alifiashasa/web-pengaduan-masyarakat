<template>
  <AppModal :isOpen="isOpen" customClass="max-w-[427px] h-[432px]" @close="$emit('close')">
    <div class="p-5 h-full flex flex-col justify-between">
      <h2 class="text-2xl font-bold text-[#0A0A0A] mb-3">Ubah Profil</h2>

      <form class="flex-1 flex flex-col justify-between gap-3" @submit.prevent="handleSubmit">
        <div class="space-y-1">
          <label class="block text-sm font-medium text-[#0A0A0A]">Nama Lengkap</label>
          <input
            v-model="form.name"
            type="text"
            class="w-full px-4 py-2.5 rounded-[12px] border border-[#EDEDED] text-base text-gray-900 focus:outline-none focus:border-[#F67011] transition-colors"
            placeholder="Alexander Graham Bell"
            required
          />
        </div>

        <div class="space-y-1">
          <label class="block text-sm font-medium text-[#0A0A0A]">Email</label>
          <input
            v-model="form.email"
            type="email"
            class="w-full px-4 py-2.5 rounded-[12px] border border-[#EDEDED] text-base text-gray-900 focus:outline-none focus:border-[#F67011] transition-colors"
            placeholder="grahambell@gmail.com"
            required
          />
        </div>

        <div class="space-y-1">
          <label class="block text-sm font-medium text-[#0A0A0A]">Nomor Telp.</label>
          <input
            v-model="form.phone"
            type="tel"
            class="w-full px-4 py-2.5 rounded-[12px] border border-[#EDEDED] text-base text-gray-900 focus:outline-none focus:border-[#F67011] transition-colors"
            placeholder="+62 081200000"
            required
          />
        </div>

        <div class="flex flex-col gap-2 pt-1">
          <button
            type="submit"
            class="w-full py-3 bg-[#F67011] hover:bg-[#e0620a] text-white text-base font-medium rounded-[12px] transition-all cursor-pointer shadow-xs"
          >
            Simpan
          </button>
          <button
            type="button"
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

const { user, updateProfile } = useAuth();

const form = ref({
  name: user.value.name,
  email: user.value.email,
  phone: user.value.phone,
});

watch(
  () => props.isOpen,
  (val) => {
    if (val) {
      form.value = {
        name: user.value.name,
        email: user.value.email,
        phone: user.value.phone,
      };
    }
  }
);

const handleSubmit = () => {
  updateProfile({
    name: form.value.name,
    email: form.value.email,
    phone: form.value.phone,
  });
  emit('saved');
  emit('close');
};
</script>
