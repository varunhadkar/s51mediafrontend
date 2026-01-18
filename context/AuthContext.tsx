'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { api } from '../lib/api';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  token: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Initialize auth state from localStorage
  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = () => {
    try {
      // Check if we're in the browser
      if (typeof window === 'undefined') {
        setIsLoading(false);
        return;
      }

      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');

      console.log('🔍 Checking stored auth:', { 
        hasToken: !!storedToken, 
        hasUser: !!storedUser 
      });

      if (storedToken && storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setToken(storedToken);
          setUser(parsedUser);
          console.log('✅ Auth restored from localStorage');
        } catch (error) {
          console.error('❌ Failed to parse stored user:', error);
          clearAuth();
        }
      }
    } catch (error) {
      console.error('❌ Auth initialization error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearAuth = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  const login = async (email: string, password: string) => {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    console.log('🔐 Attempting login...');

    const response = await fetch(api.login, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: trimmedEmail, password: trimmedPassword }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }

    const data = await response.json();
    
    console.log('✅ Login successful:', data);

    // Store in localStorage
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    
    // Update state
    setToken(data.token);
    setUser(data.user);
    
    console.log('💾 Token and user saved to localStorage');

    // Redirect to dashboard
    router.push('/dashboard');
  };

  const logout = () => {
    console.log('🚪 Logging out...');
    clearAuth();
    router.push('/auth/login');
  };

  // Debug: Log state changes
  useEffect(() => {
    console.log('🔄 Auth state changed:', { 
      hasUser: !!user, 
      hasToken: !!token,
      isLoading 
    });
  }, [user, token, isLoading]);

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, token }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
