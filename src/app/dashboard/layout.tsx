'use client';

import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import ProtectedRoute from '@/components/auth/ProtectedRoutes';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      {/* App shell */}
      <div className="h-screen bg-black text-white flex">
        {/* SIDEBAR */}
        {/* Desktop: fixed, full height, fixed width */}
        <aside className="hidden md:flex fixed inset-y-0 left-0 w-60 bg-black border-r border-zinc-800 z-30">
          <DashboardSidebar />
        </aside>

        {/* Mobile: normal flow (your sidebar component can render a top bar / drawer) */}
        <aside className="md:hidden w-full">
          <DashboardSidebar />
        </aside>

        {/* MAIN COLUMN */}
        <div className="flex-1 flex flex-col h-screen md:ml-60">
          {/* HEADER */}
          {/* Desktop header: fixed in main column, NOT global full width */}
          <header className="hidden md:flex h-16 left-0 items-center bg-black border-b border-zinc-800 sticky top-0 z-20">
            <DashboardHeader />
          </header>

          {/* Mobile header (optional, if Sidebar doesn’t already render one) */}
          <header className="md:hidden border-b border-zinc-800 px-4 py-3">
            <DashboardHeader />
          </header>

          {/* SCROLLABLE CONTENT */}
          <main className="flex-1 overflow-y-auto px-4 md:px-6 py-4 md:py-6">
            <div className="max-w-5xl mx-auto">{children}</div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
