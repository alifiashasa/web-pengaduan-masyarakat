<template>
  <div
    class="p-4 sm:p-4 lg:p-4 bg-[#F3F4F6] min-h-screen lg:h-full w-full flex-1 flex flex-col justify-start lg:overflow-hidden"
  >
    <div class="flex flex-col lg:flex-row gap-4 items-start w-full lg:h-full lg:overflow-hidden">
      <!-- Sidebar Navigasi -->
      <div class="w-full lg:w-[308px] shrink-0 lg:h-full lg:overflow-hidden lg:rounded-[20px]">
        <ProfileSidebar />
      </div>

      <div class="flex-1 min-w-0 flex flex-col gap-4 w-full lg:h-full lg:overflow-hidden">
        <nav
          class="w-full h-[80px] shrink-0 bg-white rounded-2xl border border-gray-100 px-16 shadow-sm flex items-center justify-between gap-[10px]"
        >
          <div class="flex items-center gap-2 text-sm">
            <span class="font-semibold text-gray-900">Riwayat Pengaduan</span>
          </div>

          <div class="flex flex-wrap items-center gap-5 sm:gap-6 text-sm">
            <NuxtLink
              to="/#tentang"
              class="text-[#757575] hover:text-gray-900 transition-colors font-medium"
              >Tentang Kami</NuxtLink
            >
            <NuxtLink
              to="/faq"
              class="text-[#757575] hover:text-gray-900 transition-colors font-medium"
              >FAQ</NuxtLink
            >
            <NuxtLink
              to="/kontak"
              class="text-[#757575] hover:text-gray-900 transition-colors font-medium"
              >Kontak</NuxtLink
            >
            <NuxtLink
              to="/replication-request"
              class="font-medium text-[#0A0A0A] hover:text-[#F67011] transition-colors"
            >
              Replication Request
            </NuxtLink>
            <div class="flex items-center gap-2 pl-2">
              <img
                :src="user.avatarUrl"
                :alt="user.name"
                class="w-8 h-8 rounded-full object-cover border border-gray-200"
              />
              <span class="font-medium text-[#757575] text-xs sm:text-sm">{{ user.email }}</span>
            </div>
          </div>
        </nav>

        <div
          class="w-full bg-[#FEFFFF] rounded-[24px] border border-[#EDEDED] p-6 sm:p-8 shadow-2xs space-y-6 lg:flex-1 lg:overflow-y-auto"
        >
          <!-- Tab Filter Status Laporan -->
          <div>
            <div
              class="h-[56px] bg-[#F5F5F5] p-2 rounded-[16px] inline-flex items-center gap-3 max-w-full overflow-x-auto"
            >
              <button
                v-for="tab in filterTabs"
                :key="tab.id"
                type="button"
                :class="[
                  'h-[40px] px-[12px] py-[8px] gap-[4px] rounded-[12px] text-sm sm:text-base font-medium transition-all cursor-pointer whitespace-nowrap flex items-center justify-center border',
                  activeFilter === tab.id
                    ? 'bg-[#FEFFFF] text-gray-900 border-[#E0E0E0] shadow-2xs font-semibold'
                    : 'bg-transparent text-[#757575] border-transparent hover:text-gray-900',
                ]"
                @click="activeFilter = tab.id"
              >
                {{ tab.label }}
              </button>
            </div>
          </div>

          <!-- Daftar Riwayat Laporan -->
          <div v-if="filteredReports.length > 0 && !isMockEmpty" class="space-y-4">
            <ReportCard
              v-for="report in filteredReports"
              :key="report.id"
              :report="report"
              @view-detail="openDetail"
              @delete="confirmDelete"
            />
          </div>

          <EmptyState
            v-else
            plain
            title="Belum Ada Riwayat Pengaduan"
            description="Anda belum memiliki riwayat pengaduan. Silakan ajukan pengaduan untuk memulai."
            class="py-12"
          >
            <template #icon>
              <img
                src="/assets/illustrations/empty-history.svg"
                alt="Belum Ada Riwayat Pengaduan"
                class="w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] object-contain mb-8 select-none mx-auto"
              />
            </template>
            <template #action>
              <NuxtLink
                to="/"
                class="inline-flex items-center justify-center px-6 py-2.5 text-[15px] font-semibold text-[#F67011] bg-[#FFF7ED] border border-[#FCD5B6] rounded-xl hover:bg-[#FEEFD7] hover:border-[#FBC49B] transition-all duration-200 shadow-sm cursor-pointer"
              >
                Ajukan Pengaduan
              </NuxtLink>
            </template>
          </EmptyState>
        </div>

        <div class="text-[#E0E0E0] text-xs font-normal shrink-0">
          © 2025 MUM. All rights reserved.
        </div>
      </div>
    </div>

    <ReportDetailModal
      :isOpen="showDetailModal"
      :report="selectedReport"
      @close="showDetailModal = false"
    />

    <DeleteReportModal
      :isOpen="showDeleteModal"
      :report="selectedReport"
      @close="showDeleteModal = false"
      @confirm="handleDeleteConfirm"
    />

    <ToastNotification :show="toast.show" :message="toast.message" @close="toast.show = false" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue';
import { useRoute } from 'vue-router';
import ProfileSidebar from '@/components/ProfileSidebar.vue';
import ReportCard from '@/components/ReportCard.vue';
import EmptyState from '@/components/EmptyState.vue';
import AppButton from '@/components/AppButton.vue';
import ReportDetailModal from '@/components/modals/ReportDetailModal.vue';
import DeleteReportModal from '@/components/modals/DeleteReportModal.vue';
import ToastNotification from '@/components/ToastNotification.vue';
import { useReports, type ReportItem } from '@/composables/useReports';
import { useAuth } from '@/composables/useAuth';

definePageMeta({ layout: 'profile' });

const route = useRoute();
const { user } = useAuth();
const { reports, deleteReport } = useReports();

const isMockEmpty = computed(() => route.query['mock-empty'] === 'true');

const activeFilter = ref('terkirim');

const filterTabs = [
  { id: 'terkirim', label: 'Terkirim' },
  { id: 'diproses', label: 'Diproses' },
  { id: 'ditangani', label: 'Ditangani' },
  { id: 'selesai', label: 'Selesai' },
  { id: 'dibatalkan', label: 'Dibatalkan' },
];

const filteredReports = computed(() => {
  if (activeFilter.value === 'terkirim') {
    return reports.value.filter((r) => r.status === 'terkirim' || r.status === 'pending');
  }
  if (activeFilter.value === 'diproses') {
    return reports.value.filter((r) => r.status === 'diproses' || r.status === 'proses');
  }
  if (activeFilter.value === 'ditangani') {
    return reports.value.filter((r) => r.status === 'ditangani');
  }
  if (activeFilter.value === 'selesai') {
    return reports.value.filter((r) => r.status === 'selesai');
  }
  if (activeFilter.value === 'dibatalkan') {
    return reports.value.filter((r) => r.status === 'dibatalkan' || r.status === 'ditolak');
  }
  return reports.value;
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
