'use client';

import { Suspense } from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import LoginForm from '@/components/admin/LoginForm';

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-linear-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    }>
      <AuthProvider>
        <LoginForm />
      </AuthProvider>
    </Suspense>
  );
}
