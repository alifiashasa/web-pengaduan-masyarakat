import { computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import type { User as ApiUser } from '@/stores/auth';

// Shape yang dipakai oleh komponen-komponen yang sudah ada (AppNavbar, ProfileSidebar, dll)
export interface UserProfile {
  name: string;
  username: string; // mapped dari email (tidak ada di API)
  email: string;
  phone: string;
  avatarUrl: string; // mapped dari user.avatar
}

export const useAuth = () => {
  const authStore = useAuthStore();

  // Computed: isLoggedIn — alias dari isAuthenticated store
  const isLoggedIn = computed(() => authStore.isAuthenticated);

  // Computed: user — memetakan shape API ke shape yang dipakai komponen
  const user = computed<UserProfile>(() => {
    const apiUser: ApiUser | null = authStore.user;
    let avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(apiUser?.name ?? 'U')}&background=E75A0F&color=fff`;

    if (apiUser?.avatar && apiUser.avatar.trim() !== '') {
      const avatarStr = apiUser.avatar.trim();
      if (
        avatarStr.startsWith('http://') ||
        avatarStr.startsWith('https://') ||
        avatarStr.startsWith('data:image/')
      ) {
        avatarUrl = avatarStr;
      } else {
        const cleanPath = avatarStr.replace(/^\/?(storage\/)?/, '');
        avatarUrl = `https://backoffice-pengaduan-masyarakat.can.co.id/storage/${cleanPath}`;
      }
    }

    return {
      name: apiUser?.name ?? '',
      username: apiUser?.email ? `@${apiUser.email.split('@')[0]}` : '',
      email: apiUser?.email ?? '',
      phone: apiUser?.phone ?? '',
      avatarUrl,
    };
  });

  // login() — sekarang tidak dipakai langsung (flow lewat handleGoogleAuth),
  // tetapi dipertahankan agar tidak ada breaking change.
  const login = () => {
    // No-op: gunakan authStore.handleGoogleAuth(firebaseUser) untuk login sesungguhnya
  };

  // logout() — delegasi ke store (akan hit API /auth/logout)
  const logout = () => authStore.logout();

  // fetchUserProfile() — ambil profile user terbaru dari backend GET /user
  const fetchUserProfile = () => authStore.fetchUserProfile();

  // updateUserProfile() — hit API PATCH /user untuk update name & phone
  const updateUserProfile = (payload: { name?: string; phone?: string }) =>
    authStore.updateUserProfile(payload);

  // uploadAvatar() — upload file gambar ke POST /user/avatar
  const uploadAvatar = (file: File) => authStore.uploadAvatar(file);

  // removeAvatar() — hapus avatar via PATCH /user dengan body { avatar: null }
  const removeAvatar = () => authStore.removeAvatar();

  // updateProfile() — update info user (name, email, phone) di store secara lokal (tanpa menyentuh avatar)
  const updateProfile = (updated: Partial<UserProfile>) => {
    if (!authStore.user) return;
    authStore.user = {
      ...authStore.user,
      name: updated.name ?? authStore.user.name,
      email: updated.email ?? authStore.user.email,
      phone: updated.phone ?? authStore.user.phone,
    };
    const userCookie = useCookie<ApiUser | null>('user_data');
    userCookie.value = authStore.user;
  };

  // updateAvatar() — khusus meng-update avatar / profile picture secara lokal (alias)
  const updateAvatar = (avatarUrl: string) => {
    authStore.updateAvatar(avatarUrl);
  };

  return {
    isLoggedIn,
    user,
    login,
    logout,
    fetchUserProfile,
    updateUserProfile,
    uploadAvatar,
    removeAvatar,
    updateProfile,
    updateAvatar,
    // Expose store langsung untuk akses loading/error/handleGoogleAuth
    authStore,
  };
};
