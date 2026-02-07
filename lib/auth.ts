// lib/auth.ts
import { User } from 'firebase/auth';
import { auth } from './firebase';
import {
  loginAdmin,
  logoutAdmin,
  subscribeToAuthChanges
} from '@/services/authService';

export const loginUser = async (email: string, password: string) => {
  try {
    const result = await loginAdmin({ email, password });
    if (result.success) {
      return result.user;
    } else {
      throw new Error(result.error || 'Login failed');
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const logoutUser = async () => {
  try {
    await logoutAdmin();
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return subscribeToAuthChanges(callback);
};