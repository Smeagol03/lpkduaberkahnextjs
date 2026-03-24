// services/authService.ts
import {
  signInWithEmailAndPassword,
  signOut,
  UserCredential
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

export interface AdminCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  user?: UserCredential['user'];
  error?: string;
}

/**
 * Login admin with Firebase Authentication
 */
export const loginAdmin = async ({ email, password }: AdminCredentials): Promise<AuthResponse> => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return {
      success: true,
      user: result.user
    };
  } catch (error: any) {
    console.error('Login error:', error);
    return {
      success: false,
      error: error.message || 'Terjadi kesalahan saat login'
    };
  }
};

/**
 * Logout admin from Firebase Authentication
 */
export const logoutAdmin = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error: any) {
    console.error('Logout error:', error);
    throw new Error(error.message || 'Terjadi kesalahan saat logout');
  }
};

/**
 * Subscribe to Firebase auth state changes
 * Used for monitoring login/logout events
 */
export const subscribeToAuthChanges = (callback: (user: UserCredential['user'] | null) => void) => {
  return auth.onAuthStateChanged(callback);
};
