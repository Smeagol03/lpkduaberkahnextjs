'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { ref, set, remove, onDisconnect, get } from 'firebase/database';
import { loginAdmin, subscribeToAuthChanges } from '@/services/authService';

interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, rememberMe: boolean) => Promise<void>;
  logout: () => Promise<void>;
  checkSession: () => Promise<boolean>;
  getSessionExpiry: () => number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const SESSION_KEY = 'adminSession';
const SESSION_DURATION = 2 * 60 * 60 * 1000; // 2 hours
const REMEMBER_ME_DURATION = 30 * 24 * 60 * 60 * 1000; // 30 days

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [unsubscribeAuth, setUnsubscribeAuth] = useState<(() => void) | null>(null);

  // Check if user is authenticated on mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const userData: AuthUser = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
        };
        setUser(userData);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    });

    setUnsubscribeAuth(() => unsubscribe);

    return () => {
      unsubscribe();
    };
  }, []);

  // Manage session presence in Firebase for single device enforcement
  const manageSession = async (uid: string) => {
    const sessionRef = ref(db, `sessions/${uid}`);
    const sessionId = Math.random().toString(36).substring(2, 15);
    
    // Store session info
    await set(sessionRef, {
      sessionId,
      timestamp: Date.now(),
      lastActive: Date.now(),
    });

    // Auto-remove on disconnect
    await onDisconnect(sessionRef).remove();

    return sessionId;
  };

  const login = async (email: string, password: string, rememberMe: boolean) => {
    try {
      const result = await loginAdmin({ email, password });
      
      if (!result.success || !result.user) {
        throw new Error(result.error || 'Login gagal');
      }

      const userData: AuthUser = {
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName,
      };

      // Manage session for single device enforcement
      const sessionId = await manageSession(result.user.uid);

      // Create session
      const sessionDuration = rememberMe ? REMEMBER_ME_DURATION : SESSION_DURATION;
      const expiresAt = Date.now() + sessionDuration;
      
      const sessionData = {
        uid: userData.uid,
        email: userData.email,
        displayName: userData.displayName,
        sessionId,
        expiresAt,
        rememberMe,
        timestamp: Date.now(),
      };

      // Store in localStorage
      localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));

      // Set session cookie
      const response = await fetch('/api/auth/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...sessionData,
          maxAge: sessionDuration / 1000,
        }),
      });

      if (!response.ok) {
        throw new Error('Gagal membuat session');
      }

      setUser(userData);
      setIsAuthenticated(true);
    } catch (error: any) {
      throw new Error(error.message || 'Login gagal');
    }
  };

  const logout = async () => {
    try {
      // Clear Firebase presence
      if (user?.uid) {
        const sessionRef = ref(db, `sessions/${user.uid}`);
        await remove(sessionRef);
      }

      // Sign out from Firebase
      await signOut(auth);

      // Clear localStorage
      localStorage.removeItem(SESSION_KEY);
      localStorage.removeItem('adminUser');

      // Clear session cookie
      await fetch('/api/auth/session', { method: 'DELETE' });

      setUser(null);
      setIsAuthenticated(false);
    } catch (error: any) {
      console.error('Logout error:', error);
      throw new Error(error.message || 'Logout gagal');
    }
  };

  const checkSession = async (): Promise<boolean> => {
    const sessionStr = localStorage.getItem(SESSION_KEY);
    if (!sessionStr) return false;

    try {
      const session = JSON.parse(sessionStr);
      const now = Date.now();

      // Check if session expired
      if (now > session.expiresAt) {
        await logout();
        return false;
      }

      // Verify Firebase presence (single device)
      if (session.uid) {
        const sessionRef = ref(db, `sessions/${session.uid}`);
        const snapshot = await get(sessionRef);
        
        if (!snapshot.exists() || snapshot.val().sessionId !== session.sessionId) {
          // Session invalidated from another device
          await logout();
          return false;
        }
      }

      return true;
    } catch (error) {
      console.error('Session check error:', error);
      return false;
    }
  };

  const getSessionExpiry = (): number => {
    const sessionStr = localStorage.getItem(SESSION_KEY);
    if (!sessionStr) return 0;
    
    try {
      const session = JSON.parse(sessionStr);
      return session.expiresAt - Date.now();
    } catch {
      return 0;
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    checkSession,
    getSessionExpiry,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
