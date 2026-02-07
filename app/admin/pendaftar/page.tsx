// app/admin/pendaftar/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { usePendaftar } from '@/hooks/usePendaftar';
import DataTable from '@/components/admin/DataTable';
import { useRouter } from 'next/navigation';
import { Pendaftar } from '@/services/pendaftarService';

export default function PendaftarPage() {
  const { pendaftar, loading, error, approvePendaftarById, rejectPendaftarById } = usePendaftar();
  const [filteredPendaftar, setFilteredPendaftar] = useState<Pendaftar[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('menunggu'); // Default filter to 'menunggu'
  const router = useRouter();

  useEffect(() => {
    // Cek apakah pengguna sudah login sebagai admin
    const adminStatus = localStorage.getItem('admin');
    if (!adminStatus) {
      router.push('/admin/login');
    }

    // Filter pendaftar berdasarkan status yang dipilih
    if (filterStatus === 'all') {
      setFilteredPendaftar(pendaftar);
    } else {
      setFilteredPendaftar(pendaftar.filter(p => p.statusPendaftaran === filterStatus));
    }
  }, [pendaftar, filterStatus, router]);

  const handleApprove = async (id: string) => {
    if (confirm('Setujui pendaftaran ini?')) {
      try {
        await approvePendaftarById(id);
      } catch (err) {
        console.error('Error approving pendaftar:', err);
      }
    }
  };

  const handleReject = async (id: string) => {
    if (confirm('Tolak pendaftaran ini?')) {
      try {
        await rejectPendaftarById(id);
      } catch (err) {
        console.error('Error rejecting pendaftar:', err);
      }
    }
  };

  const handleViewDetails = (id: string) => {
    // Redirect ke halaman detail pendaftar
    router.push(`/admin/pendaftar/${id}`);
  };

  const columns = [
    {
      key: 'informasiPribadi.namaLengkap',
      title: 'Nama'
    },
    {
      key: 'informasiPribadi.noHP',
      title: 'Nomor HP'
    },
    {
      key: 'paketPelatihan',
      title: 'Program'
    },
    {
      key: 'statusPendaftaran',
      title: 'Status',
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          value === 'menunggu' ? 'bg-yellow-100 text-yellow-800' :
          value === 'disetujui' ? 'bg-green-100 text-green-800' :
          'bg-red-100 text-red-800'
        }`}>
          {value ? value.charAt(0).toUpperCase() + value.slice(1) : '-'}
        </span>
      )
    },
    {
      key: 'tanggalDaftar',
      title: 'Tanggal Daftar',
      render: (value: string) => new Date(value).toLocaleDateString('id-ID')
    },
    {
      key: 'actions',
      title: 'Aksi',
      render: (_: any, record: any) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleViewDetails(record.id)}
            className="text-blue-600 hover:text-blue-900"
          >
            Detail
          </button>
          {record.statusPendaftaran === 'menunggu' && (
            <>
              <button
                onClick={() => handleApprove(record.id)}
                className="text-green-600 hover:text-green-900"
              >
                Setujui
              </button>
              <button
                onClick={() => handleReject(record.id)}
                className="text-red-600 hover:text-red-900"
              >
                Tolak
              </button>
            </>
          )}
        </div>
      )
    }
  ];

  if (loading) return <div className="text-center py-8">Memuat data pendaftar...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Data Pendaftar</h1>
        
        <div className="flex flex-wrap gap-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="menunggu">Pendaftar Baru</option>
            <option value="disetujui">Disetujui</option>
            <option value="ditolak">Ditolak</option>
            <option value="all">Semua Status</option>
          </select>
          
          <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1.5 rounded-full flex items-center">
            {filteredPendaftar.length} {filterStatus === 'all' ? 'pendaftar' : filterStatus === 'menunggu' ? 'pendaftar baru' : filterStatus === 'disetujui' ? 'disetujui' : 'ditolak'}
          </span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <DataTable
          columns={columns}
          data={filteredPendaftar}
        />
      </div>
    </div>
  );
}