'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileVideo,
  FolderTree,
  Film,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

const menuItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Projects', href: '/dashboard/projects', icon: FileVideo },
  { name: 'Categories', href: '/dashboard/categories', icon: FolderTree },
  { name: 'Reels', href: '/dashboard/reels', icon: Film },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile top bar */}
      <header className="md:hidden flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-black">
        <Link href="/dashboard" className="flex items-center gap-2">
          <span className="text-sm font-semibold tracking-[0.25em] text-white uppercase">
            S51 ADMIN
          </span>
        </Link>
        <button
          onClick={() => setIsOpen((v) => !v)}
          className="text-white p-2 rounded hover:bg-zinc-900"
          aria-label="Toggle navigation"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-60 lg:w-64 bg-black border-r border-zinc-800 flex-col">
        <div className="px-6 py-5 border-b border-zinc-800">
          <Link href="/dashboard">
            <h1 className="text-xl lg:text-2xl font-bold text-white tracking-[0.25em] uppercase">
              S51 ADMIN
            </h1>
          </Link>
        </div>

        <nav className="flex-1 p-3 lg:p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                  isActive
                    ? 'bg-white text-black'
                    : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-3 lg:p-4 border-t border-zinc-800">
          <button
            onClick={logout}
            className="flex items-center gap-3 px-4 py-2.5 w-full text-sm text-zinc-400 hover:bg-zinc-900 hover:text-white transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile slide-over menu */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          {/* Backdrop */}
          <button
            className="flex-1 bg-black/60"
            onClick={() => setIsOpen(false)}
            aria-label="Close navigation"
          />

          {/* Panel */}
          <div className="w-64 bg-black border-l border-zinc-800 flex flex-col">
            <div className="px-4 py-4 border-b border-zinc-800 flex items-center justify-between">
              <span className="text-sm font-semibold tracking-[0.25em] text-white uppercase">
                S51 ADMIN
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-zinc-400 hover:text-white p-1 rounded hover:bg-zinc-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 p-3 space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={handleNavClick}
                    className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                      isActive
                        ? 'bg-white text-black'
                        : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="p-3 border-t border-zinc-800">
              <button
                onClick={() => {
                  setIsOpen(false);
                  logout();
                }}
                className="flex items-center gap-3 px-4 py-2.5 w-full text-sm text-zinc-400 hover:bg-zinc-900 hover:text-white transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
