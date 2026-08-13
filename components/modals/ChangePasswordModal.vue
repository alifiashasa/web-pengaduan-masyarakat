<template>
  <AppModal :isOpen="isOpen" title="Ubah Kata Sandi" maxWidth="md" @close="$emit('close')">
    <form class="space-y-4" @submit.prevent="handleSubmit">
      <AppInput
        v-model="form.oldPassword"
        type="password"
        label="Kata Sandi Lama"
        placeholder="Masukkan kata sandi lama"
        required
      />
      <AppInput
        v-model="form.newPassword"
        type="password"
        label="Kata Sandi Baru"
        placeholder="Minimal 8 karakter"
        required
      />
      <AppInput
        v-model="form.confirmPassword"
        type="password"
        label="Konfirmasi Kata Sandi Baru"
        placeholder="Ulangi kata sandi baru"
        :error="passwordMismatch ? 'Konfirmasi kata sandi tidak cocok' : ''"
        required
      />

      <div class="pt-2 flex justify-end gap-3">
        <AppButton variant="secondary" size="md" @click="$emit('close')">Batal</AppButton>
        <AppButton variant="primary" size="md" type="submit" :disabled="passwordMismatch"
          >Ubah Sandi</AppButton
        >
      </div>
    </form>
  </AppModal>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import AppModal from '../AppModal.vue';
import AppButton from '../AppButton.vue';
import AppInput from '../AppInput.vue';

defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits(['close', 'changed']);

const form = ref({
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
});

const passwordMismatch = computed(() => {
  return (
    form.value.confirmPassword.length > 0 && form.value.newPassword !== form.value.confirmPassword
  );
});

const handleSubmit = () => {
  if (passwordMismatch.value) return;
  emit('changed');
  emit('close');
  form.value = { oldPassword: '', newPassword: '', confirmPassword: '' };
};
</script>
