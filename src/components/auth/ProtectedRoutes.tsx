'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../context/AuthContext';
// import { useAuth } from '@/context/AuthContext';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Wait for auth to finish loading
    if (isLoading) return;

    // Check for token in localStorage as backup
    const hasToken = typeof window !== 'undefined' && localStorage.getItem('token');

    if (!user && !hasToken) {
      router.push('/auth/login');
      setShouldRender(false);
    } else {
      setShouldRender(true);
    }
  }, [user, isLoading, router]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render children if not authenticated
  if (!shouldRender) {
    return null;
  }

  return <>{children}</>;
}
