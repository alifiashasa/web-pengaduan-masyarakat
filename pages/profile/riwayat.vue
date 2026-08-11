<template>
  <div class="p-4 sm:p-6 lg:p-8 bg-[#F3F4F6] min-h-screen w-full flex-1 flex flex-col justify-start">
    <div class="flex flex-col lg:flex-row gap-[20px] items-start w-full">
      <!-- Sidebar -->
      <div class="w-full lg:w-[308px] shrink-0">
        <ProfileSidebar />
      </div>

      <!-- Main Content -->
      <div class="flex-1 min-w-0 space-y-[20px]">
          <!-- Header Nav (Next to Sidebar) -->
          <nav class="w-full h-[80px] bg-white rounded-2xl border border-gray-100 px-6 shadow-sm flex items-center justify-between gap-[10px]">
            <!-- Breadcrumb -->
            <div class="flex items-center gap-2 text-sm">
              <NuxtLink to="/" class="text-gray-500 hover:text-gray-900 transition-colors">Home</NuxtLink>
              <span class="text-gray-400">></span>
              <NuxtLink to="/profile" class="text-gray-500 hover:text-gray-900 transition-colors">Profil</NuxtLink>
              <span class="text-gray-400">></span>
              <span class="font-bold text-gray-900">Riwayat Pengaduan</span>
            </div>

            <!-- Header Nav Links & User Info -->
            <div class="flex flex-wrap items-center gap-5 sm:gap-6 text-sm">
              <a href="#tentang" class="text-gray-600 hover:text-gray-900 transition-colors font-medium">Tentang Kami</a>
              <a href="#faq" class="text-gray-600 hover:text-gray-900 transition-colors font-medium">FAQ</a>
              <a href="#kontak" class="text-gray-600 hover:text-gray-900 transition-colors font-medium">Kontak</a>
              <NuxtLink to="/replication-request" class="font-bold text-gray-900 hover:text-[#F67011] transition-colors">
                Replication Request
              </NuxtLink>
              <div class="flex items-center gap-2 pl-2">
                <img :src="user.avatarUrl" :alt="user.name" class="w-8 h-8 rounded-full object-cover border border-gray-200" />
                <span class="font-semibold text-gray-700 text-xs sm:text-sm">{{ user.email }}</span>
              </div>
            </div>
          </nav>

          <div class="w-full bg-[#FEFFFF] rounded-[20px] border border-[#EDEDED] p-6 shadow-xs space-y-[20px]">
            <!-- Header Title -->
            <div class="mb-6">
              <h2 class="text-xl font-bold text-gray-900">Riwayat Pengaduan Saya</h2>
              <p class="text-xs sm:text-sm text-gray-500">Pantau status dan tanggapan dari seluruh pengaduan yang telah Anda kirimkan.</p>
            </div>

            <!-- Filter Tabs -->
            <div class="flex items-center gap-2 overflow-x-auto pb-2 mb-6 border-b border-gray-100 scrollbar-none">
              <button
                v-for="tab in filterTabs"
                :key="tab.id"
                type="button"
                :class="[
                  'px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer',
                  activeFilter === tab.id
                    ? 'bg-brand-orange text-white shadow-xs'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                ]"
                @click="activeFilter = tab.id"
              >
                <span>{{ tab.label }}</span>
                <span
                  :class="[
                    'px-2 py-0.5 rounded-full text-[10px]',
                    activeFilter === tab.id ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-700'
                  ]"
                >
                  {{ getCountForTab(tab.id) }}
                </span>
              </button>
            </div>

            <!-- Report List -->
            <div v-if="filteredReports.length > 0" class="space-y-4">
              <ReportCard
                v-for="report in filteredReports"
                :key="report.id"
                :report="report"
                @view-detail="openDetail"
                @delete="confirmDelete"
              />
            </div>

            <!-- Empty State -->
            <EmptyState
              v-else
              title="Tidak Ada Pengaduan"
              description="Belum ada laporan pengaduan untuk kategori filter yang dipilih."
            >
              <template #action>
                <NuxtLink to="/">
                  <AppButton variant="primary" size="sm">Buat Pengaduan Baru</AppButton>
                </NuxtLink>
              </template>
            </EmptyState>
          </div>
        </div>
      </div>
    </div>

    <!-- Modals & Toasts -->
    <ReportDetailModal
      :isOpen="showDetailModal"
      :report="selectedReport"
      @close="showDetailModal = false"
    />
    
    <DeleteReportModal
      :isOpen="showDeleteModal"
      @close="showDeleteModal = false"
      @confirm="handleDeleteConfirm"
    />

    <ToastNotification :show="toast.show" :message="toast.message" @close="toast.show = false" />
  </template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue';
import AppContainer from '@/components/AppContainer.vue';
import ProfileSidebar from '@/components/ProfileSidebar.vue';
import ReportCard from '@/components/ReportCard.vue';
import EmptyState from '@/components/EmptyState.vue';
import AppButton from '@/components/AppButton.vue';
import ReportDetailModal from '@/components/modals/ReportDetailModal.vue';
import DeleteReportModal from '@/components/modals/DeleteReportModal.vue';
import ToastNotification from '@/components/ToastNotification.vue';
import { useReports, type ReportItem } from '@/composables/useReports';
import { useAuth } from '@/composables/useAuth';

const { user } = useAuth();
const { reports, deleteReport } = useReports();

const activeFilter = ref('semua');

const filterTabs = [
  { id: 'semua', label: 'Semua' },
  { id: 'proses', label: 'Dalam Proses' },
  { id: 'selesai', label: 'Selesai' },
  { id: 'ditolak', label: 'Ditolak' },
];

const getCountForTab = (tabId: string) => {
  if (tabId === 'semua') return reports.value.length;
  if (tabId === 'proses') return reports.value.filter((r) => r.status === 'proses' || r.status === 'pending').length;
  return reports.value.filter((r) => r.status === tabId).length;
};

const filteredReports = computed(() => {
  if (activeFilter.value === 'semua') return reports.value;
  if (activeFilter.value === 'proses') {
    return reports.value.filter((r) => r.status === 'proses' || r.status === 'pending');
  }
  return reports.value.filter((r) => r.status === activeFilter.value);
});

// Modals State
const showDetailModal = ref(false);
const showDeleteModal = ref(false);
const selectedReport = ref<ReportItem | null>(null);
const reportIdToDelete = ref<number | null>(null);
const toast = reactive({ show: false, message: '' });

const openDetail = (report: ReportItem) => {
  selectedReport.value = report;
  showDetailModal.value = true;
};

const confirmDelete = (id: number) => {
  reportIdToDelete.value = id;
  showDeleteModal.value = true;
};

const handleDeleteConfirm = () => {
  if (reportIdToDelete.value !== null) {
    deleteReport(reportIdToDelete.value);
    showDeleteModal.value = false;
    reportIdToDelete.value = null;
    toast.message = 'Laporan pengaduan berhasil dihapus.';
    toast.show = true;
    setTimeout(() => (toast.show = false), 3000);
  }
};
</script>
