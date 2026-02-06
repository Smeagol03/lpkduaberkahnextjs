// app/admin/pendaftar/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { usePeserta } from '@/hooks/usePeserta';
import DataTable from '@/components/admin/DataTable';
import { useRouter } from 'next/navigation';

export default function PendaftarPage() {
  const { peserta, loading, error, updatePesertaById } = usePeserta();
  const [filteredPeserta, setFilteredPeserta] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Cek apakah pengguna sudah login sebagai admin
    const adminStatus = localStorage.getItem('admin');
    if (!adminStatus) {
      router.push('/admin/login');
    }
    
    // Filter hanya peserta dengan status 'baru'
    setFilteredPeserta(peserta.filter(p => p.status === 'baru'));
  }, [peserta, router]);

  const handleApprove = async (id: string) => {
    if (confirm('Setujui pendaftaran ini?')) {
      try {
        await updatePesertaById(id, { status: 'aktif' });
      } catch (err) {
        console.error('Error approving pendaftar:', err);
      }
    }
  };

  const handleReject = async (id: string) => {
    if (confirm('Tolak pendaftaran ini?')) {
      try {
        await updatePesertaById(id, { status: 'ditolak' });
      } catch (err) {
        console.error('Error rejecting pendaftar:', err);
      }
    }
  };

  const columns = [
    { key: 'nama', title: 'Nama' },
    { key: 'email', title: 'Email' },
    { key: 'nomorHp', title: 'Nomor HP' },
    { key: 'program', title: 'Program' },
    {
      key: 'actions',
      title: 'Aksi',
      render: (_: any, record: any) => (
        <div className="flex space-x-2">
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
        </div>
      )
    }
  ];

  if (loading) return <div className="text-center py-8">Memuat data pendaftar...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Data Pendaftar</h1>
        <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
          {filteredPeserta.length} pendaftar baru
        </span>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <DataTable
          columns={columns}
          data={filteredPeserta}
        />
      </div>
    </div>
  );
}