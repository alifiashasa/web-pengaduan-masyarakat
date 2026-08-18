import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRuntimeConfig } from '#app';

export interface LegalData {
  title: string;
  content: string;
  updated_at: string;
}

export interface LegalResponse {
  success: boolean;
  data: LegalData;
  message?: string;
}

export const useLegalStore = defineStore('legal', () => {
  const config = useRuntimeConfig();

  const getApiBase = () =>
    (
      (config.public.apiUrl as string) || 'https://backoffice-pengaduan-masyarakat.can.co.id/api'
    ).replace(/\/+$/, '');

  // State
  const termsData = ref<LegalData | null>(null);
  const privacyData = ref<LegalData | null>(null);
  const loadingTerms = ref<boolean>(false);
  const loadingPrivacy = ref<boolean>(false);
  const errorTerms = ref<string | null>(null);
  const errorPrivacy = ref<string | null>(null);

  /**
   * Fetch Terms & Conditions
   * GET /api/legal/terms
   */
  async function fetchTerms(): Promise<LegalResponse | null> {
    loadingTerms.value = true;
    errorTerms.value = null;
    try {
      const response = await $fetch<LegalResponse>(`${getApiBase()}/legal/terms`, {
        method: 'GET',
        headers: { Accept: 'application/json' },
      });
      if (response?.success && response.data) {
        termsData.value = response.data;
      }
      return response;
    } catch (err: unknown) {
      let msg = 'Gagal memuat Syarat & Ketentuan.';
      if (err && typeof err === 'object') {
        const fetchErr = err as { data?: { message?: string }; message?: string };
        msg = fetchErr.data?.message || fetchErr.message || msg;
      }
      errorTerms.value = msg;
      console.error('Fetch Terms & Conditions failed:', err);
      return null;
    } finally {
      loadingTerms.value = false;
    }
  }

  /**
   * Fetch Privacy Policy
   * GET /api/legal/privacy
   */
  async function fetchPrivacy(): Promise<LegalResponse | null> {
    loadingPrivacy.value = true;
    errorPrivacy.value = null;
    try {
      const response = await $fetch<LegalResponse>(`${getApiBase()}/legal/privacy`, {
        method: 'GET',
        headers: { Accept: 'application/json' },
      });
      if (response?.success && response.data) {
        privacyData.value = response.data;
      }
      return response;
    } catch (err: unknown) {
      let msg = 'Gagal memuat Kebijakan Privasi.';
      if (err && typeof err === 'object') {
        const fetchErr = err as { data?: { message?: string }; message?: string };
        msg = fetchErr.data?.message || fetchErr.message || msg;
      }
      errorPrivacy.value = msg;
      console.error('Fetch Privacy Policy failed:', err);
      return null;
    } finally {
      loadingPrivacy.value = false;
    }
  }

  return {
    termsData,
    privacyData,
    loadingTerms,
    loadingPrivacy,
    errorTerms,
    errorPrivacy,
    fetchTerms,
    fetchPrivacy,
  };
});
