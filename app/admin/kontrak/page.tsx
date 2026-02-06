// app/admin/kontrak/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useKontrak } from '@/hooks/useKontrak';
import DataTable from '@/components/admin/DataTable';
import FormKontrak from '@/components/forms/FormKontrak';
import { useRouter } from 'next/navigation';
import { Kontrak } from '@/services/kontrakService';

export default function KontrakPage() {
  const { kontrak, loading, error, addKontrak, updateKontrakById, removeKontrak } = useKontrak();
  const [showForm, setShowForm] = useState(false);
  const [editingKontrak, setEditingKontrak] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    // Cek apakah pengguna sudah login sebagai admin
    const adminStatus = localStorage.getItem('admin');
    if (!adminStatus) {
      router.push('/admin/login');
    }
  }, [router]);

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
    { key: 'nomorKontrak' as keyof Kontrak, title: 'Nomor Kontrak' },
    { key: 'pesertaId' as keyof Kontrak, title: 'ID Peserta' },
    { key: 'programId' as keyof Kontrak, title: 'ID Program' },
    { key: 'tanggalMulai' as keyof Kontrak, title: 'Tanggal Mulai' },
    { key: 'tanggalSelesai' as keyof Kontrak, title: 'Tanggal Selesai' },
    { 
      key: 'status' as keyof Kontrak, 
      title: 'Status',
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          value === 'aktif' ? 'bg-green-100 text-green-800' :
          value === 'selesai' ? 'bg-blue-100 text-blue-800' :
          'bg-red-100 text-red-800'
        }`}>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </span>
      )
    },
    { 
      key: 'biaya' as keyof Kontrak, 
      title: 'Biaya',
      render: (value: number) => `Rp ${value.toLocaleString('id-ID')}`
    },
    {
      key: 'actions',
      title: 'Aksi',
      render: (_: any, record: any) => (
        <div className="flex space-x-2">
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

  if (loading) return <div className="text-center py-8">Memuat data kontrak...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Data Kontrak</h1>
        <button
          onClick={() => {
            setEditingKontrak(null);
            setShowForm(true);
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Tambah Kontrak
        </button>
      </div>

      {showForm ? (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingKontrak ? 'Edit Kontrak' : 'Tambah Kontrak Baru'}
          </h2>
          <FormKontrak
            initialData={editingKontrak}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </div>
      ) : null}

      <div className="bg-white p-6 rounded-lg shadow">
        <DataTable
          columns={columns}
          data={kontrak}
          onRowClick={handleEdit}
        />
      </div>
    </div>
  );
}