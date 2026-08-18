import { storeToRefs } from 'pinia';
import { useHealthStore } from '@/stores/health';

export const useHealth = () => {
  const store = useHealthStore();
  const {
    finishedAt,
    checkResults,
    loading,
    error,
    lastCheckedAt,
    isHealthy,
    hasWarning,
    hasFailure,
    overallStatus,
  } = storeToRefs(store);

  const fetchHealthStatus = () => store.fetchHealthStatus();
  const resetState = () => store.resetState();

  return {
    finishedAt,
    checkResults,
    loading,
    error,
    lastCheckedAt,
    isHealthy,
    hasWarning,
    hasFailure,
    overallStatus,
    fetchHealthStatus,
    resetState,
  };
};
