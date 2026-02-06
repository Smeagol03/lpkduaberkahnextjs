// components/forms/FormPeserta.tsx
'use client';

import { useState } from 'react';

interface FormData {
  nama: string;
  email: string;
  nomorHp: string;
  program: string;
  status: 'baru' | 'aktif' | 'lulus' | 'ditolak';
}

interface FormPesertaProps {
  initialData?: FormData;
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
}

export default function FormPeserta({ initialData, onSubmit, onCancel }: FormPesertaProps) {
  const [formData, setFormData] = useState<FormData>({
    nama: initialData?.nama || '',
    email: initialData?.email || '',
    nomorHp: initialData?.nomorHp || '',
    program: initialData?.program || '',
    status: initialData?.status || 'baru'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="nama" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Nama Lengkap
        </label>
        <input
          type="text"
          id="nama"
          name="nama"
          value={formData.nama}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>
      
      <div>
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>
      
      <div>
        <label htmlFor="nomorHp" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Nomor HP
        </label>
        <input
          type="text"
          id="nomorHp"
          name="nomorHp"
          value={formData.nomorHp}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>
      
      <div>
        <label htmlFor="program" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Program
        </label>
        <select
          id="program"
          name="program"
          value={formData.program}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        >
          <option value="">Pilih Program</option>
          <option value="menjahit-dasar">Menjahit Dasar</option>
          <option value="menjahit-lanjutan">Menjahit Lanjutan</option>
          <option value="tata-rias">Tata Rias</option>
          <option value="wirausaha-konveksi">Wirausaha Konveksi</option>
        </select>
      </div>
      
      <div>
        <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Status
        </label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        >
          <option value="baru">Baru</option>
          <option value="aktif">Aktif</option>
          <option value="lulus">Lulus</option>
          <option value="ditolak">Ditolak</option>
        </select>
      </div>
      
      <div className="flex space-x-2">
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Simpan
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-gray-700"
        >
          Batal
        </button>
      </div>
    </form>
  );
}