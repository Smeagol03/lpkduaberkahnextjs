// app/admin/program/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useProgram } from '@/hooks/useProgram';
import DataTable from '@/components/admin/DataTable';
import { useRouter } from 'next/navigation';
import { Graduate } from '@/services/programService';

export default function ProgramPage() {
  const { programs, loading, error, removeProgram } = useProgram();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPrograms, setFilteredPrograms] = useState<Graduate[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Cek apakah pengguna sudah login sebagai admin
    const adminStatus = localStorage.getItem('adminUser');
    if (!adminStatus) {
      router.push('/admin/login');
    }

    // Filter program berdasarkan pencarian
    if (searchTerm) {
      const filtered = programs.filter(program =>
        (program.informasiPribadi?.namaLengkap || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (program.informasiPribadi?.nik || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (program.paketPelatihan || '').toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPrograms(filtered);
    } else {
      setFilteredPrograms(programs);
    }
  }, [programs, searchTerm, router]);

  const handleDelete = async (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus data lulusan ini?')) {
      try {
        await removeProgram(id);
      } catch (err) {
        console.error('Error deleting graduate:', err);
      }
    }
  };

  const handleViewDetails = (id: string) => {
    if (id) {
      router.push(`/admin/program/${id}`);
    } else {
      console.error('Invalid ID for program details:', id);
    }
  };

  const handleEdit = (id: string) => {
    if (id) {
      router.push(`/admin/program/${id}/edit`);
    } else {
      console.error('Invalid ID for program edit:', id);
    }
  };

  const columns = [
    { 
      key: 'informasiPribadi.namaLengkap' as keyof Graduate, 
      title: 'Nama Lengkap' 
    },
    { 
      key: 'informasiPribadi.nik' as keyof Graduate, 
      title: 'NIK' 
    },
    { 
      key: 'informasiPribadi.noHP' as keyof Graduate, 
      title: 'Nomor HP' 
    },
    { 
      key: 'pendidikanPekerjaan.pendidikanTerakhir' as keyof Graduate, 
      title: 'Pendidikan Terakhir' 
    },
    { 
      key: 'paketPelatihan' as keyof Graduate, 
      title: 'Paket Pelatihan' 
    },
    { 
      key: 'statusPeserta' as keyof Graduate, 
      title: 'Status',
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          value === 'lulus' ? 'bg-blue-100 text-blue-800' :
          value === 'aktif' ? 'bg-green-100 text-green-800' :
          value === 'baru' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {value ? value.charAt(0).toUpperCase() + value.slice(1) : '-'}
        </span>
      )
    },
    { 
      key: 'tanggalDaftar' as keyof Graduate, 
      title: 'Tanggal Daftar',
      render: (value: string) => value ? new Date(value).toLocaleDateString('id-ID') : '-'
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
          <button
            onClick={() => handleEdit(record.id)}
            className="text-blue-600 hover:text-blue-900"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(record.id)}
            className="text-red-600 hover:text-red-900"
          >
            Hapus
          </button>
        </div>
      )
    }
  ];

  if (loading) return <div className="text-center py-8">Memuat data lulusan...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Data Lulusan</h1>

        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Cari lulusan..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
          />

          <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1.5 rounded-full flex items-center">
            {filteredPrograms.length} lulusan
          </span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <DataTable
          columns={columns}
          data={filteredPrograms}
        />
      </div>
    </div>
  );
}