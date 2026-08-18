import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useCookie, useRuntimeConfig } from '#app';

// --- TypeScript Interfaces -------------------------------------------------

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  avatar: string | null;
  role: 'user' | 'operator' | 'admin' | 'super_admin' | string;
  is_active: boolean;
  created_at: string;
}

export interface CheckFirebaseResponse {
  success: boolean;
  user_exists: boolean;
  message: string;
  user?: User;
  token?: string;
}

export interface RegisterFirebaseResponse {
  success: boolean;
  message: string;
  user: User;
  token: string;
  token_type?: string;
}

export interface RegisterFirebasePayload {
  firebase_uid: string;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
}

export interface LogoutResponse {
  success: boolean;
  message: string;
}

export interface GetUserProfileResponse {
  success: boolean;
  user: User;
}

export interface UpdateUserProfilePayload {
  name?: string;
  phone?: string;
}

export interface UpdateUserProfileResponse {
  success: boolean;
  message: string;
  user: User;
}

export interface UploadAvatarResponse {
  success: boolean;
  message: string;
  avatar_url: string;
}

// --- Store -----------------------------------------------------------------

export const useAuthStore = defineStore('auth', () => {
  const config = useRuntimeConfig();
  const getApiBase = () =>
    (
      (config.public.apiUrl as string) || 'https://backoffice-pengaduan-masyarakat.can.co.id/api'
    ).replace(/\/+$/, '');

  // -- State ----------------------------------------------------------------
  const tokenCookie = useCookie<string | null>('auth_token', {
    maxAge: 60 * 60 * 24 * 7, // 7 hari
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });

  const userCookie = useCookie<User | null>('user_data', {
    maxAge: 60 * 60 * 24 * 7, // 7 hari
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });

  const user = ref<User | null>(userCookie.value || null);
  const token = ref<string | null>(tokenCookie.value || null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // -- Computed -------------------------------------------------------------
  const isAuthenticated = computed(() => !!token.value && !!user.value);

  // -- Helpers --------------------------------------------------------------
  /**
   * Set & merge user state dan update userCookie.
   * Memastikan field avatar lama tidak tertimpa null/undefined/empty string jika response dari server tidak membawa avatar baru.
   */
  function setUserData(newUserData: Partial<User> | User) {
    if (!user.value) {
      user.value = newUserData as User;
    } else {
      const hasNewAvatar =
        newUserData.avatar !== undefined &&
        newUserData.avatar !== null &&
        typeof newUserData.avatar === 'string' &&
        newUserData.avatar.trim() !== '';

      const avatarToKeep = hasNewAvatar ? newUserData.avatar! : user.value.avatar;

      user.value = {
        ...user.value,
        ...newUserData,
        avatar: avatarToKeep,
      };
    }
    userCookie.value = user.value;
  }

  function setSession(userData: User, authToken: string) {
    user.value = userData;
    token.value = authToken;
    tokenCookie.value = authToken;
    userCookie.value = userData;
    error.value = null;
  }

  function clearSession() {
    user.value = null;
    token.value = null;
    tokenCookie.value = null;
    userCookie.value = null;
    error.value = null;
  }

  // -- Actions --------------------------------------------------------------

  /**
   * Upload file avatar user ke backend.
   * Endpoint: POST /user/avatar (FormData key: 'avatar')
   */
  async function uploadAvatar(file: File): Promise<UploadAvatarResponse> {
    if (!token.value) throw new Error('Unauthenticated');
    loading.value = true;
    error.value = null;

    try {
      const formData = new FormData();
      formData.append('avatar', file);

      const response = await $fetch<UploadAvatarResponse>(`${getApiBase()}/user/avatar`, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${token.value}`,
          Accept: 'application/json',
        },
      });

      if (response && response.success && response.avatar_url) {
        if (user.value) {
          user.value = {
            ...user.value,
            avatar: response.avatar_url,
          };
          userCookie.value = user.value;
        }
      }

      return response;
    } catch (err: unknown) {
      const message = extractErrorMessage(err);
      error.value = message;
      throw err;
    } finally {
      loading.value = false;
    }
  }

  /**
   * Hapus avatar user di backend.
   * Endpoint: PATCH /user dengan body { avatar: null }
   */
  async function removeAvatar(): Promise<UpdateUserProfileResponse> {
    if (!token.value) throw new Error('Unauthenticated');
    loading.value = true;
    error.value = null;

    try {
      const response = await $fetch<UpdateUserProfileResponse>(`${getApiBase()}/user`, {
        method: 'PATCH',
        body: { avatar: null },
        headers: {
          Authorization: `Bearer ${token.value}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      if (response && response.success) {
        if (user.value) {
          user.value = {
            ...user.value,
            avatar: null,
          };
          userCookie.value = user.value;
        }
      }

      return response;
    } catch (err: unknown) {
      const message = extractErrorMessage(err);
      error.value = message;
      throw err;
    } finally {
      loading.value = false;
    }
  }

  /**
   * Alias untuk update avatar lokal (misal jika diberikan URL langsung).
   */
  function updateAvatar(newAvatarUrl: string) {
    if (!user.value) return;
    user.value = {
      ...user.value,
      avatar: newAvatarUrl,
    };
    userCookie.value = user.value;
  }

  /**
   * Ambil data profile user terbaru dari backend.
   * Endpoint: GET /user
   */
  async function fetchUserProfile(): Promise<User | null> {
    if (!token.value) return null;
    loading.value = true;
    error.value = null;

    try {
      const response = await $fetch<GetUserProfileResponse>(`${getApiBase()}/user`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token.value}`,
          Accept: 'application/json',
        },
      });

      if (response.success && response.user) {
        user.value = response.user;
        userCookie.value = user.value;
      }

      return user.value;
    } catch (err: unknown) {
      const message = extractErrorMessage(err);
      error.value = message;
      throw err;
    } finally {
      loading.value = false;
    }
  }

  /**
   * Update data profile user di backend.
   * Endpoint: PATCH /user
   * Hanya meng-update name, email, dan phone. JANGAN menyentuh / menimpa field avatar!
   */
  async function updateUserProfile(
    payload: UpdateUserProfilePayload
  ): Promise<UpdateUserProfileResponse> {
    if (!token.value) throw new Error('Unauthenticated');
    loading.value = true;
    error.value = null;

    try {
      const response = await $fetch<UpdateUserProfileResponse>(`${getApiBase()}/user`, {
        method: 'PATCH',
        body: payload,
        headers: {
          Authorization: `Bearer ${token.value}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      if (response.success && response.user) {
        if (user.value) {
          user.value = {
            ...user.value,
            name: response.user.name ?? user.value.name,
            email: response.user.email ?? user.value.email,
            phone: response.user.phone ?? user.value.phone,
          };
        } else {
          user.value = response.user;
        }
        userCookie.value = user.value;
      }

      return response;
    } catch (err: unknown) {
      const message = extractErrorMessage(err);
      error.value = message;
      throw err;
    } finally {
      loading.value = false;
    }
  }

  /**
   * Cek apakah email sudah terdaftar via Firebase check.
   * Endpoint: POST /auth/check-firebase
   * Jika user_exists, langsung set session.
   */
  async function checkFirebase(email: string): Promise<CheckFirebaseResponse> {
    loading.value = true;
    error.value = null;

    try {
      const response = await $fetch<CheckFirebaseResponse>(`${getApiBase()}/auth/check-firebase`, {
        method: 'POST',
        body: { email },
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      if (response.success && response.user_exists && response.user && response.token) {
        setSession(response.user, response.token);
      }

      return response;
    } catch (err: unknown) {
      const message = extractErrorMessage(err);
      error.value = message;
      throw err;
    } finally {
      loading.value = false;
    }
  }

  /**
   * Daftarkan user Firebase baru ke backend.
   * Endpoint: POST /auth/register-firebase
   */
  async function registerFirebase(
    payload: RegisterFirebasePayload
  ): Promise<RegisterFirebaseResponse> {
    loading.value = true;
    error.value = null;

    try {
      const response = await $fetch<RegisterFirebaseResponse>(
        `${getApiBase()}/auth/register-firebase`,
        {
          method: 'POST',
          body: payload,
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      );

      if (response.success && response.user && response.token) {
        setSession(response.user, response.token);
      }

      return response;
    } catch (err: unknown) {
      const message = extractErrorMessage(err);
      error.value = message;
      throw err;
    } finally {
      loading.value = false;
    }
  }

  /**
   * Logout: hit API POST /auth/logout lalu clear state session.
   */
  async function logout(): Promise<LogoutResponse | void> {
    if (!token.value) {
      clearSession();
      return;
    }

    loading.value = true;
    const activeToken = token.value;

    try {
      const res = await $fetch<LogoutResponse>(`${getApiBase()}/auth/logout`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${activeToken}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      return res;
    } catch (err: unknown) {
      console.warn('Logout API failed:', err);
    } finally {
      clearSession();
      loading.value = false;
    }
  }

  /**
   * Orchestrator: dipanggil setelah Google Sign-In berhasil.
   * Flow: checkFirebase -> jika belum ada, registerFirebase.
   */
  async function handleGoogleAuth(firebaseUser: {
    uid: string;
    email: string;
    displayName: string;
    phoneNumber?: string;
    photoURL?: string;
  }) {
    loading.value = true;
    error.value = null;

    try {
      const checkResult = await checkFirebase(firebaseUser.email);

      // Jika checkFirebase mengembalikan user_exists DAN token + user
      if (checkResult && checkResult.success && checkResult.user_exists && checkResult.user && checkResult.token) {
        setSession(checkResult.user, checkResult.token);
        return checkResult;
      }

      // Jika check-firebase hanya mengembalikan status user_exists tanpa token,
      // panggil registerFirebase yang menangani registrasi/login dan mengembalikan token + user
      const regResult = await registerFirebase({
        firebase_uid: firebaseUser.uid,
        email: firebaseUser.email,
        name: firebaseUser.displayName || 'Masyarakat',
        phone: firebaseUser.phoneNumber ?? '',
        avatar: firebaseUser.photoURL ?? '',
      });

      return regResult;
    } catch (err: unknown) {
      const message = extractErrorMessage(err);
      error.value = message;
      throw err;
    } finally {
      loading.value = false;
    }
  }

  /**
   * Restore session dari cookie saat app pertama load / refresh.
   */
  function initAuth() {
    if (tokenCookie.value && !token.value) {
      token.value = tokenCookie.value;
    }
    if (userCookie.value && !user.value) {
      user.value = userCookie.value;
    }
  }

  // Auto restore session dari cookie saat store pertama kali dibuat
  initAuth();

  return {
    // State
    user,
    token,
    loading,
    error,
    // Computed
    isAuthenticated,
    // Actions
    setUserData,
    updateAvatar,
    uploadAvatar,
    removeAvatar,
    fetchUserProfile,
    updateUserProfile,
    checkFirebase,
    registerFirebase,
    logout,
    handleGoogleAuth,
    initAuth,
  };
});

// --- Utility ---------------------------------------------------------------

function extractErrorMessage(err: unknown): string {
  if (err && typeof err === 'object') {
    const fetchErr = err as { data?: { message?: string }; message?: string };
    return fetchErr.data?.message ?? fetchErr.message ?? 'Terjadi kesalahan. Coba lagi.';
  }
  return 'Terjadi kesalahan. Coba lagi.';
}
