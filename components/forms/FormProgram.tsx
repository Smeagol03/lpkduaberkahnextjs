// components/forms/FormProgram.tsx
'use client';

import { useState } from 'react';

interface FormData {
  nama: string;
  deskripsi: string;
  durasi: string;
  harga: number;
  kuota: number;
}

interface FormProgramProps {
  initialData?: FormData;
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
}

export default function FormProgram({ initialData, onSubmit, onCancel }: FormProgramProps) {
  const [formData, setFormData] = useState<FormData>({
    nama: initialData?.nama || '',
    deskripsi: initialData?.deskripsi || '',
    durasi: initialData?.durasi || '',
    harga: initialData?.harga || 0,
    kuota: initialData?.kuota || 0
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'harga' || name === 'kuota' ? Number(value) : value
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
          Nama Program
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
        <label htmlFor="deskripsi" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Deskripsi
        </label>
        <textarea
          id="deskripsi"
          name="deskripsi"
          value={formData.deskripsi}
          onChange={handleChange}
          rows={4}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        ></textarea>
      </div>
      
      <div>
        <label htmlFor="durasi" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Durasi
        </label>
        <input
          type="text"
          id="durasi"
          name="durasi"
          value={formData.durasi}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>
      
      <div>
        <label htmlFor="harga" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Harga
        </label>
        <input
          type="number"
          id="harga"
          name="harga"
          value={formData.harga}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>
      
      <div>
        <label htmlFor="kuota" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Kuota
        </label>
        <input
          type="number"
          id="kuota"
          name="kuota"
          value={formData.kuota}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
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