// app/admin/dashboard/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { onAuthStateChange } from '@/lib/auth';
import { usePeserta } from '@/hooks/usePeserta';
import { useProgram } from '@/hooks/useProgram';
import { usePendaftar } from '@/hooks/usePendaftar';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const { peserta, loading: pesertaLoading } = usePeserta();
  const { programs, loading: programLoading } = useProgram();
  const { pendaftar, loading: pendaftarLoading } = usePendaftar();
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Cek apakah pengguna sudah login sebagai admin
    const adminData = localStorage.getItem('adminUser');
    if (!adminData) {
      // Delay kecil untuk menghindari race condition dengan login page
      const timer = setTimeout(() => {
        router.push('/admin/login');
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setIsAdmin(true);
    }

    // Menggunakan autentikasi Firebase
    const unsubscribe = onAuthStateChange((user) => {
      if (!user) {
        // Jika pengguna tidak lagi login, hapus status admin dan redirect ke login
        localStorage.removeItem('adminUser');
        router.push('/admin/login');
      } else {
        setIsAdmin(true);
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (!isAdmin) {
    return null; // Atau tampilkan loading spinner
  }

  // Hitung statistik
  const totalPeserta = peserta.length;
  const pesertaAktif = peserta.filter(p => p.statusPeserta === 'aktif').length;
  const totalProgram = programs.length;
  const totalPendaftar = pendaftar.length;
  const pendaftarBaru = pendaftar.filter(p => p.statusPendaftaran === 'menunggu').length;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Admin</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-700">Pendaftar Baru</h2>
          <p className="text-3xl font-bold text-yellow-600">{pendaftarBaru}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Statistik Peserta</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Baru</span>
                <span className="text-sm font-medium text-gray-700">
                  {peserta.filter(p => p.statusPeserta === 'baru').length}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-yellow-500 h-2.5 rounded-full"
                  style={{
                    width: `${(peserta.filter(p => p.statusPeserta === 'baru').length / totalPeserta) * 100 || 0}%`
                  }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Aktif</span>
                <span className="text-sm font-medium text-gray-700">
                  {peserta.filter(p => p.statusPeserta === 'aktif').length}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-green-500 h-2.5 rounded-full"
                  style={{
                    width: `${(peserta.filter(p => p.statusPeserta === 'aktif').length / totalPeserta) * 100 || 0}%`
                  }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Lulus</span>
                <span className="text-sm font-medium text-gray-700">
                  {peserta.filter(p => p.statusPeserta === 'lulus').length}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-500 h-2.5 rounded-full"
                  style={{
                    width: `${(peserta.filter(p => p.statusPeserta === 'lulus').length / totalPeserta) * 100 || 0}%`
                  }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Ditolak</span>
                <span className="text-sm font-medium text-gray-700">
                  {peserta.filter(p => p.statusPeserta === 'ditolak').length}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-red-500 h-2.5 rounded-full"
                  style={{
                    width: `${(peserta.filter(p => p.statusPeserta === 'ditolak').length / totalPeserta) * 100 || 0}%`
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Statistik Pendaftar</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Belum Diproses</span>
                <span className="text-sm font-medium text-gray-700">
                  {pendaftar.filter(p => p.statusPendaftaran === 'menunggu').length}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-yellow-500 h-2.5 rounded-full"
                  style={{
                    width: `${(pendaftar.filter(p => p.statusPendaftaran === 'menunggu').length / totalPendaftar) * 100 || 0}%`
                  }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Disetujui</span>
                <span className="text-sm font-medium text-gray-700">
                  {pendaftar.filter(p => p.statusPendaftaran === 'disetujui').length}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-green-500 h-2.5 rounded-full"
                  style={{
                    width: `${(pendaftar.filter(p => p.statusPendaftaran === 'disetujui').length / totalPendaftar) * 100 || 0}%`
                  }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Ditolak</span>
                <span className="text-sm font-medium text-gray-700">
                  {pendaftar.filter(p => p.statusPendaftaran === 'ditolak').length}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-red-500 h-2.5 rounded-full"
                  style={{
                    width: `${(pendaftar.filter(p => p.statusPendaftaran === 'ditolak').length / totalPendaftar) * 100 || 0}%`
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Program Terpopuler</h2>
          <div className="space-y-4">
            <p className="text-gray-500">Fitur ini menampilkan data lulusan terbaru karena sistem belum memiliki data program pelatihan.</p>
            {programs.slice(0, 5).map((graduate, index) => (
              <div key={graduate.id} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{graduate.informasiPribadi?.namaLengkap || 'Nama tidak dikenal'}</p>
                  <p className="text-sm text-gray-500">{graduate.paketPelatihan || 'Paket pelatihan tidak dikenal'}</p>
                </div>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  {graduate.statusPeserta || 'Status N/A'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Pendaftar Terbaru</h2>
          <div className="space-y-4">
            {pendaftar.slice(0, 5).map((pendaftarItem, index) => (
              <div key={pendaftarItem.id} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{pendaftarItem.informasiPribadi?.namaLengkap}</p>
                  <p className="text-sm text-gray-500">{pendaftarItem.paketPelatihan}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  pendaftarItem.statusPendaftaran === 'menunggu' ? 'bg-yellow-100 text-yellow-800' :
                  pendaftarItem.statusPendaftaran === 'disetujui' ? 'bg-green-100 text-green-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {pendaftarItem.statusPendaftaran ? pendaftarItem.statusPendaftaran.charAt(0).toUpperCase() + pendaftarItem.statusPendaftaran.slice(1) : '-'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}