'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

export default function ProtectedRoute({ 
  children, 
  requireAuth = true 
}: ProtectedRouteProps) {
  const router = useRouter();
  const { isAuthenticated, isLoading, checkSession } = useAuth();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const validateSession = async () => {
      // If not loading auth state anymore
      if (!isLoading) {
        if (requireAuth) {
          // Check if user is authenticated
          if (!isAuthenticated) {
            // Double check session validity
            const hasValidSession = await checkSession();
            
            if (!hasValidSession) {
              // Redirect to login with return URL
              const currentPath = window.location.pathname;
              router.push(`/login?redirect=${encodeURIComponent(currentPath)}`);
              return;
            }
          }
        }
        setIsChecking(false);
      }
    };

    validateSession();
  }, [isAuthenticated, isLoading, requireAuth, checkSession, router]);

  // Show loading spinner while checking
  if (isLoading || isChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  // If requireAuth and not authenticated, don't render children
  if (requireAuth && !isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
