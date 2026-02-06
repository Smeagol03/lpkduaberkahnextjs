// app/admin/dashboard/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { onAuthStateChange } from '@/lib/auth';
import { usePeserta } from '@/hooks/usePeserta';
import { useProgram } from '@/hooks/useProgram';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const { peserta, loading: pesertaLoading } = usePeserta();
  const { programs, loading: programLoading } = useProgram();
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Cek apakah pengguna sudah login sebagai admin
    const adminStatus = localStorage.getItem('admin');
    if (!adminStatus) {
      router.push('/admin/login');
    } else {
      setIsAdmin(true);
    }

    // Jika menggunakan autentikasi Firebase, uncomment baris berikut:
    /*
    const unsubscribe = onAuthStateChange((user) => {
      if (!user) {
        router.push('/admin/login');
      } else {
        setIsAdmin(true);
      }
    });

    return () => unsubscribe();
    */
  }, [router]);

  if (!isAdmin) {
    return null; // Atau tampilkan loading spinner
  }

  // Hitung statistik
  const totalPeserta = peserta.length;
  const pesertaAktif = peserta.filter(p => p.status === 'aktif').length;
  const totalProgram = programs.length;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Admin</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-700">Total Peserta</h2>
          <p className="text-3xl font-bold text-blue-600">{totalPeserta}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-700">Peserta Aktif</h2>
          <p className="text-3xl font-bold text-green-600">{pesertaAktif}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-700">Total Program</h2>
          <p className="text-3xl font-bold text-purple-600">{totalProgram}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Statistik Peserta</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Baru</span>
                <span className="text-sm font-medium text-gray-700">
                  {peserta.filter(p => p.status === 'baru').length}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-yellow-500 h-2.5 rounded-full" 
                  style={{ 
                    width: `${(peserta.filter(p => p.status === 'baru').length / totalPeserta) * 100 || 0}%` 
                  }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Aktif</span>
                <span className="text-sm font-medium text-gray-700">
                  {peserta.filter(p => p.status === 'aktif').length}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-green-500 h-2.5 rounded-full" 
                  style={{ 
                    width: `${(peserta.filter(p => p.status === 'aktif').length / totalPeserta) * 100 || 0}%` 
                  }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Lulus</span>
                <span className="text-sm font-medium text-gray-700">
                  {peserta.filter(p => p.status === 'lulus').length}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-500 h-2.5 rounded-full" 
                  style={{ 
                    width: `${(peserta.filter(p => p.status === 'lulus').length / totalPeserta) * 100 || 0}%` 
                  }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Ditolak</span>
                <span className="text-sm font-medium text-gray-700">
                  {peserta.filter(p => p.status === 'ditolak').length}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-red-500 h-2.5 rounded-full" 
                  style={{ 
                    width: `${(peserta.filter(p => p.status === 'ditolak').length / totalPeserta) * 100 || 0}%` 
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Program Terpopuler</h2>
          <div className="space-y-4">
            {programs.slice(0, 5).map((program, index) => (
              <div key={program.id} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{program.nama}</p>
                  <p className="text-sm text-gray-500">{program.deskripsi.substring(0, 50)}...</p>
                </div>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  {program.kuota} kuota
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}