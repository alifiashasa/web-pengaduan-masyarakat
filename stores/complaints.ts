import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRuntimeConfig } from '#app';
import { useAuthStore } from '@/stores/auth';

// --- TypeScript Interfaces -------------------------------------------------

export interface Complaint {
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

export interface ComplaintMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface ComplaintsListParams {
  page?: number;
  per_page?: number;
  status?: string;
}

export interface ComplaintsListResponse {
  success: boolean;
  complaints: Complaint[];
  meta: ComplaintMeta;
}

export interface ComplaintDetailResponse {
  success: boolean;
  complaint: Complaint;
}

export interface CreateComplaintPayload {
  content: string;
  location: string;
  latitude?: number | null;
  longitude?: number | null;
  images?: File[];
}

export interface CreateComplaintResponse {
  success: boolean;
  message: string;
  complaint: Complaint;
}

export interface UpdateComplaintPayload {
  content?: string;
  location?: string;
  latitude?: number | null;
  longitude?: number | null;
}

export interface UpdateComplaintResponse {
  success: boolean;
  message?: string;
  complaint?: Complaint;
}

export interface CancelComplaintResponse {
  success: boolean;
  message: string;
  complaint: Complaint;
}

export interface DeleteComplaintResponse {
  success: boolean;
  message: string;
}

// --- Store Definition ------------------------------------------------------

export const useComplaintsStore = defineStore('complaints', () => {
  const config = useRuntimeConfig();
  const authStore = useAuthStore();

  const getApiBase = () =>
    (
      (config.public.apiUrl as string) || 'https://backoffice-pengaduan-masyarakat.can.co.id/api'
    ).replace(/\/+$/, '');

  // State
  const complaints = ref<Complaint[]>([]);
  const meta = ref<ComplaintMeta>({
    current_page: 1,
    last_page: 1,
    per_page: 10,
    total: 0,
  });
  const currentComplaint = ref<Complaint | null>(null);
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);

  /**
   * List user's complaints
   * Endpoint: GET /complaints
   */
  async function fetchComplaints(
    params?: ComplaintsListParams
  ): Promise<ComplaintsListResponse | null> {
    const token = authStore.token;
    if (!token) {
      error.value = 'Unauthenticated';
      return null;
    }

    loading.value = true;
    error.value = null;

    try {
      const queryParams = new URLSearchParams();
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.per_page) queryParams.append('per_page', params.per_page.toString());
      if (params?.status && params.status !== 'all') queryParams.append('status', params.status);

      const url = `${getApiBase()}/complaints${queryParams.toString() ? '?' + queryParams.toString() : ''}`;

      const response = await $fetch<ComplaintsListResponse>(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });

      if (response && response.success) {
        complaints.value = response.complaints || [];
        if (response.meta) {
          meta.value = response.meta;
        }
      }

      return response;
    } catch (err: unknown) {
      let msg = 'Gagal mengambil daftar pengaduan.';
      if (err && typeof err === 'object') {
        const fetchErr = err as { data?: { message?: string }; message?: string };
        msg = fetchErr.data?.message || fetchErr.message || msg;
      }
      error.value = msg;
      console.error('Fetch complaints failed:', err);
      return null;
    } finally {
      loading.value = false;
    }
  }

  /**
   * Create new complaint
   * Endpoint: POST /complaints
   */
  async function createComplaint(
    payload: CreateComplaintPayload
  ): Promise<CreateComplaintResponse | null> {
    const token = authStore.token;
    if (!token) {
      error.value = 'Unauthenticated';
      return null;
    }

    loading.value = true;
    error.value = null;

    try {
      let bodyData: FormData | Record<string, unknown>;
      const headersData: Record<string, string> = {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      };

      if (payload.images && payload.images.length > 0) {
        const formData = new FormData();
        formData.append('content', payload.content);
        formData.append('location', payload.location);
        if (payload.latitude !== undefined && payload.latitude !== null) {
          formData.append('latitude', payload.latitude.toString());
        }
        if (payload.longitude !== undefined && payload.longitude !== null) {
          formData.append('longitude', payload.longitude.toString());
        }
        payload.images.forEach((imgFile) => {
          formData.append('images[]', imgFile);
        });
        bodyData = formData;
      } else {
        const jsonBody: Record<string, unknown> = {
          content: payload.content,
          location: payload.location,
        };
        if (payload.latitude !== undefined && payload.latitude !== null) {
          jsonBody.latitude = payload.latitude;
        }
        if (payload.longitude !== undefined && payload.longitude !== null) {
          jsonBody.longitude = payload.longitude;
        }
        bodyData = jsonBody;
      }

      const response = await $fetch<CreateComplaintResponse>(`${getApiBase()}/complaints`, {
        method: 'POST',
        headers: headersData,
        body: bodyData,
      });

      if (response && response.success && response.complaint) {
        // Prepend new complaint to local state list
        complaints.value = [response.complaint, ...complaints.value];
        meta.value.total += 1;
      }

      return response;
    } catch (err: unknown) {
      let msg = 'Gagal membuat pengaduan baru.';
      if (err && typeof err === 'object') {
        const fetchErr = err as { data?: { message?: string }; message?: string };
        msg = fetchErr.data?.message || fetchErr.message || msg;
      }
      error.value = msg;
      console.error('Create complaint failed:', err);
      return null;
    } finally {
      loading.value = false;
    }
  }

  /**
   * Get complaint detail
   * Endpoint: GET /complaints/{id}
   */
  async function getComplaintDetail(id: number): Promise<ComplaintDetailResponse | null> {
    const token = authStore.token;
    if (!token) {
      error.value = 'Unauthenticated';
      return null;
    }

    loading.value = true;
    error.value = null;

    try {
      const response = await $fetch<ComplaintDetailResponse>(`${getApiBase()}/complaints/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });

      if (response && response.success) {
        currentComplaint.value = response.complaint;
      }

      return response;
    } catch (err: unknown) {
      let msg = 'Gagal mengambil detail pengaduan.';
      if (err && typeof err === 'object') {
        const fetchErr = err as { data?: { message?: string }; message?: string };
        msg = fetchErr.data?.message || fetchErr.message || msg;
      }
      error.value = msg;
      console.error('Get complaint detail failed:', err);
      return null;
    } finally {
      loading.value = false;
    }
  }

  /**
   * Update complaint
   * Endpoint: PUT /complaints/{id}
   * Only allowed when status is 'pending'
   */
  async function updateComplaint(
    id: number,
    payload: UpdateComplaintPayload
  ): Promise<UpdateComplaintResponse | null> {
    const token = authStore.token;
    if (!token) {
      error.value = 'Unauthenticated';
      return null;
    }

    loading.value = true;
    error.value = null;

    try {
      const response = await $fetch<UpdateComplaintResponse>(`${getApiBase()}/complaints/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: payload,
      });

      if (response && response.success) {
        if (response.complaint) {
          const idx = complaints.value.findIndex((item) => item.id === id);
          if (idx !== -1) {
            complaints.value[idx] = response.complaint;
          }
          if (currentComplaint.value?.id === id) {
            currentComplaint.value = response.complaint;
          }
        }
      }

      return response;
    } catch (err: unknown) {
      let msg = 'Gagal memperbarui pengaduan.';
      if (err && typeof err === 'object') {
        const fetchErr = err as { data?: { message?: string }; message?: string };
        msg = fetchErr.data?.message || fetchErr.message || msg;
      }
      error.value = msg;
      console.error('Update complaint failed:', err);
      return null;
    } finally {
      loading.value = false;
    }
  }

  /**
   * Delete complaint
   * Endpoint: DELETE /complaints/{id}
   * Only allowed when status is 'pending'
   */
  async function deleteComplaint(id: number): Promise<DeleteComplaintResponse | null> {
    const token = authStore.token;
    if (!token) {
      error.value = 'Unauthenticated';
      return null;
    }

    loading.value = true;
    error.value = null;

    try {
      const response = await $fetch<DeleteComplaintResponse>(`${getApiBase()}/complaints/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });

      if (response && response.success) {
        complaints.value = complaints.value.filter((item) => item.id !== id);
        meta.value.total = Math.max(0, meta.value.total - 1);
        if (currentComplaint.value?.id === id) {
          currentComplaint.value = null;
        }
      }

      return response;
    } catch (err: unknown) {
      let msg = 'Gagal menghapus pengaduan.';
      if (err && typeof err === 'object') {
        const fetchErr = err as { data?: { message?: string }; message?: string };
        msg = fetchErr.data?.message || fetchErr.message || msg;
      }
      error.value = msg;
      console.error('Delete complaint failed:', err);
      return null;
    } finally {
      loading.value = false;
    }
  }

  /**
   * Cancel complaint
   * Endpoint: PUT /complaints/{id}/cancel
   * User can cancel their own pending complaint
   */
  async function cancelComplaint(id: number): Promise<CancelComplaintResponse | null> {
    const token = authStore.token;
    if (!token) {
      error.value = 'Unauthenticated';
      return null;
    }

    loading.value = true;
    error.value = null;

    try {
      const response = await $fetch<CancelComplaintResponse>(
        `${getApiBase()}/complaints/${id}/cancel`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        }
      );

      if (response && response.success && response.complaint) {
        const idx = complaints.value.findIndex((item) => item.id === id);
        if (idx !== -1) {
          complaints.value[idx] = response.complaint;
        }
        if (currentComplaint.value?.id === id) {
          currentComplaint.value = response.complaint;
        }
      }

      return response;
    } catch (err: unknown) {
      let msg = 'Gagal membatalkan pengaduan.';
      if (err && typeof err === 'object') {
        const fetchErr = err as { data?: { message?: string }; message?: string };
        msg = fetchErr.data?.message || fetchErr.message || msg;
      }
      error.value = msg;
      console.error('Cancel complaint failed:', err);
      return null;
    } finally {
      loading.value = false;
    }
  }

  function reset() {
    complaints.value = [];
    meta.value = {
      current_page: 1,
      last_page: 1,
      per_page: 10,
      total: 0,
    };
    currentComplaint.value = null;
    loading.value = false;
    error.value = null;
  }

  return {
    complaints,
    meta,
    currentComplaint,
    loading,
    error,
    fetchComplaints,
    createComplaint,
    getComplaintDetail,
    updateComplaint,
    deleteComplaint,
    cancelComplaint,
    reset,
  };
});
