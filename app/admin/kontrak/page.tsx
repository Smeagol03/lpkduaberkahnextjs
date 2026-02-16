'use client';

import { useState, useEffect, useMemo } from 'react';
import { useKontrak } from '@/hooks/useKontrak';
import DataTable from '@/components/admin/DataTable';
import PageHeader from '@/components/admin/PageHeader';
import SearchInput from '@/components/admin/SearchInput';
import FilterSelect from '@/components/admin/FilterSelect';
import StatusBadge from '@/components/admin/StatusBadge';
import FormKontrak from '@/components/forms/FormKontrak';
import { useRouter } from 'next/navigation';
import { Kontrak } from '@/services/kontrakService';

export default function KontrakPage() {
  const { kontrak, loading, error, addKontrak, updateKontrakById, removeKontrak } = useKontrak();
  const [showForm, setShowForm] = useState(false);
  const [editingKontrak, setEditingKontrak] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const router = useRouter();

  useEffect(() => {
    const adminStatus = localStorage.getItem('adminUser');
    if (!adminStatus) {
      router.push('/admin/login');
    }
  }, [router]);

  const filteredKontrak = useMemo(() => {
    let result = filterStatus === 'all' ? kontrak : kontrak.filter(k => k.status === filterStatus);
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(k =>
        (k.nomorKontrak || '').toLowerCase().includes(term) ||
        (k.pesertaId || '').toLowerCase().includes(term) ||
        (k.programId || '').toLowerCase().includes(term)
      );
    }
    
    return result.sort((a, b) => {
      const dateA = a.tanggalMulai ? new Date(a.tanggalMulai).getTime() : 0;
      const dateB = b.tanggalMulai ? new Date(b.tanggalMulai).getTime() : 0;
      return dateB - dateA;
    });
  }, [kontrak, filterStatus, searchTerm]);

  const handleEdit = (record: any) => {
    setEditingKontrak(record);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus kontrak ini?')) {
      try {
        await removeKontrak(id);
      } catch (err) {
        console.error('Error deleting kontrak:', err);
      }
    }
  };

  const handleSubmit = async (data: any) => {
    try {
      if (editingKontrak) {
        await updateKontrakById(editingKontrak.id, data);
      } else {
        await addKontrak(data);
      }
      setShowForm(false);
      setEditingKontrak(null);
    } catch (err) {
      console.error('Error saving kontrak:', err);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingKontrak(null);
  };

  const columns = [
    { key: 'nomorKontrak', title: 'No. Kontrak' },
    { key: 'pesertaId', title: 'ID Peserta' },
    { key: 'programId', title: 'ID Program' },
    {
      key: 'tanggalMulai',
      title: 'Tgl. Mulai',
      render: (value: string) => value ? new Date(value).toLocaleDateString('id-ID') : '-'
    },
    {
      key: 'tanggalSelesai',
      title: 'Tgl. Selesai',
      render: (value: string) => value ? new Date(value).toLocaleDateString('id-ID') : '-'
    },
    {
      key: 'status',
      title: 'Status',
      render: (value: string) => <StatusBadge status={value} type="kontrak" />
    },
    {
      key: 'biaya',
      title: 'Biaya',
      render: (value: number) => value ? `Rp ${value.toLocaleString('id-ID')}` : '-'
    },
    {
      key: 'actions',
      title: 'Aksi',
      render: (_: any, record: any) => (
        <div className="flex gap-1">
          <button
            onClick={() => handleEdit(record)}
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
    { value: 'aktif', label: 'Aktif' },
    { value: 'selesai', label: 'Selesai' },
    { value: 'dibatalkan', label: 'Dibatalkan' },
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
        title="Data Kontrak"
        badge={{ count: filteredKontrak.length, label: 'kontrak' }}
        actions={
          <>
            <SearchInput
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Cari no. kontrak..."
              className="w-full sm:w-64"
            />
            <FilterSelect
              value={filterStatus}
              onChange={setFilterStatus}
              options={filterOptions}
            />
            <button
              onClick={() => {
                setEditingKontrak(null);
                setShowForm(true);
              }}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-xl transition-colors shadow-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className="hidden sm:inline">Tambah Kontrak</span>
              <span className="sm:hidden">Tambah</span>
            </button>
          </>
        }
      />

      {showForm && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 md:p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              {editingKontrak ? 'Edit Kontrak' : 'Tambah Kontrak Baru'}
            </h2>
            <button
              onClick={handleCancel}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <FormKontrak
            initialData={editingKontrak}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 md:p-6">
        <DataTable
          columns={columns}
          data={filteredKontrak}
          emptyMessage="Tidak ada data kontrak yang sesuai"
        />
      </div>
    </div>
  );
}