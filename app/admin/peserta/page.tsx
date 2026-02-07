// app/admin/peserta/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { usePeserta } from '@/hooks/usePeserta';
import DataTable from '@/components/admin/DataTable';
import FormPeserta from '@/components/forms/FormPeserta';
import { useRouter } from 'next/navigation';
import { Peserta } from '@/services/pesertaService';

export default function PesertaPage() {
  const { peserta, loading, error, addPeserta, updatePesertaById, removePeserta } = usePeserta();
  const [showForm, setShowForm] = useState(false);
  const [editingPeserta, setEditingPeserta] = useState<any>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all'); // Filter status
  const [filteredPeserta, setFilteredPeserta] = useState<Peserta[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Cek apakah pengguna sudah login sebagai admin
    const adminStatus = localStorage.getItem('admin');
    if (!adminStatus) {
      router.push('/admin/login');
    }

    // Filter peserta berdasarkan status yang dipilih
    if (filterStatus === 'all') {
      setFilteredPeserta(peserta);
    } else {
      setFilteredPeserta(peserta.filter(p => p.statusPeserta === filterStatus));
    }
  }, [peserta, filterStatus, router]);

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
      if (editingPeserta) {
        await updatePesertaById(editingPeserta.id, data);
      } else {
        await addPeserta(data);
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
      key: 'statusPeserta',
      title: 'Status',
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          value === 'baru' ? 'bg-yellow-100 text-yellow-800' :
          value === 'aktif' ? 'bg-green-100 text-green-800' :
          value === 'lulus' ? 'bg-blue-100 text-blue-800' :
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
          <button
            onClick={() => handleEdit(record)}
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

  if (loading) return <div className="text-center py-8">Memuat data peserta...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Data Peserta</h1>
        
        <div className="flex flex-wrap gap-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Semua Status</option>
            <option value="baru">Baru</option>
            <option value="aktif">Aktif</option>
            <option value="lulus">Lulus</option>
            <option value="ditolak">Ditolak</option>
          </select>
          
          <button
            onClick={() => {
              setEditingPeserta(null);
              setShowForm(true);
            }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm"
          >
            Tambah Peserta
          </button>
          
          <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1.5 rounded-full flex items-center">
            {filteredPeserta.length} peserta
          </span>
        </div>
      </div>

      {showForm ? (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingPeserta ? 'Edit Peserta' : 'Tambah Peserta Baru'}
          </h2>
          <FormPeserta
            initialData={editingPeserta}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </div>
      ) : null}

      <div className="bg-white p-6 rounded-lg shadow">
        <DataTable
          columns={columns}
          data={filteredPeserta}
        />
      </div>
    </div>
  );
}