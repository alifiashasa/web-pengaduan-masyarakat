import { storeToRefs } from 'pinia';
import {
  useComplaintsStore,
  type CreateComplaintPayload,
  type UpdateComplaintPayload,
  type ComplaintsListParams,
} from '@/stores/complaints';

export const useComplaints = () => {
  const store = useComplaintsStore();
  const { complaints, meta, currentComplaint, loading, error } = storeToRefs(store);

  const fetchComplaints = (params?: ComplaintsListParams) => store.fetchComplaints(params);
  const createComplaint = (payload: CreateComplaintPayload) => store.createComplaint(payload);
  const getComplaintDetail = (id: number) => store.getComplaintDetail(id);
  const updateComplaint = (id: number, payload: UpdateComplaintPayload) =>
    store.updateComplaint(id, payload);
  const deleteComplaint = (id: number) => store.deleteComplaint(id);
  const cancelComplaint = (id: number) => store.cancelComplaint(id);
  const resetComplaints = () => store.reset();

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
    resetComplaints,
  };
};
