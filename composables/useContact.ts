import { storeToRefs } from 'pinia';
import { useContactStore, type ContactPayload } from '@/stores/contact';

export const useContact = () => {
  const store = useContactStore();
  const { loading, error, fieldErrors } = storeToRefs(store);

  const sendContactMessage = (payload: ContactPayload) => store.sendContactMessage(payload);
  const resetState = () => store.resetState();

  return {
    loading,
    error,
    fieldErrors,
    sendContactMessage,
    resetState,
  };
};
