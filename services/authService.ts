// services/authService.ts
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  User
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { logger } from '@/lib/logger';

logger.debug('authService - Using centralized Firebase instance');

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
    logger.debug('loginAdmin - Attempting login for:', email);
    const result = await signInWithEmailAndPassword(auth, email, password);
    logger.debug('loginAdmin - Login successful for user:', result.user.email);
    return {
      success: true,
      user: result.user
    };
  } catch (error: any) {
    logger.error('loginAdmin - Error:', error);
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
    logger.debug('logoutAdmin - Attempting logout');
    await signOut(auth);
    logger.debug('logoutAdmin - Logout successful');
  } catch (error: any) {
    logger.error('logoutAdmin - Error:', error);
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