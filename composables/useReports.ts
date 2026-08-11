import { useState } from '#imports';

export interface CommentItem {
  id: number;
  author: string;
  avatar?: string;
  role?: string;
  text: string;
  date: string;
}

export interface ReportItem {
  id: number;
  title?: string;
  description: string;
  location?: string;
  province: string;
  city: string;
  category: string;
  date: string;
  status: 'pending' | 'proses' | 'selesai' | 'ditolak';
  images: string[];
  comments: CommentItem[];
}

export const useReports = () => {
  const reports = useState<ReportItem[]>('user_reports', () => [
    {
      id: 1,
      title: 'Jalan Rusak dan Berlubang Parah',
      description: 'Terdapat lubang cukup besar di dekat pertigaan jalan utama yang sangat membahayakan pengendara motor khususnya saat malam hari. Mohon perbaikan secepatnya.',
      province: 'DI Yogyakarta',
      city: 'Kota Yogyakarta',
      category: 'Infrastruktur',
      date: '07 Agt 2026, 10:15 WIB',
      status: 'proses',
      images: [
        'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=400',
        'https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&q=80&w=400',
      ],
      comments: [
        {
          id: 101,
          author: 'Petugas Dinas Pekerjaan Umum',
          role: 'Admin / Verifikator',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100',
          text: 'Laporan telah diverifikasi dan masuk dalam antrean penanganan tim perbaikan jalan wilayah Yogyakarta Kota.',
          date: '07 Agt 2026, 11:30 WIB',
        },
      ],
    },
    {
      id: 2,
      title: 'Lampu Penerangan Jalan Umum Mati',
      description: 'Lampu PJU sepanjang jalan utama mati total sejak 2 hari yang lalu, menyebabkan area jalan sangat gelap dan rawan kriminalitas.',
      province: 'DI Yogyakarta',
      city: 'Sleman',
      category: 'Fasilitas Umum',
      date: '05 Agt 2026, 19:40 WIB',
      status: 'selesai',
      images: [
        'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&q=80&w=400',
      ],
      comments: [
        {
          id: 102,
          author: 'Petugas PJU Sleman',
          role: 'Petugas Lapangan',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100',
          text: 'Perbaikan lampu dan pengantian bohlam PJU telah selesai dilaksanakan pada tanggal 06 Agustus 2026.',
          date: '06 Agt 2026, 09:00 WIB',
        },
      ],
    },
    {
      id: 3,
      title: 'Penumpukan Sampah Liar di Pinggir Jalan',
      description: 'Terdapat tumpukan sampah liar yang menumpuk di pinggir jalan permukiman warga dan menimbulkan bau yang menyengat.',
      province: 'DI Yogyakarta',
      city: 'Bantul',
      category: 'Kebersihan',
      date: '01 Agt 2026, 08:20 WIB',
      status: 'ditolak',
      images: [],
      comments: [
        {
          id: 103,
          author: 'Dinas Lingkungan Hidup',
          role: 'Admin / Verifikator',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100',
          text: 'Lokasi yang dilaporkan merupakan area privat perumahan. Harap berkoordinasi terlebih dahulu dengan pihak pengurus RT/RW setempat.',
          date: '02 Agt 2026, 10:00 WIB',
        },
      ],
    },
  ]);

  const addReport = (newReport: Omit<ReportItem, 'id' | 'date' | 'status' | 'comments'>) => {
    const report: ReportItem = {
      ...newReport,
      id: Date.now(),
      date: new Date().toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }) + ' WIB',
      status: 'pending',
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
