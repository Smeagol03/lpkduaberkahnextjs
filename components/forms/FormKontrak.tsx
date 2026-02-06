// components/forms/FormKontrak.tsx
'use client';

import { useState } from 'react';

interface FormData {
  nomorKontrak: string;
  pesertaId: string;
  programId: string;
  tanggalMulai: string;
  tanggalSelesai: string;
  status: 'aktif' | 'selesai' | 'dibatalkan';
  biaya: number;
}

interface FormKontrakProps {
  initialData?: FormData;
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
}

export default function FormKontrak({ initialData, onSubmit, onCancel }: FormKontrakProps) {
  const [formData, setFormData] = useState<FormData>({
    nomorKontrak: initialData?.nomorKontrak || '',
    pesertaId: initialData?.pesertaId || '',
    programId: initialData?.programId || '',
    tanggalMulai: initialData?.tanggalMulai || '',
    tanggalSelesai: initialData?.tanggalSelesai || '',
    status: initialData?.status || 'aktif',
    biaya: initialData?.biaya || 0
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'biaya' ? Number(value) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="nomorKontrak" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Nomor Kontrak
        </label>
        <input
          type="text"
          id="nomorKontrak"
          name="nomorKontrak"
          value={formData.nomorKontrak}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>
      
      <div>
        <label htmlFor="pesertaId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          ID Peserta
        </label>
        <input
          type="text"
          id="pesertaId"
          name="pesertaId"
          value={formData.pesertaId}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>
      
      <div>
        <label htmlFor="programId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          ID Program
        </label>
        <input
          type="text"
          id="programId"
          name="programId"
          value={formData.programId}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>
      
      <div>
        <label htmlFor="tanggalMulai" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Tanggal Mulai
        </label>
        <input
          type="date"
          id="tanggalMulai"
          name="tanggalMulai"
          value={formData.tanggalMulai}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>
      
      <div>
        <label htmlFor="tanggalSelesai" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Tanggal Selesai
        </label>
        <input
          type="date"
          id="tanggalSelesai"
          name="tanggalSelesai"
          value={formData.tanggalSelesai}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
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
          <option value="aktif">Aktif</option>
          <option value="selesai">Selesai</option>
          <option value="dibatalkan">Dibatalkan</option>
        </select>
      </div>
      
      <div>
        <label htmlFor="biaya" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Biaya
        </label>
        <input
          type="number"
          id="biaya"
          name="biaya"
          value={formData.biaya}
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