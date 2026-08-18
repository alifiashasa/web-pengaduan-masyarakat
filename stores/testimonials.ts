import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRuntimeConfig } from '#app';

export interface TestimonialItem {
  id: number;
  name: string;
  content: string;
  avatar_url?: string;
  created_at?: string;
}

export interface TestimonialsResponse {
  success: boolean;
  data: TestimonialItem[];
  message?: string;
}

export interface TestimonialDetailResponse {
  success: boolean;
  data: TestimonialItem;
  message?: string;
}

export interface TestimonialFilterParams {
  featured?: boolean;
  limit?: number;
}

export const useTestimonialsStore = defineStore('testimonials', () => {
  const config = useRuntimeConfig();

  const getApiBase = () =>
    (
      (config.public.apiUrl as string) || 'https://backoffice-pengaduan-masyarakat.can.co.id/api'
    ).replace(/\/+$/, '');

  // State
  const testimonials = ref<TestimonialItem[]>([]);
  const currentTestimonial = ref<TestimonialItem | null>(null);
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);

  /**
   * Get active testimonials
   * GET /testimonials
   */
  async function fetchTestimonials(params?: TestimonialFilterParams): Promise<TestimonialItem[]> {
    loading.value = true;
    error.value = null;
    try {
      const queryParams: Record<string, any> = {};
      if (params?.featured !== undefined) {
        queryParams.featured = params.featured;
      }
      if (params?.limit !== undefined) {
        queryParams.limit = params.limit;
      }

      const response = await $fetch<TestimonialsResponse>(`${getApiBase()}/testimonials`, {
        method: 'GET',
        headers: { Accept: 'application/json' },
        params: queryParams,
      });

      if (response?.success && Array.isArray(response.data)) {
        testimonials.value = response.data;
        return response.data;
      } else {
        testimonials.value = [];
        return [];
      }
    } catch (err: unknown) {
      let msg = 'Gagal memuat data testimoni.';
      if (err && typeof err === 'object') {
        const fetchErr = err as { data?: { message?: string }; message?: string };
        msg = fetchErr.data?.message || fetchErr.message || msg;
      }
      error.value = msg;
      console.error('Fetch testimonials failed:', err);
      return [];
    } finally {
      loading.value = false;
    }
  }

  /**
   * Get single testimonial by ID
   * GET /testimonials/{id}
   */
  async function fetchTestimonialById(id: number): Promise<TestimonialItem | null> {
    loading.value = true;
    error.value = null;
    try {
      const response = await $fetch<TestimonialDetailResponse>(
        `${getApiBase()}/testimonials/${id}`,
        {
          method: 'GET',
          headers: { Accept: 'application/json' },
        }
      );

      if (response?.success && response.data) {
        currentTestimonial.value = response.data;
        return response.data;
      }
      return null;
    } catch (err: unknown) {
      let msg = `Gagal memuat testimoni #${id}.`;
      if (err && typeof err === 'object') {
        const fetchErr = err as { data?: { message?: string }; message?: string };
        msg = fetchErr.data?.message || fetchErr.message || msg;
      }
      error.value = msg;
      console.error(`Fetch testimonial #${id} failed:`, err);
      return null;
    } finally {
      loading.value = false;
    }
  }

  return {
    testimonials,
    currentTestimonial,
    loading,
    error,
    fetchTestimonials,
    fetchTestimonialById,
  };
});
