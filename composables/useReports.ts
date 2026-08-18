import { computed } from 'vue';
import { useComplaintsStore } from '@/stores/complaints';
import type { Complaint } from '@/stores/complaints';

export interface CommentItem {
  id: number;
  author: string;
  avatar?: string;
  role?: string;
  text: string;
  date: string;
}

export interface ReportFile {
  name: string;
  size: string;
  url?: string;
}

export interface ReportItem {
  id: number;
  ticket_number?: string;
  title?: string;
  description: string;
  content?: string;
  location?: string;
  latitude?: number | null;
  longitude?: number | null;
  province?: string;
  city?: string;
  category?: string;
  date: string;
  created_at?: string;
  status:
    | 'terkirim'
    | 'pending'
    | 'proses'
    | 'diproses'
    | 'ditangani'
    | 'selesai'
    | 'dibatalkan'
    | 'ditolak'
    | 'in_review'
    | 'in_progress'
    | 'resolved'
    | 'cancelled'
    | string;
  status_label?: string;
  images?: string[];
  documents?: string[];
  files?: ReportFile[];
  hasExpand?: boolean;
  comments?: CommentItem[];
}

/**
 * Helper to transform backend Complaint model into legacy ReportItem format
 */
export function mapComplaintToReportItem(c: Complaint): ReportItem {
  const formattedDate = c.created_at
    ? new Date(c.created_at).toLocaleDateString('id-ID', {
        weekday: 'short',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    : '';

  return {
    id: c.id,
    ticket_number: c.ticket_number,
    title: c.ticket_number ? `Nomor Tiket: ${c.ticket_number}` : 'Laporan Pengaduan',
    description: c.content,
    content: c.content,
    location: c.location,
    latitude: c.latitude,
    longitude: c.longitude,
    province: '',
    city: '',
    category: 'Pengaduan',
    date: formattedDate || c.created_at,
    created_at: c.created_at,
    status: c.status as any,
    status_label: c.status_label,
    images: c.images || [],
    documents: c.documents || [],
    files: (c.documents || []).map((doc, idx) => ({
      name: doc.split('/').pop() || `Dokumen_${idx + 1}.pdf`,
      size: 'Dokumen',
      url: doc,
    })),
    comments: [],
  };
}

export const useReports = () => {
  const complaintsStore = useComplaintsStore();

  const reports = computed<ReportItem[]>(() => {
    return complaintsStore.complaints.map(mapComplaintToReportItem);
  });

  const fetchReports = (params?: { page?: number; per_page?: number; status?: string }) => {
    return complaintsStore.fetchComplaints(params);
  };

  const addReport = async (newReport: {
    description: string;
    location: string;
    latitude?: number | null;
    longitude?: number | null;
    images?: File[];
  }) => {
    const res = await complaintsStore.createComplaint({
      content: newReport.description,
      location: newReport.location,
      latitude: newReport.latitude,
      longitude: newReport.longitude,
      images: newReport.images,
    });
    if (res && res.complaint) {
      return mapComplaintToReportItem(res.complaint);
    }
    return null;
  };

  const updateReport = (
    id: number,
    payload: {
      content?: string;
      location?: string;
      latitude?: number | null;
      longitude?: number | null;
    }
  ) => {
    return complaintsStore.updateComplaint(id, payload);
  };

  const deleteReport = (id: number) => {
    return complaintsStore.deleteComplaint(id);
  };

  const cancelReport = (id: number) => {
    return complaintsStore.cancelComplaint(id);
  };

  return {
    reports,
    meta: computed(() => complaintsStore.meta),
    loading: computed(() => complaintsStore.loading),
    error: computed(() => complaintsStore.error),
    fetchReports,
    addReport,
    updateReport,
    deleteReport,
    cancelReport,
  };
};
