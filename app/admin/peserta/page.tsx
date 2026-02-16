'use client';

import { useState, useEffect, useMemo } from 'react';
import { usePeserta } from '@/hooks/usePeserta';
import DataTable from '@/components/admin/DataTable';
import PageHeader from '@/components/admin/PageHeader';
import SearchInput from '@/components/admin/SearchInput';
import FilterSelect from '@/components/admin/FilterSelect';
import StatusBadge from '@/components/admin/StatusBadge';
import ExportButton from '@/components/admin/ExportButton';
import FormPeserta from '@/components/forms/FormPeserta';
import { useRouter } from 'next/navigation';
import { Peserta } from '@/services/pesertaService';

export default function PesertaPage() {
  const { peserta, loading, error, addPeserta, updatePesertaById, removePeserta } = usePeserta();
  const [showForm, setShowForm] = useState(false);
  const [editingPeserta, setEditingPeserta] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const router = useRouter();

  useEffect(() => {
    const adminStatus = localStorage.getItem('adminUser');
    if (!adminStatus) {
      router.push('/admin/login');
    }
  }, [router]);

  const filteredPeserta = useMemo(() => {
    let result = filterStatus === 'all' ? peserta : peserta.filter(p => p.statusPeserta === filterStatus);
    
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
  }, [peserta, filterStatus, searchTerm]);

  const handleEdit = (record: any) => {
    setEditingPeserta(record);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus peserta ini?')) {
      try {
        await removePeserta(id);
      } catch (err) {
        console.error('Error deleting peserta:', err);
      }
    }
  };

  const handleSubmit = async (data: any) => {
    try {
      const pesertaData = {
        informasiPribadi: data.informasiPribadi,
        pendidikanPekerjaan: data.pendidikanPekerjaan,
        motivasiReferensi: data.motivasiReferensi,
        paketPelatihan: data.paketPelatihan,
        statusPeserta: data.statusPeserta,
        statusPendaftaran: data.statusPendaftaran,
        tanggalDaftar: editingPeserta?.tanggalDaftar || new Date().toISOString(),
        validasi: editingPeserta?.validasi || {
          inputDivalidasi: false,
          waktuValidasi: ''
        }
      };
      
      if (editingPeserta) {
        await updatePesertaById(editingPeserta.id, pesertaData);
      } else {
        await addPeserta(pesertaData);
      }
      setShowForm(false);
      setEditingPeserta(null);
    } catch (err) {
      console.error('Error saving peserta:', err);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingPeserta(null);
  };

  const handleViewDetails = (id: string) => {
    router.push(`/admin/peserta/${id}`);
  };

  const columns = [
    { key: 'informasiPribadi.namaLengkap', title: 'Nama' },
    { key: 'informasiPribadi.noHP', title: 'No. HP' },
    { key: 'paketPelatihan', title: 'Program' },
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
    { key: 'statusPeserta', label: 'Status Peserta' },
    { key: 'tanggalDaftar', label: 'Tanggal Daftar' },
  ];

  const filterOptions = [
    { value: 'all', label: 'Semua Status' },
    { value: 'baru', label: 'Baru' },
    { value: 'aktif', label: 'Aktif' },
    { value: 'lulus', label: 'Lulus' },
    { value: 'ditolak', label: 'Ditolak' },
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
        title="Data Peserta"
        badge={{ count: filteredPeserta.length, label: 'peserta' }}
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
              data={filteredPeserta}
              filename="data_peserta"
              columns={exportColumns}
              label="Export Excel"
            />
            <button
              onClick={() => {
                setEditingPeserta(null);
                setShowForm(true);
              }}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-xl transition-colors shadow-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className="hidden sm:inline">Tambah Peserta</span>
              <span className="sm:hidden">Tambah</span>
            </button>
          </>
        }
      />

      {showForm && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 md:p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              {editingPeserta ? 'Edit Peserta' : 'Tambah Peserta Baru'}
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
          <FormPeserta
            initialData={editingPeserta}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 md:p-6">
        <DataTable
          columns={columns}
          data={filteredPeserta}
          emptyMessage="Tidak ada data peserta yang sesuai"
        />
      </div>
    </div>
  );
}