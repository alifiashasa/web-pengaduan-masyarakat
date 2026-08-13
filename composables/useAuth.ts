import { useState } from '#imports';

export interface UserProfile {
  name: string;
  username: string;
  email: string;
  phone: string;
  avatarUrl: string;
}

export const useAuth = () => {
  const isLoggedIn = useState<boolean>('auth_is_logged_in', () => true);
  const user = useState<UserProfile>('auth_user', () => ({
    name: 'Andira Hadley',
    username: '@andira',
    email: 'grahambell@gmail.com',
    phone: '+62 0812000000000',
    avatarUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
  }));

  const login = () => {
    isLoggedIn.value = true;
  };

  const logout = () => {
    isLoggedIn.value = false;
  };

  const updateProfile = (updated: Partial<UserProfile>) => {
    user.value = { ...user.value, ...updated };
  };

  return {
    isLoggedIn,
    user,
    login,
    logout,
    updateProfile,
  };
};
