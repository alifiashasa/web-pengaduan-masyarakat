import { useState } from '#imports';

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
  title?: string;
  description: string;
  location?: string;
  province?: string;
  city?: string;
  category?: string;
  date: string;
  status: 'terkirim' | 'pending' | 'proses' | 'diproses' | 'ditangani' | 'selesai' | 'dibatalkan' | 'ditolak';
  images?: string[];
  files?: ReportFile[];
  hasExpand?: boolean;
  comments?: CommentItem[];
}

export const useReports = () => {
  const reports = useState<ReportItem[]>('user_reports', () => [
    {
      id: 1,
      title: 'Laporan Pengaduan 1',
      description: 'Yorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis.',
      province: 'Jawa Tengah',
      city: 'Kota Semarang',
      location: 'Jl. Pemuda No.17, Kota Semarang',
      category: 'Pengaduan',
      date: 'Sen, 26/06/2025',
      status: 'terkirim',
      images: [],
      files: [],
      comments: [],
    },
    {
      id: 2,
      title: 'Laporan Pengaduan 2',
      description: 'Yorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis. Yorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis. Yorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis. Yorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis.',
      province: 'Jawa Tengah',
      city: 'Kota Semarang',
      location: 'Jl. Pemuda No.17, Kota Semarang',
      category: 'Pengaduan',
      date: 'Sen, 26/06/2025',
      status: 'terkirim',
      hasExpand: true,
      files: [
        {
          name: 'File.pdf',
          size: '5.3MB',
        },
      ],
      images: [],
      comments: [],
    },
    {
      id: 3,
      title: 'Laporan Pengaduan 3',
      description: 'Yorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis.',
      province: 'Jawa Tengah',
      city: 'Kota Semarang',
      location: 'Jl. Pemuda No.17, Kota Semarang',
      category: 'Pengaduan',
      date: 'Sen, 26/06/2025',
      status: 'terkirim',
      images: [
        'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&q=80&w=200',
        'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&q=80&w=200',
        'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&q=80&w=200',
      ],
      files: [],
      comments: [],
    },
    {
      id: 4,
      title: 'Laporan Diproses',
      description: 'Yorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.',
      province: 'Jawa Tengah',
      city: 'Kota Semarang',
      location: 'Jl. Pemuda No.17, Kota Semarang',
      category: 'Kebersihan',
      date: 'Rab, 28/06/2025',
      status: 'diproses',
      images: [],
      files: [],
      comments: [],
    },
    {
      id: 5,
      title: 'Laporan Ditangani',
      description: 'Yorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.',
      province: 'Jawa Tengah',
      city: 'Kota Semarang',
      location: 'Jl. Pemuda No.17, Kota Semarang',
      category: 'Fasilitas Umum',
      date: 'Kam, 29/06/2025',
      status: 'ditangani',
      images: [],
      files: [],
      comments: [],
    },
    {
      id: 6,
      title: 'Laporan Selesai 1',
      description: 'Laporan perbaikan lampu jalan di Jalan Pemuda telah selesai dikerjakan oleh Dinas Perhubungan. Lampu jalan sekarang sudah berfungsi kembali dengan normal dan menerangi jalan di malam hari.',
      province: 'Jawa Tengah',
      city: 'Kota Semarang',
      location: 'Jl. Pemuda No.17, Kota Semarang',
      category: 'Fasilitas Umum',
      date: 'Kam, 30/06/2025',
      status: 'selesai',
      images: [
        'https://images.unsplash.com/photo-1509395062183-67c5ad6faff9?auto=format&fit=crop&q=80&w=200'
      ],
      files: [],
      comments: [],
    },
    {
      id: 7,
      title: 'Laporan Selesai 2',
      description: 'Laporan mengenai tumpukan sampah liar di area bahu jalan utama telah selesai ditindaklanjuti. Petugas kebersihan dinas lingkungan hidup telah mengangkut seluruh tumpukan sampah dan membersihkan sisa-sisa kotoran yang tertinggal. Selain itu, pihak kelurahan juga telah memasang papan larangan membuang sampah sembarangan serta menempatkan tempat sampah besar di sekitar lokasi agar warga tidak membuang sampah sembarangan lagi. Terima kasih atas partisipasi aktif masyarakat dalam melaporkan hal ini.',
      province: 'Jawa Tengah',
      city: 'Kota Semarang',
      location: 'Jl. Pemuda No.17, Kota Semarang',
      category: 'Kebersihan',
      date: 'Jum, 01/07/2025',
      status: 'selesai',
      hasExpand: true,
      images: [],
      files: [
        {
          name: 'Laporan_Selesai_Perbaikan.pdf',
          size: '1.2MB'
        }
      ],
      comments: [],
    },
    {
      id: 8,
      title: 'Laporan Dibatalkan 1',
      description: 'Laporan mengenai kebocoran pipa air PDAM dibatalkan karena pelapor mengajukan pembatalan secara mandiri. Setelah dikonfirmasi, ternyata pipa yang bocor berada di dalam area pekarangan rumah pribadi warga dan telah ditangani secara mandiri oleh pemilik rumah tersebut dengan bantuan teknisi swasta setempat. Terima kasih atas kesediaan Anda melaporkan.',
      province: 'Jawa Tengah',
      city: 'Kota Semarang',
      location: 'Jl. Pemuda No.17, Kota Semarang',
      category: 'Fasilitas Umum',
      date: 'Sab, 02/07/2025',
      status: 'dibatalkan',
      hasExpand: true,
      images: [],
      files: [],
      comments: [],
    },
    {
      id: 9,
      title: 'Laporan Dibatalkan 2',
      description: 'Pengaduan pohon tumbang dibatalkan karena tidak ada detail lokasi yang jelas.',
      province: 'Jawa Tengah',
      city: 'Kota Semarang',
      location: 'Jl. Pemuda No.17, Kota Semarang',
      category: 'Kebencanaan',
      date: 'Min, 03/07/2025',
      status: 'dibatalkan',
      images: [
        'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80&w=200'
      ],
      files: [],
      comments: [],
    },
  ]);

  const addReport = (newReport: Omit<ReportItem, 'id' | 'date' | 'status' | 'comments'>) => {
    const report: ReportItem = {
      ...newReport,
      id: Date.now(),
      date: 'Sen, 26/06/2025',
      status: 'terkirim',
      comments: [],
    };
    reports.value = [report, ...reports.value];
    return report;
  };

  const deleteReport = (id: number) => {
    reports.value = reports.value.filter((r) => r.id !== id);
  };

  return {
    reports,
    addReport,
    deleteReport,
  };
};
