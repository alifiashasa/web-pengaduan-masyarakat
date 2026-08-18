import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRuntimeConfig } from '#app';

export interface FaqCategory {
  id: number;
  name: string;
  slug: string;
  icon?: string;
  order?: number;
  faqs_count?: number;
  faqs?: FaqItem[];
}

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
  order?: number;
  category_id?: number;
  category?: FaqCategory;
}

export interface FaqListResponse {
  success: boolean;
  faqs: FaqItem[];
  message?: string;
}

export interface FaqCategoryListResponse {
  success: boolean;
  categories: FaqCategory[];
  message?: string;
}

export interface FaqGroupedResponse {
  success: boolean;
  categories: FaqCategory[];
  message?: string;
}

export interface FaqSingleCategoryResponse {
  success: boolean;
  category: FaqCategory;
  faqs: FaqItem[];
  message?: string;
}

export const useFaqStore = defineStore('faq', () => {
  const config = useRuntimeConfig();

  const getApiBase = () =>
    (
      (config.public.apiUrl as string) || 'https://backoffice-pengaduan-masyarakat.can.co.id/api'
    ).replace(/\/+$/, '');

  // State
  const categories = ref<FaqCategory[]>([]);
  const groupedCategories = ref<FaqCategory[]>([]);
  const faqs = ref<FaqItem[]>([]);
  const activeCategorySlug = ref<string>('all');
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);

  /**
   * Get all FAQ categories
   * GET /api/faq/categories
   */
  async function fetchCategories(): Promise<FaqCategoryListResponse | null> {
    loading.value = true;
    error.value = null;
    try {
      const response = await $fetch<FaqCategoryListResponse>(`${getApiBase()}/faq/categories`, {
        method: 'GET',
        headers: { Accept: 'application/json' },
      });
      if (response?.success) {
        categories.value = response.categories || [];
      }
      return response;
    } catch (err: unknown) {
      let msg = 'Gagal memuat kategori FAQ.';
      if (err && typeof err === 'object') {
        const fetchErr = err as { data?: { message?: string }; message?: string };
        msg = fetchErr.data?.message || fetchErr.message || msg;
      }
      error.value = msg;
      console.error('Fetch FAQ categories failed:', err);
      return null;
    } finally {
      loading.value = false;
    }
  }

  /**
   * Get FAQs grouped by category (Recommended for frontend display)
   * GET /api/faq/grouped
   */
  async function fetchGroupedFaqs(): Promise<FaqGroupedResponse | null> {
    loading.value = true;
    error.value = null;
    try {
      const response = await $fetch<FaqGroupedResponse>(`${getApiBase()}/faq/grouped`, {
        method: 'GET',
        headers: { Accept: 'application/json' },
      });
      if (response?.success) {
        groupedCategories.value = response.categories || [];
      }
      return response;
    } catch (err: unknown) {
      let msg = 'Gagal memuat data FAQ terkelompok.';
      if (err && typeof err === 'object') {
        const fetchErr = err as { data?: { message?: string }; message?: string };
        msg = fetchErr.data?.message || fetchErr.message || msg;
      }
      error.value = msg;
      console.error('Fetch grouped FAQs failed:', err);
      return null;
    } finally {
      loading.value = false;
    }
  }

  /**
   * Get all FAQs or filtered by category slug
   * GET /api/faq?category={slug}
   */
  async function fetchFaqs(categorySlug?: string): Promise<FaqListResponse | null> {
    loading.value = true;
    error.value = null;
    try {
      const queryParams: Record<string, string> = {};
      if (categorySlug && categorySlug !== 'all') {
        queryParams.category = categorySlug;
      }
      const response = await $fetch<FaqListResponse>(`${getApiBase()}/faq`, {
        method: 'GET',
        headers: { Accept: 'application/json' },
        params: queryParams,
      });
      if (response?.success) {
        faqs.value = response.faqs || [];
      }
      return response;
    } catch (err: unknown) {
      let msg = 'Gagal memuat data FAQ.';
      if (err && typeof err === 'object') {
        const fetchErr = err as { data?: { message?: string }; message?: string };
        msg = fetchErr.data?.message || fetchErr.message || msg;
      }
      error.value = msg;
      console.error('Fetch FAQs failed:', err);
      return null;
    } finally {
      loading.value = false;
    }
  }

  /**
   * Get FAQs by specific category slug
   * GET /api/faq/category/{slug}
   */
  async function fetchFaqsByCategorySlug(slug: string): Promise<FaqSingleCategoryResponse | null> {
    loading.value = true;
    error.value = null;
    try {
      const response = await $fetch<FaqSingleCategoryResponse>(
        `${getApiBase()}/faq/category/${encodeURIComponent(slug)}`,
        {
          method: 'GET',
          headers: { Accept: 'application/json' },
        }
      );
      if (response?.success) {
        faqs.value = response.faqs || [];
      }
      return response;
    } catch (err: unknown) {
      let msg = `Gagal memuat FAQ untuk kategori ${slug}.`;
      if (err && typeof err === 'object') {
        const fetchErr = err as { data?: { message?: string }; message?: string };
        msg = fetchErr.data?.message || fetchErr.message || msg;
      }
      error.value = msg;
      console.error(`Fetch FAQs by category slug (${slug}) failed:`, err);
      return null;
    } finally {
      loading.value = false;
    }
  }

  return {
    categories,
    groupedCategories,
    faqs,
    activeCategorySlug,
    loading,
    error,
    fetchCategories,
    fetchGroupedFaqs,
    fetchFaqs,
    fetchFaqsByCategorySlug,
  };
});
