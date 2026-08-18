import { storeToRefs } from 'pinia';
import { useTestimonialsStore, type TestimonialFilterParams } from '@/stores/testimonials';

export const useTestimonials = () => {
  const store = useTestimonialsStore();
  const { testimonials, currentTestimonial, loading, error } = storeToRefs(store);

  const fetchTestimonials = (params?: TestimonialFilterParams) => store.fetchTestimonials(params);
  const fetchTestimonialById = (id: number) => store.fetchTestimonialById(id);

  return {
    testimonials,
    currentTestimonial,
    loading,
    error,
    fetchTestimonials,
    fetchTestimonialById,
  };
};
