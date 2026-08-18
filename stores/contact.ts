import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRuntimeConfig } from '#app';

export interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

export interface ContactMessage {
  id: number;
  name: string;
  email?: string;
  phone?: string | null;
  subject?: string | null;
  message?: string;
  created_at?: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  contact_message?: ContactMessage;
}

export interface ApiValidationError {
  message?: string;
  errors?: Record<string, string[]>;
}

export const useContactStore = defineStore('contact', () => {
  const config = useRuntimeConfig();

  const getApiBase = () =>
    (
      (config.public.apiUrl as string) || 'https://backoffice-pengaduan-masyarakat.can.co.id/api'
    ).replace(/\/+$/, '');

  // State
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);
  const fieldErrors = ref<Record<string, string[]> | null>(null);

  const resetState = () => {
    loading.value = false;
    error.value = null;
    fieldErrors.value = null;
  };

  /**
   * Send contact message
   * POST /api/contact
   */
  async function sendContactMessage(payload: ContactPayload): Promise<ContactResponse | null> {
    loading.value = true;
    error.value = null;
    fieldErrors.value = null;

    try {
      const response = await $fetch<ContactResponse>(`${getApiBase()}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: {
          name: payload.name.trim(),
          email: payload.email.trim(),
          ...(payload.phone?.trim() ? { phone: payload.phone.trim() } : {}),
          ...(payload.subject?.trim() ? { subject: payload.subject.trim() } : {}),
          message: payload.message.trim(),
        },
      });

      return response;
    } catch (err: unknown) {
      let errorMessage = 'Gagal mengirim pesan. Silakan coba lagi.';

      if (err && typeof err === 'object') {
        const fetchErr = err as {
          data?: ApiValidationError;
          message?: string;
          statusCode?: number;
        };
        if (fetchErr.data?.errors) {
          fieldErrors.value = fetchErr.data.errors;
        }
        if (fetchErr.data?.message) {
          errorMessage = fetchErr.data.message;
        } else if (fetchErr.message) {
          errorMessage = fetchErr.message;
        }
      }

      error.value = errorMessage;
      console.error('Send contact message failed:', err);
      return null;
    } finally {
      loading.value = false;
    }
  }

  return {
    loading,
    error,
    fieldErrors,
    resetState,
    sendContactMessage,
  };
});
