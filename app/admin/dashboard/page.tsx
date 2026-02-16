'use client';

import { useState, useEffect } from 'react';
import { onAuthStateChange } from '@/lib/auth';
import { usePeserta } from '@/hooks/usePeserta';
import { useProgram } from '@/hooks/useProgram';
import { usePendaftar } from '@/hooks/usePendaftar';
import StatusBadge from '@/components/admin/StatusBadge';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const { peserta, loading: pesertaLoading } = usePeserta();
  const { programs, loading: programLoading } = useProgram();
  const { pendaftar, loading: pendaftarLoading } = usePendaftar();
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const adminData = localStorage.getItem('adminUser');
    if (!adminData) {
      const timer = setTimeout(() => {
        router.push('/admin/login');
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setIsAdmin(true);
    }

    const unsubscribe = onAuthStateChange((user) => {
      if (!user) {
        localStorage.removeItem('adminUser');
        router.push('/admin/login');
      } else {
        setIsAdmin(true);
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const totalPeserta = peserta.length;
  const pesertaAktif = peserta.filter(p => p.statusPeserta === 'aktif').length;
  const totalProgram = programs.length;
  const pendaftarBaru = pendaftar.filter(p => p.statusPendaftaran === 'menunggu').length;

  const statCards = [
    {
      title: 'Total Peserta',
      value: totalPeserta,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      title: 'Peserta Aktif',
      value: pesertaAktif,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
    },
    {
      title: 'Total Program',
      value: totalProgram,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    },
    {
      title: 'Pendaftar Baru',
      value: pendaftarBaru,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
      ),
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">Dashboard Admin</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Selamat datang kembali!</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 md:p-6"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <div className={`text-gray-600 dark:text-gray-300`}>{stat.icon}</div>
              </div>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">{stat.value}</p>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 md:p-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Statistik Peserta</h2>
          <div className="space-y-4">
            {[
              { label: 'Baru', value: peserta.filter(p => p.statusPeserta === 'baru').length, color: 'bg-yellow-500', total: totalPeserta },
              { label: 'Aktif', value: peserta.filter(p => p.statusPeserta === 'aktif').length, color: 'bg-green-500', total: totalPeserta },
              { label: 'Lulus', value: peserta.filter(p => p.statusPeserta === 'lulus').length, color: 'bg-blue-500', total: totalPeserta },
              { label: 'Ditolak', value: peserta.filter(p => p.statusPeserta === 'ditolak').length, color: 'bg-red-500', total: totalPeserta },
            ].map((item, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.label}</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.value}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div
                    className={`${item.color} h-2.5 rounded-full transition-all duration-500`}
                    style={{ width: `${(item.value / item.total) * 100 || 0}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 md:p-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Statistik Pendaftar</h2>
          <div className="space-y-4">
            {[
              { label: 'Belum Diproses', value: pendaftar.filter(p => p.statusPendaftaran === 'menunggu').length, color: 'bg-yellow-500', total: pendaftar.length },
              { label: 'Disetujui', value: pendaftar.filter(p => p.statusPendaftaran === 'disetujui').length, color: 'bg-green-500', total: pendaftar.length },
              { label: 'Ditolak', value: pendaftar.filter(p => p.statusPendaftaran === 'ditolak').length, color: 'bg-red-500', total: pendaftar.length },
            ].map((item, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.label}</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.value}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div
                    className={`${item.color} h-2.5 rounded-full transition-all duration-500`}
                    style={{ width: `${(item.value / item.total) * 100 || 0}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 md:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Lulusan Terbaru</h2>
            <span className="text-xs text-gray-500 dark:text-gray-400">{programs.length} total</span>
          </div>
          <div className="space-y-3">
            {programs.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-center py-4">Belum ada data lulusan</p>
            ) : (
              programs.slice(0, 5).map((graduate) => (
                <div key={graduate.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-sm">
                      {graduate.informasiPribadi?.namaLengkap?.charAt(0) || '?'}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 dark:text-white text-sm">{graduate.informasiPribadi?.namaLengkap || 'Nama tidak dikenal'}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{graduate.paketPelatihan || '-'}</p>
                    </div>
                  </div>
                  <StatusBadge status={graduate.statusPeserta || ''} type="peserta" />
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 md:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Pendaftar Terbaru</h2>
            <span className="text-xs text-gray-500 dark:text-gray-400">{pendaftar.length} total</span>
          </div>
          <div className="space-y-3">
            {pendaftar.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-center py-4">Belum ada data pendaftar</p>
            ) : (
              pendaftar.slice(0, 5).map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center text-white font-semibold text-sm">
                      {item.informasiPribadi?.namaLengkap?.charAt(0) || '?'}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 dark:text-white text-sm">{item.informasiPribadi?.namaLengkap}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{item.paketPelatihan}</p>
                    </div>
                  </div>
                  <StatusBadge status={item.statusPendaftaran || ''} type="pendaftar" />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}