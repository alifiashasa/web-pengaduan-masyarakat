import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useRuntimeConfig } from '#app';

export type HealthStatusType = 'ok' | 'warning' | 'failed' | 'crashed' | 'skipped';

export interface HealthCheckMeta {
  disk_space_used_percentage?: number;
  [key: string]: any;
}

export interface HealthCheckResult {
  name: string;
  label: string;
  status: HealthStatusType;
  notificationMessage: string;
  shortSummary: string;
  meta: HealthCheckMeta;
}

export interface HealthResponse {
  finishedAt: string | number;
  checkResults: HealthCheckResult[];
}

export const useHealthStore = defineStore('health', () => {
  const config = useRuntimeConfig();

  const getApiBase = () =>
    (
      (config.public.apiUrl as string) || 'https://backoffice-pengaduan-masyarakat.can.co.id/api'
    ).replace(/\/+$/, '');

  // State
  const finishedAt = ref<string | number | null>(null);
  const checkResults = ref<HealthCheckResult[]>([]);
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);
  const lastCheckedAt = ref<Date | null>(null);

  // Computed
  const isHealthy = computed(() => {
    if (checkResults.value.length === 0) return true;
    return checkResults.value.every(
      (item) => item.status === 'ok' || item.status === 'skipped'
    );
  });

  const hasWarning = computed(() => {
    return checkResults.value.some((item) => item.status === 'warning');
  });

  const hasFailure = computed(() => {
    return checkResults.value.some(
      (item) => item.status === 'failed' || item.status === 'crashed'
    );
  });

  const overallStatus = computed<'ok' | 'warning' | 'failed' | 'unknown'>(() => {
    if (loading.value && checkResults.value.length === 0) return 'unknown';
    if (hasFailure.value) return 'failed';
    if (hasWarning.value) return 'warning';
    if (checkResults.value.length > 0) return 'ok';
    return 'unknown';
  });

  /**
   * Fetch health status from GET /api/health
   */
  async function fetchHealthStatus(): Promise<HealthResponse | null> {
    loading.value = true;
    error.value = null;

    try {
      const response = await $fetch<HealthResponse | { data: HealthResponse }>(
        `${getApiBase()}/health`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        }
      );

      let payload: HealthResponse;

      if ('data' in response && response.data && 'checkResults' in response.data) {
        payload = response.data;
      } else {
        payload = response as HealthResponse;
      }

      finishedAt.value = payload.finishedAt || new Date().toISOString();
      checkResults.value = Array.isArray(payload.checkResults) ? payload.checkResults : [];
      lastCheckedAt.value = new Date();

      return payload;
    } catch (err: any) {
      console.error('Fetch health status failed:', err);
      error.value = err?.data?.message || err?.message || 'Gagal mengambil status kesehatan API.';
      return null;
    } finally {
      loading.value = false;
    }
  }

  function resetState() {
    finishedAt.value = null;
    checkResults.value = [];
    loading.value = false;
    error.value = null;
    lastCheckedAt.value = null;
  }

  return {
    finishedAt,
    checkResults,
    loading,
    error,
    lastCheckedAt,
    isHealthy,
    hasWarning,
    hasFailure,
    overallStatus,
    fetchHealthStatus,
    resetState,
  };
});
