import { storeToRefs } from 'pinia';
import { useDashboardStore } from '@/stores/dashboard';

export const useDashboard = () => {
  const dashboardStore = useDashboardStore();
  const { stats, recentComplaints, loading, error } = storeToRefs(dashboardStore);

  const fetchDashboardStats = () => dashboardStore.fetchDashboardStats();
  const resetDashboard = () => dashboardStore.reset();

  return {
    stats,
    recentComplaints,
    loading,
    error,
    fetchDashboardStats,
    resetDashboard,
    dashboardStore,
  };
};
