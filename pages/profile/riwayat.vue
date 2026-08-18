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
            >
              Tentang Kami
            </NuxtLink>
            <NuxtLink
              to="/faq"
              class="text-[#757575] hover:text-gray-900 transition-colors font-medium"
            >
              FAQ
            </NuxtLink>
            <NuxtLink
              to="/kontak"
              class="text-[#757575] hover:text-gray-900 transition-colors font-medium"
            >
              Kontak
            </NuxtLink>
            <NuxtLink
              to="/replication-request"
              class="font-medium text-[#0A0A0A] hover:text-[#F67011] transition-colors"
            >
              Replication Request
            </NuxtLink>
            <div class="flex items-center gap-2 pl-2">
              <img
                :src="user?.avatar || '/assets/avatar-placeholder.png'"
                :alt="user?.name || 'User'"
                class="w-8 h-8 rounded-full object-cover border border-gray-200"
              />
              <span class="font-medium text-[#757575] text-xs sm:text-sm">{{ user?.email }}</span>
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
                @click="changeFilter(tab.id)"
              >
                {{ tab.label }}
              </button>
            </div>
          </div>

          <!-- Loading State -->
          <div v-if="loading" class="py-12 text-center text-gray-500 text-sm">
            <div
              class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-brand-orange border-t-transparent mb-2"
            ></div>
            <p>Memuat riwayat pengaduan...</p>
          </div>

          <!-- Daftar Riwayat Laporan -->
          <div v-else-if="reports.length > 0 && !isMockEmpty" class="space-y-4">
            <ReportCard
              v-for="report in reports"
              :key="report.id"
              :report="report"
              @view-detail="openDetail"
              @delete="confirmDelete"
            />

            <!-- Pagination jika total halaman > 1 -->
            <div
              v-if="meta.last_page > 1"
              class="flex items-center justify-between pt-4 border-t border-gray-100"
            >
              <span class="text-xs text-gray-500">
                Halaman {{ meta.current_page }} dari {{ meta.last_page }} (Total
                {{ meta.total }} laporan)
              </span>
              <div class="flex items-center gap-2">
                <button
                  type="button"
                  class="px-3 py-1.5 text-xs font-medium border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  :disabled="meta.current_page <= 1"
                  @click="goToPage(meta.current_page - 1)"
                >
                  Sebelumnya
                </button>
                <button
                  type="button"
                  class="px-3 py-1.5 text-xs font-medium border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  :disabled="meta.current_page >= meta.last_page"
                  @click="goToPage(meta.current_page + 1)"
                >
                  Selanjutnya
                </button>
              </div>
            </div>
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

    <!-- Modals -->
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
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
import ProfileSidebar from '@/components/ProfileSidebar.vue';
import ReportCard from '@/components/ReportCard.vue';
import EmptyState from '@/components/EmptyState.vue';
import ReportDetailModal from '@/components/modals/ReportDetailModal.vue';
import DeleteReportModal from '@/components/modals/DeleteReportModal.vue';
import ToastNotification from '@/components/ToastNotification.vue';
import { useReports, type ReportItem } from '@/composables/useReports';
import { useComplaints } from '@/composables/useComplaints';
import { useAuthStore } from '@/stores/auth';

definePageMeta({ layout: 'profile' });

const route = useRoute();
const authStore = useAuthStore();
const user = computed(() => authStore.user);

const { reports, meta, loading, fetchReports, deleteReport, cancelReport } = useReports();
const { getComplaintDetail } = useComplaints();

const isMockEmpty = computed(() => route.query['mock-empty'] === 'true');
const activeFilter = ref('terkirim');
const currentPage = ref(1);

const filterTabs = [
  { id: 'terkirim', label: 'Terkirim' },
  { id: 'diproses', label: 'Diproses' },
  { id: 'ditangani', label: 'Ditangani' },
  { id: 'selesai', label: 'Selesai' },
  { id: 'dibatalkan', label: 'Dibatalkan' },
];

/**
 * Mapping filter tab ke query param status API backend
 */
const mapTabToApiStatus = (tabId: string): string | undefined => {
  switch (tabId) {
    case 'terkirim':
      return 'pending';
    case 'diproses':
      return 'in_review';
    case 'ditangani':
      return 'in_progress';
    case 'selesai':
      return 'resolved';
    case 'dibatalkan':
      return 'cancelled';
    default:
      return undefined;
  }
};

onMounted(() => {
  loadData();
});

const loadData = (page = 1) => {
  currentPage.value = page;
  const statusParam = mapTabToApiStatus(activeFilter.value);
  fetchReports({
    page,
    per_page: 10,
    status: statusParam,
  });
};

const changeFilter = (filterId: string) => {
  activeFilter.value = filterId;
  loadData(1);
};

const goToPage = (page: number) => {
  loadData(page);
};

// Modals State
const showDetailModal = ref(false);
const showDeleteModal = ref(false);
const selectedReport = ref<ReportItem | null>(null);
const reportIdToDelete = ref<number | null>(null);
const toast = reactive({ show: false, message: '' });

const openDetail = async (report: ReportItem) => {
  selectedReport.value = report;
  showDetailModal.value = true;
  if (report.id) {
    await getComplaintDetail(report.id);
  }
};

const confirmDelete = (id: number) => {
  reportIdToDelete.value = id;
  showDeleteModal.value = true;
};

const handleDeleteConfirm = async () => {
  if (reportIdToDelete.value !== null) {
    // Coba cancel/delete ke backend API
    const res = await deleteReport(reportIdToDelete.value);
    showDeleteModal.value = false;
    const id = reportIdToDelete.value;
    reportIdToDelete.value = null;

    if (res && res.success) {
      toast.message = 'Laporan pengaduan berhasil dihapus.';
    } else {
      // Jika delete gagal, coba panggil cancel
      await cancelReport(id);
      toast.message = 'Laporan pengaduan berhasil dibatalkan.';
    }

    toast.show = true;
    setTimeout(() => (toast.show = false), 3000);
    loadData(currentPage.value);
  }
};
</script>
