// services/authService.ts
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  User
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

console.log('[DEBUG] authService - Using centralized Firebase instance');

export interface AdminCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  error?: string;
}

/**
 * Login admin
 */
export const loginAdmin = async ({ email, password }: AdminCredentials): Promise<AuthResponse> => {
  try {
    console.log('[DEBUG] loginAdmin - Attempting login for:', email);
    const result = await signInWithEmailAndPassword(auth, email, password);
    console.log('[DEBUG] loginAdmin - Login successful for user:', result.user.email);
    return {
      success: true,
      user: result.user
    };
  } catch (error: any) {
    console.error('[DEBUG] loginAdmin - Error:', error);
    console.error('Login error:', error);
    return {
      success: false,
      error: error.message || 'Terjadi kesalahan saat login'
    };
  }
};

/**
 * Logout admin
 */
export const logoutAdmin = async (): Promise<void> => {
  try {
    console.log('[DEBUG] logoutAdmin - Attempting logout');
    await signOut(auth);
    console.log('[DEBUG] logoutAdmin - Logout successful');
  } catch (error: any) {
    console.error('[DEBUG] logoutAdmin - Error:', error);
    console.error('Logout error:', error);
    throw new Error(error.message || 'Terjadi kesalahan saat logout');
  }
};

/**
 * Check if admin is authenticated
 */
export const isAdminAuthenticated = (): boolean => {
  return !!localStorage.getItem('admin');
};

/**
 * Subscribe to auth state changes
 */
export const subscribeToAuthChanges = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

/**
 * Get current admin user
 */
export const getCurrentAdmin = (): User | null => {
  return auth.currentUser;
};