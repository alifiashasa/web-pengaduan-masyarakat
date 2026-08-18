import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRuntimeConfig } from '#app';
import { useAuthStore } from '@/stores/auth';

export interface DashboardStats {
  total_complaints: number;
  pending: number;
  in_review: number;
  in_progress: number;
  resolved: number;
  cancelled: number;
}

export interface RecentComplaint {
  id: number;
  ticket_number: string;
  content: string;
  location: string;
  latitude: number | null;
  longitude: number | null;
  status: 'pending' | 'in_review' | 'in_progress' | 'resolved' | 'cancelled' | string;
  status_label: string;
  images: string[];
  documents: string[];
  created_at: string;
}

export interface UserDashboardResponse {
  success: boolean;
  stats: DashboardStats;
  recent_complaints: RecentComplaint[];
}

export const useDashboardStore = defineStore('dashboard', () => {
  const config = useRuntimeConfig();
  const authStore = useAuthStore();

  const getApiBase = () =>
    (
      (config.public.apiUrl as string) || 'https://backoffice-pengaduan-masyarakat.can.co.id/api'
    ).replace(/\/+$/, '');

  // State
  const stats = ref<DashboardStats>({
    total_complaints: 0,
    pending: 0,
    in_review: 0,
    in_progress: 0,
    resolved: 0,
    cancelled: 0,
  });
  const recentComplaints = ref<RecentComplaint[]>([]);
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);

  /**
   * Fetch User Dashboard Statistics & Recent Complaints
   * Endpoint: GET /user/dashboard
   */
  async function fetchDashboardStats(): Promise<UserDashboardResponse | null> {
    const token = authStore.token;
    if (!token) {
      error.value = 'Unauthenticated';
      return null;
    }

    loading.value = true;
    error.value = null;

    try {
      const response = await $fetch<UserDashboardResponse>(`${getApiBase()}/user/dashboard`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });

      if (response && response.success) {
        stats.value = response.stats || {
          total_complaints: 0,
          pending: 0,
          in_review: 0,
          in_progress: 0,
          resolved: 0,
          cancelled: 0,
        };
        recentComplaints.value = response.recent_complaints || [];
      }

      return response;
    } catch (err: unknown) {
      let msg = 'Terjadi kesalahan saat memuat data dashboard.';
      if (err && typeof err === 'object') {
        const fetchErr = err as { data?: { message?: string }; message?: string };
        msg = fetchErr.data?.message || fetchErr.message || msg;
      }
      error.value = msg;
      console.error('Fetch dashboard failed:', err);
      return null;
    } finally {
      loading.value = false;
    }
  }

  function reset() {
    stats.value = {
      total_complaints: 0,
      pending: 0,
      in_review: 0,
      in_progress: 0,
      resolved: 0,
      cancelled: 0,
    };
    recentComplaints.value = [];
    loading.value = false;
    error.value = null;
  }

  return {
    stats,
    recentComplaints,
    loading,
    error,
    fetchDashboardStats,
    reset,
  };
});
