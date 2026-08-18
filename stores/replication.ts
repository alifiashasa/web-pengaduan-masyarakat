import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRuntimeConfig } from '#app';
import { useAuthStore } from './auth';

export interface ReplicationPayload {
  name: string;
  email: string;
  phone?: string;
  organization: string;
  region: string;
  message: string;
  agree_terms?: boolean;
}

export interface ReplicationRequestItem {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  organization?: string | null;
  region?: string | null;
  message?: string | null;
  created_at?: string;
}

export interface ReplicationResponse {
  success: boolean;
  message: string;
  replication_request?: ReplicationRequestItem;
}

export interface ApiValidationError {
  message?: string;
  errors?: Record<string, string[]>;
}

export const useReplicationStore = defineStore('replication', () => {
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
   * Submit replication request
   * POST /api/replication-requests
   */
  async function submitReplicationRequest(
    payload: ReplicationPayload
  ): Promise<ReplicationResponse | null> {
    loading.value = true;
    error.value = null;
    fieldErrors.value = null;

    const authStore = useAuthStore();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    if (authStore.token) {
      headers.Authorization = `Bearer ${authStore.token}`;
    }

    try {
      const response = await $fetch<ReplicationResponse>(`${getApiBase()}/replication-requests`, {
        method: 'POST',
        headers,
        body: {
          name: payload.name.trim(),
          email: payload.email.trim(),
          ...(payload.phone?.trim() ? { phone: payload.phone.trim() } : {}),
          organization: payload.organization.trim(),
          region: payload.region.trim(),
          message: payload.message.trim(),
          agree_terms: payload.agree_terms ?? true,
        },
      });

      return response;
    } catch (err: unknown) {
      let errorMessage = 'Gagal mengirim permohonan replikasi. Silakan coba lagi.';

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
      console.error('Submit replication request failed:', err);
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
    submitReplicationRequest,
  };
});
