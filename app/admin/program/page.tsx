'use client';

import { useState, useEffect, useMemo } from 'react';
import { useProgram } from '@/hooks/useProgram';
import DataTable from '@/components/admin/DataTable';
import PageHeader from '@/components/admin/PageHeader';
import SearchInput from '@/components/admin/SearchInput';
import StatusBadge from '@/components/admin/StatusBadge';
import { useRouter } from 'next/navigation';
import { Graduate } from '@/services/programService';

export default function ProgramPage() {
  const { programs, loading, error, removeProgram } = useProgram();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const router = useRouter();

  useEffect(() => {
    const adminStatus = localStorage.getItem('adminUser');
    if (!adminStatus) {
      router.push('/admin/login');
    }
  }, [router]);

  const filteredPrograms = useMemo(() => {
    let result = filterStatus === 'all' ? programs : programs.filter(p => p.statusPeserta === filterStatus);
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(program =>
        (program.informasiPribadi?.namaLengkap || '').toLowerCase().includes(term) ||
        (program.informasiPribadi?.nik || '').toLowerCase().includes(term) ||
        (program.informasiPribadi?.noHP || '').toLowerCase().includes(term) ||
        (program.paketPelatihan || '').toLowerCase().includes(term)
      );
    }
    
    return result.sort((a, b) => {
      const dateA = a.tanggalDaftar ? new Date(a.tanggalDaftar).getTime() : 0;
      const dateB = b.tanggalDaftar ? new Date(b.tanggalDaftar).getTime() : 0;
      return dateB - dateA;
    });
  }, [programs, searchTerm, filterStatus]);

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
    { key: 'informasiPribadi.namaLengkap', title: 'Nama Lengkap' },
    { key: 'informasiPribadi.nik', title: 'NIK' },
    { key: 'informasiPribadi.noHP', title: 'No. HP' },
    { key: 'pendidikanPekerjaan.pendidikanTerakhir', title: 'Pendidikan' },
    { key: 'paketPelatihan', title: 'Paket Pelatihan' },
    {
      key: 'statusPeserta',
      title: 'Status',
      render: (value: string) => <StatusBadge status={value} type="peserta" />
    },
    {
      key: 'tanggalDaftar',
      title: 'Tanggal Daftar',
      render: (value: string) => value ? new Date(value).toLocaleDateString('id-ID') : '-'
    },
    {
      key: 'actions',
      title: 'Aksi',
      render: (_: any, record: any) => (
        <div className="flex gap-1">
          <button
            onClick={() => handleViewDetails(record.id)}
            className="px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            Detail
          </button>
          <button
            onClick={() => handleEdit(record.id)}
            className="px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(record.id)}
            className="px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            Hapus
          </button>
        </div>
      )
    }
  ];

  const filterOptions = [
    { value: 'all', label: 'Semua Status' },
    { value: 'lulus', label: 'Lulus' },
    { value: 'aktif', label: 'Aktif' },
    { value: 'baru', label: 'Baru' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 text-center">
        <p className="text-red-600 dark:text-red-400">Error: {error}</p>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Data Lulusan"
        badge={{ count: filteredPrograms.length, label: 'data' }}
        actions={
          <>
            <SearchInput
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Cari nama, NIK, HP..."
              className="w-full sm:w-64"
            />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2.5 text-sm border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all dark:bg-gray-700 dark:border-gray-600 dark:text-white cursor-pointer"
            >
              {filterOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </>
        }
      />

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 md:p-6">
        <DataTable
          columns={columns}
          data={filteredPrograms}
          emptyMessage="Tidak ada data lulusan yang sesuai"
        />
      </div>
    </div>
  );
}