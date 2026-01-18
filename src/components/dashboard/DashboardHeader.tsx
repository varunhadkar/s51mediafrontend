'use client';

import { Bell } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

export default function DashboardHeader() {
  const { user } = useAuth();

  return (
    <header className="bg-zinc-900 border-b border-zinc-800 px-6 py-4 w-full h-16">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Welcome back, {user?.name}</h2>
        
        <div className="flex items-center gap-4">

          {/* User Info */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium text-white">{user?.name}</p>
              <p className="text-xs text-gray-400">{user?.role}</p>
            </div>
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-white font-bold">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
