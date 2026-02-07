// app/admin/program/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useProgram } from '@/hooks/useProgram';
import DataTable from '@/components/admin/DataTable';
import FormProgram from '@/components/forms/FormProgram';
import { useRouter } from 'next/navigation';
import { Program } from '@/services/programService';

export default function ProgramPage() {
  const { programs, loading, error, addProgram, updateProgramById, removeProgram } = useProgram();
  const [showForm, setShowForm] = useState(false);
  const [editingProgram, setEditingProgram] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPrograms, setFilteredPrograms] = useState<Program[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Cek apakah pengguna sudah login sebagai admin
    const adminStatus = localStorage.getItem('admin');
    if (!adminStatus) {
      router.push('/admin/login');
    }

    // Filter program berdasarkan pencarian
    if (searchTerm) {
      const filtered = programs.filter(program => 
        program.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
        program.deskripsi.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPrograms(filtered);
    } else {
      setFilteredPrograms(programs);
    }
  }, [programs, searchTerm, router]);

  const handleEdit = (record: any) => {
    setEditingProgram(record);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus program ini?')) {
      try {
        await removeProgram(id);
      } catch (err) {
        console.error('Error deleting program:', err);
      }
    }
  };

  const handleSubmit = async (data: any) => {
    try {
      if (editingProgram) {
        await updateProgramById(editingProgram.id, data);
      } else {
        await addProgram(data);
      }
      setShowForm(false);
      setEditingProgram(null);
    } catch (err) {
      console.error('Error saving program:', err);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingProgram(null);
  };

  const handleViewDetails = (id: string) => {
    // Untuk sementara, kita arahkan ke edit karena belum ada halaman detail program
    setEditingProgram(programs.find(p => p.id === id));
    setShowForm(true);
  };

  const columns = [
    { key: 'nama' as keyof Program, title: 'Nama Program' },
    { key: 'deskripsi' as keyof Program, title: 'Deskripsi' },
    { key: 'durasi' as keyof Program, title: 'Durasi' },
    {
      key: 'harga' as keyof Program,
      title: 'Harga',
      render: (value: number) => `Rp ${value.toLocaleString('id-ID')}`
    },
    { key: 'kuota' as keyof Program, title: 'Kuota' },
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

  if (loading) return <div className="text-center py-8">Memuat data program...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Data Program</h1>
        
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Cari program..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
          />
          
          <button
            onClick={() => {
              setEditingProgram(null);
              setShowForm(true);
            }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm"
          >
            Tambah Program
          </button>
          
          <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1.5 rounded-full flex items-center">
            {filteredPrograms.length} program
          </span>
        </div>
      </div>

      {showForm ? (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingProgram ? 'Edit Program' : 'Tambah Program Baru'}
          </h2>
          <FormProgram
            initialData={editingProgram}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </div>
      ) : null}

      <div className="bg-white p-6 rounded-lg shadow">
        <DataTable
          columns={columns}
          data={filteredPrograms}
        />
      </div>
    </div>
  );
}