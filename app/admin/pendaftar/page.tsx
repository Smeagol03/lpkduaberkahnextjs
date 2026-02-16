'use client';

import { useState, useEffect, useMemo } from 'react';
import { usePendaftar } from '@/hooks/usePendaftar';
import DataTable from '@/components/admin/DataTable';
import PageHeader from '@/components/admin/PageHeader';
import SearchInput from '@/components/admin/SearchInput';
import FilterSelect from '@/components/admin/FilterSelect';
import StatusBadge from '@/components/admin/StatusBadge';
import ExportButton from '@/components/admin/ExportButton';
import { useRouter } from 'next/navigation';
import { Pendaftar } from '@/services/pendaftarService';

export default function PendaftarPage() {
  const { pendaftar, loading, error, approvePendaftarById, rejectPendaftarById } = usePendaftar();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('menunggu');
  const router = useRouter();

  useEffect(() => {
    const adminStatus = localStorage.getItem('adminUser');
    if (!adminStatus) {
      router.push('/admin/login');
    }
  }, [router]);

  const filteredPendaftar = useMemo(() => {
    let result = filterStatus === 'all' ? pendaftar : pendaftar.filter(p => p.statusPendaftaran === filterStatus);
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(p =>
        (p.informasiPribadi?.namaLengkap || '').toLowerCase().includes(term) ||
        (p.informasiPribadi?.noHP || '').toLowerCase().includes(term) ||
        (p.informasiPribadi?.nik || '').toLowerCase().includes(term) ||
        (p.paketPelatihan || '').toLowerCase().includes(term)
      );
    }
    
    return result.sort((a, b) => {
      const dateA = a.tanggalDaftar ? new Date(a.tanggalDaftar).getTime() : 0;
      const dateB = b.tanggalDaftar ? new Date(b.tanggalDaftar).getTime() : 0;
      return dateB - dateA;
    });
  }, [pendaftar, filterStatus, searchTerm]);

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
    router.push(`/admin/pendaftar/${id}`);
  };

  const columns = [
    { key: 'informasiPribadi.namaLengkap', title: 'Nama' },
    { key: 'informasiPribadi.noHP', title: 'No. HP' },
    { key: 'paketPelatihan', title: 'Program' },
    {
      key: 'statusPendaftaran',
      title: 'Status',
      render: (value: string) => <StatusBadge status={value} type="pendaftar" />
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
          {record.statusPendaftaran === 'menunggu' && (
            <>
              <button
                onClick={() => handleApprove(record.id)}
                className="px-3 py-1.5 text-xs font-medium text-green-600 hover:bg-green-50 rounded-lg transition-colors"
              >
                Setujui
              </button>
              <button
                onClick={() => handleReject(record.id)}
                className="px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                Tolak
              </button>
            </>
          )}
        </div>
      )
    }
  ];

  const exportColumns = [
    { key: 'informasiPribadi.namaLengkap', label: 'Nama Lengkap' },
    { key: 'informasiPribadi.nik', label: 'NIK' },
    { key: 'informasiPribadi.noHP', label: 'No. HP' },
    { key: 'informasiPribadi.alamat', label: 'Alamat' },
    { key: 'informasiPribadi.jenisKelamin', label: 'Jenis Kelamin' },
    { key: 'informasiPribadi.tempatLahir', label: 'Tempat Lahir' },
    { key: 'informasiPribadi.tanggalLahir', label: 'Tanggal Lahir' },
    { key: 'pendidikanPekerjaan.pendidikanTerakhir', label: 'Pendidikan Terakhir' },
    { key: 'pendidikanPekerjaan.pekerjaanSaatIni', label: 'Pekerjaan' },
    { key: 'paketPelatihan', label: 'Paket Pelatihan' },
    { key: 'statusPendaftaran', label: 'Status Pendaftaran' },
    { key: 'tanggalDaftar', label: 'Tanggal Daftar' },
  ];

  const filterOptions = [
    { value: 'menunggu', label: 'Pendaftar Baru' },
    { value: 'disetujui', label: 'Disetujui' },
    { value: 'ditolak', label: 'Ditolak' },
    { value: 'all', label: 'Semua Status' },
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
        title="Data Pendaftar"
        badge={{ count: filteredPendaftar.length, label: filterStatus === 'all' ? 'total' : filterStatus }}
        actions={
          <>
            <SearchInput
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Cari nama, HP, NIK..."
              className="w-full sm:w-64"
            />
            <FilterSelect
              value={filterStatus}
              onChange={setFilterStatus}
              options={filterOptions}
            />
            <ExportButton
              data={filteredPendaftar}
              filename="data_pendaftar"
              columns={exportColumns}
              label="Export Excel"
            />
          </>
        }
      />

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 md:p-6">
        <DataTable
          columns={columns}
          data={filteredPendaftar}
          emptyMessage="Tidak ada data pendaftar yang sesuai"
        />
      </div>
    </div>
  );
}