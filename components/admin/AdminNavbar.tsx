'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { logoutUser } from '@/lib/auth';

interface AdminNavbarProps {
  onMenuClick: () => void;
}

export default function AdminNavbar({ onMenuClick }: AdminNavbarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logoutUser();
      localStorage.removeItem('admin');
      localStorage.removeItem('adminUser');
      router.push('/admin/login');
    } catch (error) {
      console.error('Error saat logout:', error);
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-3 dark:bg-gray-800 dark:border-gray-700 sticky top-0 z-20">
      <div className="flex items-center justify-between">
        {/* Mobile menu button */}
        <button
          onClick={onMenuClick}
          type="button"
          className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          <span className="sr-only">Toggle sidebar</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Page title placeholder - can be customized per page */}
        <div className="hidden lg:block">
          <h1 className="text-lg font-semibold text-gray-800 dark:text-white">Admin Dashboard</h1>
        </div>

        {/* Right side - User dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center text-sm rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            type="button"
          >
            <span className="sr-only">Open user menu</span>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-md">
              A
            </div>
            <span className="hidden md:inline-block ml-2 text-gray-700 dark:text-white">Admin</span>
            <svg className="hidden md:inline-block w-4 h-4 ml-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {dropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setDropdownOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 z-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600">
                <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-600">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Administrator</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">admin@lpkduaberkah.com</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}